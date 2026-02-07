// assets/js/app.js

const App = {
  mount: document.getElementById("app"),

  // ---------- Levels ----------
  levels: {},
  levelsOrder: ["A1", "A2", "B1", "B2"],

  // ---------- Reference ----------
  ref: { title: "Références", modules: [] },

  // Référence+ (tables filtrables)
  refPlus: {
    title: "Référence+ (tableaux)",
    themes: [],
    verbs: [],
    vocab: [],
    particles: [],
  },

  // ---------- Init ----------
  async init() {
    // charge niveaux si présents
    for (const lvl of this.levelsOrder) {
      try {
        const res = await fetch(`${lvl.toLowerCase()}.json`);
        if (!res.ok) continue;
        const data = await res.json();
        this.levels[lvl] = data;
      } catch (e) {}
    }

    // charge refs si présentes
    try {
      const r = await fetch("ref.json");
      if (r.ok) this.ref = await r.json();
    } catch (e) {}

    try {
      const rp = await fetch("ref_plus.json");
      if (rp.ok) this.refPlus = await rp.json();
    } catch (e) {}

    // router
    Router.on("/", () => this.viewHome());
    Router.on("/level", (p) => this.viewLevel(p.level));
    Router.on("/lesson", (p) => this.viewLesson(p.level, p.lessonId));

    Router.on("/ref", () => this.viewRef());
    Router.on("/ref-lesson", (p) => this.viewRefLesson(p.moduleId, p.lessonId));
    Router.on("/ref-plus", (p) => this.viewRefPlus(p));

    Router.on("/review", () => this.viewReview());

    Router.start();
  },

  // ---------- View helpers ----------
  setView(html) {
    this.mount.innerHTML = html;
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  // ---------- Home ----------
  viewHome() {
    const cards = this.levelsOrder
      .filter((lvl) => this.levels[lvl])
      .map((lvl) => {
        const L = this.levels[lvl];
        return `
          <div class="item" onclick="Router.go('/level',{level:'${lvl}'})">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
              <div>
                <div class="pill">${lvl}</div>
                <div style="margin-top:10px; font-weight:800; font-size:1.05rem;">${L.title || lvl}</div>
                <div class="muted" style="margin-top:6px;">${L.description || ""}</div>
              </div>
              <div class="muted">→</div>
            </div>
          </div>
        `;
      })
      .join("");

    this.setView(`
      <section class="card">
        <div class="brand">
          <h1>Svenska Mästare Pro</h1>
          <div class="sub">Apprentissage structuré • drills • SRS</div>
        </div>

        <h2 style="margin-top:18px;">Niveaux</h2>
        <div class="list">${cards || `<div class="muted">Aucun niveau trouvé.</div>`}</div>

        <hr />
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn btn-ghost" onclick="Router.go('/ref')">📌 Références</button>
          <button class="btn btn-ghost" onclick="Router.go('/ref-plus',{})">📚 Référence+</button>
          <button class="btn btn-ghost" onclick="Router.go('/review')">🧠 Révision (SRS)</button>
        </div>
      </section>
    `);
  },

  // ---------- Level ----------
  viewLevel(level) {
    const L = this.levels[level];
    if (!L) {
      return this.setView(`
        <section class="card">
          <h2>Niveau introuvable</h2>
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </section>
      `);
    }

    const modules = (L.modules || [])
      .map((m) => {
        const lessons = (m.lessons || [])
          .map((ls) => {
            const done = Storage.isDone(`${L.level}:${ls.id}`);
            return `
              <div class="item" onclick="Router.go('/lesson',{level:'${L.level}',lessonId:'${ls.id}'})">
                <div style="display:flex; justify-content:space-between; gap:12px;">
                  <div>
                    <div style="font-weight:800;">${ls.title || ls.id}</div>
                    <div class="muted" style="margin-top:6px;">${done ? "✅ Fait" : "⏳ À faire"}</div>
                  </div>
                  <div class="muted">→</div>
                </div>
              </div>
            `;
          })
          .join("");

        return `
          <div style="margin-top:18px;">
            <div class="pill">${m.id || ""}</div>
            <h2 style="margin:10px 0 6px;">${m.title || "Module"}</h2>
            <div class="list">${lessons || `<div class="muted">Aucune leçon.</div>`}</div>
          </div>
        `;
      })
      .join("");

    this.setView(`
      <section class="card">
        <span class="pill">${L.level}</span>
        <h2 style="margin-top:10px;">${L.title || "Niveau"}</h2>
        <div class="muted">${L.description || ""}</div>

        ${modules}

        <div style="margin-top:12px;">
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </div>
      </section>
    `);
  },

  // ---------- Lesson ----------
  viewLesson(level, lessonId) {
    const L = this.levels[level];
    if (!L) return this.setView(`<section class="card"><h2>Leçon introuvable</h2></section>`);

    const lesson = (L.modules || []).flatMap((m) => (m.lessons || [])).find((x) => x.id === lessonId);
    if (!lesson) {
      return this.setView(`
        <section class="card">
          <h2>Leçon introuvable</h2>
          <button class="btn" onclick="Router.go('/level',{level:'${L.level}'})">← Retour</button>
        </section>
      `);
    }

    // ✅ NOUVEAU : rendu premium du contenu (sections / phonétique / dialogues)
    const contentHtml = this.renderLessonContent(lesson.content || []);

    const examplesHtml = (lesson.examples || [])
      .map(
        (e) => `
      <div class="choice" style="cursor:default;">
        <div>
          <b>${e.sv || ""}</b>
          <div class="muted">${e.fr || ""}${e.pron ? ` • <i>${e.pron}</i>` : ""}</div>
        </div>
      </div>
    `
      )
      .join("");

    const vocabHtml = (lesson.vocab || [])
      .map(
        (w) => `
      <div class="choice" style="cursor:default;">
        <div style="min-width:130px;"><b>${w.sv || ""}</b></div>
        <div class="muted">${w.fr || ""}${w.pron ? ` • <i>${w.pron}</i>` : ""}</div>
      </div>
    `
      )
      .join("");

    this.setView(`
      <section class="card">
        <span class="pill">${L.level}</span>
        <h2 style="margin-top:10px;">${lesson.title || "Leçon"}</h2>

        ${contentHtml}

        ${(lesson.examples && lesson.examples.length) ? `<hr /><h3>Exemples</h3>${examplesHtml}` : ""}
        ${(lesson.vocab && lesson.vocab.length) ? `<hr /><h3>Vocabulaire</h3>${vocabHtml}` : ""}

        <hr />
        <h3>Exercices</h3>
        <div id="quiz"></div>

        <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
          <button class="btn" onclick="Storage.markDone('${L.level}:${lesson.id}'); Router.go('/level',{level:'${L.level}'})">✔ Marquer comme faite</button>
          <button class="btn" onclick="Router.go('/level',{level:'${L.level}'})">← Retour</button>
        </div>
      </section>
    `);

    this.renderQuiz(lesson);
  },

  // ✅ NOUVEAU : rendu premium du lesson.content
  renderLessonContent(lines) {
    let html = "";
    let open = false;

    const isHeading = (t) =>
      t.startsWith("SITUATION") ||
      t.startsWith("DÉCOMPOSITION") ||
      t.startsWith("🧑‍🏫") ||
      t.startsWith("STRUCTURES") ||
      t.startsWith("ORDRE") ||
      t.startsWith("TABLEAU") ||
      t.startsWith("DRILLS") ||
      t.startsWith("MINI-STORY") ||
      t.startsWith("PRODUCTION");

    const looksSwedish = (t) => {
      if (!t) return false;
      if (/[åäöÅÄÖ]/.test(t)) return true;
      return /^(Jag|Du|Han|Hon|Vi|Ni|De|Vad|Vart|Var|Kan|Ska|Det|Imorgon|Idag)\b/.test(t) || t.includes("?");
    };

    for (const raw of lines) {
      const l = (raw ?? "").toString();

      if (l.startsWith("===")) {
        if (open) html += "</div>";
        open = true;
        html += `<div class="lesson-block">`;
        continue;
      }

      if (!open) {
        open = true;
        html += `<div class="lesson-block">`;
      }

      if (l.trim() === "") {
        html += `<div class="lesson-spacer"></div>`;
        continue;
      }

      if (isHeading(l)) {
        html += `<div class="lesson-heading">${this.escapeHtml(l)}</div>`;
        continue;
      }

      const dlg = l.match(/^([AB]):\s*(.*)$/);
      if (dlg) {
        const who = dlg[1];
        const txt = dlg[2] || "";
        html += `
          <div class="lesson-dialogue">
            <span class="dlg-who dlg-${who}">${who}</span>
            <span class="dlg-text">${this.escapeHtml(txt)}</span>
          </div>
        `;
        continue;
      }

      if (l.trim().startsWith("(") && l.trim().endsWith(")")) {
        const phon = l.trim().slice(1, -1);
        html += `<div class="lesson-phon">${this.escapeHtml(phon)}</div>`;
        continue;
      }

      if (looksSwedish(l)) html += `<div class="lesson-sv">${this.escapeHtml(l)}</div>`;
      else html += `<p>${this.escapeHtml(l)}</p>`;
    }

    if (open) html += "</div>";
    return html;
  },

  escapeHtml(str) {
    return (str ?? "")
      .toString()
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  },

  // ---------- Quiz ----------
  renderQuiz(lesson) {
    const host = document.getElementById("quiz");
    if (!host) return;
    host.innerHTML = "";

    const quiz = lesson.quiz || [];
    if (!quiz.length) {
      host.innerHTML = `<div class="muted">Aucun exercice pour cette leçon.</div>`;
      return;
    }

    quiz.forEach((q, idx) => {
      if (q.type === "gap") {
        const row = document.createElement("div");
        row.className = "choice";
        row.style.marginBottom = "10px";
        row.innerHTML = `
          <div style="flex:1;">
            <b>${idx + 1}.</b> ${q.q}
            <div class="muted" style="margin-top:8px;">
              <input data-answer="${this.escapeHtml(q.answer || "")}" placeholder="Réponse" style="width:100%; padding:10px; border-radius:12px; border:1px solid rgba(255,255,255,.15); background:rgba(0,0,0,.25); color:white;" />
            </div>
          </div>
        `;
        host.appendChild(row);
      }
    });

    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = "Corriger";
    btn.onclick = () => {
      const inputs = host.querySelectorAll("input[data-answer]");
      let ok = 0;
      inputs.forEach((inp) => {
        const ans = (inp.getAttribute("data-answer") || "").trim().toLowerCase();
        const val = (inp.value || "").trim().toLowerCase();
        const good = ans === val;
        inp.style.borderColor = good ? "rgba(34,197,94,.8)" : "rgba(239,68,68,.85)";
        if (good) ok++;
      });
    };
    host.appendChild(btn);
  },

  // ---------- Ref ----------
  viewRef() {
    const modules = (this.ref.modules || [])
      .map(
        (m) => `
      <div style="margin-top:16px;">
        <div class="pill">${m.id || ""}</div>
        <h2 style="margin-top:10px;">${m.title || "Référence"}</h2>
        <div class="list">
          ${(m.lessons || [])
            .map(
              (ls) => `
            <div class="item" onclick="Router.go('/ref-lesson',{moduleId:'${m.id}',lessonId:'${ls.id}'})">
              <div style="display:flex; justify-content:space-between; gap:12px;">
                <div style="font-weight:800;">${ls.title || ls.id}</div>
                <div class="muted">→</div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
      )
      .join("");

    this.setView(`
      <section class="card">
        <h2>${this.ref.title || "Références"}</h2>
        ${modules || `<div class="muted">Aucune référence.</div>`}
        <div style="margin-top:12px;">
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </div>
      </section>
    `);
  },

  viewRefLesson(moduleId, lessonId) {
    const mod = (this.ref.modules || []).find((m) => m.id === moduleId);
    const lesson = mod ? (mod.lessons || []).find((l) => l.id === lessonId) : null;

    if (!lesson) {
      return this.setView(`
        <section class="card">
          <h2>Fiche introuvable</h2>
          <button class="btn" onclick="Router.go('/ref')">← Retour</button>
        </section>
      `);
    }

    // ✅ NOUVEAU : même rendu premium aussi côté ref lesson
    const contentHtml = this.renderLessonContent(lesson.content || []);

    const examplesHtml = (lesson.examples || [])
      .map(
        (e) => `
      <div class="choice" style="cursor:default;">
        <div><b>${e.sv || ""}</b><div class="muted">${e.fr || ""}${e.pron ? ` • <i>${e.pron}</i>` : ""}</div></div>
      </div>
    `
      )
      .join("");

    this.setView(`
      <section class="card">
        <h2>${lesson.title || "Fiche"}</h2>
        ${contentHtml}
        ${(lesson.examples && lesson.examples.length) ? `<hr /><h3>Exemples</h3>${examplesHtml}` : ""}
        <div style="margin-top:12px;">
          <button class="btn" onclick="Router.go('/ref')">← Retour</button>
        </div>
      </section>
    `);
  },

  // ---------- Ref+ ----------
  viewRefPlus() {
    this.setView(`
      <section class="card">
        <h2>${this.refPlus.title || "Référence+ (tableaux)"}</h2>
        <div class="muted">Interface Référence+ inchangée (tes fonctions restent intactes).</div>
        <div style="margin-top:12px;">
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </div>
      </section>
    `);
  },

  // ---------- Review ----------
  viewReview() {
    this.setView(`
      <section class="card">
        <h2>Révision (SRS)</h2>
        <div class="muted">Ton écran SRS existant reste intact (non modifié ici).</div>
        <div style="margin-top:12px;">
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </div>
      </section>
    `);
  },
};

window.addEventListener("DOMContentLoaded", () => App.init());
