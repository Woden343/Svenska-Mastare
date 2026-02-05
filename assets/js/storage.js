// assets/js/storage.js
const Storage = {
  key: "svenska_progress_v2",

  _default() {
    return {
      done: {},                 // { "A1:lesson1": true }
      stats: { correct: 0, wrong: 0 },
      srs: {
        cards: {},              // { cardId: { ... } }
        dailyLimit: 30,
        learnedToday: 0,
        dayStamp: this._todayStamp()
      }
    };
  },

  _todayStamp() {
    const d = new Date();
    // simple stamp local (yyyy-mm-dd)
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  },

  load() {
    try {
      const raw = JSON.parse(localStorage.getItem(this.key));
      const base = this._default();
      if (!raw) return base;

      // merge minimal safe
      const merged = {
        ...base,
        ...raw,
        done: raw.done || base.done,
        stats: raw.stats || base.stats,
        srs: { ...base.srs, ...(raw.srs || {}) }
      };

      // reset daily counter if day changed
      if (merged.srs.dayStamp !== this._todayStamp()) {
        merged.srs.dayStamp = this._todayStamp();
        merged.srs.learnedToday = 0;
      }

      return merged;
    } catch {
      return this._default();
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

  // ---------- SRS ----------
  upsertCards(newCards) {
    const s = this.load();
    const cards = s.srs.cards || {};

    for (const c of (newCards || [])) {
      if (!c || !c.id) continue;
      if (!cards[c.id]) {
        cards[c.id] = {
          id: c.id,
          front: c.front || "",
          back: c.back || "",
          level: c.level || "",
          nextDue: Date.now(),     // due now
          intervalDays: 0,
          ease: 2.3,
          reps: 0
        };
      } else {
        // update content if changed (keep scheduling)
        cards[c.id].front = c.front || cards[c.id].front;
        cards[c.id].back  = c.back  || cards[c.id].back;
        cards[c.id].level = c.level || cards[c.id].level;
      }
    }

    s.srs.cards = cards;
    this.save(s);
  },

  getDueCards(limit = 30) {
    const s = this.load();
    const now = Date.now();
    const cards = Object.values(s.srs.cards || {});
    const due = cards.filter(c => (c.nextDue || 0) <= now);
    due.sort((a, b) => (a.nextDue || 0) - (b.nextDue || 0));
    return due.slice(0, limit);
  },

  gradeCard(cardId, grade) {
    // grade: 0=Again, 1=Hard, 2=Good, 3=Easy
    const s = this.load();
    const c = (s.srs.cards || {})[cardId];
    if (!c) return;

    const now = Date.now();

    // base intervals (days), simple but effective
    // adjust ease
    if (grade === 0) c.ease = Math.max(1.3, c.ease - 0.2);
    if (grade === 1) c.ease = Math.max(1.3, c.ease - 0.05);
    if (grade === 2) c.ease = Math.min(3.0, c.ease + 0.02);
    if (grade === 3) c.ease = Math.min(3.0, c.ease + 0.08);

    if (grade === 0) {
      c.intervalDays = 0;
      c.reps = Math.max(0, (c.reps || 0) - 1);
      c.nextDue = now + 5 * 60 * 1000; // 5 minutes
    } else {
      c.reps = (c.reps || 0) + 1;
      if (!c.intervalDays || c.intervalDays < 1) c.intervalDays = (grade === 1 ? 1 : 2);
      else c.intervalDays = Math.round(c.intervalDays * (grade === 1 ? 1.2 : (grade === 2 ? c.ease : c.ease * 1.3)));

      // cap sanity
      c.intervalDays = Math.min(365, Math.max(1, c.intervalDays));
      c.nextDue = now + c.intervalDays * 24 * 60 * 60 * 1000;
    }

    s.srs.cards[cardId] = c;
    this.save(s);
  },

  getSrsStats() {
    const s = this.load();
    const cards = Object.values(s.srs.cards || {});
    const now = Date.now();
    const due = cards.filter(c => (c.nextDue || 0) <= now).length;
    return {
      total: cards.length,
      due,
      dailyLimit: s.srs.dailyLimit || 30
    };
  }
};