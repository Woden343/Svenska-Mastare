// assets/js/app.js

const App = {
  mount: document.getElementById("app"),

  // Niveaux chargés : { A1: {...}, A2: {...}, B1: {...}, B2: {...} }
  levels: {},

  // Ordre d’affichage sur l’accueil
  levelsOrder: ["A1", "A2", "B1", "B2"],

  // Référence
  refData: null,

  async init() {
    // Nav (sécurisé)
    const navHome = document.getElementById("nav-home");
    const navReview = document.getElementById("nav-review");
    const navStats = document.getElementById("nav-stats");
    const navRef = document.getElementById("nav-ref");

    if (navHome) navHome.onclick = () => Router.go("/");
    if (navReview) navReview.onclick = () => Router.go("/review");
    if (navStats) navStats.onclick = () => Router.go("/stats");
    if (navRef) navRef.onclick = () => Router.go("/ref");

    // Routes
    Router.on("/", () => this.viewHome());
    Router.on("/level", (p) => this.viewLevel(p.level));
    Router.on("/lesson", (p) => this.viewLesson(p.level, p.lessonId));
    Router.on("/review", () => this.viewReview());
    Router.on("/stats", () => this.viewStats());
    Router.on("/ref", () => this.viewRef());
    Router.on("/ref-sheet", (p) => this.viewRefSheet(p.moduleId));

    // Charger niveaux + ref
    await this.preloadLevels();
    await this.preloadRef();

    Router.start("/");
  },

  setView(html) {
    this.mount.innerHTML = html;
  },

  async preloadLevels() {
    this.levels = {};

    for (const lvl of this.levelsOrder) {
      try {
        this.levels[lvl] = await this.loadLevel(lvl);
      } catch (e) {
        console.warn(`[loadLevel] ${lvl} non chargé:`, e.message || e);
      }
    }

    if (Object.keys(this.levels).length === 0) {
      this.setView(`
        <section class="card">
          <h2>Erreur de chargement</h2>
          <p class="muted">Aucun niveau n’a pu être chargé. Vérifie tes fichiers dans <code>assets/data/</code>.</p>
          <ul>
            <li><code>assets/data/a1.json</code></li>
            <li><code>assets/data/a2.json</code></li>
            <li><code>assets/data/b1.json</code></li>
            <li><code>assets/data/b2.json</code></li>
          </ul>
        </section>
      `);
    }
  },

  async preloadRef() {
    try {
      // si tu utilises ref.json
      this.refData = await this.loadJson("assets/data/ref.json");
    } catch (e) {
      // la ref est optionnelle : on ne casse pas l'app
      this.refData = null;
      console.warn("[ref] non chargé:", e.message || e);
    }
  },

  async loadJson(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} sur ${url}`);
    return await res.json();
  },

  async loadLevel(level) {
    const map = {
      A1: "assets/data/a1.json",
      A2: "assets/data/a2.json",
      B1: "assets/data/b1.json",
      B2: "assets/data/b2.json"
    };

    const url = map[level];
    if (!url) throw new Error(`Niveau non supporté: ${level}`);

    const json = await this.loadJson(url);

    return {
      level: json.level || level,
      title: json.title || "",
      modules: Array.isArray(json.modules) ? json.modules : []
    };
  },

  getLevelData(level) {
    return this.levels[level] || null;
  },

  // -------------------- VIEWS --------------------

  viewHome() {
    const s = Storage.load();
    const doneCount = Object.keys(s.done || {}).length;

    const cards = this.levelsOrder
      .map(lvl => this.getLevelData(lvl))
      .filter(Boolean)
      .map(L => {
        const modulesCount = (L.modules || []).length;
        const levelTitle = L.title ? `${L.level} — ${L.title}` : L.level;

        return `
          <div class="card">
            <span class="pill">Niveau ${L.level}</span>
            <h3 style="margin-top:10px;">${levelTitle}</h3>
            <p class="muted">Modules : ${modulesCount}</p>
            <button class="btn btn-primary" onclick="Router.go('/level',{level:'${L.level}'})">Ouvrir</button>
          </div>
        `;
      })
      .join("");

    this.setView(`
      <section class="card">
        <h2>Bienvenue 👋</h2>
        <p class="muted">Objectif : apprendre le suédois de zéro (A1 → C2) avec cours + exercices + révision.</p>
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
            <p class="muted">Vérifie tes fichiers JSON.</p>
          </div>
        `}
      </section>
    `);
  },

  viewLevel(level) {
    const L = this.getLevelData(level);
    if (!L) {
      const loaded = Object.keys(this.levels).join(", ") || "aucun";
      return this.setView(`
        <section class="card">
          <h2>Niveau introuvable</h2>
          <p class="muted">Niveaux chargés : ${loaded}</p>
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </section>
      `);
    }

    this.setView(`
      <section class="card">
        <span class="pill">Niveau ${L.level}</span>
        <h2 style="margin-top:10px;">${L.level} — ${L.title}</h2>
        <p class="muted">Choisis un module, puis une leçon.</p>
      </section>

      <section style="margin-top:12px;" class="grid">
        ${(L.modules || []).map(m => `
          <div class="card">
            <h3>${m.title || "Module"}</h3>
            <p class="muted">Leçons : ${(m.lessons || []).length}</p>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              ${(m.lessons || []).map(les => `
                <button class="btn" onclick="Router.go('/lesson',{level:'${L.level}', lessonId:'${les.id}'})">
                  ${les.title || "Leçon"}
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

  viewLesson(level, lessonId) {
    const L = this.getLevelData(level);
    if (!L) {
      return this.setView(`
        <section class="card">
          <h2>Leçon introuvable</h2>
          <p class="muted">Niveau non chargé : ${level}</p>
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </section>
      `);
    }

    const lesson =
      (L.modules || [])
        .flatMap(m => (m.lessons || []))
        .find(x => x.id === lessonId);

    if (!lesson) {
      return this.setView(`
        <section class="card">
          <h2>Leçon introuvable</h2>
          <button class="btn" onclick="Router.go('/level',{level:'${L.level}'})">← Retour</button>
        </section>
      `);
    }

    const contentHtml = (lesson.content || []).map(p => `<p>${p}</p>`).join("");

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
        <div style="min-width:110px;"><b>${w.sv || ""}</b></div>
        <div class="muted">${w.fr || ""}${w.pron ? ` • <i>${w.pron}</i>` : ""}</div>
      </div>
    `).join("");

    this.setView(`
      <section class="card">
        <span class="pill">${L.level}</span>
        <h2 style="margin-top:10px;">${lesson.title || "Leçon"}</h2>

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
          <button class="btn btn-success" onclick="Storage.markDone('${L.level}:${lesson.id}'); Router.go('/level',{level:'${L.level}'})">✔ Marquer comme faite</button>
          <button class="btn" onclick="Router.go('/level',{level:'${L.level}'})">← Retour</button>
        </div>
      </section>
    `);

    this.renderQuiz(lesson);
  },

  renderQuiz(lesson) {
    const host = document.getElementById("quiz");
    if (!host) return;

    const quizzes = Array.isArray(lesson.quiz) ? lesson.quiz : (lesson.quiz ? [lesson.quiz] : []);

    if (quizzes.length === 0) {
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

      const setFeedback = (ok, extra = "") => {
        fb.textContent = ok ? `✅ Correct. ${extra}` : `❌ Non. ${extra}`;
      };

      const lockIfAnswered = () => answered[idx];

      if (q.type === "mcq") {
        qbox.innerHTML = `
          <p><b>${q.q || ""}</b></p>
          <div class="grid">
            ${(q.choices || []).map((c, i) => `<div class="choice" data-i="${i}">${c}</div>`).join("")}
          </div>
        `;

        const nodes = qbox.querySelectorAll(".choice");
        nodes.forEach(node => {
          node.onclick = () => {
            if (lockIfAnswered()) return;

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
          <p><b>${q.q || ""}</b></p>
          <input id="gap" placeholder="Ta réponse..." />
          <button class="btn" style="margin-top:10px;" id="check">Vérifier</button>
        `;

        const input = qbox.querySelector("#gap");
        const btn = qbox.querySelector("#check");

        btn.onclick = () => {
          if (lockIfAnswered()) return;

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

  // --------- Référence (simple) ---------

  viewRef() {
    if (!this.refData) {
      return this.setView(`
        <section class="card">
          <h2>Références</h2>
          <p class="muted">Le fichier <code>assets/data/ref.json</code> n’est pas chargé (ou absent).</p>
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </section>
      `);
    }

    // Supporte plusieurs formats : modules / sections
    const mods = Array.isArray(this.refData.modules) ? this.refData.modules
               : (Array.isArray(this.refData.sections) ? this.refData.sections : []);

    if (!mods.length) {
      return this.setView(`
        <section class="card">
          <h2>Références</h2>
          <p class="muted">Aucun module trouvé dans <code>ref.json</code>.</p>
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </section>
      `);
    }

    this.setView(`
      <section class="card">
        <h2>Références (M+)</h2>
        <p class="muted">Choisis un module (verbes / vocab / particules), puis une fiche.</p>
      </section>

      <section class="grid grid-2" style="margin-top:12px;">
        ${mods.map(m => `
          <div class="card">
            <span class="pill">Référence</span>
            <h3 style="margin-top:10px;">${m.title || "Module"}</h3>
            <p class="muted">${(m.items || m.lessons || []).length} entrées</p>
            <button class="btn btn-primary" onclick="Router.go('/ref-sheet',{moduleId:'${m.id || m.title || ""}'})">Ouvrir</button>
          </div>
        `).join("")}
      </section>
    `);
  },

  viewRefSheet(moduleId) {
    if (!this.refData) return Router.go("/ref");

    const mods = Array.isArray(this.refData.modules) ? this.refData.modules
               : (Array.isArray(this.refData.sections) ? this.refData.sections : []);

    const mod =
      mods.find(x => (x.id || x.title || "") === moduleId) ||
      mods.find(x => (x.title || "") === moduleId);

    if (!mod) return Router.go("/ref");

    const rows = (mod.items || mod.lessons || []);
    const table = rows.length ? `
      <div class="table-wrap" style="margin-top:12px;">
        <table class="zebra">
          <thead>
            <tr>
              <th>Suédois</th>
              <th>Français</th>
              <th>Prononciation</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(it => `
              <tr>
                <td><b>${it.sv || it.word || ""}</b></td>
                <td>${it.fr || it.meaning || ""}</td>
                <td class="muted">${it.pron || ""}</td>
                <td class="muted">${it.note || ""}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    ` : `<p class="muted" style="margin-top:12px;">Aucune entrée.</p>`;

    this.setView(`
      <section class="card">
        <span class="pill">Référence</span>
        <h2 style="margin-top:10px;">${mod.title || "Module"}</h2>
        <p class="muted">Tableau consultable.</p>
        <button class="btn" onclick="Router.go('/ref')">← Retour</button>
      </section>
      ${table}
    `);
  }
};

App.init();