// svenska-data.js
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const LESSONS = {
  "A1": [
    {
      "id": "A1-01",
      "title": "Alphabet et prononciation",
      "tags": ["prononciation", "bases"],
      "sections": [
        {
          "type": "theory",
          "title": "Lettres specifiques",
          "text": "Le suedois utilise A, O, et les lettres speciales A-ring (Å), A-trema (Ä), O-trema (Ö). Le son change selon les mots."
        },
        {
          "type": "examples",
          "title": "Exemples",
          "examples": [
            { "sv": "Å", "fr": "son proche de 'o' long (selon le mot)" },
            { "sv": "Ä", "fr": "son proche de 'e' ouvert (comme 'pere')" },
            { "sv": "Ö", "fr": "son proche de 'eu' (comme 'peur')" }
          ]
        }
      ]
    },
    {
      "id": "A1-02",
      "title": "EN et ETT (genres)",
      "tags": ["grammaire", "noms"],
      "sections": [
        {
          "type": "theory",
          "title": "Deux genres",
          "text": "Les noms suedois sont soit EN (genre commun), soit ETT (neutre). On apprend le genre avec le mot."
        },
        {
          "type": "examples",
          "title": "Exemples",
          "examples": [
            { "sv": "en bok", "fr": "un livre" },
            { "sv": "ett hus", "fr": "une maison" },
            { "sv": "en stol", "fr": "une chaise" }
          ]
        }
      ]
    },
    {
      "id": "A1-03",
      "title": "Salutations essentielles",
      "tags": ["vocabulaire", "expressions"],
      "sections": [
        {
          "type": "theory",
          "title": "Formules courantes",
          "text": "Apprends des phrases tres frequentes. Concentre-toi sur la prononciation et le rythme."
        },
        {
          "type": "examples",
          "title": "Exemples",
          "examples": [
            { "sv": "Hej!", "fr": "Salut / Bonjour" },
            { "sv": "God morgon!", "fr": "Bonjour (matin)" },
            { "sv": "Tack!", "fr": "Merci" },
            { "sv": "Varsagod!", "fr": "De rien / Je t'en prie" }
          ]
        }
      ]
    }
  ],

  "A2": [
    {
      "id": "A2-01",
      "title": "Verbes au present",
      "tags": ["verbes", "present"],
      "sections": [
        {
          "type": "theory",
          "title": "Conjugaison simple",
          "text": "Au present, une seule forme par personne (jag, du, han, vi, ni, de)."
        },
        {
          "type": "examples",
          "title": "Exemples",
          "examples": [
            { "sv": "jag pratar", "fr": "je parle" },
            { "sv": "du pratar", "fr": "tu parles" },
            { "sv": "vi pratar", "fr": "nous parlons" }
          ]
        }
      ]
    }
  ],

  "B1": [
    {
      "id": "B1-01",
      "title": "Exprimer une opinion",
      "tags": ["expression", "opinion"],
      "sections": [
        {
          "type": "theory",
          "title": "Formules utiles",
          "text": "Pour argumenter, utilise des connecteurs et des formules d'opinion."
        },
        {
          "type": "examples",
          "title": "Exemples",
          "examples": [
            { "sv": "Jag tycker att ...", "fr": "Je pense que ..." },
            { "sv": "Enligt mig ...", "fr": "Selon moi ..." },
            { "sv": "A ena sidan ... a andra sidan ...", "fr": "D'un cote ... de l'autre ..." }
          ]
        }
      ]
    }
  ],

  "B2": [
    {
      "id": "B2-01",
      "title": "Subordonnees (att, som)",
      "tags": ["grammaire", "subordonnees"],
      "sections": [
        {
          "type": "theory",
          "title": "Idee generale",
          "text": "Les subordonnees introduites par att et som sont frequentes et demandent une bonne maitrise de l'ordre des mots."
        }
      ]
    }
  ],

  "C1": [
    {
      "id": "C1-01",
      "title": "Nuances de registre",
      "tags": ["style", "avance"],
      "sections": [
        {
          "type": "theory",
          "title": "Registres",
          "text": "A haut niveau, l'objectif est d'ajuster ton style : formel, informel, idiomatique, precis."
        }
      ]
    }
  ],

  "C2": [
    {
      "id": "C2-01",
      "title": "Expressions idiomatiques",
      "tags": ["idiomes", "maitrise"],
      "sections": [
        {
          "type": "theory",
          "title": "Idiomes",
          "text": "Les idiomes s'apprennent par le contexte et la repetition. Note les exemples et revois-les souvent."
        }
      ]
    }
  ]
};
