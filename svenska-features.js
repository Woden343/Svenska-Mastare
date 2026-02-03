// svenska-features.js
// Phase 2 (Lecons) + Phase 3 (Quiz + XP)

// -------------------- AUDIO (gratuit) --------------------

function speakSv(text) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "sv-SE";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch {
    alert("Audio non disponible sur ce navigateur.");
  }
}

// -------------------- LEARN (Phase 2) --------------------

function renderLearn() {
  const levelSelect = document.getElementById("level-selector");

  // sync select
  if (levelSelect && levelSelect.value !== (appState.user.level || "A1")) {
    levelSelect.value = appState.user.level || "A1";
  }

  // bind once
  if (levelSelect && !levelSelect.dataset.bound) {
    levelSelect.dataset.bound = "1";
    levelSelect.addEventListener("change", () => {
      appState.user.level = levelSelect.value;
      saveState();
      updateHeaderUI();
      renderLearn();
    });
  }

  const level = appState.user.level || "A1";
  const list = (LESSONS[level] || []).slice();
  const grid = document.getElementById("lessons-grid");
  const container = document.getElementById("content-learn");
  if (!grid || !container) return;

  if (!list.length) {
    grid.innerHTML = `<div class="text-slate-600">Aucune lecon disponible pour ${level}.</div>`;
  } else {
    grid.innerHTML = list
      .map((lesson) => {
        const done = isLessonCompleted(lesson.id);
        return `
        <button
          class="text-left bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition focus-ring"
          onclick="openLesson('${escapeAttr(lesson.id)}')"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="text-xs text-slate-500">${escapeHtml(lesson.id)}</div>
              <div class="font-extrabold text-slate-800 mt-1">${escapeHtml(lesson.title)}</div>
              <div class="text-xs text-slate-500 mt-2">${(lesson.tags || []).map(t => `#${escapeHtml(t)}`).join(" ")}</div>
            </div>
            <div class="text-xl" aria-hidden="true">${done ? "✅" : "⬜"}</div>
          </div>
        </button>`;
      })
      .join("");
  }

  // create modal if missing
  if (!document.getElementById("lesson-modal")) {
    container.insertAdjacentHTML("beforeend", lessonModalHtml());
    bindLessonModalEvents();
  }
}

function lessonModalHtml() {
  return `
  <div id="lesson-modal" class="hidden fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/40"></div>
    <div class="relative max-w-3xl mx-auto mt-10 sm:mt-16 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between gap-3">
        <div>
          <div id="lesson-modal-id" class="text-xs text-blue-100"></div>
          <div id="lesson-modal-title" class="font-extrabold text-lg"></div>
        </div>
        <button id="lesson-modal-close" class="p-2 hover:bg-white/15 rounded-lg transition focus-ring" aria-label="Fermer">✕</button>
      </div>

      <div class="p-6 space-y-5 max-h-[70vh] overflow-auto">
        <div class="flex flex-wrap gap-2 items-center justify-between">
          <div id="lesson-modal-tags" class="text-xs text-slate-500"></div>
          <div class="flex gap-2">
            <button id="lesson-audio" class="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition focus-ring">🔊 Audio</button>
            <button id="lesson-toggle-done" class="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition focus-ring">✅ Termine</button>
          </div>
        </div>

        <div id="lesson-modal-body" class="space-y-4"></div>
      </div>
    </div>
  </div>`;
}

function bindLessonModalEvents() {
  const modal = document.getElementById("lesson-modal");
  const closeBtn = document.getElementById("lesson-modal-close");
  if (closeBtn) closeBtn.onclick = () => modal.classList.add("hidden");
}

function openLesson(lessonId) {
  const level = appState.user.level || "A1";
  const lesson = (LESSONS[level] || []).find((l) => l.id === lessonId);
  if (!lesson) return;

  const modal = document.getElementById("lesson-modal");
  document.getElementById("lesson-modal-id").textContent = lesson.id;
  document.getElementById("lesson-modal-title").textContent = lesson.title;
  document.getElementById("lesson-modal-tags").textContent = (lesson.tags || []).map(t => `#${t}`).join(" ");

  const done = isLessonCompleted(lesson.id);
  document.getElementById("lesson-toggle-done").textContent = done
    ? "↩️ Marquer non termine"
    : "✅ Marquer termine";

  const body = document.getElementById("lesson-modal-body");
  body.innerHTML = (lesson.sections || [])
    .map((sec) => {
      if (sec.type === "examples") {
        const ex = (sec.examples || [])
          .map((e) => `
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div class="font-semibold text-slate-800">${escapeHtml(e.sv)}</div>
              <div class="text-sm text-slate-600">${escapeHtml(e.fr)}</div>
            </div>
          `)
          .join("");

        return `
          <section>
            <h4 class="font-extrabold text-slate-800">${escapeHtml(sec.title || "Exemples")}</h4>
            <div class="mt-2 space-y-2">${ex}</div>
          </section>
        `;
      }

      return `
        <section>
          <h4 class="font-extrabold text-slate-800">${escapeHtml(sec.title || "Theorie")}</h4>
          <p class="text-slate-700 mt-2 leading-relaxed">${escapeHtml(sec.text || "")}</p>
        </section>
      `;
    })
    .join("");

  document.getElementById("lesson-audio").onclick = () => {
    const chunks = [];
    chunks.push(lesson.title);
    (lesson.sections || []).forEach((sec) => {
      if (sec.text) chunks.push(sec.text);
      if (sec.examples) sec.examples.forEach((e) => chunks.push(e.sv));
    });
    speakSv(chunks.join(". "));
  };

  document.getElementById("lesson-toggle-done").onclick = () => {
    toggleLessonCompleted(lesson.id);
    updateHeaderUI();
    renderLearn();
    openLesson(lesson.id);
  };

  modal.classList.remove("hidden");
}

// -------------------- PRACTICE (Phase 3) --------------------

// Etat session quiz (en RAM)
const quizSession = {
  mode: null,
  items: [],
  index: 0,
  score: 0
};

function renderPractice() {
  renderPracticeHome();
}

function renderPracticeHome() {
  const modes = document.getElementById("practice-modes");
  const area = document.getElementById("practice-area");
  if (!modes || !area) return;

  modes.innerHTML = `
    <button class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition text-left focus-ring"
      onclick="startQuiz('quick')">
      <div class="text-xl">⚡</div>
      <div class="font-extrabold mt-2">Session rapide</div>
      <div class="text-sm text-slate-600 mt-1">10 questions mixtes</div>
    </button>

    <button class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition text-left focus-ring"
      onclick="startQuiz('grammar')">
      <div class="text-xl">📖</div>
      <div class="font-extrabold mt-2">Grammaire</div>
      <div class="text-sm text-slate-600 mt-1">Focus regles</div>
    </button>

    <button class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition text-left focus-ring"
      onclick="startQuiz('vocab')">
      <div class="text-xl">💬</div>
      <div class="font-extrabold mt-2">Vocabulaire</div>
      <div class="text-sm text-slate-600 mt-1">Mots et expressions</div>
    </button>
  `;

  const answered = (appState.progress.quiz && appState.progress.quiz.answered) || 0;
  const correct = (appState.progress.quiz && appState.progress.quiz.correct) || 0;

  area.innerHTML = `
    <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6">
      <div class="font-extrabold text-slate-800 text-lg">Pratiquer - Niveau ${escapeHtml(appState.user.level)}</div>
      <div class="text-slate-600 mt-1">
        Choisis un mode. Tu gagnes <b>+10 XP</b> si correct, <b>+2 XP</b> si incorrect.
      </div>
      <div class="mt-4 text-sm text-slate-500">
        Stats : ${answered} reponses • ${correct} correctes
      </div>
    </div>
  `;
}

function startQuiz(mode) {
  quizSession.mode = mode;
  quizSession.items = getQuestionsForMode(mode);
  quizSession.index = 0;
  quizSession.score = 0;

  if (!quizSession.items.length) {
    alert("Pas encore de questions pour ce niveau. Ajoute-en dans QUESTIONS.");
    return;
  }

  renderQuizQuestion();
}

function getQuestionsForMode(mode) {
  const level = appState.user.level || "A1";
  const pool = (QUESTIONS || []).filter((q) => q.level === level);

  if (mode === "quick") return shuffle(pool).slice(0, 10);
  if (mode === "grammar") return shuffle(pool.filter((q) => q.category === "grammar")).slice(0, 10);
  if (mode === "vocab") return shuffle(pool.filter((q) => q.category === "vocab")).slice(0, 10);

  return shuffle(pool).slice(0, 10);
}

function renderQuizQuestion() {
  const area = document.getElementById("practice-area");
  if (!area) return;

  const q = quizSession.items[quizSession.index];

  area.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
      <div class="flex items-center justify-between gap-3">
        <div class="text-sm text-slate-500">
          Question ${quizSession.index + 1} / ${quizSession.items.length}
        </div>
        <div class="text-sm font-semibold text-slate-700">
          Score: ${quizSession.score}
        </div>
      </div>

      <div class="mt-3 text-xl font-extrabold text-slate-800">${escapeHtml(q.prompt)}</div>

      <div class="mt-4" id="quiz-answer-area"></div>

      <div class="mt-4 flex items-center justify-between gap-3">
        <button class="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 transition focus-ring"
          onclick="quitQuiz()">
          ⬅ Quitter
        </button>
        <button id="btn-submit-quiz" class="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition focus-ring">
          Valider
        </button>
      </div>

      <div class="mt-4 hidden" id="quiz-feedback"></div>
    </div>
  `;

  const answerArea = document.getElementById("quiz-answer-area");
  if (q.type === "mcq") {
    answerArea.innerHTML = (q.choices || [])
      .map(
        (c) => `
      <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer mt-2">
        <input type="radio" name="quizChoice" value="${escapeAttr(c)}" />
        <span class="font-semibold">${escapeHtml(c)}</span>
      </label>`
      )
      .join("");
  } else {
    answerArea.innerHTML = `
      <label class="block text-sm font-semibold text-slate-700 mb-2">Ta reponse</label>
      <input id="quiz-free-input" class="w-full p-3 border-2 border-slate-300 rounded-xl focus-ring"
        placeholder="Ecris ta reponse..." />
      <p class="text-xs text-slate-500 mt-2">Astuce : pas sensible a la casse.</p>
    `;
  }

  document.getElementById("btn-submit-quiz").onclick = () => submitQuizAnswer();
}

function submitQuizAnswer() {
  const q = quizSession.items[quizSession.index];
  let userAnswer = "";

  if (q.type === "mcq") {
    const checked = document.querySelector('input[name="quizChoice"]:checked');
    if (!checked) return alert("Choisis une reponse.");
    userAnswer = checked.value;
  } else {
    const inp = document.getElementById("quiz-free-input");
    userAnswer = (inp.value || "").trim();
    if (!userAnswer) return alert("Ecris une reponse.");
  }

  const correct = isCorrectAnswer(q, userAnswer);

  // stats persistantes
  if (!appState.progress.quiz) appState.progress.quiz = { answered: 0, correct: 0 };
  appState.progress.quiz.answered += 1;
  if (correct) appState.progress.quiz.correct += 1;

  // XP
  if (correct) {
    appState.user.xp += 10;
    quizSession.score += 1;
  } else {
    appState.user.xp += 2;
  }

  saveState();
  updateHeaderUI();

  const fb = document.getElementById("quiz-feedback");
  fb.classList.remove("hidden");
  fb.innerHTML = `
    <div class="mt-4 p-4 rounded-2xl ${correct ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}">
      <div class="font-extrabold ${correct ? "text-green-800" : "text-red-800"}">
        ${correct ? "✅ Correct !" : "❌ Incorrect"}
      </div>
      <div class="text-slate-700 mt-2">
        <b>Bonne reponse :</b> ${escapeHtml(q.answer)}
      </div>
      ${q.explanation ? `<div class="text-slate-600 mt-2">${escapeHtml(q.explanation)}</div>` : ""}
      <div class="mt-3">
        <button class="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition focus-ring"
          onclick="nextQuizQuestion()">
          Suivant ➜
        </button>
      </div>
    </div>
  `;
}

function nextQuizQuestion() {
  quizSession.index += 1;
  if (quizSession.index >= quizSession.items.length) {
    renderQuizEnd();
  } else {
    renderQuizQuestion();
  }
}

function renderQuizEnd() {
  const area = document.getElementById("practice-area");
  const total = quizSession.items.length;

  area.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div class="text-2xl font-extrabold text-slate-800">Session terminee 🎉</div>
      <div class="text-slate-600 mt-2">Score : <b>${quizSession.score}</b> / ${total}</div>
      <div class="text-slate-600 mt-1">XP total actuel : <b>${appState.user.xp}</b></div>
      <div class="mt-5 flex gap-2">
        <button class="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition focus-ring"
          onclick="renderPracticeHome()">
          Retour aux modes
        </button>
        <button class="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 transition focus-ring"
          onclick="startQuiz('${escapeAttr(quizSession.mode)}')">
          Rejouer
        </button>
      </div>
    </div>
  `;
}

function quitQuiz() {
  renderPracticeHome();
}

function isCorrectAnswer(q, userAnswer) {
  const ua = String(userAnswer || "").trim().toLowerCase();

  if (q.type === "mcq") {
    return ua === String(q.answer).trim().toLowerCase();
  }

  const expected = String(q.answer).trim().toLowerCase();
  const acc = (q.acceptable || []).map((x) => String(x).trim().toLowerCase());
  return ua === expected || acc.includes(ua);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

// -------------------- HELPERS --------------------

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(s) {
  return escapeHtml(s).replaceAll('"', "&quot;");
}
