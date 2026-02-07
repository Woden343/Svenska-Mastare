// assets/js/app.js - VERSION COMPLÈTE CORRIGÉE

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
  console.log("[App] Démarrage...");

  this.mount = document.getElementById("app"); // ✅ Maintenant ça marche
  if (!this.mount) {
    console.error("[App] Element #app introuvable");
    alert("Erreur : Element #app introuvable dans le DOM");
    return;
  }
  console.log("[App] Mount trouvé:", this.mount);

  // ✅ Navigation (IDs alignés avec index.html)
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

  // ✅ Routes
  Router.add("/", () => this.viewHome());
  Router.add("/level", (params) => this.viewLevel(params));
  Router.add("/lesson", (params) => this.viewLesson(params));
  Router.add("/ref", () => this.viewRef());
  Router.add("/ref-plus", () => this.viewRefPlus());
  Router.add("/review", () => this.viewReview());
  Router.add("/stats", () => this.viewStats());
  console.log("[App] Routes configurées");

  // ✅ Chargement JSON
  try {
    const [a1, a2, b1, b2] = await Promise.all([
      fetch("assets/data/a1.json").then(r => r.json()),
      fetch("assets/data/a2.json").then(r => r.json()).catch(() => ({})),
      fetch("assets/data/b1.json").then(r => r.json()).catch(() => ({})),
      fetch("assets/data/b2.json").then(r => r.json()).catch(() => ({})),
    ]);

    if (a1 && Object.keys(a1).length) this.levels.A1 = a1;
    if (a2 && Object.keys(a2).length) this.levels.A2 = a2;
    if (b1 && Object.keys(b1).length) this.levels.B1 = b1;
    if (b2 && Object.keys(b2).length) this.levels.B2 = b2;

    console.log("[App] Niveau A1 chargé:", this.levels.A1);
    console.log("[App] Niveau A2 chargé:", this.levels.A2);
    console.log("[App] Niveau B1 chargé:", this.levels.B1);
    console.log("[App] Niveau B2 chargé:", this.levels.B2);

    const ref = await fetch("assets/data/ref.json").then(r => r.json());
    this.ref = ref || this.ref;
    console.log("[App] Références chargées:", this.ref);

    const refPlus = await fetch("assets/data/ref_plus.json").then(r => r.json());
    this.refPlus = refPlus || this.refPlus;
    console.log("[App] Référence+ chargée:", this.refPlus);

    console.log("[App] Données chargées");

    // ✅ SRS init (génération cartes + stockage)
    try {
      const cards = SRS.generateCards(this.levels, this.ref, this.refPlus);
      AppStorage.upsertCards(cards);
      console.log("[App] SRS initialisé");
    } catch (e) {
      console.error("[App] Erreur SRS:", e);
    }

  } catch (e) {
    console.error("[App] Erreur chargement JSON:", e);
    this.mount.innerHTML = `
      <div class="card error">
        <h2>Erreur de chargement</h2>
        <p>Impossible de charger les fichiers JSON (niveau/références).</p>
        <p class="muted">${String(e)}</p>
      </div>`;
    return;
  }

  console.log("[App] Démarrage du router...");
  Router.start();
  console.log("[App] Application prête !");
},

  // =======================
  // Helpers UI
  // =======================

  setView(html) {
    if (!this.mount) return;
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

  badge(txt, cls = "") {
    return `<span class="badge ${cls}">${this.esc(txt)}</span>`;
  },

  // =======================
  // HOME
  // =======================
  viewHome() {
    const levelsCards = this.levelsOrder
      .filter(lvl => this.levels[lvl] && this.levels[lvl].modules && this.levels[lvl].modules.length)
      .map(lvl => {
        const L = this.levels[lvl];
        const modulesCount = (L.modules || []).length;
        const lessonsCount = (L.modules || []).reduce((acc, m) => acc + ((m.lessons || []).length), 0);

        return `
          <div class="card">
            <div class="row between">
              <div>
                <h2>${this.esc(lvl)} — ${this.esc(L.title || "")}</h2>
                <p class="muted">${modulesCount} modules • ${lessonsCount} leçons</p>
              </div>
              <button class="btn" data-go="/level" data-level="${this.esc(lvl)}">Ouvrir</button>
            </div>
          </div>
        `;
      })
      .join("");

    const srsStats = AppStorage.getSrsStats();
    const due = srsStats.due || 0;

    const html = `
      <div class="stack">
        <div class="hero">
          <h1>Svenska Mästare Pro</h1>
          <p class="muted">Apprentissage du suédois • Leçons • Vocabulaire • SRS</p>
          <div class="hero-actions">
            <button class="btn primary" data-go="/review">Révision SRS ${due ? this.badge(due, "warn") : ""}</button>
            <button class="btn" data-go="/stats">Statistiques</button>
          </div>
        </div>

        <div class="grid">
          ${levelsCards || `<div class="card"><p>Aucun niveau chargé.</p></div>`}
        </div>

        <div class="grid grid-2">
          <div class="card">
            <h2>Références</h2>
            <p class="muted">Grammaire, conjugaison, articles, structures…</p>
            <button class="btn" data-go="/ref">Ouvrir</button>
          </div>
          <div class="card">
            <h2>Référence+</h2>
            <p class="muted">Tableaux, listes, synthèses (thèmes, verbes, vocabulaire…)</p>
            <button class="btn" data-go="/ref-plus">Ouvrir</button>
          </div>
        </div>
      </div>
    `;

    this.setView(html);

    this.mount.querySelectorAll("[data-go]").forEach(btn => {
      btn.addEventListener("click", () => {
        const go = btn.getAttribute("data-go");
        const level = btn.getAttribute("data-level");
        if (go === "/level") Router.go("/level", { level });
        else Router.go(go, {});
      });
    });
  },

  // =======================
  // LEVEL VIEW
  // =======================
  viewLevel(params) {
    const levelKey = params && params.level ? params.level : "A1";
    const L = this.levels[levelKey];

    if (!L) {
      this.setView(`
        <div class="card error">
          <h2>Niveau introuvable</h2>
          <p>Le niveau ${this.esc(levelKey)} n’a pas été chargé.</p>
          <button class="btn" data-go="/">Retour</button>
        </div>
      `);
      this.mount.querySelector("[data-go]")?.addEventListener("click", () => Router.go("/"));
      return;
    }

    const modulesHtml = (L.modules || []).map((m, mi) => {
      const lessons = (m.lessons || []).map((ls, li) => {
        const key = `${levelKey}:${ls.id}`;
        const done = AppStorage.isDone(key);
        return `
          <div class="lesson-row ${done ? "done" : ""}">
            <div class="lesson-info">
              <div class="lesson-title">${this.esc(ls.title)}</div>
              <div class="muted">${this.esc(ls.type || "")}</div>
            </div>
            <div class="lesson-actions">
              ${done ? this.badge("Terminé", "ok") : this.badge("À faire", "muted")}
              <button class="btn" data-go="/lesson" data-level="${this.esc(levelKey)}" data-lesson="${this.esc(ls.id)}">Ouvrir</button>
            </div>
          </div>
        `;
      }).join("");

      return `
        <div class="card">
          <h2>${this.esc(m.title)}</h2>
          <div class="stack">${lessons || `<p class="muted">Aucune leçon dans ce module.</p>`}</div>
        </div>
      `;
    }).join("");

    this.setView(`
      <div class="stack">
        <div class="row between">
          <div>
            <h1>${this.esc(levelKey)} — ${this.esc(L.title || "")}</h1>
            <p class="muted">${this.esc(L.description || "")}</p>
          </div>
          <button class="btn" data-go="/">Accueil</button>
        </div>
        ${modulesHtml || `<div class="card"><p>Aucun module.</p></div>`}
      </div>
    `);

    this.mount.querySelector("[data-go='/']")?.addEventListener("click", () => Router.go("/"));

    this.mount.querySelectorAll("[data-go='/lesson']").forEach(btn => {
      btn.addEventListener("click", () => {
        const level = btn.getAttribute("data-level");
        const lesson = btn.getAttribute("data-lesson");
        Router.go("/lesson", { level, lesson });
      });
    });
  },

  // =======================
  // LESSON VIEW
  // =======================
  viewLesson(params) {
    const levelKey = params?.level;
    const lessonId = params?.lesson;

    const L = this.levels[levelKey];
    if (!L) {
      this.setView(`<div class="card error"><h2>Erreur</h2><p>Niveau introuvable.</p></div>`);
      return;
    }

    let lesson = null;
    let moduleTitle = "";

    for (const m of (L.modules || [])) {
      const found = (m.lessons || []).find(ls => String(ls.id) === String(lessonId));
      if (found) {
        lesson = found;
        moduleTitle = m.title || "";
        break;
      }
    }

    if (!lesson) {
      this.setView(`<div class="card error"><h2>Erreur</h2><p>Leçon introuvable.</p></div>`);
      return;
    }

    const key = `${levelKey}:${lesson.id}`;

    // Rendu des “cards” contenus
    const contentHtml = (lesson.cards || []).map(c => this.renderCard(c)).join("");

    const html = `
      <div class="stack">
        <div class="row between">
          <div>
            <h1>${this.esc(lesson.title)}</h1>
            <p class="muted">${this.esc(levelKey)} • ${this.esc(moduleTitle)} • ${this.esc(lesson.type || "")}</p>
          </div>
          <div class="row">
            <button class="btn" data-go="/level" data-level="${this.esc(levelKey)}">Retour</button>
            <button class="btn primary" id="markDoneBtn">Marquer comme terminé</button>
          </div>
        </div>

        ${contentHtml || `<div class="card"><p class="muted">Aucun contenu.</p></div>`}
      </div>
    `;

    this.setView(html);

    this.mount.querySelector("[data-go='/level']")?.addEventListener("click", () => {
      Router.go("/level", { level: levelKey });
    });

    this.mount.querySelector("#markDoneBtn")?.addEventListener("click", () => {
      AppStorage.markDone(key);
      alert("✅ Leçon marquée comme terminée !");
      Router.go("/level", { level: levelKey });
    });
  },

  renderCard(card) {
    if (!card || !card.type) return "";

    const type = card.type;

    // Text block
    if (type === "text") {
      return `
        <div class="card">
          ${card.title ? `<h2>${this.esc(card.title)}</h2>` : ""}
          ${card.text ? `<p>${this.esc(card.text)}</p>` : ""}
        </div>
      `;
    }

    // Example
    if (type === "example") {
      return `
        <div class="card">
          ${card.title ? `<h2>${this.esc(card.title)}</h2>` : "<h2>Exemple</h2>"}
          ${card.swedish ? `<div class="sw">${this.esc(card.swedish)}</div>` : ""}
          ${card.french ? `<div class="fr muted">${this.esc(card.french)}</div>` : ""}
          ${card.note ? `<p class="muted">${this.esc(card.note)}</p>` : ""}
        </div>
      `;
    }

    // Vocab list
    if (type === "vocab") {
      const rows = (card.items || []).map(it => `
        <tr>
          <td class="sw">${this.esc(it.sv || "")}</td>
          <td>${this.esc(it.fr || "")}</td>
          <td class="muted">${this.esc(it.note || "")}</td>
        </tr>
      `).join("");

      return `
        <div class="card">
          ${card.title ? `<h2>${this.esc(card.title)}</h2>` : "<h2>Vocabulaire</h2>"}
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Suédois</th><th>Français</th><th>Note</th></tr>
              </thead>
              <tbody>
                ${rows || `<tr><td colspan="3" class="muted">Aucun vocabulaire.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Quiz (QCM simple)
    if (type === "quiz") {
      const q = card.question || "";
      const opts = card.options || [];
      const answer = card.answer;

      const id = `q_${Math.random().toString(16).slice(2)}`;
      const optionsHtml = opts.map((o, i) => `
        <label class="option">
          <input type="radio" name="${id}" value="${this.esc(o)}">
          <span>${this.esc(o)}</span>
        </label>
      `).join("");

      return `
        <div class="card">
          ${card.title ? `<h2>${this.esc(card.title)}</h2>` : "<h2>Quiz</h2>"}
          <p>${this.esc(q)}</p>
          <div class="stack">${optionsHtml}</div>
          <button class="btn" data-quiz-check="${id}" data-quiz-answer="${this.esc(answer)}">Vérifier</button>
          <p class="muted" id="${id}_res"></p>
        </div>
      `;
    }

    // Default fallback
    return `
      <div class="card">
        <h2>${this.esc(card.title || "Carte")}</h2>
        <pre>${this.esc(JSON.stringify(card, null, 2))}</pre>
      </div>
    `;
  },

  // =======================
  // REF VIEW
  // =======================
  viewRef() {
    const mods = (this.ref.modules || []).map(m => `
      <div class="card">
        <h2>${this.esc(m.title || "")}</h2>
        ${(m.cards || []).map(c => this.renderCard(c)).join("")}
      </div>
    `).join("");

    this.setView(`
      <div class="stack">
        <div class="row between">
          <div>
            <h1>${this.esc(this.ref.title || "Références")}</h1>
            <p class="muted">Fiches de grammaire et d'usage</p>
          </div>
          <button class="btn" data-go="/">Accueil</button>
        </div>
        ${mods || `<div class="card"><p class="muted">Aucune référence.</p></div>`}
      </div>
    `);

    this.mount.querySelector("[data-go='/']")?.addEventListener("click", () => Router.go("/"));
  },

  // =======================
  // REF+ VIEW
  // =======================
  viewRefPlus() {
    const fp = this.refPlus || {};

    const section = (title, items, renderFn) => `
      <div class="card">
        <h2>${this.esc(title)}</h2>
        ${renderFn(items)}
      </div>
    `;

    const listRender = (items) => {
      if (!items || !items.length) return `<p class="muted">Aucun élément.</p>`;
      return `<ul class="list">${items.map(x => `<li>${this.esc(x)}</li>`).join("")}</ul>`;
    };

    const tableRender = (rows) => {
      if (!rows || !rows.length) return `<p class="muted">Aucun tableau.</p>`;
      const head = Object.keys(rows[0] || {});
      return `
        <div class="table-wrap">
          <table>
            <thead><tr>${head.map(h => `<th>${this.esc(h)}</th>`).join("")}</tr></thead>
            <tbody>
              ${rows.map(r => `<tr>${head.map(h => `<td>${this.esc(r[h] ?? "")}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
      `;
    };

    this.setView(`
      <div class="stack">
        <div class="row between">
          <div>
            <h1>${this.esc(fp.title || "Référence+")}</h1>
            <p class="muted">Tableaux & listes pratiques</p>
          </div>
          <button class="btn" data-go="/">Accueil</button>
        </div>

        ${section("Thèmes", fp.themes || [], listRender)}
        ${section("Verbes", fp.verbs || [], listRender)}
        ${section("Vocabulaire", fp.vocab || [], listRender)}
        ${section("Particules", fp.particles || [], listRender)}
        ${section("Articles", fp.articles || [], tableRender)}
        ${section("Guide des articles", fp.articles_guide || [], tableRender)}
      </div>
    `);

    this.mount.querySelector("[data-go='/']")?.addEventListener("click", () => Router.go("/"));
  },

  // =======================
  // REVIEW (SRS)
  // =======================
  viewReview() {
    const due = AppStorage.getDueCards(30);

    if (!due.length) {
      this.setView(`
        <div class="stack">
          <div class="row between">
            <div>
              <h1>Révision SRS</h1>
              <p class="muted">Aucune carte à réviser pour le moment.</p>
            </div>
            <button class="btn" data-go="/">Accueil</button>
          </div>

          <div class="card">
            <p>✅ Tu es à jour !</p>
          </div>
        </div>
      `);
      this.mount.querySelector("[data-go='/']")?.addEventListener("click", () => Router.go("/"));
      return;
    }

    let idx = 0;
    let showBack = false;

    const render = () => {
      const c = due[idx];
      this.setView(`
        <div class="stack">
          <div class="row between">
            <div>
              <h1>Révision SRS</h1>
              <p class="muted">Carte ${idx + 1}/${due.length}</p>
            </div>
            <button class="btn" data-go="/">Accueil</button>
          </div>

          <div class="card srs-card">
            <div class="srs-front">${this.esc(c.front || "")}</div>
            ${showBack ? `<div class="srs-back">${this.esc(c.back || "")}</div>` : `<div class="muted">Clique sur “Afficher”</div>`}
            <div class="row gap">
              <button class="btn" id="toggleBtn">${showBack ? "Cacher" : "Afficher"}</button>
            </div>
          </div>

          ${showBack ? `
            <div class="card">
              <h2>Auto-évaluation</h2>
              <div class="row wrap gap">
                <button class="btn bad" data-grade="0">0 — Oublié</button>
                <button class="btn warn" data-grade="1">1 — Difficile</button>
                <button class="btn" data-grade="2">2 — OK</button>
                <button class="btn good" data-grade="3">3 — Facile</button>
              </div>
            </div>
          ` : ""}
        </div>
      `);

      this.mount.querySelector("[data-go='/']")?.addEventListener("click", () => Router.go("/"));
      this.mount.querySelector("#toggleBtn")?.addEventListener("click", () => {
        showBack = !showBack;
        render();
      });

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

  // =======================
  // STATS
  // =======================
  viewStats() {
    const s = AppStorage.load();
    const st = s.stats || { correct: 0, wrong: 0, streak: 0, lastStudyDate: null };
    const srs = AppStorage.getSrsStats();

    this.setView(`
      <div class="stack">
        <div class="row between">
          <div>
            <h1>Statistiques</h1>
            <p class="muted">Suivi de progression & SRS</p>
          </div>
          <button class="btn" data-go="/">Accueil</button>
        </div>

        <div class="grid grid-2">
          <div class="card">
            <h2>Résultats</h2>
            <p>✅ Bonnes réponses : <b>${st.correct || 0}</b></p>
            <p>❌ Mauvaises réponses : <b>${st.wrong || 0}</b></p>
            <p>🔥 Streak : <b>${st.streak || 0}</b> jour(s)</p>
            <p class="muted">Dernière étude : ${this.esc(st.lastStudyDate || "—")}</p>
          </div>

          <div class="card">
            <h2>SRS</h2>
            <p>Total cartes : <b>${srs.total}</b></p>
            <p>À réviser : <b>${srs.due}</b></p>
            <p>Nouvelles : <b>${srs.newCards}</b></p>
            <p>En apprentissage : <b>${srs.learning}</b></p>
            <p>Matures : <b>${srs.mature}</b></p>
          </div>
        </div>

        <div class="card">
          <h2>Actions</h2>
          <div class="row wrap gap">
            <button class="btn primary" data-go="/review">Réviser maintenant</button>
            <button class="btn bad" id="resetBtn">Réinitialiser</button>
          </div>
          <p class="muted">⚠️ La réinitialisation efface toutes les données (progression + SRS).</p>
        </div>
      </div>
    `);

    this.mount.querySelector("[data-go='/']")?.addEventListener("click", () => Router.go("/"));
    this.mount.querySelector("[data-go='/review']")?.addEventListener("click", () => Router.go("/review"));
    this.mount.querySelector("#resetBtn")?.addEventListener("click", () => AppStorage.reset());
  }
};

// Quiz handler (delegation)
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-quiz-check]");
  if (!btn) return;

  const id = btn.getAttribute("data-quiz-check");
  const ans = btn.getAttribute("data-quiz-answer");

  const sel = document.querySelector(`input[name="${id}"]:checked`);
  const res = document.getElementById(`${id}_res`);

  if (!sel) {
    if (res) res.textContent = "Choisis une option.";
    return;
  }

  const ok = sel.value === ans;
  if (res) res.textContent = ok ? "✅ Correct !" : `❌ Faux. Réponse : ${ans}`;

  AppStorage.addResult(ok);
});

// Boot
window.addEventListener("DOMContentLoaded", () => App.init());
