// svenska-data.js
// Donnees pedagogiques (Lecons + Quiz + Flashcards) - Offline

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

// ==================== LESSONS (Phase 2) ====================

const LESSONS = {
  A1: [
    {
      id: "A1-01",
      title: "Salutations",
      tags: ["vocabulaire"],
      sections: [
        { type: "theory", title: "Bases", text: "Voici quelques salutations tres courantes en suedois." },
        {
          type: "examples",
          title: "Exemples",
          examples: [
            { sv: "Hej!", fr: "Bonjour / Salut" },
            { sv: "God morgon!", fr: "Bonjour (matin)" },
            { sv: "Tack!", fr: "Merci" },
            { sv: "Varsagod!", fr: "De rien / Je t'en prie" }
          ]
        }
      ]
    },
    {
      id: "A1-02",
      title: "EN / ETT",
      tags: ["grammaire"],
      sections: [
        {
          type: "theory",
          title: "Genres",
          text: "Les noms suedois sont soit EN (genre commun), soit ETT (neutre). Il faut apprendre le genre avec chaque mot."
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
      title: "Verbes au present",
      tags: ["verbes"],
      sections: [
        { type: "theory", title: "Regle simple", text: "Au present, le verbe a la meme forme pour toutes les personnes." },
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

  A2: [
    {
      id: "A2-01",
      title: "Phrases simples",
      tags: ["phrases"],
      sections: [
        { type: "theory", title: "Structure", text: "Sujet + verbe + complement. L'ordre est important." },
        {
          type: "examples",
          title: "Exemples",
          examples: [
            { sv: "Jag heter Alexandre.", fr: "Je m'appelle Alexandre." },
            { sv: "Jag bor i Frankrike.", fr: "J'habite en France." }
          ]
        }
      ]
    }
  ],

  B1: [],
  B2: [],
  C1: [],
  C2: []
};

// ==================== QUESTIONS QUIZ (Phase 3) ====================

const QUESTIONS = [
  {
    id: "Q1",
    level: "A1",
    category: "grammar",
    type: "mcq",
    prompt: "Quel article pour 'hus' ?",
    choices: ["en", "ett"],
    answer: "ett",
    explanation: "On dit 'ett hus'."
  },
  {
    id: "Q2",
    level: "A1",
    category: "grammar",
    type: "mcq",
    prompt: "Quel article pour 'bok' ?",
    choices: ["en", "ett"],
    answer: "en",
    explanation: "On dit 'en bok'."
  },
  {
    id: "Q3",
    level: "A1",
    category: "vocab",
    type: "mcq",
    prompt: "Que signifie 'Tack' ?",
    choices: ["Bonjour", "Merci", "Au revoir"],
    answer: "Merci",
    explanation: "'Tack' signifie merci."
  },
  {
    id: "Q4",
    level: "A1",
    category: "vocab",
    type: "free",
    prompt: "Traduis en suedois : Bonjour",
    answer: "hej",
    acceptable: ["hej", "hej!"],
    explanation: "La traduction simple est 'Hej!'."
  },
  {
    id: "Q5",
    level: "A2",
    category: "grammar",
    type: "mcq",
    prompt: "Combien de formes au present ?",
    choices: ["1", "2", "6"],
    answer: "1",
    explanation: "Une seule forme par verbe."
  }
];

// ==================== FLASHCARDS (Phase 4) ====================
// Structure : FLASHCARDS[category] = [{ sv, fr }]

const FLASHCARDS = {
  "Bases": [
    { sv: "hej", fr: "bonjour / salut" },
    { sv: "tack", fr: "merci" },
    { sv: "varsagod", fr: "de rien / je t'en prie" },
    { sv: "ja", fr: "oui" },
    { sv: "nej", fr: "non" },
    { sv: "ursakta", fr: "excusez-moi" },
    { sv: "forlat", fr: "desole" },
    { sv: "snalla", fr: "s'il te plait" },
    { sv: "god morgon", fr: "bonjour (matin)" },
    { sv: "god natt", fr: "bonne nuit" }
  ],

  "Nombres": [
    { sv: "noll", fr: "0" },
    { sv: "ett", fr: "1" },
    { sv: "tva", fr: "2" },
    { sv: "tre", fr: "3" },
    { sv: "fyra", fr: "4" },
    { sv: "fem", fr: "5" },
    { sv: "sex", fr: "6" },
    { sv: "sju", fr: "7" },
    { sv: "atta", fr: "8" },
    { sv: "nio", fr: "9" },
    { sv: "tio", fr: "10" },
    { sv: "tjugo", fr: "20" },
    { sv: "trettio", fr: "30" },
    { sv: "hundra", fr: "100" }
  ],

  "Couleurs": [
    { sv: "svart", fr: "noir" },
    { sv: "vit", fr: "blanc" },
    { sv: "rod", fr: "rouge" },
    { sv: "bla", fr: "bleu" },
    { sv: "gron", fr: "vert" },
    { sv: "gul", fr: "jaune" },
    { sv: "brun", fr: "marron" },
    { sv: "gra", fr: "gris" },
    { sv: "rosa", fr: "rose" },
    { sv: "lila", fr: "violet" }
  ],

  "Famille": [
    { sv: "mamma", fr: "maman" },
    { sv: "pappa", fr: "papa" },
    { sv: "son", fr: "fils" },
    { sv: "dotter", fr: "fille" },
    { sv: "bror", fr: "frere" },
    { sv: "syster", fr: "soeur" },
    { sv: "familj", fr: "famille" },
    { sv: "barn", fr: "enfant" },
    { sv: "man", fr: "mari / homme" },
    { sv: "fru", fr: "femme (epouse)" }
  ],

  "Nourriture": [
    { sv: "vatten", fr: "eau" },
    { sv: "kaffe", fr: "cafe" },
    { sv: "te", fr: "the" },
    { sv: "brod", fr: "pain" },
    { sv: "mjolk", fr: "lait" },
    { sv: "ost", fr: "fromage" },
    { sv: "apple", fr: "pomme" },
    { sv: "fisk", fr: "poisson" },
    { sv: "kyckling", fr: "poulet" },
    { sv: "mat", fr: "nourriture / repas" }
  ],

  "Temps": [
    { sv: "idag", fr: "aujourd'hui" },
    { sv: "imorgon", fr: "demain" },
    { sv: "igar", fr: "hier" },
    { sv: "nu", fr: "maintenant" },
    { sv: "snart", fr: "bientot" },
    { sv: "alltid", fr: "toujours" },
    { sv: "aldrig", fr: "jamais" },
    { sv: "ibland", fr: "parfois" },
    { sv: "klockan", fr: "l'heure (klockan...)" },
    { sv: "vecka", fr: "semaine" }
  ],

  "Verbes": [
    { sv: "vara", fr: "etre" },
    { sv: "ha", fr: "avoir" },
    { sv: "gora", fr: "faire" },
    { sv: "ga", fr: "aller / marcher" },
    { sv: "komma", fr: "venir" },
    { sv: "se", fr: "voir" },
    { sv: "veta", fr: "savoir" },
    { sv: "kunna", fr: "pouvoir" },
    { sv: "vilja", fr: "vouloir" },
    { sv: "prata", fr: "parler" },
    { sv: "lasa", fr: "lire / etudier" },
    { sv: "skriva", fr: "ecrire" },
    { sv: "lyssna", fr: "ecouter" },
    { sv: "forsta", fr: "comprendre" }
  ]
};
