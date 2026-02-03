// svenska-data.js
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

/**
 * Structure conseillée :
 * LESSONS[level] = [{ id, title, tags, sections:[{ type, title, text, examples:[{sv,fr}]}] }]
 * Tu pourras ensuite ajouter 25 leçons complètes.
 */
const LESSONS = {
  A1: [
    {
      id: "A1-01",
      title: "Alphabet & prononciation",
      tags: ["prononciation", "bases"],
      sections: [
        {
          type: "theory",
          title: "Lettres spécifiques",
          text: "Le suédois utilise Å, Ä, Ö en plus de l'alphabet latin. Leur son est important pour la compréhension."
        },
        {
          type: "examples",
          title: "Exemples",
          examples: [
            { sv: "Å", fr: "son proche de 'o' long (selon le mot)" },
            { sv: "Ä", fr: "son proche de 'è/ê'" },
            { sv: "Ö", fr: "son proche de 'eu' (comme 'peur')" }
          ]
        }
      ]
    },
    {
      id: "A1-02",
      title: "EN / ETT (genres)",
      tags: ["grammaire", "noms"],
      sections: [
        {
          type: "theory",
          title: "Deux genres",
          text: "Les noms suédois sont soit EN (genre commun) soit ETT (neutre). On apprend le genre avec le mot."
        },
        {
          type: "examples",
          title: "Exemples",
          examples: [
            { sv: "en bok", fr: "un livre" },
            { sv: "ett hus", fr: "une maison" },
            { sv: "en stol", fr: "une chaise" }
          ]
        }
      ]
    },
    {
      id: "A1-03",
      title: "Salutations essentielles",
      tags: ["vocabulaire", "expressions"],
      sections: [
        {
          type: "theory",
          title: "Formules courantes",
          text: "Apprends quelques phrases très fréquentes. Vise la prononciation et le rythme."
        },
        {
          type: "examples",
          title: "Exemples",
          examples: [
            { sv: "Hej!", fr: "Salut / Bonjour" },
            { sv: "God morgon!", fr: "Bonjour (matin)" },
            { sv: "Tack!", fr: "Merci" },
            { sv: "Varsågod!", fr: "De rien / Je t'en prie" }
          ]
        }
      ]
    }
  ],

  A2: [
    {
      id: "A2-01",
      title: "Verbes au présent",
      tags: ["verbes", "présent"],
      sections: [
        {
          type: "theory",
          title: "Conjugaison simple",
          text: "Au présent, la conjugaison est très régulière : une seule forme par personne (jag, du, han…)."
        },
        {
          type: "examples",
          title: "Exemples",
          examples: [
            { sv: "jag pratar", fr: "je parle" },
            { sv: "du pratar", fr: "tu parles" },
            { sv: "vi pratar", fr: "nous parlons" }
          ]
        }
      ]
    }
  ],

  B1: [
    {
      id: "B1-01",
      title: "Exprimer une opinion",
      tags: ["expression", "opinion"],
      sections: [
        {
          type: "theory",
          title: "Formules utiles",
          text: "Pour argumenter : utilise des connecteurs et des formules d'opinion."
        },
        {
          type: "examples",
          title: "Exemples",
          examples: [
            { sv: "Jag tyck
