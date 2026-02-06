// assets/js/app.js - VERSION CORRIGÉE

const App = {
  mount: null,  // ✅ Initialisé dans init()

  levels: {},
  levelsOrder: ["A1", "A2", "B1", "B2"],  // ✅ B2 ajouté !

  ref: { title: "Références", modules: [] },
  refPlus: { title: "Référence+ (tableaux)", themes: [], verbs: [], vocab: [], particles: [] },

  async init() {
    // ✅ Initialiser mount
    this.mount = document.getElementById("app");
    if (!this.mount) {
      console.error("[App] Element #app introuvable");
      return;
    }

    // ✅ Navigation avec vérifications
    const navHome = document.getElementById("nav-home");
    const navHomeBtn = document.getElementById("nav-home-btn");
    const navRef = document.getElementById("nav-ref");
    const navReview = document.getElementById("nav-review");
    const navStats = document.getElementById("nav-stats");

    if (navHome) navHome.onclick = () => Router.go("/");
    if (navHomeBtn) navHomeBtn.onclick = () => Router.go("/");
    if (navRef) navRef.onclick = () => Router.go("/ref");
    if (navReview) navReview.onclick = () => Router.go("/review");
    if (navStats) navStats.onclick = () => Router.go("/stats");

    // Routes
    Router.on("/", () => this.viewHome());
    Router.on("/level", (p) => this.viewLevel(p.level));
    Router.on("/lesson", (p) => this.viewLesson(p.level, p.lessonId));

    Router.on("/ref", () => this.viewRef());
    Router.on("/ref-lesson", (p) => this.viewRefLesson(p.moduleId, p.lessonId));
    Router.on("/ref-plus", (p) => this.viewRefPlus(p));

    Router.on("/review", () => this.viewReview());
    Router.on("/stats", () => this.viewStats());

    // Chargement données
    await this.loadAllData();
    
    // ✅ Générer cartes SRS depuis tous les niveaux
    const allCards = SRS.buildCardsFromLevels(this.levels);
    Storage.upsertCards(allCards);
    console.log(`[App] ${allCards.length} cartes SRS générées`);

    Router.start("/");
  },

  async loadAllData() {
    // ✅ Charger A1, A2, B1, B2
    for (const lvl of this.levelsOrder) {
      try {
        this.levels[lvl] = await this.loadJson(`assets/data/${lvl.toLowerCase()}.json`, lvl);
        console.log(`[App] Niveau ${lvl} chargé: ${this.levels[lvl]?.modules?.length || 0} modules`);
      } catch (e) {
        console.warn(`[App] Niveau ${lvl} non chargé:`, e.message || e);
      }
    }

    // Charger référence
    try {
      const r = await this.loadJson("assets/data/ref.json", "REF");
      this.ref = this.normalizeRef(r);
    } catch (e) {
      console.warn("[App] ref.json non chargé:", e.message || e);
      this.ref = { title: "Références", modules: [] };
    }

    // Charger référence+
    try {
      const rp = await this.loadJson("assets/data/ref_plus.json", "REFPLUS");
      this.refPlus = this.normalizeRefPlus(rp);
    } catch (e) {
      console.warn("[App] ref_plus.json non chargé:", e.message || e);
      this.refPlus = { title: "Référence+ (tableaux)", themes: [], verbs: [], vocab: [], particles: [] };
    }
  },

  async loadJson(url, kind = "") {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} sur ${url}`);
    const json = await res.json();

    if (kind !== "REF" && kind !== "REFPLUS") {
      return {
        level: json.level || kind,
        title: json.title || "",
        modules: Array.isArray(json.modules) ? json.modules : []
      };
    }
    return json;
  },

  normalizeRef(json) {
    const root = json?.data ? json.data : json;
    const modules =
      (Array.isArray(root?.modules) && root.modules) ||
      (Array.isArray(root?.sections) && root.sections) ||
      [];

    const normModules = modules.map((m, mi) => {
      const lessons =
        (Array.isArray(m?.lessons) && m.lessons) ||
        (Array.isArray(m?.items) && m.items) ||
        (Array.isArray(m?.entries) && m.entries) ||
        (Array.isArray(m?.fiches) && m.fiches) ||
        [];

      const moduleId = (m?.id && String(m.id)) || `m${mi + 1}`;

      return {
        id: moduleId,
        title: m?.title || m?.name || `Module ${mi + 1}`,
        lessons: lessons.map((l, li) => ({
          id: (l?.id && String(l.id)) || `l${li + 1}`,
          title: l?.title || l?.name || `Fiche ${li + 1}`,
          content: Array.isArray(l?.content) ? l.content : (l?.content ? [String(l.content)] : []),
          examples: Array.isArray(l?.examples) ? l.examples : [],
          vocab: Array.isArray(l?.vocab) ? l.vocab : []
        }))
      };
    });

    return {
      title: root?.title || "Références",
      modules: normModules
    };
  },

  normalizeRefPlus(json) {
    const root = json?.data ? json.data : json;
    return {
      title: root?.title || "Référence+ (tableaux)",
      themes: Array.isArray(root?.themes) ? root.themes : [],
      verbs: Array.isArray(root?.verbs) ? root.verbs : [],
      vocab: Array.isArray(root?.vocab) ? root.vocab : [],
      particles: Array.isArray(root?.particles) ? root.particles : []
    };
  },

  // ==================== HELPERS ====================

  setView(html) {
    if (this.mount) {
      this.mount.innerHTML = html;
    }
  },

  getLevelData(level) {
    return this.levels[level] || null;
  },

  escapeHtml(s) {
    return String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  },

  jsString(s) {
    return JSON.stringify(String(s ?? ""));
  },

  // ==================== VIEWS ====================

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
            <span class="pill">Niveau ${this.escapeHtml(L.level)}</span>
            <h3 style="margin-top:10px;">${this.escapeHtml(levelTitle)}</h3>
            <p class="muted">${modulesCount} module(s)</p>
            <button class="btn btn-primary" onclick="Router.go('/level',{level:${this.jsString(L.level)}})">Ouvrir</button>
          </div>
        `;
      })
      .join("");

    this.setView(`
      <section class="card">
        <h2>Bienvenue 👋</h2>
        <p class="muted">Apprentissage progressif du suédois A1 → B2</p>
        <div class="kpi">
          <span class="pill">Leçons validées : <b>${doneCount}</b></span>
          <span class="pill">Bonnes réponses : <b>${s.stats?.correct ?? 0}</b></span>
          <span class="pill">Erreurs : <b>${s.stats?.wrong ?? 0}</b></span>
        </div>
      </section>

      <section class="grid grid-2" style="margin-top:12px;">
        ${cards || '<div class="card"><h3>Aucun niveau chargé</h3><p class="muted">Vérifiez vos fichiers JSON.</p></div>'}
      </section>
    `);
  },

  viewLevel(level) {
    const L = this.getLevelData(level);
    if (!L) return Router.go("/");

    this.setView(`
      <section class="card">
        <span class="pill">Niveau ${this.escapeHtml(L.level)}</span>
        <h2 style="margin-top:10px;">${this.escapeHtml(L.title || L.level)}</h2>
        <p class="muted">Choisissez un module puis une leçon.</p>
      </section>

      <section style="margin-top:12px;" class="grid">
        ${(L.modules || []).map(m => `
          <div class="card">
            <h3>${this.escapeHtml(m.title || "Module")}</h3>
            <p class="muted">${(m.lessons || []).length} leçon(s)</p>
            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
              ${(m.lessons || []).map(les => `
                <button class="btn" onclick="Router.go('/lesson',{level:${this.jsString(L.level)}, lessonId:${this.jsString(les.id)}})">
                  ${this.escapeHtml(les.title || "Leçon")}
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
    if (!L) return Router.go("/");

    const lesson = (L.modules || []).flatMap(m => (m.lessons || [])).find(x => x.id === lessonId);
    if (!lesson) return Router.go("/level", { level: L.level });

    const contentHtml = (lesson.content || []).map(p => `<p>${this.escapeHtml(p)}</p>`).join("");

    const examplesHtml = (lesson.examples || []).map(e => `
      <div class="choice" style="cursor:default;">
        <div>
          <b>${this.escapeHtml(e.sv || "")}</b>
          <div class="muted">${this.escapeHtml(e.fr || "")}${e.pron ? ` • <i>${this.escapeHtml(e.pron)}</i>` : ""}</div>
        </div>
      </div>
    `).join("");

    const vocabHtml = (lesson.vocab || []).map(w => `
      <div class="choice" style="cursor:default;">
        <div style="min-width:110px;"><b>${this.escapeHtml(w.sv || "")}</b></div>
        <div class="muted">${this.escapeHtml(w.fr || "")}${w.pron ? ` • <i>${this.escapeHtml(w.pron)}</i>` : ""}</div>
      </div>
    `).join("");

    this.setView(`
      <section class="card">
        <span class="pill">${this.escapeHtml(L.level)}</span>
        <h2 style="margin-top:10px;">${this.escapeHtml(lesson.title || "Leçon")}</h2>
        ${contentHtml}
        ${(lesson.examples && lesson.examples.length) ? `<hr /><h3>Exemples</h3>${examplesHtml}` : ""}
        ${(lesson.vocab && lesson.vocab.length) ? `<hr /><h3>Vocabulaire</h3>${vocabHtml}` : ""}
        <hr />
        <h3>Exercices</h3>
        <div id="quiz"></div>
        <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
          <button class="btn btn-success" onclick="Storage.markDone(${this.jsString(L.level + ':' + lesson.id)}); Router.go('/level',{level:${this.jsString(L.level)}})">✔ Marquer comme faite</button>
          <button class="btn" onclick="Router.go('/level',{level:${this.jsString(L.level)}})">← Retour</button>
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
      const lock = () => answered[idx];
      const setFeedback = (ok, extra = "") => {
        fb.textContent = ok ? `✅ Correct. ${extra}` : `❌ Non. ${extra}`;
      };

      if (q.type === "mcq") {
        qbox.innerHTML = `
          <p><b>${this.escapeHtml(q.q || "")}</b></p>
          <div class="grid">
            ${(q.choices || []).map((c, i) => `<div class="choice" data-i="${i}">${this.escapeHtml(c)}</div>`).join("")}
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
          <p><b>${this.escapeHtml(q.q || "")}</b></p>
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

  viewRef() {
    if (!this.ref || !this.ref.modules || this.ref.modules.length === 0) {
      return this.setView(`
        <section class="card">
          <h2>Références</h2>
          <p class="muted">Aucun module de référence chargé.</p>
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </section>
      `);
    }

    this.setView(`
      <section class="card">
        <h2>${this.escapeHtml(this.ref.title || "Références")}</h2>
        <p class="muted">Fiches de grammaire et conjugaison.</p>
      </section>
      <section class="grid grid-2" style="margin-top:12px;">
        ${this.ref.modules.map(m => `
          <div class="card">
            <h3>${this.escapeHtml(m.title)}</h3>
            <p class="muted">${(m.lessons || []).length} fiche(s)</p>
            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
              ${(m.lessons || []).map(l => `
                <button class="btn" onclick="Router.go('/ref-lesson',{moduleId:${this.jsString(m.id)},lessonId:${this.jsString(l.id)}})">
                  ${this.escapeHtml(l.title)}
                </button>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </section>
    `);
  },

  viewRefLesson(moduleId, lessonId) {
    const mod = this.ref.modules.find(m => m.id === moduleId);
    if (!mod) return Router.go("/ref");

    const lesson = (mod.lessons || []).find(l => l.id === lessonId);
    if (!lesson) return Router.go("/ref");

    const contentHtml = (lesson.content || []).map(p => `<p>${this.escapeHtml(p)}</p>`).join("");
    const examplesHtml = (lesson.examples || []).map(e => `
      <div class="choice" style="cursor:default;">
        <div>
          <b>${this.escapeHtml(e.sv || "")}</b>
          <div class="muted">${this.escapeHtml(e.fr || "")}${e.pron ? ` • <i>${this.escapeHtml(e.pron)}</i>` : ""}</div>
        </div>
      </div>
    `).join("");
    const vocabHtml = (lesson.vocab || []).map(w => `
      <div class="choice" style="cursor:default;">
        <div style="min-width:110px;"><b>${this.escapeHtml(w.sv || "")}</b></div>
        <div class="muted">${this.escapeHtml(w.fr || "")}${w.pron ? ` • <i>${this.escapeHtml(w.pron)}</i>` : ""}</div>
      </div>
    `).join("");

    this.setView(`
      <section class="card">
        <span class="pill">Référence</span>
        <h2 style="margin-top:10px;">${this.escapeHtml(lesson.title)}</h2>
        ${contentHtml}
        ${(lesson.examples && lesson.examples.length) ? `<hr /><h3>Exemples</h3>${examplesHtml}` : ""}
        ${(lesson.vocab && lesson.vocab.length) ? `<hr /><h3>Vocabulaire</h3>${vocabHtml}` : ""}
        <div style="margin-top:12px;">
          <button class="btn" onclick="Router.go('/ref')">← Retour</button>
        </div>
      </section>
    `);
  },

  viewRefPlus(params) {
    this.setView(`
      <section class="card">
        <h2>${this.escapeHtml(this.refPlus.title || "Référence+")}</h2>
        <p class="muted">Tableaux de conjugaison et vocabulaire thématique.</p>
        <p class="muted">Fonctionnalité en développement...</p>
        <button class="btn" onclick="Router.go('/')">← Retour</button>
      </section>
    `);
  },

  viewReview() {
    const due = Storage.getDueCards(30);
    const stats = Storage.getSrsStats();

    if (due.length === 0) {
      return this.setView(`
        <section class="card">
          <h2>🎉 Révision SRS</h2>
          <p class="muted">Aucune carte à réviser pour le moment !</p>
          <div class="kpi">
            <span class="pill">Total cartes : <b>${stats.total}</b></span>
            <span class="pill">Dues : <b>${stats.due}</b></span>
          </div>
          <button class="btn" onclick="Router.go('/')" style="margin-top:12px;">← Retour</button>
        </section>
      `);
    }

    let idx = 0;
    let showAnswer = false;

    const render = () => {
      const c = due[idx];
      
      const html = `
        <section class="card">
          <div class="muted" style="margin-bottom:8px;">Carte ${idx + 1} / ${due.length}</div>
          <div id="srs-card" style="min-height:150px; padding:20px; background:rgba(255,255,255,0.03); border-radius:12px; text-align:center;">
            <div style="font-size:24px; margin-bottom:12px;">${this.escapeHtml(c.front)}</div>
            ${showAnswer ? `<hr style="margin:20px 0;"><div style="font-size:18px; color:var(--accent-blue);">${this.escapeHtml(c.back)}</div>` : ""}
          </div>
          <div style="display:flex; gap:10px; margin-top:16px; flex-wrap:wrap; justify-content:center;">
            ${!showAnswer ? `
              <button class="btn btn-primary" id="show-answer">Afficher la réponse</button>
            ` : `
              <button class="btn" id="grade-0">❌ Oublié</button>
              <button class="btn" id="grade-1">😐 Difficile</button>
              <button class="btn btn-primary" id="grade-2">✅ Bon</button>
              <button class="btn btn-success" id="grade-3">🎯 Facile</button>
            `}
          </div>
        </section>
      `;

      this.setView(html);

      if (!showAnswer) {
        document.getElementById("show-answer").onclick = () => {
          showAnswer = true;
          render();
        };
      } else {
        for (let g = 0; g <= 3; g++) {
          const btn = document.getElementById(`grade-${g}`);
          if (btn) {
            btn.onclick = () => {
              Storage.gradeCard(c.id, g);
              showAnswer = false;
              idx++;
              if (idx < due.length) {
                render();
              } else {
                this.setView(`
                  <section class="card">
                    <h2>🎉 Session terminée !</h2>
                    <p class="muted">Vous avez révisé ${due.length} carte(s).</p>
                    <button class="btn btn-primary" onclick="Router.go('/')">← Retour à l'accueil</button>
                  </section>
                `);
              }
            };
          }
        }
      }
    };

    render();
  },

  viewStats() {
    const s = Storage.load();
    const total = (s.stats?.correct ?? 0) + (s.stats?.wrong ?? 0);
    const rate = total ? Math.round(((s.stats?.correct ?? 0) / total) * 100) : 0;
    const srsStats = Storage.getSrsStats();

    this.setView(`
      <section class="card">
        <h2>📊 Statistiques</h2>
        
        <h3 style="margin-top:20px;">Exercices</h3>
        <div class="kpi">
          <span class="pill">Total réponses : <b>${total}</b></span>
          <span class="pill">Taux de réussite : <b>${rate}%</b></span>
          <span class="pill pill-success">Bonnes : <b>${s.stats?.correct ?? 0}</b></span>
          <span class="pill pill-error">Erreurs : <b>${s.stats?.wrong ?? 0}</b></span>
        </div>

        <h3 style="margin-top:20px;">Révision SRS</h3>
        <div class="kpi">
          <span class="pill">Total cartes : <b>${srsStats.total}</b></span>
          <span class="pill pill-warning">Dues : <b>${srsStats.due}</b></span>
          <span class="pill">Nouvelles : <b>${srsStats.newCards || 0}</b></span>
          <span class="pill pill-success">Maîtrisées : <b>${srsStats.mature || 0}</b></span>
        </div>

        <hr />
        <button class="btn" onclick="Storage.reset()">⚠️ Réinitialiser toutes les données</button>
      </section>
    `);
  }
};

// Auto-init
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => App.init());
} else {
  App.init();
}
