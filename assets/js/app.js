// assets/js/app.js

const App = {
  mount: document.getElementById("app"),

  // Contiendra tous les niveaux chargés : { A1: {...}, A2: {...}, B1: {...} }
  levels: {},

  // Ordre d’affichage sur l’accueil
  levelsOrder: ["A1", "A2", "B1"],

  async init() {
    // Nav
    document.getElementById("nav-home").onclick = () => Router.go("/");
    document.getElementById("nav-review").onclick = () => Router.go("/review");
    document.getElementById("nav-stats").onclick = () => Router.go("/stats");

    // Routes
    Router.on("/", () => this.viewHome());
    Router.on("/level", (p) => this.viewLevel(p.level));
    Router.on("/lesson", (p) => this.viewLesson(p.level, p.lessonId));
    Router.on("/review", () => this.viewReview());
    Router.on("/stats", () => this.viewStats());

    // Charger A1 + A2 + B1 (et ignorer proprement un niveau manquant)
    await this.preloadLevels();
    if (Object.keys(this.levels).length === 0) return;

    // Build / refresh SRS cards from JSON
    this.refreshSrsCards();

    Router.start("/");
  },

  async preloadLevels() {
    const toLoad = this.levelsOrder.slice();

    for (const lvl of toLoad) {
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
          <p class="muted">Aucun niveau n’a pu être chargé. Vérifie que les fichiers JSON existent bien dans <code>assets/data/</code>.</p>
          <ul>
            <li><code>assets/data/a1.json</code></li>
            <li><code>assets/data/a2.json</code></li>
            <li><code>assets/data/b1.json</code></li>
          </ul>
        </section>
      `);
      return;
    }
  },

  async loadLevel(level) {
    const map = {
      A1: "assets/data/a1.json",
      A2: "assets/data/a2.json",
      B1: "assets/data/b1.json"
    };

    const url = map[level];
    if (!url) throw new Error(`Niveau non supporté: ${level}`);

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Impossible de charger ${url} (${res.status})`);

    const json = await res.json();

    return {
      level: json.level || level,
      title: json.title || "",
      modules: Array.isArray(json.modules) ? json.modules : []
    };
  },

  refreshSrsCards() {
    // Build cards from JSON content, then upsert into Storage
    const cards = SRS.buildCardsFromLevels(this.levels);
    Storage.upsertCards(cards);
  },

  setView(html) {
    this.mount.innerHTML = html;
  },

  getLevelData(level) {
    return this.levels[level] || null;
  },

  viewHome() {
    const s = Storage.load();
    const doneCount = Object.keys(s.done).length;
    const srsStats = Storage.getSrsStats();

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
            <button class="btn" onclick="Router.go('/level',{level:'${L.level}'})">Ouvrir</button>
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
          <span class="pill">Bonnes réponses : <b>${s.stats.correct}</b></span>
          <span class="pill">Erreurs : <b>${s.stats.wrong}</b></span>
        </div>
        <hr />
        <div class="kpi">
          <span class="pill">Cartes SRS : <b>${srsStats.total}</b></span>
          <span class="pill">À réviser : <b>${srsStats.due}</b></span>
          <span class="pill">Limite/jour : <b>${srsStats.dailyLimit}</b></span>
        </div>
        <div style="margin-top:12px;">
          <button class="btn" onclick="Router.go('/review')">🎴 Révision SRS</button>
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

    const vocabHtml = (lesson.vocab || []).map(w => `
      <div class="choice" style="cursor:default;">
        <div style="min-width:130px;"><b>${w.sv || ""}</b></div>
        <div class="muted">${w.fr || ""}${w.pron ? ` • <i>${w.pron}</i>` : ""}</div>
      </div>
    `).join("");

    const examplesHtml = (lesson.examples || []).map(e => `
      <div class="choice" style="cursor:default;">
        <div>
          <b>${e.sv || ""}</b>
          <div class="muted">${e.fr || ""}${e.pron ? ` • <i>${e.pron}</i>` : ""}</div>
        </div>
      </div>
    `).join("");

    const contentHtml = (lesson.content || []).map(p => `<p>${p}</p>`).join("");

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
          <button class="btn" onclick="Storage.markDone('${L.level}:${lesson.id}'); Router.go('/level',{level:'${L.level}'})">✔ Marquer comme faite</button>
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
    let answered = new Array(quizzes.length).fill(false);

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
    // Rebuild cards in case JSON changed
    this.refreshSrsCards();

    const srsStats = Storage.getSrsStats();
    const levelOptions = ["ALL", ...this.levelsOrder.filter(l => this.getLevelData(l))];

    // default filters
    const selectedLevel = (window.__reviewLevel && levelOptions.includes(window.__reviewLevel)) ? window.__reviewLevel : "ALL";
    window.__reviewLevel = selectedLevel;

    const due = Storage.getDueCards({ level: selectedLevel, limit: srsStats.dailyLimit });

    const levelSelect = `
      <label class="muted" style="display:block; margin-bottom:6px;">Niveau</label>
      <select id="revLevel" style="width:100%; padding:10px 12px; border-radius:12px; background:rgba(255,255,255,.04); color:var(--text); border:1px solid rgba(255,255,255,.10);">
        ${levelOptions.map(l => `<option value="${l}" ${l === selectedLevel ? "selected" : ""}>${l === "ALL" ? "Tous" : l}</option>`).join("")}
      </select>
    `;

    this.setView(`
      <section class="card">
        <h2>Révision SRS 🎴</h2>
        <p class="muted">Cartes générées automatiquement depuis tes leçons (vocab + exemples). Fais un petit set chaque jour.</p>

        <div class="kpi">
          <span class="pill">Cartes : <b>${srsStats.total}</b></span>
          <span class="pill">À réviser : <b>${srsStats.due}</b></span>
          <span class="pill">En apprentissage : <b>${srsStats.learning}</b></span>
          <span class="pill">Matures (≥21j) : <b>${srsStats.mature}</b></span>
        </div>

        <hr />

        <div class="grid grid-2">
          <div class="card">
            ${levelSelect}
            <div style="margin-top:10px;">
              <label class="muted" style="display:block; margin-bottom:6px;">Limite / jour (5 → 50)</label>
              <input id="dailyLimit" type="number" min="5" max="50" value="${srsStats.dailyLimit}" />
              <button class="btn" style="margin-top:10px;" id="saveLimit">Enregistrer</button>
            </div>
          </div>

          <div class="card">
            <h3>Session du jour</h3>
            <p class="muted">Cartes dues (filtrées) : <b>${due.length}</b></p>
            <button class="btn" id="startSrs" ${due.length ? "" : "disabled"}>Commencer</button>
            <p class="muted" style="margin-top:10px;">Astuce : si tu n’as rien “à réviser”, repasse demain ou augmente la limite/jour.</p>
          </div>
        </div>

        <div id="srsHost" style="margin-top:12px;"></div>

        <div style="margin-top:12px;">
          <button class="btn" onclick="Router.go('/')">← Retour</button>
        </div>
      </section>
    `);

    // handlers
    document.getElementById("revLevel").onchange = (e) => {
      window.__reviewLevel = e.target.value;
      this.viewReview();
    };

    document.getElementById("saveLimit").onclick = () => {
      const n = document.getElementById("dailyLimit").value;
      Storage.setDailyLimit(n);
      this.viewReview();
    };

    document.getElementById("startSrs").onclick = () => {
      this.runSrsSession({ level: window.__reviewLevel || "ALL" });
    };
  },

  runSrsSession({ level = "ALL" } = {}) {
    const host = document.getElementById("srsHost");
    if (!host) return;

    const srsStats = Storage.getSrsStats();
    const cards = Storage.getDueCards({ level, limit: srsStats.dailyLimit });

    if (cards.length === 0) {
      host.innerHTML = `<p class="muted">Aucune carte à réviser pour ce filtre.</p>`;
      return;
    }

    let idx = 0;
    let revealed = false;

    const render = () => {
      const c = cards[idx];
      if (!c) return;

      const front = SRS.escapeHtml(c.front);
      const back = SRS.escapeHtml(c.back);

      host.innerHTML = `
        <div class="card" style="margin-top:12px;">
          <div class="muted" style="margin-bottom:8px;">
            Carte ${idx + 1} / ${cards.length}
            • <span class="pill" style="margin-left:8px;">${c.level}</span>
          </div>

          <div style="margin-top:10px;">
            <div class="muted">Recto</div>
            <div style="font-size:18px; margin-top:6px;"><b>${front}</b></div>
          </div>

          <div id="backBox" style="margin-top:14px; display:${revealed ? "block" : "none"};">
            <hr />
            <div class="muted">Verso</div>
            <div style="font-size:18px; margin-top:6px;"><b>${back}</b></div>
          </div>

          <div style="display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;">
            <button class="btn" id="reveal">${revealed ? "Masquer" : "Voir la réponse"}</button>

            <div style="flex:1;"></div>

            <button class="btn" id="again" ${revealed ? "" : "disabled"}>🔁 Again</button>
            <button class="btn" id="hard"  ${revealed ? "" : "disabled"}>😅 Hard</button>
            <button class="btn" id="good"  ${revealed ? "" : "disabled"}>✅ Good</button>
            <button class="btn" id="easy"  ${revealed ? "" : "disabled"}>🚀 Easy</button>
          </div>

          <p class="muted" style="margin-top:10px;">
            Type : ${c.type}
          </p>
        </div>
      `;

      host.querySelector("#reveal").onclick = () => {
        revealed = !revealed;
        render();
      };

      const gradeAndNext = (grade) => {
        Storage.gradeCard(c.id, grade);
        // move to next
        idx++;
        revealed = false;

        if (idx >= cards.length) {
          const st = Storage.getSrsStats();
          host.innerHTML = `
            <div class="card" style="margin-top:12px;">
              <h3>Session terminée ✅</h3>
              <p class="muted">Bien joué. Reviens plus tard (ou demain) pour la suite.</p>
              <div class="kpi">
                <span class="pill">À réviser : <b>${st.due}</b></span>
                <span class="pill">Cartes totales : <b>${st.total}</b></span>
              </div>
              <div style="margin-top:12px;">
                <button class="btn" onclick="Router.go('/review')">↻ Retour Révision</button>
              </div>
            </div>
          `;
          return;
        }

        render();
      };

      host.querySelector("#again").onclick = () => gradeAndNext("again");
      host.querySelector("#hard").onclick  = () => gradeAndNext("hard");
      host.querySelector("#good").onclick  = () => gradeAndNext("good");
      host.querySelector("#easy").onclick  = () => gradeAndNext("easy");
    };

    render();
  },

  viewStats() {
    const s = Storage.load();
    const total = s.stats.correct + s.stats.wrong;
    const rate = total ? Math.round((s.stats.correct / total) * 100) : 0;

    const st = Storage.getSrsStats();

    this.setView(`
      <section class="card">
        <h2>Stats</h2>
        <div class="kpi">
          <span class="pill">Total réponses : <b>${total}</b></span>
          <span class="pill">Taux : <b>${rate}%</b></span>
          <span class="pill">Bonnes : <b>${s.stats.correct}</b></span>
          <span class="pill">Erreurs : <b>${s.stats.wrong}</b></span>
        </div>

        <hr />

        <h3>SRS</h3>
        <div class="kpi">
          <span class="pill">Cartes : <b>${st.total}</b></span>
          <span class="pill">À réviser : <b>${st.due}</b></span>
          <span class="pill">Limite/jour : <b>${st.dailyLimit}</b></span>
        </div>

        <hr />
        <button class="btn" onclick="localStorage.removeItem(Storage.key); location.reload()">Réinitialiser</button>
      </section>
    `);
  }
};

App.init();