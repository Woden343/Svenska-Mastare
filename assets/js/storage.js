// assets/js/storage.js

const Storage = {
  key: "svenska_progress_v2_srs",

  defaultState() {
    return {
      done: {}, // { "A1:lessonId": true }
      stats: { correct: 0, wrong: 0 },

      // SRS
      srs: {
        settings: {
          dailyLimit: 10
        },
        // cards: { [cardId]: { id, front, back, level, moduleId, lessonId, type, dueAt, intervalDays, ease, reps, lapses, lastResult } }
        cards: {},
        // logs (light)
        lastBuildAt: 0
      }
    };
  },

  load() {
    try {
      const raw = JSON.parse(localStorage.getItem(this.key));
      if (!raw) return this.defaultState();

      // migrations / safety
      if (!raw.done) raw.done = {};
      if (!raw.stats) raw.stats = { correct: 0, wrong: 0 };
      if (!raw.srs) raw.srs = { settings: { dailyLimit: 10 }, cards: {}, lastBuildAt: 0 };
      if (!raw.srs.settings) raw.srs.settings = { dailyLimit: 10 };
      if (typeof raw.srs.settings.dailyLimit !== "number") raw.srs.settings.dailyLimit = 10;
      if (!raw.srs.cards) raw.srs.cards = {};
      if (!raw.srs.lastBuildAt) raw.srs.lastBuildAt = 0;

      return raw;
    } catch {
      return this.defaultState();
    }
  },

  save(state) {
    localStorage.setItem(this.key, JSON.stringify(state));
  },

  markDone(lessonKey) {
    const s = this.load();
    s.done[lessonKey] = true;
    this.save(s);
  },

  addResult(isCorrect) {
    const s = this.load();
    if (isCorrect) s.stats.correct++;
    else s.stats.wrong++;
    this.save(s);
  },

  // ---------- SRS helpers ----------
  upsertCards(cardsArray) {
    const s = this.load();
    const now = Date.now();

    for (const c of cardsArray) {
      const existing = s.srs.cards[c.id];
      if (existing) {
        // update display fields but keep learning state
        existing.front = c.front;
        existing.back = c.back;
        existing.level = c.level;
        existing.moduleId = c.moduleId;
        existing.lessonId = c.lessonId;
        existing.type = c.type;
      } else {
        // new card: schedule as due now
        s.srs.cards[c.id] = {
          ...c,
          dueAt: now,
          intervalDays: 0,
          ease: 2.3,      // gentle default
          reps: 0,
          lapses: 0,
          lastResult: null
        };
      }
    }

    s.srs.lastBuildAt = now;
    this.save(s);
  },

  setDailyLimit(n) {
    const s = this.load();
    s.srs.settings.dailyLimit = Math.max(5, Math.min(50, Number(n) || 10));
    this.save(s);
  },

  gradeCard(cardId, grade) {
    // grade: "again" | "hard" | "good" | "easy"
    const s = this.load();
    const card = s.srs.cards[cardId];
    if (!card) return;

    const now = Date.now();

    // Simple, robust SRS (inspired by SM-2 but simplified)
    // - again: due in 10 minutes (same session) + lapse
    // - hard: small interval increase
    // - good: normal increase
    // - easy: bigger increase

    // clamp ease
    const clampEase = (e) => Math.max(1.3, Math.min(3.0, e));

    if (grade === "again") {
      card.lapses += 1;
      card.reps += 1;
      card.ease = clampEase(card.ease - 0.2);
      card.intervalDays = 0; // relearn
      card.dueAt = now + 10 * 60 * 1000; // 10 minutes
      card.lastResult = "again";
      this.addResult(false);
    } else if (grade === "hard") {
      card.reps += 1;
      card.ease = clampEase(card.ease - 0.05);
      card.intervalDays = card.intervalDays <= 0 ? 1 : Math.max(1, Math.round(card.intervalDays * 1.2));
      card.dueAt = now + card.intervalDays * 24 * 60 * 60 * 1000;
      card.lastResult = "hard";
      this.addResult(true);
    } else if (grade === "good") {
      card.reps += 1;
      card.ease = clampEase(card.ease + 0.02);
      card.intervalDays = card.intervalDays <= 0 ? 1 : Math.max(1, Math.round(card.intervalDays * card.ease));
      card.dueAt = now + card.intervalDays * 24 * 60 * 60 * 1000;
      card.lastResult = "good";
      this.addResult(true);
    } else if (grade === "easy") {
      card.reps += 1;
      card.ease = clampEase(card.ease + 0.15);
      card.intervalDays = card.intervalDays <= 0 ? 2 : Math.max(2, Math.round(card.intervalDays * (card.ease + 0.3)));
      card.dueAt = now + card.intervalDays * 24 * 60 * 60 * 1000;
      card.lastResult = "easy";
      this.addResult(true);
    }

    this.save(s);
  },

  getDueCards({ level = "ALL", limit = null } = {}) {
    const s = this.load();
    const now = Date.now();
    const dailyLimit = limit ?? s.srs.settings.dailyLimit ?? 10;

    const all = Object.values(s.srs.cards);

    const filtered = all
      .filter(c => c.dueAt <= now)
      .filter(c => level === "ALL" ? true : c.level === level);

    // stable ordering: earliest due first, then lowest reps (newer first)
    filtered.sort((a, b) => (a.dueAt - b.dueAt) || (a.reps - b.reps));

    return filtered.slice(0, dailyLimit);
  },

  getSrsStats() {
    const s = this.load();
    const now = Date.now();
    const all = Object.values(s.srs.cards);

    const due = all.filter(c => c.dueAt <= now).length;
    const learning = all.filter(c => c.reps > 0 && c.intervalDays === 0).length;
    const mature = all.filter(c => c.intervalDays >= 21).length;

    return {
      total: all.length,
      due,
      learning,
      mature,
      dailyLimit: s.srs.settings.dailyLimit ?? 10
    };
  }
};