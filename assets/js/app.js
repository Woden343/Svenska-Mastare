// assets/js/app.js — VERSION COMPLÈTE (STRUCTURE JSON RÉELLE + SRS FIX + REF/REF+ FIX)

const App = {
  mount: null,

  levels: {},
  levelsOrder: ["A1", "A2", "B1", "B2"],

  ref: { title: "Références", modules: [] },

  refPlus: {
    title: "Référence+",
    themes: [],
    verbs: [],
    vocab: [],
    particles: [],
    articles: [],
    articles_guide: []
  },

  async init() {
    console.log("[App] Démarrage...");

    this.mount = document.getElementById("app");
    if (!this.mount) {
      console.error("[App] Element #app introuvable");
      return;
    }
    console.log("[App] Mount trouvé:", this.mount);

    // NAV (IDs alignés index.html)
    const navHomeBrand = document.getElementById("nav-home");
    const navHomeBtn   = document.getElementById("nav-home-btn");
    const navRef       = document.getElementById("nav-ref");
    const navReview    = document.getElementById("nav-review");
    const navStats     = document.getElementById("nav-stats");

    if (navHomeBrand) navHomeBrand.addEventListener("click", () => Router.go("/"));
    if (navHomeBtn)   navHomeBtn.addEventListener("click", () => Router.go("/"));
    if (navRef)       navRef.addEventListener("click", () => Router.go("/ref"));
    if (navReview)    navReview.addEventListener("click", () => Router.go("/review"));
    if (navStats)     navStats.addEventListener("click", () => Router.go("/stats"));

    console.log("[App] Navigation configurée");

    // ROUTES
    Router.add("/", () => this.viewHome());
    Router.add("/level", (p) => this.viewLevel(p));
    Router.add("/lesson", (p) => this.viewLesson(p));
    Router.add("/ref", () => this.viewRef());
    Router.add("/ref-lesson", (p) => this.viewRefLesson(p));
    Router.add("/ref-plus", (p) => this.viewRefPlus(p));
    Router.add("/review", () => this.viewReview());
    Router.add("/stats", () => this.viewStats());

    console.log("[App] Routes configurées");

    // LOAD DATA
    try {
      const [a1, a2, b1, b2] = await Promise.all([
        fetch("assets/data/a1.json").then(r => r.json()),
        fetch("assets/data/a2.json").then(r => r.json()).catch(() => ({})),
        fetch("assets/data/b1.json").then(r => r.json()).catch(() => ({})),
        fetch("assets/data/b2.json").then(r => r.json()).catch(() => ({})),
      ]);

      if (a1 && a1.modules) this.levels.A1 = a1;
      if (a2 && a2.modules) this.levels.A2 = a2;
      if (b1 && b1.modules) this.levels.B1 = b1;
      if (b2 && b2.modules) this.levels.B2 = b2;

      console.log("[App] Niveau A1 chargé:", this.levels.A1);
      console.log("[App] Niveau A2 chargé:", this.levels.A2);
      console.log("[App] Niveau B1 chargé:", this.levels.B1);
      console.log("[App] Niveau B2 chargé:", this.levels.B2);

      const ref = await fetch("assets/data/ref.json").then(r => r.json());
      if (ref && ref.modules) this.ref = ref;
      console.log("[App] Références chargées:", this.ref);

      const refPlus = await fetch("assets/data/ref_plus.json").then(r => r.json());
      if (refPlus) this.refPlus = refPlus;
      console.log("[App] Référence+ chargée:", this.refPlus);

      console.log("[App] Données chargées");

      // SRS INIT ✅ (fix: buildCardsFromLevels)
      try {
        const cards = (SRS && typeof SRS.buildCardsFromLevels === "function")
          ? SRS.buildCardsFromLevels(this.levels)
          : [];

        AppStorage.upsertCards(cards);
        console.log("[App] SRS initialisé (cards:", cards.length, ")");
      } catch (e) {
        console.error("[App] Erreur SRS:", e);
      }

    } catch (e) {
      console.error("[App] Erreur chargement JSON:", e);
      this.setView(`
        <div class="card">
          <h2>Erreur de chargement</h2>
          <p class="muted">Impossible de charger les fichiers JSON.</p>
          <pre class="muted">${this.esc(e && e.stack ? e.stack : String(e))}</pre>
          <button class="btn" id="goHome">Retour</button>
        </div>
      `);
      document.getElementById("goHome")?.addEventListener("click", () => Router.go("/"));
      return;
    }

    console.log("[App] Démarrage du router...");
    Router.start();
    console.log("[App] Application prête !");
  },

  // ======================
  // Helpers
  // ======================
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

  pill(txt, cls = "") {
    return `<span class="pill ${cls}">${this.esc(txt)}</span>`;
  },

  // ======================
  // HOME
  // ======================
  viewHome() {
    const levelCards = this.levelsOrder
      .filter(k => this.levels[k] && Array.isArray(this.levels[k].modules))
      .map(k => {
        const L = this.levels[k];
        const modulesCount = L.modules.length;
        const lessonsCount = L.modules.reduce((acc, m) => acc + ((m.lessons || []).length), 0);

        return `
          <div class="card">
            <div class="header">
              <div>
                <div class="brand">${this.esc(k)} — ${this.esc(L.title || "")}</div>
                <div class="sub muted">${modulesCount} modules • ${lessonsCount} leçons</div>
              </div>
              <button class="btn" data-go="/level" data-level="${this.esc(k)}">Ouvrir</button>
            </div>
            ${L.description ? `<p class="muted">${this.esc(L.description)}</p>` : ""}
          </div>
        `;
      })
      .join("");

    const srsStats = AppStorage.getSrsStats();
    const due = srsStats.due || 0;

    this.setView(`
      <div class="card">
        <div class="header">
          <div>
            <div class="brand">🇸🇪 Svenska Mästare Pro</div>
            <div class="sub muted">Apprentissage progressif A1 → B2 • + Références • + SRS</div>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn" data-go="/review">Révision SRS ${due ? this.pill(due, "") : ""}</button>
            <button class="btn" data-go="/stats">Stats</button>
          </div>
        </div>
      </div>

      ${levelCards || `<div class="card"><p class="muted">Aucun niveau chargé.</p></div>`}

      <div class="card">
        <div class="header">
          <div>
            <div class="brand">Références</div>
            <div class="sub muted">Bescherelle vocabulaire, verbes à particules, etc.</div>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn" data-go="/ref">Ouvrir</button>
            <button class="btn" data-go="/ref-plus">Référence+</button>
          </div>
        </div>
      </div>
    `);

    this.mount.querySelectorAll("[data-go]").forEach(btn => {
      btn.addEventListener("click", () => {
        const go = btn.getAttribute("data-go");
        const level = btn.getAttribute("data-level");
        if (go === "/level") Router.go("/level", { level });
        else Router.go(go);
      });
    });
  },

  // ======================
  // LEVEL
  // ======================
  viewLevel(params) {
    const levelKey = params?.level || "A1";
    const L = this.levels[levelKey];

    if (!L) {
      this.setView(`
        <div class="card">
          <h2>Niveau introuvable</h2>
          <button class="btn" id="goHome">Accueil</button>
        </div>
      `);
      document.getElementById("goHome")?.addEventListener("click", () => Router.go("/"));
      return;
    }

    const modulesHtml = (L.modules || []).map((m) => {
      const lessons = (m.lessons || []).map((ls) => {
        const doneKey = `${levelKey}:${ls.id}`;
        const done = AppStorage.isDone(doneKey);

        return `
          <div class="item">
            <div>
              <div><b>${this.esc(ls.title)}</b></div>
              <div class="muted sub">${this.esc(ls.type || "")}</div>
            </div>
            <div style="display:flex; gap:10px; align-items:center;">
              ${done ? this.pill("Terminé") : this.pill("À faire")}
              <button class="btn" data-go="/lesson" data-level="${this.esc(levelKey)}" data-lesson="${this.esc(ls.id)}">Ouvrir</button>
            </div>
          </div>
        `;
      }).join("");

      return `
        <div class="card">
          <div class="lesson-heading">${this.esc(m.title || "")}</div>
          <div class="list">
            ${lessons || `<div class="muted">Aucune leçon.</div>`}
          </div>
        </div>
      `;
    }).join("");

    this.setView(`
      <div class="card">
        <div class="header">
          <div>
            <div class="brand">${this.esc(levelKey)} — ${this.esc(L.title || "")}</div>
            ${L.description ? `<div class="sub muted">${this.esc(L.description)}</div>` : ""}
          </div>
          <button class="btn" id="backBtn">← Retour</button>
        </div>
      </div>

      ${modulesHtml || `<div class="card"><div class="muted">Aucun module.</div></div>`}
    `);

    document.getElementById("backBtn")?.addEventListener("click", () => Router.back("/"));

    this.mount.querySelectorAll("[data-go='/lesson']").forEach(btn => {
      btn.addEventListener("click", () => {
        Router.go("/lesson", {
          level: btn.getAttribute("data-level"),
          lesson: btn.getAttribute("data-lesson")
        });
      });
    });
  },

  // ======================
  // LESSON (structure réelle: content/vocab/examples/mini_drills/quiz)
  // ======================
  viewLesson(params) {
    const levelKey = params?.level;
    const lessonId = params?.lesson;

    const L = this.levels[levelKey];
    if (!L) {
      this.setView(`<div class="card"><h2>Erreur</h2><p class="muted">Niveau introuvable.</p></div>`);
      return;
    }

    let lesson = null;
    let moduleTitle = "";

    for (const m of (L.modules || [])) {
      const found = (m.lessons || []).find(ls => String(ls.id) === String(lessonId));
      if (found) { lesson = found; moduleTitle = m.title || ""; break; }
    }

    if (!lesson) {
      this.setView(`<div class="card"><h2>Erreur</h2><p class="muted">Leçon introuvable.</p></div>`);
      return;
    }

    const doneKey = `${levelKey}:${lesson.id}`;

    const contentBlock = this.renderContent(lesson.content);
    const examplesBlock = this.renderExamples(lesson.examples);
    const vocabBlock = this.renderVocab(lesson.vocab);
    const drillsBlock = this.renderDrills(lesson.mini_drills);
    const quizBlock = this.renderQuiz(lesson.quiz);

    this.setView(`
      <div class="card">
        <div class="header">
          <div>
            <div class="brand">${this.esc(lesson.title || "")}</div>
            <div class="sub muted">${this.esc(levelKey)} • ${this.esc(moduleTitle)} • ${this.esc(lesson.type || "")}</div>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn" id="backBtn">← Retour</button>
            <button class="btn" id="homeBtn">Accueil</button>
            <button class="btn" id="doneBtn">Marquer terminé</button>
          </div>
        </div>
      </div>

      ${contentBlock}
      ${examplesBlock}
      ${vocabBlock}
      ${drillsBlock}
      ${quizBlock}
    `);

    document.getElementById("backBtn")?.addEventListener("click", () => Router.back(`/level?level=${encodeURIComponent(levelKey)}`));
    document.getElementById("homeBtn")?.addEventListener("click", () => Router.go("/"));
    document.getElementById("doneBtn")?.addEventListener("click", () => {
      AppStorage.markDone(doneKey);
      alert("✅ Leçon marquée comme terminée !");
      Router.go("/level", { level: levelKey });
    });

    // Quiz: reveal answer
    this.mount.querySelectorAll("[data-reveal]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-reveal");
        const ans = document.getElementById(id);
        if (ans) ans.style.display = (ans.style.display === "none" ? "block" : "none");
      });
    });
  },

  renderContent(lines) {
    if (!Array.isArray(lines) || !lines.filter(x => String(x || "").trim()).length) return "";
    const items = lines
      .filter(x => String(x || "").trim())
      .map(x => `<div class="lesson-block">${this.esc(x)}</div>`)
      .join("");

    return `
      <div class="card">
        <div class="lesson-heading">Contenu</div>
        ${items}
      </div>
    `;
  },

  renderExamples(examples) {
    if (!Array.isArray(examples) || !examples.length) return "";
    const rows = examples.map(ex => `
      <div class="lesson-block">
        <div class="lesson-sv">${this.esc(ex.sv || "")}</div>
        ${ex.pron ? `<div class="lesson-phon muted">${this.esc(ex.pron)}</div>` : ""}
        ${ex.fr ? `<div class="sub">${this.esc(ex.fr)}</div>` : ""}
      </div>
    `).join("");

    return `
      <div class="card">
        <div class="lesson-heading">Exemples</div>
        ${rows}
      </div>
    `;
  },

  renderVocab(vocab) {
    if (!Array.isArray(vocab) || !vocab.length) return "";
    const rows = vocab.map(v => `
      <div class="item">
        <div>
          <div><b>${this.esc(v.sv || "")}</b> <span class="muted">${v.enett ? this.esc(`(${v.enett})`) : ""}</span></div>
          <div class="sub muted">${this.esc(v.fr || "")}</div>
          ${v.pron ? `<div class="sub muted">${this.esc(v.pron)}</div>` : ""}
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-end;">
          ${v.def_sg ? this.pill(v.def_sg) : ""}
          ${v.pl ? this.pill(v.pl) : ""}
          ${v.def_pl ? this.pill(v.def_pl) : ""}
        </div>
      </div>
    `).join("");

    return `
      <div class="card">
        <div class="lesson-heading">Vocabulaire</div>
        <div class="list">${rows}</div>
      </div>
    `;
  },

  renderDrills(drills) {
    if (!Array.isArray(drills) || !drills.length) return "";
    const blocks = drills.map(d => `
      <div class="lesson-block">
        <div><b>${this.esc(d.instruction || "")}</b></div>
        <div class="list" style="margin-top:10px;">
          ${(d.items || []).map(it => `<div class="item">${this.esc(it)}</div>`).join("")}
        </div>
      </div>
    `).join("");

    return `
      <div class="card">
        <div class="lesson-heading">Mini-drills</div>
        ${blocks}
      </div>
    `;
  },

  renderQuiz(quiz) {
    if (!Array.isArray(quiz) || !quiz.length) return "";
    const blocks = quiz.map((q, idx) => {
      const ansId = `quiz_ans_${Math.random().toString(16).slice(2)}_${idx}`;
      return `
        <div class="lesson-block">
          <div><b>${this.esc(q.q || "")}</b></div>
          <button class="btn btn-ghost" data-reveal="${ansId}" style="margin-top:10px;">Afficher la réponse</button>
          <div id="${ansId}" class="sub muted" style="display:none; margin-top:10px;">
            ✅ ${this.esc(q.answer || "")}
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="card">
        <div class="lesson-heading">Quiz</div>
        ${blocks}
      </div>
    `;
  },

  // ======================
  // REF (modules -> lessons cliquables)
  // ======================
  viewRef() {
    const mods = (this.ref.modules || []).map(m => {
      const lessons = (m.lessons || []).map(ls => `
        <div class="item">
          <div><b>${this.esc(ls.title || "")}</b></div>
          <button class="btn" data-go="/ref-lesson" data-module="${this.esc(m.id)}" data-lesson="${this.esc(ls.id)}">Ouvrir</button>
        </div>
      `).join("");

      return `
        <div class="card">
          <div class="lesson-heading">${this.esc(m.title || "")}</div>
          <div class="list">${lessons || `<div class="muted">Aucune leçon.</div>`}</div>
        </div>
      `;
    }).join("");

    this.setView(`
      <div class="card">
        <div class="header">
          <div>
            <div class="brand">${this.esc(this.ref.title || "Références")}</div>
            <div class="sub muted">Fiches et “bescherelles”</div>
          </div>
          <button class="btn" id="homeBtn">Accueil</button>
        </div>
      </div>

      ${mods || `<div class="card"><div class="muted">Aucune référence.</div></div>`}
    `);

    document.getElementById("homeBtn")?.addEventListener("click", () => Router.go("/"));

    this.mount.querySelectorAll("[data-go='/ref-lesson']").forEach(btn => {
      btn.addEventListener("click", () => {
        Router.go("/ref-lesson", {
          module: btn.getAttribute("data-module"),
          lesson: btn.getAttribute("data-lesson")
        });
      });
    });
  },

  viewRefLesson(params) {
    const moduleId = params?.module;
    const lessonId = params?.lesson;

    const mod = (this.ref.modules || []).find(m => String(m.id) === String(moduleId));
    if (!mod) {
      this.setView(`<div class="card"><h2>Erreur</h2><p class="muted">Module référence introuvable.</p></div>`);
      return;
    }

    const lesson = (mod.lessons || []).find(ls => String(ls.id) === String(lessonId));
    if (!lesson) {
      this.setView(`<div class="card"><h2>Erreur</h2><p class="muted">Leçon référence introuvable.</p></div>`);
      return;
    }

    const contentBlock = this.renderContent(lesson.content);
    const examplesBlock = this.renderExamples(lesson.examples);
    const vocabBlock = this.renderVocab(lesson.vocab);

    this.setView(`
      <div class="card">
        <div class="header">
          <div>
            <div class="brand">${this.esc(lesson.title || "")}</div>
            <div class="sub muted">Référence • ${this.esc(mod.title || "")}</div>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn" id="backBtn">← Retour</button>
            <button class="btn" id="homeBtn">Accueil</button>
          </div>
        </div>
      </div>

      ${contentBlock}
      ${examplesBlock}
      ${vocabBlock}
    `);

    document.getElementById("homeBtn")?.addEventListener("click", () => Router.go("/"));
    document.getElementById("backBtn")?.addEventListener("click", () => Router.back("/ref"));
  },

  // ======================
  // REF+
  // ======================
  viewRefPlus(params) {
    const tab = params?.tab || "verbs";
    const theme = params?.theme || "all";

    const themes = Array.isArray(this.refPlus.themes) ? this.refPlus.themes : [];
    const themeLabel = (themes.find(t => t.id === theme)?.label) || "Tous";

    const tabs = [
      ["verbs", "Verbes"],
      ["vocab", "Vocabulaire"],
      ["particles", "Particules"],
      ["articles", "Articles"],
      ["articles_guide", "Guide articles"]
    ];

    const themePills = themes.map(t => `
      <button class="btn btn-ghost" data-theme="${this.esc(t.id)}">${this.esc(t.label || t.id)}</button>
    `).join("");

    const tabButtons = tabs.map(([id, label]) => `
      <button class="btn ${tab === id ? "" : "btn-ghost"}" data-tab="${this.esc(id)}">${this.esc(label)}</button>
    `).join("");

    const filterByTheme = (arr) => {
      if (!Array.isArray(arr)) return [];
      if (theme === "all") return arr;
      return arr.filter(x => String(x.theme || "") === String(theme));
    };

    const table = (headers, rows, rowFn) => {
      const head = headers.map(h => `<th>${this.esc(h)}</th>`).join("");
      const body = rows.map(rowFn).join("");
      return `
        <div class="lesson-block">
          <div class="sub muted">Thème: ${this.esc(themeLabel)}</div>
        </div>
        <div class="lesson-block" style="overflow:auto;">
          <table style="width:100%; border-collapse:collapse;">
            <thead><tr>${head}</tr></thead>
            <tbody>${body || `<tr><td class="muted" colspan="${headers.length}">Aucun contenu.</td></tr>`}</tbody>
          </table>
        </div>
      `;
    };

    let contentHtml = "";

    if (tab === "verbs") {
      const rows = filterByTheme(this.refPlus.verbs);
      contentHtml = table(
        ["Inf", "Prés", "Prét", "Sup", "FR", "Note", "Ex (SV)", "Ex (FR)"],
        rows,
        (v) => `
          <tr>
            <td>${this.esc(v.inf || "")}</td>
            <td>${this.esc(v.pres || "")}</td>
            <td>${this.esc(v.pret || "")}</td>
            <td>${this.esc(v.sup || "")}</td>
            <td>${this.esc(v.fr || "")}</td>
            <td class="muted">${this.esc(v.note || "")}</td>
            <td>${this.esc(v.ex_sv || "")}</td>
            <td class="muted">${this.esc(v.ex_fr || "")}</td>
          </tr>
        `
      );
    } else if (tab === "vocab") {
      const rows = filterByTheme(this.refPlus.vocab);
      contentHtml = table(
        ["SV", "FR", "Pron", "Def SG", "PL", "Def PL"],
        rows,
        (v) => `
          <tr>
            <td>${this.esc(v.sv || "")}</td>
            <td>${this.esc(v.fr || "")}</td>
            <td class="muted">${this.esc(v.pron || "")}</td>
            <td>${this.esc(v.def_sg || "")}</td>
            <td>${this.esc(v.pl || "")}</td>
            <td>${this.esc(v.def_pl || "")}</td>
          </tr>
        `
      );
    } else if (tab === "particles") {
      const rows = filterByTheme(this.refPlus.particles);
      contentHtml = table(
        ["Particule", "Sens", "Ex (SV)", "Ex (FR)"],
        rows,
        (p) => `
          <tr>
            <td>${this.esc(p.sv || p.particle || "")}</td>
            <td>${this.esc(p.fr || p.meaning || "")}</td>
            <td>${this.esc(p.ex_sv || "")}</td>
            <td class="muted">${this.esc(p.ex_fr || "")}</td>
          </tr>
        `
      );
    } else if (tab === "articles") {
      const rows = Array.isArray(this.refPlus.articles) ? this.refPlus.articles : [];
      contentHtml = table(
        ["Mot", "Genre", "Indéf", "Déf", "PL", "Déf PL", "Ex"],
        rows,
        (a) => `
          <tr>
            <td>${this.esc(a.word || a.sv || "")}</td>
            <td class="muted">${this.esc(a.gender || a.enett || "")}</td>
            <td>${this.esc(a.indef || "")}</td>
            <td>${this.esc(a.def || a.def_sg || "")}</td>
            <td>${this.esc(a.pl || "")}</td>
            <td>${this.esc(a.def_pl || "")}</td>
            <td class="muted">${this.esc(a.example || a.ex || "")}</td>
          </tr>
        `
      );
    } else if (tab === "articles_guide") {
      const rows = Array.isArray(this.refPlus.articles_guide) ? this.refPlus.articles_guide : [];
      contentHtml = table(
        ["Règle", "Exemple"],
        rows,
        (g) => `
          <tr>
            <td>${this.esc(g.rule || g.title || "")}</td>
            <td class="muted">${this.esc(g.example || g.ex || "")}</td>
          </tr>
        `
      );
    }

    this.setView(`
      <div class="card">
        <div class="header">
          <div>
            <div class="brand">${this.esc(this.refPlus.title || "Référence+")}</div>
            <div class="sub muted">Filtres par thème + tableaux propres</div>
          </div>
          <button class="btn" id="homeBtn">Accueil</button>
        </div>
      </div>

      <div class="card">
        <div class="lesson-heading">Onglets</div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">${tabButtons}</div>
      </div>

      <div class="card">
        <div class="lesson-heading">Thèmes</div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">${themePills}</div>
      </div>

      <div class="card">
        ${contentHtml}
      </div>
    `);

    document.getElementById("homeBtn")?.addEventListener("click", () => Router.go("/"));

    this.mount.querySelectorAll("[data-tab]").forEach(b => {
      b.addEventListener("click", () => {
        Router.go("/ref-plus", { tab: b.getAttribute("data-tab"), theme });
      });
    });

    this.mount.querySelectorAll("[data-theme]").forEach(b => {
      b.addEventListener("click", () => {
        Router.go("/ref-plus", { tab, theme: b.getAttribute("data-theme") });
      });
    });
  },

  // ======================
  // REVIEW (SRS)
  // ======================
  viewReview() {
    const due = AppStorage.getDueCards(30);

    if (!due.length) {
      this.setView(`
        <div class="card">
          <div class="header">
            <div>
              <div class="brand">Révision SRS</div>
              <div class="sub muted">Aucune carte à réviser pour le moment.</div>
            </div>
            <button class="btn" id="homeBtn">Accueil</button>
          </div>
        </div>
        <div class="card"><div class="muted">✅ Tu es à jour !</div></div>
      `);
      document.getElementById("homeBtn")?.addEventListener("click", () => Router.go("/"));
      return;
    }

    let idx = 0;
    let showBack = false;

    const render = () => {
      const c = due[idx];

      this.setView(`
        <div class="card">
          <div class="header">
            <div>
              <div class="brand">Révision SRS</div>
              <div class="sub muted">Carte ${idx + 1}/${due.length}</div>
            </div>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="btn" id="backBtn">← Retour</button>
              <button class="btn" id="homeBtn">Accueil</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="lesson-block">
            <div class="lesson-sv">${this.esc(c.front || "")}</div>
            ${showBack ? `<div class="lesson-spacer"></div><div class="sub">${this.esc(c.back || "")}</div>` : `<div class="sub muted">Clique sur “Afficher”</div>`}
          </div>

          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn" id="toggleBtn">${showBack ? "Cacher" : "Afficher"}</button>
          </div>

          ${showBack ? `
            <div class="lesson-spacer"></div>
            <div class="sub muted">Auto-évaluation</div>
            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
              <button class="btn" data-grade="0">0 — Oublié</button>
              <button class="btn" data-grade="1">1 — Difficile</button>
              <button class="btn" data-grade="2">2 — OK</button>
              <button class="btn" data-grade="3">3 — Facile</button>
            </div>
          ` : ""}
        </div>
      `);

      document.getElementById("homeBtn")?.addEventListener("click", () => Router.go("/"));
      document.getElementById("backBtn")?.addEventListener("click", () => Router.back("/"));
      document.getElementById("toggleBtn")?.addEventListener("click", () => { showBack = !showBack; render(); });

      this.mount.querySelectorAll("[data-grade]").forEach(btn => {
        btn.addEventListener("click", () => {
          const grade = Number(btn.getAttribute("data-grade"));
          AppStorage.gradeCard(c.id, grade);
          AppStorage.addResult(grade >= 2);

          idx++;
          showBack = false;

          if (idx >= due.length) Router.go("/stats");
          else render();
        });
      });
    };

    render();
  },

  // ======================
  // STATS
  // ======================
  viewStats() {
    const s = AppStorage.load();
    const st = s.stats || { correct: 0, wrong: 0, streak: 0, lastStudyDate: null };
    const srs = AppStorage.getSrsStats();

    this.setView(`
      <div class="card">
        <div class="header">
          <div>
            <div class="brand">Statistiques</div>
            <div class="sub muted">Progression + SRS</div>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn" id="backBtn">← Retour</button>
            <button class="btn" id="homeBtn">Accueil</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="lesson-heading">Résultats</div>
        <div class="list">
          <div class="item"><div>✅ Bonnes réponses</div><div><b>${st.correct || 0}</b></div></div>
          <div class="item"><div>❌ Mauvaises réponses</div><div><b>${st.wrong || 0}</b></div></div>
          <div class="item"><div>🔥 Streak</div><div><b>${st.streak || 0}</b> jour(s)</div></div>
          <div class="item"><div>📅 Dernière étude</div><div class="muted">${this.esc(st.lastStudyDate || "—")}</div></div>
        </div>
      </div>

      <div class="card">
        <div class="lesson-heading">SRS</div>
        <div class="list">
          <div class="item"><div>Total cartes</div><div><b>${srs.total}</b></div></div>
          <div class="item"><div>À réviser</div><div><b>${srs.due}</b></div></div>
          <div class="item"><div>Nouvelles</div><div><b>${srs.newCards}</b></div></div>
          <div class="item"><div>En apprentissage</div><div><b>${srs.learning}</b></div></div>
          <div class="item"><div>Matures</div><div><b>${srs.mature}</b></div></div>
        </div>
      </div>

      <div class="card">
        <div class="lesson-heading">Actions</div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn" id="reviewBtn">Réviser</button>
          <button class="btn" id="resetBtn">Réinitialiser</button>
        </div>
        <div class="sub muted" style="margin-top:10px;">⚠️ Efface progression + SRS.</div>
      </div>
    `);

    document.getElementById("homeBtn")?.addEventListener("click", () => Router.go("/"));
    document.getElementById("backBtn")?.addEventListener("click", () => Router.back("/"));
    document.getElementById("reviewBtn")?.addEventListener("click", () => Router.go("/review"));
    document.getElementById("resetBtn")?.addEventListener("click", () => AppStorage.reset());
  }
};

// BOOT
window.addEventListener("DOMContentLoaded", () => App.init());
