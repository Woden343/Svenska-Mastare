// assets/js/srs.js

const SRS = {
  // Build cards from all loaded levels JSON (vocab + examples)
  // Cards are "front/back" with optional pron included.
  buildCardsFromLevels(levelsMap) {
    const cards = [];
    const seen = new Set();

    const add = (card) => {
      if (!card || !card.id) return;
      if (seen.has(card.id)) return;
      seen.add(card.id);
      cards.push(card);
    };

    const safeText = (x) => String(x || "").trim();

    for (const [levelKey, L] of Object.entries(levelsMap || {})) {
      const modules = Array.isArray(L.modules) ? L.modules : [];

      for (const m of modules) {
        const moduleId = safeText(m.id) || safeText(m.title) || "module";
        const lessons = Array.isArray(m.lessons) ? m.lessons : [];

        for (const les of lessons) {
          const lessonId = safeText(les.id) || safeText(les.title) || "lesson";

          // 1) vocab → 2 cards each: SV→FR and FR→SV (80/20 very good)
          const vocab = Array.isArray(les.vocab) ? les.vocab : [];
          for (const w of vocab) {
            const sv = safeText(w.sv);
            const fr = safeText(w.fr);
            const pron = safeText(w.pron);

            if (sv && fr) {
              add({
                id: `v:${levelKey}:${moduleId}:${lessonId}:${sv}`,
                type: "VOCAB_SV_FR",
                level: levelKey,
                moduleId,
                lessonId,
                front: `${sv}${pron ? `  [${pron}]` : ""}`,
                back: fr
              });

              add({
                id: `v2:${levelKey}:${moduleId}:${lessonId}:${fr}=>${sv}`,
                type: "VOCAB_FR_SV",
                level: levelKey,
                moduleId,
                lessonId,
                front: fr,
                back: `${sv}${pron ? `  [${pron}]` : ""}`
              });
            }
          }

          // 2) examples → 1 card: SV sentence → FR (with pron)
          const examples = Array.isArray(les.examples) ? les.examples : [];
          for (let i = 0; i < examples.length; i++) {
            const e = examples[i] || {};
            const sv = safeText(e.sv);
            const fr = safeText(e.fr);
            const pron = safeText(e.pron);
            if (!sv || !fr) continue;

            add({
              id: `ex:${levelKey}:${moduleId}:${lessonId}:${i}`,
              type: "EX_SV_FR",
              level: levelKey,
              moduleId,
              lessonId,
              front: `${sv}${pron ? `  [${pron}]` : ""}`,
              back: fr
            });
          }
        }
      }
    }

    return cards;
  },

  // Simple “mask / reveal”
  escapeHtml(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
};