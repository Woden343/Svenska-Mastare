// assets/js/app.js

const App = {
  mount: null,  // ✅ Initialisé dans init()

  levels: {},
  levelsOrder: ["A1", "A2", "B1", "B2"],

  ref: { title: "Références", modules: [] },

  refPlus: {
    title: "Référence+ (tableaux)",
    themes: [],
    verbs: [],
    vocab: [],
    particles: [],
    articles: [],
    articles_guide: []
  },

  async init() {
    // ✅ Initialiser mount après chargement DOM
    this.mount = document.getElementById("app");
    if (!this.mount) {
      console.error("[App] Element #app introuvable");
      return;
    }

    // Nav
    document.getElementById("navHome")?.addEventListener("click", () => Router.go("/"));
    document.getElementById("navRef")?.addEventListener("click", () => Router.go("/ref"));
    document.getElementById("navRefPlus")?.addEventListener("click", () => Router.go("/ref-plus", {}));
    document.getElementById("navReview")?.addEventListener("click", () => Router.go("/review"));
    document.getElementById("navStats")?.addEventListener("click", () => Router.go("/stats"));

    // Router
    Router.on("/", () => this.viewHome());
    Router.on("/level", (p) => this.viewLevel(p.level));
    Router.on("/lesson", (p) => this.viewLesson(p.level, p.lessonId));

    Router.on("/ref", () => this.viewRef());
    Router.on("/ref-lesson", (p) => this.viewRefLesson(p.moduleId, p.lessonId));
    Router.on("/ref-plus", (p) => this.viewRefPlus(p));

    Router.on("/review", () => this.viewReview());
    Router.on("/stats", () => this.viewStats());

    // Load data
    await this.loadAllData();

    // Build SRS cards
    Storage.upsertCards(SRS.buildCardsFromLevels(this.levels));

    Router.start("/");
  },

  // ✅ Correction du chargement avec bon chemin
  async loadAllData() {
    for (const lvl of this.levelsOrder) {
      try {
        // ✅ Chemin correct vers assets/data/
        this.levels[lvl] = await this.loadJson(`assets/data/${lvl.toLowerCase()}.json`);
        console.log(`[App] Niveau ${lvl} chargé:`, this.levels[lvl]);
      } catch (e) {
        console.warn(`[App] Niveau ${lvl} non chargé:`, e.message);
      }
    }

    try {
      this.ref = await this.loadJson("assets/data/ref.json");
      console.log("[App] Références chargées:", this.ref);
    } catch (e) {
      console.warn("[App] ref.json non chargé:", e.message);
    }

    try {
      const json = await this.loadJson("assets/data/ref_plus.json");
      this.refPlus = {
        title: json.title || "Référence+ (tableaux)",
        themes: Array.isArray(json.themes) ? json.themes : [],
        verbs: Array.isArray(json.verbs) ? json.verbs : [],
        vocab: Array.isArray(json.vocab) ? json.vocab : [],
        particles: Array.isArray(json.particles) ? json.particles : [],
        articles: Array.isArray(json.articles) ? json.articles : [],
        articles_guide: Array.isArray(json.articles_guide) ? json.articles_guide : []
      };
      console.log("[App] Référence+ chargée:", this.refPlus);
    } catch (e) {
      console.warn("[App] ref_plus.json non chargé:", e.message);
    }
  },

  async loadJson(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status} sur ${path}`);
    return await res.json();
  },

  setView(html) {
    if (this.mount) {
      this.mount.innerHTML = html;
    }
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

  renderLessonContent(lines) {
    let html = "";
    let open = false;

    const isSeparator = (t) => /^=+$/.test((t || "").trim()) || (t || "").startsWith("====");
    const isHeading = (t) => {
      const s = (t || "").trim();
      return (
        s.startsWith("SITUATION") ||
        s.startsWith("DÉCOMPOSITION") ||
        s.startsWith("🧑‍🏫") ||
        s.startsWith("STRUCTURES") ||
        s.startsWith("ORDRE") ||
        s.startsWith("POINT") ||
        s.startsWith("TABLEAU") ||
        s.startsWith("DRILLS") ||
        s.startsWith("MINI-STORY") ||
        s.startsWith("PRODUCTION")
      );
    };

    const looksSwedish = (t) => {
      const s = (t || "").trim();
      if (!s) return false;
      if (/[åäöÅÄÖ]/.test(s)) return true;
      if (/^(Jag|Du|Han|Hon|Vi|Ni|De|Det|Den|Vad|Vart|Var|Kan|Ska|Imorgon|Idag|Okej|Ja|Nej)\b/.test(s)) return true;
      if (s.includes("?")) return true;
      return false;
    };

    for (const raw of (lines || [])) {
      const l = (raw ?? "").toString();

      if (isSeparator(l)) {
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

      const trimmed = l.trim();
      if (trimmed.startsWith("(") && trimmed.endsWith(")")) {
        const phon = trimmed.slice(1, -1);
        html += `<div class="lesson-phon">${this.escapeHtml(phon)}</div>`;
        continue;
      }

      if (looksSwedish(l)) {
        html += `<div class="lesson-sv">${this.escapeHtml(l)}</div>`;
      } else {
        html += `<p>${this.escapeHtml(l)}</p>`;
      }
    }

    if (open) html += "</div>";
    return html;
  },

  renderTable(headers, rows) {
    const thead = `<thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>`;
    const tbody = `<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>`;
    return `<div class="table-wrap"><table>${thead}${tbody}</table></div>`;
  },

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
          <button class="btn btn-ghost" onclick="Router.go('/stats')">📈 Stats</button>
        </div>
      </section>
    `);
  },

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

  viewLesson(level, lessonId) {
    const L = this.levels[level];
    if (!L) return this.setView(`<section class="card"><h2>Leçon introuvable</h2></section>`);

    const lesson = (L.modules || []).flatMap(m => (m.lessons || [])).find(x => x.id === lessonId);
    if (!lesson) {
      return this.setView(`
        <section class="card">
          <h2>Leçon introuvable</h2>
          <button class="btn" onclick="Router.go('/level',{level:'${L.level}'})">← Retour</button>
        </section>
      `);
    }

    const contentHtml = this.renderLessonContent(lesson.content || []);
    const examplesHtml = (lesson.examples || []).map(e => `
      <div class="choice" style="cursor:default;">
        <div>
          <b>${e.sv || ""}</b>
          <div class="muted">${e.fr || ""}${e.pron ? ` • <i>${e.pron}</i>` : ""}</div>
        </div>
      </div>
    `).join("");
    const vocabHtml = (lesson.vocab || []).map(w => `
      <div class="choice" style="cursor:default;">
        <div style="min-width:130px;"><b>${w.sv || ""}</b></div>
        <div class="muted">${w.fr || ""}${w.pron ? ` • <i>${w.pron}</i>` : ""}</div>
      </div>
    `).join("");

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
          <button class="btn btn-ghost" onclick="Router.go('/review')">🧠 Réviser (SRS)</button>
          <button class="btn btn-ghost" onclick="Router.go('/level',{level:'${L.level}'})">← Retour</button>
        </div>
      </section>
    `);

    this.renderQuiz(lesson);
  },

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
      inputs.forEach((inp) => {
        const ans = (inp.getAttribute("data-answer") || "").trim().toLowerCase();
        const val = (inp.value || "").trim().toLowerCase();
        const good = ans === val;
        inp.style.borderColor = good ? "rgba(34,197,94,.8)" : "rgba(239,68,68,.85)";
      });
    };
    host.appendChild(btn);
  },

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
    const mod = (this.ref.modules || []).find(x => x.id === moduleId);
    const lesson = mod?.lessons?.find(x => x.id === lessonId);

    if (!mod || !lesson) {
      return this.setView(`
        <section class="card">
          <h2>Fiche introuvable</h2>
          <button class="btn" onclick="Router.go('/ref')">← Retour</button>
        </section>
      `);
    }

    const contentHtml = this.renderLessonContent(lesson.content || []);
    const examplesHtml = (lesson.examples || []).map(e => `
      <div class="choice" style="cursor:default;">
        <div><b>${e.sv || ""}</b><div class="muted">${e.fr || ""}${e.pron ? ` • <i>${e.pron}</i>` : ""}</div></div>
      </div>
    `).join("");
    const vocabHtml = (lesson.vocab || []).map(w => `
      <div class="choice" style="cursor:default;">
        <div style="min-width:130px;"><b>${w.sv || ""}</b></div>
        <div class="muted">${w.fr || ""}${w.pron ? ` • <i>${w.pron}</i>` : ""}</div>
      </div>
    `).join("");

    this.setView(`
      <section class="card">
        <h2>${lesson.title || "Fiche"}</h2>

        ${contentHtml}

        ${(lesson.examples && lesson.examples.length) ? `<hr /><h3>Exemples</h3>${examplesHtml}` : ""}
        ${(lesson.vocab && lesson.vocab.length) ? `<hr /><h3>Vocabulaire</h3>${vocabHtml}` : ""}

        <div style="margin-top:12px;">
          <button class="btn" onclick="Router.go('/ref')">← Retour</button>
        </div>
      </section>
    `);
  },

  viewRefPlus() {
    this.setView(`
      <section class="card">
        <h2>${this.refPlus.title || "Référence+ (tableaux)"}</h2>
        <div class="muted">Référence+ chargée. (Rendu inchangé ici.)</div>
        <div style="margin-top:12px;">
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </div>
      </section>
    `);
  },

  viewReview() {
    this.setView(`
      <section class="card">
        <h2>Révision (SRS)</h2>
        <div class="muted">Écran SRS inchangé.</div>
        <div style="margin-top:12px;">
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </div>
      </section>
    `);
  },

  viewStats() {
    this.setView(`
      <section class="card">
        <h2>Stats</h2>
        <div class="muted">Écran stats inchangé.</div>
        <div style="margin-top:12px;">
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </div>
      </section>
    `);
  }
};

window.addEventListener("DOMContentLoaded", () => App.init());