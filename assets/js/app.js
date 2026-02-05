// assets/js/app.js

const App = {
  mount: document.getElementById("app"),

  levels: {},
  levelsOrder: ["A1", "A2", "B1", "B2"],

  refData: null,

  async init() {
    // Bind nav
    const byId = (id) => document.getElementById(id);

    byId("nav-home")?.addEventListener("click", () => Router.go("/"));
    byId("nav-review")?.addEventListener("click", () => Router.go("/review"));
    byId("nav-stats")?.addEventListener("click", () => Router.go("/stats"));
    byId("nav-ref")?.addEventListener("click", () => Router.go("/ref"));

    // Routes
    Router.on("/", () => this.viewHome());
    Router.on("/level", (p) => this.viewLevel(p.level));
    Router.on("/lesson", (p) => this.viewLesson(p.level, p.lessonId));
    Router.on("/review", () => this.viewReview());
    Router.on("/stats", () => this.viewStats());

    // Reference
    Router.on("/ref", () => this.viewRef());
    Router.on("/ref-sheet", (p) => this.viewRefSheet(p.id));

    // Load data
    await this.preloadLevels();
    await this.preloadRef();

    Router.start("/");
  },

  setView(html) {
    this.mount.innerHTML = html;
  },

  esc(s) {
    return String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  },

  async loadJson(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} sur ${url}`);
    return await res.json();
  },

  async preloadLevels() {
    const map = {
      A1: "assets/data/a1.json",
      A2: "assets/data/a2.json",
      B1: "assets/data/b1.json",
      B2: "assets/data/b2.json"
    };

    this.levels = {};

    for (const lvl of this.levelsOrder) {
      try {
        const json = await this.loadJson(map[lvl]);
        this.levels[lvl] = {
          level: json.level || lvl,
          title: json.title || "",
          modules: Array.isArray(json.modules) ? json.modules : []
        };
      } catch (e) {
        console.warn(`[levels] ${lvl} non chargé:`, e.message || e);
      }
    }
  },

  async preloadRef() {
    try {
      this.refData = await this.loadJson("assets/data/ref.json");
    } catch (e) {
      this.refData = null; // optionnel
      console.warn("[ref] non chargé:", e.message || e);
    }
  },

  // ---------- HOME ----------

  viewHome() {
    const s = Storage.load();
    const doneCount = Object.keys(s.done || {}).length;

    const cards = this.levelsOrder
      .map(lvl => this.levels[lvl])
      .filter(Boolean)
      .map(L => {
        const modulesCount = (L.modules || []).length;
        const title = L.title ? `${L.level} — ${L.title}` : L.level;

        return `
          <div class="card">
            <span class="pill">Niveau ${this.esc(L.level)}</span>
            <h3 style="margin-top:10px;">${this.esc(title)}</h3>
            <p class="muted">Modules : ${modulesCount}</p>
            <button class="btn btn-primary" onclick="Router.go('/level',{level:'${this.esc(L.level)}'})">Ouvrir</button>
          </div>
        `;
      })
      .join("");

    const diagMissing = this.levelsOrder.filter(l => !this.levels[l]);

    this.setView(`
      <section class="card">
        <h2>Bienvenue 👋</h2>
        <p class="muted">Objectif : apprendre le suédois de zéro (A1 → C2) avec cours + exercices.</p>
        <div class="kpi">
          <span class="pill">Leçons validées : <b>${doneCount}</b></span>
          <span class="pill">Bonnes réponses : <b>${s.stats?.correct ?? 0}</b></span>
          <span class="pill">Erreurs : <b>${s.stats?.wrong ?? 0}</b></span>
        </div>
      </section>

      <section class="grid grid-2" style="margin-top:12px;">
        ${cards || `
          <div class="card">
            <h3>Aucun niveau chargé</h3>
            <p class="muted">Vérifie tes fichiers JSON dans <code>assets/data/</code>.</p>
          </div>
        `}
      </section>

      ${diagMissing.length ? `
        <section class="card" style="margin-top:12px;">
          <h3>Diagnostic</h3>
          <p class="muted">Niveaux manquants/non chargés : <b>${this.esc(diagMissing.join(", "))}</b></p>
          <p class="muted">Vérifie les noms exacts (ex: <code>b2.json</code> en minuscules) et que les fichiers sont bien push sur GitHub.</p>
        </section>
      ` : ""}
    `);
  },

  // ---------- LEVEL ----------

  viewLevel(level) {
    const L = this.levels[level];
    if (!L) return Router.go("/");

    this.setView(`
      <section class="card">
        <span class="pill">Niveau ${this.esc(L.level)}</span>
        <h2 style="margin-top:10px;">${this.esc(L.level)} — ${this.esc(L.title)}</h2>
        <p class="muted">Choisis un module, puis une leçon.</p>
      </section>

      <section class="grid" style="margin-top:12px;">
        ${(L.modules || []).map(m => `
          <div class="card">
            <h3>${this.esc(m.title || "Module")}</h3>
            <p class="muted">Leçons : ${(m.lessons || []).length}</p>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              ${(m.lessons || []).map(les => `
                <button class="btn" onclick="Router.go('/lesson',{level:'${this.esc(L.level)}',lessonId:'${this.esc(les.id)}'})">
                  ${this.esc(les.title || "Leçon")}
                </button>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </section>

      <div style="margin-top:12px;">
        <button class="btn" onclick="Router.go('/')">← Retour</button>
      </div>
    `);
  },

  // ---------- LESSON ----------

  viewLesson(level, lessonId) {
    const L = this.levels[level];
    if (!L) return Router.go("/");

    const lesson = (L.modules || [])
      .flatMap(m => (m.lessons || []))
      .find(x => x.id === lessonId);

    if (!lesson) return Router.go("/level", { level });

    const contentHtml = (lesson.content || []).map(p => `<p>${this.esc(p)}</p>`).join("");

    const examplesHtml = (lesson.examples || []).map(e => `
      <div class="choice" style="cursor:default;">
        <div>
          <b>${this.esc(e.sv || "")}</b>
          <div class="muted">${this.esc(e.fr || "")}${e.pron ? ` • <i>${this.esc(e.pron)}</i>` : ""}</div>
        </div>
      </div>
    `).join("");

    const vocabHtml = (lesson.vocab || []).map(w => `
      <div class="choice" style="cursor:default;">
        <div style="min-width:110px;"><b>${this.esc(w.sv || "")}</b></div>
        <div class="muted">${this.esc(w.fr || "")}${w.pron ? ` • <i>${this.esc(w.pron)}</i>` : ""}</div>
      </div>
    `).join("");

    this.setView(`
      <section class="card">
        <span class="pill">${this.esc(L.level)}</span>
        <h2 style="margin-top:10px;">${this.esc(lesson.title || "Leçon")}</h2>

        ${contentHtml}

        ${(lesson.examples && lesson.examples.length) ? `
          <hr />
          <h3>Exemples</h3>
          ${examplesHtml}
        ` : ""}

        ${(lesson.vocab && lesson.vocab.length) ? `
          <hr />
          <h3>Vocabulaire</h3>
          ${vocabHtml}
        ` : ""}

        <hr />
        <h3>Exercices</h3>
        <div id="quiz"></div>

        <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
          <button class="btn btn-success" onclick="Storage.markDone('${this.esc(L.level)}:${this.esc(lesson.id)}'); Router.go('/level',{level:'${this.esc(L.level)}'})">✔ Marquer comme faite</button>
          <button class="btn" onclick="Router.go('/level',{level:'${this.esc(L.level)}'})">← Retour</button>
        </div>
      </section>
    `);

    this.renderQuiz(lesson);
  },

  renderQuiz(lesson) {
    const host = document.getElementById("quiz");
    if (!host) return;

    const quizzes = Array.isArray(lesson.quiz) ? lesson.quiz : (lesson.quiz ? [lesson.quiz] : []);
    if (!quizzes.length) {
      host.innerHTML = `<p class="muted">Aucun exercice pour cette leçon.</p>`;
      return;
    }

    let idx = 0;
    const answered = new Array(quizzes.length).fill(false);

    const renderOne = () => {
      const q = quizzes[idx];

      host.innerHTML = `
        <div class="card" style="margin-top:10px;">
          <div class="muted" style="margin-bottom:8px;">Exercice ${idx + 1} / ${quizzes.length}</div>
          <div id="qbox"></div>
          <p id="fb" class="muted" style="margin-top:10px;"></p>
          <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
            <button class="btn" id="prev" ${idx === 0 ? "disabled" : ""}>← Précédent</button>
            <button class="btn" id="next">${idx === quizzes.length - 1 ? "Terminer" : "Suivant →"}</button>
          </div>
        </div>
      `;

      const qbox = host.querySelector("#qbox");
      const fb = host.querySelector("#fb");

      const lock = () => answered[idx];
      const setFeedback = (ok, extra = "") => {
        fb.textContent = ok ? `✅ Correct. ${extra}` : `❌ Non. ${extra}`;
      };

      if (q.type === "mcq") {
        qbox.innerHTML = `
          <p><b>${this.esc(q.q || "")}</b></p>
          <div class="grid">
            ${(q.choices || []).map((c, i) => `<div class="choice" data-i="${i}">${this.esc(c)}</div>`).join("")}
          </div>
        `;

        const nodes = qbox.querySelectorAll(".choice");
        nodes.forEach(node => {
          node.onclick = () => {
            if (lock()) return;
            const i = Number(node.dataset.i);
            const ok = i === q.answerIndex;

            Storage.addResult(ok);
            answered[idx] = true;

            nodes.forEach(n => n.classList.remove("correct", "wrong"));
            node.classList.add(ok ? "correct" : "wrong");

            const answer = (q.choices && q.choices[q.answerIndex] != null) ? q.choices[q.answerIndex] : "";
            setFeedback(ok, ok ? "" : `Réponse : ${answer}`);
          };
        });
      } else if (q.type === "gap") {
        qbox.innerHTML = `
          <p><b>${this.esc(q.q || "")}</b></p>
          <input id="gap" placeholder="Ta réponse..." />
          <button class="btn" style="margin-top:10px;" id="check">Vérifier</button>
        `;

        const input = qbox.querySelector("#gap");
        const btn = qbox.querySelector("#check");

        btn.onclick = () => {
          if (lock()) return;

          const val = (input.value || "").trim().toLowerCase();
          const expected = (q.answer || "").trim().toLowerCase();
          const ok = val === expected;

          Storage.addResult(ok);
          answered[idx] = true;

          setFeedback(ok, ok ? "" : `Attendu : ${q.answer || ""}`);
        };
      } else {
        qbox.innerHTML = `<p class="muted">Type de quiz non géré.</p>`;
      }

      host.querySelector("#prev").onclick = () => { if (idx > 0) { idx--; renderOne(); } };
      host.querySelector("#next").onclick = () => {
        if (idx < quizzes.length - 1) { idx++; renderOne(); }
        else { fb.textContent = "✅ Série terminée."; }
      };
    };

    renderOne();
  },

  // ---------- REVIEW / STATS ----------

  viewReview() {
    this.setView(`
      <section class="card">
        <h2>Révision</h2>
        <p class="muted">Bientôt : flashcards + rappel espacée (SRS).</p>
      </section>
    `);
  },

  viewStats() {
    const s = Storage.load();
    const total = (s.stats?.correct ?? 0) + (s.stats?.wrong ?? 0);
    const rate = total ? Math.round(((s.stats?.correct ?? 0) / total) * 100) : 0;

    this.setView(`
      <section class="card">
        <h2>Stats</h2>
        <div class="kpi">
          <span class="pill">Total réponses : <b>${total}</b></span>
          <span class="pill">Taux : <b>${rate}%</b></span>
          <span class="pill">Bonnes : <b>${s.stats?.correct ?? 0}</b></span>
          <span class="pill">Erreurs : <b>${s.stats?.wrong ?? 0}</b></span>
        </div>
        <hr />
        <button class="btn" onclick="localStorage.removeItem(Storage.key); location.reload()">Réinitialiser</button>
      </section>
    `);
  },

  // ---------- REFERENCE (simple et stable) ----------

  getRefModules() {
    const r = this.refData;
    if (!r) return [];
    return (Array.isArray(r.modules) && r.modules) || (Array.isArray(r.sections) && r.sections) || [];
  },

  getRefItems(mod) {
    if (!mod) return [];
    return (Array.isArray(mod.items) && mod.items) || (Array.isArray(mod.rows) && mod.rows) || (Array.isArray(mod.entries) && mod.entries) || [];
  },

  viewRef() {
    if (!this.refData) {
      return this.setView(`
        <section class="card">
          <h2>Références</h2>
          <p class="muted">Aucun <code>ref.json</code> détecté dans <code>assets/data/</code> (optionnel).</p>
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </section>
      `);
    }

    const mods = this.getRefModules();
    if (!mods.length) {
      return this.setView(`
        <section class="card">
          <h2>Références</h2>
          <p class="muted">Ton <code>ref.json</code> ne contient pas <code>modules</code> ou <code>sections</code>.</p>
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </section>
      `);
    }

    this.setView(`
      <section class="card">
        <h2>Références</h2>
        <p class="muted">Choisis un module puis ouvre son tableau.</p>
      </section>

      <section class="grid grid-2" style="margin-top:12px;">
        ${mods.map((m, idx) => {
          const id = m.id || `m${idx}`;
          const title = m.title || "Module";
          const count = this.getRefItems(m).length;
          return `
            <div class="card">
              <span class="pill">Référence</span>
              <h3 style="margin-top:10px;">${this.esc(title)}</h3>
              <p class="muted">${count} entrées</p>
              <button class="btn btn-primary" onclick="Router.go('/ref-sheet',{id:'${this.esc(id)}'})">Ouvrir</button>
            </div>
          `;
        }).join("")}
      </section>
    `);
  },

  viewRefSheet(id) {
    const mods = this.getRefModules();
    const mod = mods.find(m => String(m.id || "") === String(id)) || mods.find((_, idx) => `m${idx}` === String(id));
    if (!mod) return Router.go("/ref");

    const items = this.getRefItems(mod);

    this.setView(`
      <section class="card">
        <span class="pill">Référence</span>
        <h2 style="margin-top:10px;">${this.esc(mod.title || "Module")}</h2>
        <p class="muted">${items.length} entrées</p>
        <button class="btn" onclick="Router.go('/ref')">← Retour</button>
      </section>

      <div class="table-wrap" style="margin-top:12px;">
        <table class="zebra">
          <thead>
            <tr>
              <th>Suédois</th>
              <th>Français</th>
              <th>Pron</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(it => `
              <tr>
                <td><b>${this.esc(it.sv || it.word || "")}</b></td>
                <td>${this.esc(it.fr || it.meaning || "")}</td>
                <td class="muted">${this.esc(it.pron || "")}</td>
                <td class="muted">${this.esc(it.note || "")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `);
  }
};

App.init();