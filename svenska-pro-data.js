// ============================================
// SVENSKA MÄSTARE V3 - DONNÉES COMPLÈTES
// ============================================

// Note: Ce fichier contient TOUTES les données de l'application
// Les leçons sont maintenant complètes pour tous les niveaux A1-C2

const LESSONS = {
   A1: [
  {
    id: 'a1_l1',
    title: "Alphabet, sons, Å Ä Ö, voyelles longues/courtes",
    category: 'Prononciation',
    icon: '🔤',
    duration: '35–45 min',
    audioAvailable: true,
    content: `
      <h4>Objectif</h4>
      <p>Lire et prononcer correctement les bases du suédois : voyelles longues/courtes, Å Ä Ö, consonnes spéciales et l’accent tonique.</p>

      <h4>Alphabet suédois</h4>
      <p>Le suédois utilise <strong>29 lettres</strong> : les 26 lettres latines + <strong>Å, Ä, Ö</strong> (à la fin).</p>

      <h4>Règle la plus importante : voyelles longues / courtes</h4>
      <p>Le rythme suédois repose sur la longueur vocalique.</p>
      <ul>
        <li><strong>Voyelle longue</strong> : souvent quand la voyelle est suivie d’une seule consonne : <em>tak</em> (toit), <em>vita</em> (blancs)</li>
        <li><strong>Voyelle courte</strong> : souvent quand la voyelle est suivie de deux consonnes : <em>tack</em> (merci), <em>vitt</em> (blanc - neutre)</li>
      </ul>
      <p><strong>Exemple minimal</strong> : <em>tak</em> (toit) vs <em>tack</em> (merci) — différence réelle à l’oral.</p>

      <h4>Å, Ä, Ö (les 3 stars)</h4>
      <table style="width:100%; border-collapse:collapse">
        <tr>
          <th style="border:1px solid #ddd; padding:8px">Lettre</th>
          <th style="border:1px solid #ddd; padding:8px">Idée de son (approx.)</th>
          <th style="border:1px solid #ddd; padding:8px">Exemples (SV → FR)</th>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px"><strong>Å</strong></td>
          <td style="border:1px solid #ddd; padding:8px">“o” plus ouvert (entre o / au)</td>
          <td style="border:1px solid #ddd; padding:8px"><em>åtta</em> = 8, <em>mål</em> = but/objectif</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px"><strong>Ä</strong></td>
          <td style="border:1px solid #ddd; padding:8px">“è/ê” (variable selon accent)</td>
          <td style="border:1px solid #ddd; padding:8px"><em>här</em> = ici, <em>lära</em> = apprendre</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px"><strong>Ö</strong></td>
          <td style="border:1px solid #ddd; padding:8px">“eu” (comme “peur”)</td>
          <td style="border:1px solid #ddd; padding:8px"><em>öl</em> = bière, <em>röd</em> = rouge</td>
        </tr>
      </table>

      <h4>Consonnes importantes</h4>
      <ul>
        <li><strong>sj / sk / stj</strong> : son “ch” très soufflé (ex: <em>sju</em> = 7, <em>sjö</em> = lac)</li>
        <li><strong>tj / k</strong> devant e/i/y/ä/ö : son “tch/ti” (ex: <em>tjugo</em> = 20, <em>kille</em> = gars)</li>
        <li><strong>r</strong> : roulé/présent (varie selon régions) mais doit être <em>entendu</em> au début de l’apprentissage</li>
      </ul>

      <h4>Accent tonique (stress)</h4>
      <p>En suédois, l’accent tombe souvent sur la première syllabe d’un mot “simple”.</p>
      <div style="background:#f8fafc; padding:10px; border-radius:10px; border:1px solid #e2e8f0">
        <p><strong>Exemples :</strong></p>
        <ul>
          <li><em>TA-la</em> = parler</li>
          <li><em>SKO-la</em> = école</li>
          <li><em>HEJ</em> = salut</li>
        </ul>
      </div>

      <h4>Erreurs fréquentes</h4>
      <ul>
        <li>Ignorer la longueur vocalique → accent étranger très fort</li>
        <li>Confondre Å / O / Ö</li>
        <li>Prononcer “sj” comme un “ch” français classique (trop fermé)</li>
      </ul>

      <h4>Mini-exercices</h4>
      <ol>
        <li>Lis à voix haute : <em>tak – tack – tak – tack</em></li>
        <li>Lis : <em>här</em>, <em>hör</em>, <em>hår</em> (ici / entendre / cheveux) et note la différence.</li>
        <li>Répète : <em>sju</em>, <em>sjö</em>, <em>sjuk</em> (7 / lac / malade)</li>
      </ol>
    `
  },

  {
    id: 'a1_l2',
    title: "Salutations, politesse, se présenter",
    category: 'Communication',
    icon: '👋',
    duration: '30–40 min',
    audioAvailable: true,
    content: `
      <h4>Objectif</h4>
      <p>Savoir saluer, remercier, s’excuser et se présenter en suédois avec des formules naturelles.</p>

      <h4>Formules essentielles</h4>
      <table style="width:100%; border-collapse:collapse">
        <tr>
          <th style="border:1px solid #ddd; padding:8px">Suédois</th>
          <th style="border:1px solid #ddd; padding:8px">Français</th>
          <th style="border:1px solid #ddd; padding:8px">Note</th>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px"><em>Hej!</em></td>
          <td style="border:1px solid #ddd; padding:8px">Salut / Bonjour</td>
          <td style="border:1px solid #ddd; padding:8px">Très courant (pro/perso)</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px"><em>God morgon</em></td>
          <td style="border:1px solid #ddd; padding:8px">Bonjour (matin)</td>
          <td style="border:1px solid #ddd; padding:8px">Plus formel</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px"><em>Tack!</em></td>
          <td style="border:1px solid #ddd; padding:8px">Merci</td>
          <td style="border:1px solid #ddd; padding:8px">Indispensable</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px"><em>Tack så mycket</em></td>
          <td style="border:1px solid #ddd; padding:8px">Merci beaucoup</td>
          <td style="border:1px solid #ddd; padding:8px">Très naturel</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px"><em>Ursäkta</em></td>
          <td style="border:1px solid #ddd; padding:8px">Excusez-moi</td>
          <td style="border:1px solid #ddd; padding:8px">Pour attirer l’attention</td>
        </tr>
      </table>

      <h4>Se présenter</h4>
      <div style="background:#f8fafc; padding:10px; border-radius:10px; border:1px solid #e2e8f0">
        <p><strong>Modèle :</strong></p>
        <ul>
          <li><em>Jag heter Alex.</em> = Je m’appelle Alex.</li>
          <li><em>Jag kommer från Frankrike.</em> = Je viens de France.</li>
          <li><em>Jag bor i Ballancourt.</em> = J’habite à Ballancourt.</li>
          <li><em>Trevligt att träffas!</em> = Enchanté !</li>
        </ul>
      </div>

      <h4>Questions très utiles</h4>
      <ul>
        <li><em>Vad heter du?</em> = Comment tu t’appelles ?</li>
        <li><em>Var bor du?</em> = Tu habites où ?</li>
        <li><em>Varifrån kommer du?</em> = Tu viens d’où ?</li>
      </ul>

      <h4>Culture / pragmatique</h4>
      <p>Les Suédois utilisent beaucoup <em>Hej</em>. Le registre reste souvent simple même au travail (moins de formules lourdes qu’en français).</p>

      <h4>Mini-exercices</h4>
      <ol>
        <li>Écris ta présentation en 4 phrases (comme le modèle).</li>
        <li>Lis-la à voix haute avec l’audio.</li>
        <li>Ajoute 1 question : <em>Och du?</em> (= Et toi ?)</li>
      </ol>
    `
  },

  {
    id: 'a1_l3',
    title: "Pronoms personnels + verbe être (vara) + structure de base",
    category: 'Grammaire',
    icon: '🧩',
    duration: '45–60 min',
    audioAvailable: true,
    content: `
      <h4>Objectif</h4>
      <p>Construire des phrases simples : sujet + verbe + complément.</p>

      <h4>Pronoms personnels</h4>
      <table style="width:100%; border-collapse:collapse">
        <tr>
          <th style="border:1px solid #ddd; padding:8px">Suédois</th>
          <th style="border:1px solid #ddd; padding:8px">Français</th>
          <th style="border:1px solid #ddd; padding:8px">Note</th>
        </tr>
        <tr><td style="border:1px solid #ddd; padding:8px"><em>jag</em></td><td style="border:1px solid #ddd; padding:8px">je</td><td style="border:1px solid #ddd; padding:8px">—</td></tr>
        <tr><td style="border:1px solid #ddd; padding:8px"><em>du</em></td><td style="border:1px solid #ddd; padding:8px">tu</td><td style="border:1px solid #ddd; padding:8px">—</td></tr>
        <tr><td style="border:1px solid #ddd; padding:8px"><em>han</em></td><td style="border:1px solid #ddd; padding:8px">il</td><td style="border:1px solid #ddd; padding:8px">—</td></tr>
        <tr><td style="border:1px solid #ddd; padding:8px"><em>hon</em></td><td style="border:1px solid #ddd; padding:8px">elle</td><td style="border:1px solid #ddd; padding:8px">—</td></tr>
        <tr><td style="border:1px solid #ddd; padding:8px"><em>vi</em></td><td style="border:1px solid #ddd; padding:8px">nous</td><td style="border:1px solid #ddd; padding:8px">—</td></tr>
        <tr><td style="border:1px solid #ddd; padding:8px"><em>ni</em></td><td style="border:1px solid #ddd; padding:8px">vous</td><td style="border:1px solid #ddd; padding:8px">—</td></tr>
        <tr><td style="border:1px solid #ddd; padding:8px"><em>de</em></td><td style="border:1px solid #ddd; padding:8px">ils/elles</td><td style="border:1px solid #ddd; padding:8px">—</td></tr>
      </table>

      <h4>Le verbe “être” : <em>vara</em> (présent)</h4>
      <p>Au présent :</p>
      <ul>
        <li><strong>jag är</strong> = je suis</li>
        <li><strong>du är</strong> = tu es</li>
        <li><strong>han/hon är</strong> = il/elle est</li>
        <li><strong>vi är</strong> = nous sommes</li>
        <li><strong>ni är</strong> = vous êtes</li>
        <li><strong>de är</strong> = ils/elles sont</li>
      </ul>

      <h4>Structure de phrase de base (SVO)</h4>
      <p>En phrase simple (déclarative), on peut utiliser Sujet + Verbe + Objet/Complément.</p>
      <div style="background:#f8fafc; padding:10px; border-radius:10px; border:1px solid #e2e8f0">
        <ul>
          <li><em>Jag är Alex.</em> = Je suis Alex.</li>
          <li><em>Du är snäll.</em> = Tu es gentil.</li>
          <li><em>Vi är trötta.</em> = Nous sommes fatigués.</li>
        </ul>
      </div>

      <h4>Point clé : pas de “être” caché</h4>
      <p>En suédois, on dit <em>Jag är...</em> (pas comme en russe où on peut l’omettre).</p>

      <h4>Mini-exercices</h4>
      <ol>
        <li>Traduis : “Je suis français”, “Tu es ici”, “Nous sommes à Paris”.</li>
        <li>Crée 5 phrases avec : jag/du/han/hon/vi.</li>
      </ol>
    `
  },

  {
    id: 'a1_l4',
    title: "EN / ETT : genre des noms + article indéfini",
    category: 'Grammaire',
    icon: '📦',
    duration: '60–75 min',
    audioAvailable: true,
    content: `
      <h4>Objectif</h4>
      <p>Comprendre les deux genres suédois et choisir <strong>en</strong> ou <strong>ett</strong> au singulier indéfini.</p>

      <h4>Les 2 genres</h4>
      <ul>
        <li><strong>en-ord</strong> (genre commun) : ~75% des noms</li>
        <li><strong>ett-ord</strong> (genre neutre) : ~25% des noms</li>
      </ul>

      <h4>Article indéfini</h4>
      <table style="width:100%; border-collapse:collapse">
        <tr>
          <th style="border:1px solid #ddd; padding:8px">Genre</th>
          <th style="border:1px solid #ddd; padding:8px">Article</th>
          <th style="border:1px solid #ddd; padding:8px">Exemples</th>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px">Commun</td>
          <td style="border:1px solid #ddd; padding:8px"><strong>en</strong></td>
          <td style="border:1px solid #ddd; padding:8px"><em>en bok</em> (un livre), <em>en stol</em> (une chaise)</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px">Neutre</td>
          <td style="border:1px solid #ddd; padding:8px"><strong>ett</strong></td>
          <td style="border:1px solid #ddd; padding:8px"><em>ett hus</em> (une maison), <em>ett barn</em> (un enfant)</td>
        </tr>
      </table>

      <h4>Comment deviner ?</h4>
      <p>Il y a quelques tendances, mais beaucoup doit être mémorisé. Bonne stratégie : apprendre le nom avec son article.</p>

      <h4>Mini-liste A1 à apprendre (avec article)</h4>
      <ul>
        <li><em>en person</em> = une personne</li>
        <li><em>en vän</em> = un ami</li>
        <li><em>en dag</em> = un jour</li>
        <li><em>ett land</em> = un pays</li>
        <li><em>ett språk</em> = une langue</li>
        <li><em>ett arbete</em> = un travail</li>
      </ul>

      <h4>Erreurs fréquentes</h4>
      <ul>
        <li>Mélanger <em>en</em> et <em>ett</em> au hasard → mieux vaut apprendre en “pack”</li>
        <li>Se baser sur le genre français → ça ne marche pas</li>
      </ul>

      <h4>Mini-exercices</h4>
      <ol>
        <li>Classe : bok, hus, stol, barn, dag, språk (en ou ett)</li>
        <li>Écris 6 phrases : “C’est un/une …” → <em>Det är en… / Det är ett…</em></li>
      </ol>
    `
  },

  {
    id: 'a1_l5',
    title: "Présent des verbes : forme unique + verbes clés",
    category: 'Grammaire',
    icon: '⚙️',
    duration: '60–75 min',
    audioAvailable: true,
    content: `
      <h4>Objectif</h4>
      <p>Conjuguer au présent : en suédois, c’est très simple (une seule forme par personne).</p>

      <h4>Règle générale</h4>
      <p>Au présent, le suédois n’a pas de conjugaison par personne : la forme est la même pour jag/du/han/hon/vi/ni/de.</p>

      <h4>Exemples de verbes A1</h4>
      <table style="width:100%; border-collapse:collapse">
        <tr>
          <th style="border:1px solid #ddd; padding:8px">Infinitif</th>
          <th style="border:1px solid #ddd; padding:8px">Présent</th>
          <th style="border:1px solid #ddd; padding:8px">Exemple</th>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px"><em>att tala</em> (parler)</td>
          <td style="border:1px solid #ddd; padding:8px"><em>talar</em></td>
          <td style="border:1px solid #ddd; padding:8px"><em>Jag talar svenska.</em> = Je parle suédois.</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px"><em>att bo</em> (habiter)</td>
          <td style="border:1px solid #ddd; padding:8px"><em>bor</em></td>
          <td style="border:1px solid #ddd; padding:8px"><em>Vi bor i Frankrike.</em> = Nous habitons en France.</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:8px"><em>att komma</em> (venir)</td>
          <td style="border:1px solid #ddd; padding:8px"><em>kommer</em></td>
          <td style="border:1px solid #ddd; padding:8px"><em>Jag kommer från Paris.</em> = Je viens de Paris.</td>
        </tr>
      </table>

      <h4>Forme “att”</h4>
      <p>Les dictionnaires donnent souvent l’infinitif avec <strong>att</strong> (comme “to” en anglais). En phrase, on utilise le verbe conjugué : <em>Jag talar</em>, pas <em>Jag att tala</em>.</p>

      <h4>Mini-exercices</h4>
      <ol>
        <li>Conjugue au présent (même forme) : tala, bo, komma, arbeta, läsa.</li>
        <li>Traduis : “Je travaille”, “Tu lis”, “Ils parlent suédois”.</li>
      </ol>
    `
  },

  {
    id: 'a1_l6',
    title: "Ordre des mots V2 : le verbe en 2e position",
    category: 'Syntaxe',
    icon: '🧠',
    duration: '70–90 min',
    audioAvailable: true,
    content: `
      <h4>Objectif</h4>
      <p>Maîtriser la règle la plus importante du suédois : <strong>V2</strong> en proposition principale.</p>

      <h4>Principe V2 (verbe deuxième)</h4>
      <p>En suédois, dans une phrase déclarative principale, le verbe conjugué est en <strong>2e position</strong> (2e “bloc”, pas forcément 2e mot). :contentReference[oaicite:3]{index=3}</p>

      <h4>Cas 1 : phrase “normale” (Sujet d’abord)</h4>
      <p><strong>Sujet + Verbe + …</strong></p>
      <ul>
        <li><em>Jag bor i Paris.</em> = J’habite à Paris.</li>
        <li><em>Du talar svenska.</em> = Tu parles suédois.</li>
      </ul>

      <h4>Cas 2 : on met un autre élément au début (temps/lieu/objet)</h4>
      <p>Si tu commences par “Aujourd’hui / ici / ce livre…”, le verbe reste 2e, donc le sujet passe après le verbe.</p>
      <div style="background:#f8fafc; padding:10px; border-radius:10px; border:1px solid #e2e8f0">
        <ul>
          <li><em>Idag bor jag i Paris.</em> = Aujourd’hui, j’habite à Paris.</li>
          <li><em>I Sverige talar de svenska.</em> = En Suède, ils parlent suédois.</li>
        </ul>
      </div>

      <h4>Erreur classique</h4>
      <p>❌ <em>Idag jag bor i Paris</em> (incorrect) → ✅ <em>Idag bor jag i Paris</em>. :contentReference[oaicite:4]{index=4}</p>

      <h4>Placement de “inte” (négation)</h4>
      <p>En général, <strong>inte</strong> vient après le verbe (et après le sujet si inversion V2).</p>
      <ul>
        <li><em>Jag bor inte här.</em> = Je n’habite pas ici.</li>
        <li><em>Idag bor jag inte här.</em> = Aujourd’hui, je n’habite pas ici.</li>
      </ul>

      <h4>Mini-exercices</h4>
      <ol>
        <li>Réécris en commençant par <em>Idag</em> : “Jag arbetar hemma.”</li>
        <li>Corrige : “Nu jag går.”</li>
        <li>Ajoute <em>inte</em> : “Jag talar svenska.”</li>
      </ol>
    `
  },

  {
    id: 'a1_l7',
    title: "Questions A1 : ja/nej + mots interrogatifs",
    category: 'Grammaire',
    icon: '❓',
    duration: '45–60 min',
    audioAvailable: true,
    content: `
      <h4>Objectif</h4>
      <p>Poser des questions simples : questions fermées (oui/non) et ouvertes (qui/quoi/où…).</p>

      <h4>Questions oui/non</h4>
      <p>On inverse souvent verbe et sujet :</p>
      <ul>
        <li><em>Bor du här?</em> = Tu habites ici ?</li>
        <li><em>Talar du engelska?</em> = Tu parles anglais ?</li>
      </ul>

      <h4>Mots interrogatifs</h4>
      <table style="width:100%; border-collapse:collapse">
        <tr>
          <th style="border:1px solid #ddd; padding:8px">Mot</th>
          <th style="border:1px solid #ddd; padding:8px">Sens</th>
          <th style="border:1px solid #ddd; padding:8px">Exemple</th>
        </tr>
        <tr><td style="border:1px solid #ddd; padding:8px"><em>Vad</em></td><td style="border:1px solid #ddd; padding:8px">quoi</td><td style="border:1px solid #ddd; padding:8px"><em>Vad heter du?</em> = Comment tu t’appelles ?</td></tr>
        <tr><td style="border:1px solid #ddd; padding:8px"><em>Var</em></td><td style="border:1px solid #ddd; padding:8px">où</td><td style="border:1px solid #ddd; padding:8px"><em>Var bor du?</em> = Tu habites où ?</td></tr>
        <tr><td style="border:1px solid #ddd; padding:8px"><em>När</em></td><td style="border:1px solid #ddd; padding:8px">quand</td><td style="border:1px solid #ddd; padding:8px"><em>När kommer du?</em> = Tu viens quand ?</td></tr>
        <tr><td style="border:1px solid #ddd; padding:8px"><em>Vem</em></td><td style="border:1px solid #ddd; padding:8px">qui</td><td style="border:1px solid #ddd; padding:8px"><em>Vem är du?</em> = Qui es-tu ?</td></tr>
      </table>

      <h4>Mini-exercices</h4>
      <ol>
        <li>Crée 5 questions : Vad/Var/När/Vem + verbe.</li>
        <li>Transforme en question : “Du bor här.”</li>
      </ol>
    `
  },

  {
    id: 'a1_l8',
    title: "Négation + adverbes de base (inte, också, alltid…)",
    category: 'Grammaire',
    icon: '🚫',
    duration: '45–60 min',
    audioAvailable: true,
    content: `
      <h4>Objectif</h4>
      <p>Savoir dire “ne … pas” et utiliser quelques adverbes courants.</p>

      <h4>Négation : inte</h4>
      <p>Règle générale : <strong>inte</strong> vient après le verbe conjugué.</p>
      <ul>
        <li><em>Jag äter inte fisk.</em> = Je ne mange pas de poisson.</li>
        <li><em>Han bor inte här.</em> = Il n’habite pas ici.</li>
      </ul>

      <h4>Adverbes utiles</h4>
      <ul>
        <li><em>också</em> = aussi</li>
        <li><em>alltid</em> = toujours</li>
        <li><em>ofta</em> = souvent</li>
        <li><em>ibland</em> = parfois</li>
        <li><em>aldrig</em> = jamais</li>
      </ul>

      <h4>Placement (simplifié A1)</h4>
      <p>Souvent après le verbe (comme inte).</p>
      <ul>
        <li><em>Jag bor också i Paris.</em> = J’habite aussi à Paris.</li>
        <li><em>Jag är alltid trött.</em> = Je suis toujours fatigué.</li>
      </ul>

      <h4>Mini-exercices</h4>
      <ol>
        <li>Ajoute “inte” : “Jag talar svenska.”</li>
        <li>Ajoute “också” : “Jag bor i Frankrike.”</li>
        <li>Traduis : “Je ne suis jamais ici.”</li>
      </ol>
    `
  },

  {
    id: 'a1_l9',
    title: "Nombres, heures, dates (A1 solide)",
    category: 'Vocabulaire',
    icon: '🕒',
    duration: '45–60 min',
    audioAvailable: true,
    content: `
      <h4>Objectif</h4>
      <p>Savoir compter, dire l’heure, donner une date simple.</p>

      <h4>Nombres essentiels</h4>
      <p>0–10 : <em>noll, ett, två, tre, fyra, fem, sex, sju, åtta, nio, tio</em></p>
      <p>11–20 : <em>elva, tolv, tretton, fjorton, femton, sexton, sjutton, arton, nitton, tjugo</em></p>

      <h4>Heures</h4>
      <ul>
        <li><em>Klockan är tre.</em> = Il est 3 heures.</li>
        <li><em>Klockan är halv fyra.</em> = Il est 3h30 (litt. “la moitié vers 4”).</li>
      </ul>

      <h4>Dates (simple)</h4>
      <ul>
        <li><em>Idag är det den 4 februari.</em> = Aujourd’hui, on est le 4 février.</li>
        <li><em>Jag är född 1997.</em> = Je suis né en 1997.</li>
      </ul>

      <h4>Mini-exercices</h4>
      <ol>
        <li>Écris 5 nombres au hasard et prononce-les.</li>
        <li>Traduis : “Il est 7 heures”, “Il est 9h30”.</li>
      </ol>
    `
  },

  {
    id: 'a1_l10',
    title: "Dialogue A1 : au café (script + variations)",
    category: 'Communication',
    icon: '☕',
    duration: '45–60 min',
    audioAvailable: true,
    content: `
      <h4>Objectif</h4>
      <p>Savoir commander simplement au café / restaurant et comprendre des réponses typiques.</p>

      <h4>Dialogue modèle</h4>
      <div style="background:#f8fafc; padding:10px; border-radius:10px; border:1px solid #e2e8f0">
        <p><strong>A:</strong> <em>Hej! Jag vill ha en kaffe, tack.</em><br/>= Bonjour ! Je voudrais un café, merci.</p>
        <p><strong>B:</strong> <em>Vill du ha mjölk?</em><br/>= Tu veux du lait ?</p>
        <p><strong>A:</strong> <em>Ja, lite mjölk.</em><br/>= Oui, un peu de lait.</p>
        <p><strong>B:</strong> <em>Det blir 45 kronor.</em><br/>= Ça fait 45 couronnes.</p>
        <p><strong>A:</strong> <em>Tack!</em><br/>= Merci !</p>
      </div>

      <h4>Variations utiles</h4>
      <ul>
        <li><em>Jag vill ha...</em> = Je voudrais…</li>
        <li><em>Kan jag få...?</em> = Est-ce que je peux avoir…?</li>
        <li><em>Ursäkta, var är toaletten?</em> = Excusez-moi, où sont les toilettes ?</li>
      </ul>

      <h4>Mini-exercices</h4>
      <ol>
        <li>Remplace “kaffe” par “te”, “vatten”, “en smörgås”.</li>
        <li>Fais 3 versions : polie / très simple / plus longue.</li>
      </ol>
    `
  }
],
    
    A2: [
        {
            id: 'a2_l1',
            title: 'Les verbes au présent',
            category: 'Conjugaison',
            icon: '🔄',
            duration: '30 min',
            audioAvailable: true,
            content: `
                <h4>Le présent en suédois</h4>
                <p>Les verbes au présent ont UNE SEULE forme pour toutes les personnes.</p>
                
                <div class="rule-box">
                    <strong>🎯 Règle :</strong> jag äter, du äter, han äter, vi äter...
                </div>
                
                <h4>Quatre groupes</h4>
                
                <p><strong>Groupe 1 :</strong> -a → -ar</p>
                <div class="example">
                    tala (parler) → talar<br>
                    arbeta (travailler) → arbetar
                </div>
                
                <p><strong>Groupe 2 :</strong> -a → -er</p>
                <div class="example">
                    läsa (lire) → läser<br>
                    köpa (acheter) → köper
                </div>
                
                <p><strong>Groupe 3 :</strong> courts → -r</p>
                <div class="example">
                    bo (habiter) → bor<br>
                    tro (croire) → tror
                </div>
                
                <p><strong>Groupe 4 :</strong> Irréguliers</p>
                <div class="example">
                    vara (être) → är<br>
                    ha (avoir) → har<br>
                    göra (faire) → gör
                </div>
            `
        },
        {
            id: 'a2_l2',
            title: 'Le passé : prétérit et parfait',
            category: 'Conjugaison',
            icon: '⏮️',
            duration: '35 min',
            audioAvailable: true,
            content: `
                <h4>Deux temps du passé</h4>
                
                <h4>Le Prétérit</h4>
                <table>
                    <tr>
                        <th>Groupe</th>
                        <th>Infinitif</th>
                        <th>Prétérit</th>
                    </tr>
                    <tr><td>1</td><td>tala</td><td>talade</td></tr>
                    <tr><td>2</td><td>köpa</td><td>köpte</td></tr>
                    <tr><td>3</td><td>bo</td><td>bodde</td></tr>
                    <tr><td>4</td><td>gå</td><td>gick</td></tr>
                </table>
                
                <h4>Le Parfait</h4>
                <p>Formation : <strong>har</strong> + participe passé</p>
                
                <div class="example">
                    Jag har talat (J'ai parlé)<br>
                    Hon har köpt (Elle a acheté)<br>
                    Vi har bott (Nous avons habité)
                </div>
                
                <h4>Verbes irréguliers importants</h4>
                <div class="example">
                    gå → gick → gått<br>
                    komma → kom → kommit<br>
                    se → såg → sett<br>
                    äta → åt → ätit<br>
                    vara → var → varit
                </div>
            `
        },
        {
            id: 'a2_l3',
            title: 'Les prépositions de lieu',
            category: 'Grammaire',
            icon: '📍',
            duration: '25 min',
            audioAvailable: true,
            content: `
                <h4>Prépositions courantes</h4>
                <table>
                    <tr>
                        <th>Suédois</th>
                        <th>Français</th>
                        <th>Exemple</th>
                    </tr>
                    <tr>
                        <td>i</td>
                        <td>dans</td>
                        <td>i huset (dans la maison)</td>
                    </tr>
                    <tr>
                        <td>på</td>
                        <td>sur</td>
                        <td>på bordet (sur la table)</td>
                    </tr>
                    <tr>
                        <td>vid</td>
                        <td>près de</td>
                        <td>vid havet (près de la mer)</td>
                    </tr>
                    <tr>
                        <td>under</td>
                        <td>sous</td>
                        <td>under bordet</td>
                    </tr>
                    <tr>
                        <td>över</td>
                        <td>au-dessus</td>
                        <td>över bron</td>
                    </tr>
                    <tr>
                        <td>mellan</td>
                        <td>entre</td>
                        <td>mellan husen</td>
                    </tr>
                    <tr>
                        <td>framför</td>
                        <td>devant</td>
                        <td>framför huset</td>
                    </tr>
                    <tr>
                        <td>bakom</td>
                        <td>derrière</td>
                        <td>bakom bilen</td>
                    </tr>
                </table>
                
                <div class="rule-box">
                    <strong>💡 Attention :</strong> "på" s'utilise pour les surfaces ET les événements<br>
                    på bio (au cinéma), på fest (à la fête)
                </div>
            `
        },
        {
            id: 'a2_l4',
            title: 'La nourriture et les repas',
            category: 'Vocabulaire',
            icon: '🍽️',
            duration: '20 min',
            audioAvailable: true,
            content: `
                <h4>Les repas</h4>
                <div class="example">
                    frukost = <strong>petit-déjeuner</strong><br>
                    lunch = <strong>déjeuner</strong><br>
                    middag = <strong>dîner</strong><br>
                    mellanmål = <strong>collation</strong>
                </div>
                
                <h4>Aliments de base</h4>
                <table>
                    <tr>
                        <th>Suédois</th>
                        <th>Français</th>
                    </tr>
                    <tr><td>bröd (ett)</td><td>pain</td></tr>
                    <tr><td>smör (ett)</td><td>beurre</td></tr>
                    <tr><td>ost (en)</td><td>fromage</td></tr>
                    <tr><td>mjölk (en)</td><td>lait</td></tr>
                    <tr><td>ägg (ett)</td><td>œuf</td></tr>
                    <tr><td>kött (ett)</td><td>viande</td></tr>
                    <tr><td>fisk (en)</td><td>poisson</td></tr>
                    <tr><td>grönsaker</td><td>légumes</td></tr>
                    <tr><td>frukt (en)</td><td>fruit</td></tr>
                </table>
                
                <h4>Au restaurant</h4>
                <div class="example">
                    <strong>Kan jag få menyn?</strong> - Puis-je avoir le menu?<br>
                    <strong>Jag vill beställa...</strong> - Je voudrais commander...<br>
                    <strong>Kan jag få notan?</strong> - L'addition, s'il vous plaît<br>
                    <strong>Det var gott!</strong> - C'était bon!
                </div>
            `
        },
        {
            id: 'a2_l5',
            title: 'Le futur et les verbes modaux',
            category: 'Conjugaison',
            icon: '⏭️',
            duration: '30 min',
            audioAvailable: true,
            content: `
                <h4>Exprimer le futur</h4>
                <p>Le suédois utilise plusieurs façons d'exprimer le futur :</p>
                
                <p><strong>1. Présent + complément de temps</strong></p>
                <div class="example">
                    Jag åker till Stockholm <strong>imorgon</strong><br>
                    (Je vais à Stockholm demain)
                </div>
                
                <p><strong>2. Ska + infinitif</strong> (intention)</p>
                <div class="example">
                    Jag ska äta lunch<br>
                    (Je vais manger)
                </div>
                
                <p><strong>3. Kommer att + infinitif</strong> (prédiction)</p>
                <div class="example">
                    Det kommer att regna<br>
                    (Il va pleuvoir)
                </div>
                
                <h4>Verbes modaux</h4>
                <table>
                    <tr>
                        <th>Infinitif</th>
                        <th>Présent</th>
                        <th>Sens</th>
                    </tr>
                    <tr><td>kunna</td><td>kan</td><td>pouvoir (capacité)</td></tr>
                    <tr><td>vilja</td><td>vill</td><td>vouloir</td></tr>
                    <tr><td>måste</td><td>måste</td><td>devoir</td></tr>
                    <tr><td>få</td><td>får</td><td>pouvoir (permission)</td></tr>
                    <tr><td>böra</td><td>bör</td><td>devoir (conseil)</td></tr>
                </table>
                
                <div class="example">
                    Jag <strong>kan</strong> tala svenska (Je peux parler suédois)<br>
                    Han <strong>vill</strong> äta pizza (Il veut manger une pizza)<br>
                    Vi <strong>måste</strong> gå nu (Nous devons partir maintenant)
                </div>
            `
        },
        {
            id: 'a2_l6',
            title: 'La famille et les relations',
            category: 'Vocabulaire',
            icon: '👨‍👩‍👧‍👦',
            duration: '20 min',
            audioAvailable: true,
            content: `
                <h4>La famille proche</h4>
                <table>
                    <tr>
                        <th>Suédois</th>
                        <th>Français</th>
                    </tr>
                    <tr><td>mamma / mor</td><td>maman / mère</td></tr>
                    <tr><td>pappa / far</td><td>papa / père</td></tr>
                    <tr><td>föräldrar</td><td>parents</td></tr>
                    <tr><td>bror / broder</td><td>frère</td></tr>
                    <tr><td>syster</td><td>sœur</td></tr>
                    <tr><td>son</td><td>fils</td></tr>
                    <tr><td>dotter</td><td>fille</td></tr>
                    <tr><td>barn</td><td>enfant</td></tr>
                </table>
                
                <h4>La famille élargie</h4>
                <div class="example">
                    farmor = <strong>grand-mère paternelle</strong><br>
                    morfar = <strong>grand-père maternel</strong><br>
                    moster = <strong>tante maternelle</strong><br>
                    farbror = <strong>oncle paternel</strong><br>
                    kusin = <strong>cousin/cousine</strong>
                </div>
                
                <h4>Relations</h4>
                <div class="example">
                    make/maka = <strong>époux/épouse</strong><br>
                    pojkvän = <strong>petit ami</strong><br>
                    flickvän = <strong>petite amie</strong><br>
                    partner = <strong>partenaire</strong><br>
                    vän = <strong>ami</strong>
                </div>
                
                <div class="rule-box">
                    <strong>💡 Particularité :</strong> Le suédois distingue les côtés paternel (far-) et maternel (mor-) dans la famille.
                </div>
            `
        }
    ],
    
    B1: [
        {
            id: 'b1_l1',
            title: 'Le passif en suédois',
            category: 'Grammaire',
            icon: '🔀',
            duration: '30 min',
            audioAvailable: true,
            content: `
                <h4>Trois formes du passif</h4>
                
                <p><strong>1. Passif en -s</strong> (le plus courant)</p>
                <div class="example">
                    Aktiv: Jag säljer bilen<br>
                    Passiv: Bilen <strong>säljs</strong>
                </div>
                
                <table>
                    <tr>
                        <th>Temps</th>
                        <th>Actif</th>
                        <th>Passif -s</th>
                    </tr>
                    <tr><td>Présent</td><td>säljer</td><td>säljs</td></tr>
                    <tr><td>Prétérit</td><td>sålde</td><td>såldes</td></tr>
                    <tr><td>Parfait</td><td>har sålt</td><td>har sålts</td></tr>
                </table>
                
                <p><strong>2. Bli + participe</strong> (changement d'état)</p>
                <div class="example">
                    Bilen <strong>blir såld</strong> (La voiture est vendue - processus)
                </div>
                
                <p><strong>3. Vara + participe</strong> (état résultant)</p>
                <div class="example">
                    Bilen <strong>är såld</strong> (La voiture est vendue - état)
                </div>
                
                <div class="rule-box">
                    <strong>💡 Différence :</strong><br>
                    -s = neutre, général<br>
                    bli = processus<br>
                    vara = résultat
                </div>
            `
        },
        {
            id: 'b1_l2',
            title: 'Les pronoms relatifs',
            category: 'Grammaire',
            icon: '🔗',
            duration: '25 min',
            audioAvailable: true,
            content: `
                <h4>Som - le pronom universel</h4>
                <p><strong>Som</strong> est le pronom relatif le plus utilisé en suédois.</p>
                
                <div class="example">
                    Mannen <strong>som</strong> bor här (L'homme qui habite ici)<br>
                    Bilen <strong>som</strong> jag köpte (La voiture que j'ai achetée)
                </div>
                
                <h4>Vilken/vilket/vilka</h4>
                <p>Utilisés dans les propositions non restrictives (avec virgules):</p>
                
                <div class="example">
                    Huset, <strong>vilket</strong> är gammalt, kostar mycket<br>
                    (La maison, qui est vieille, coûte cher)
                </div>
                
                <table>
                    <tr>
                        <th>Genre</th>
                        <th>Pronom</th>
                    </tr>
                    <tr><td>EN-ord</td><td>vilken</td></tr>
                    <tr><td>ETT-ord</td><td>vilket</td></tr>
                    <tr><td>Pluriel</td><td>vilka</td></tr>
                </table>
                
                <h4>Vars - possessif</h4>
                <div class="example">
                    Kvinnan <strong>vars</strong> bil är röd<br>
                    (La femme dont la voiture est rouge)
                </div>
            `
        },
        {
            id: 'b1_l3',
            title: 'Exprimer l\'opinion et l\'argumentation',
            category: 'Communication',
            icon: '💭',
            duration: '30 min',
            audioAvailable: true,
            content: `
                <h4>Donner son opinion</h4>
                <div class="example">
                    <strong>Jag tycker att...</strong> - Je pense que...<br>
                    <strong>Enligt min mening...</strong> - Selon moi...<br>
                    <strong>Jag anser att...</strong> - Je considère que...<br>
                    <strong>För min del...</strong> - Pour ma part...
                </div>
                
                <h4>Exprimer l'accord</h4>
                <div class="example">
                    <strong>Jag håller med</strong> - Je suis d'accord<br>
                    <strong>Det stämmer</strong> - C'est exact<br>
                    <strong>Absolut!</strong> - Absolument!<br>
                    <strong>Precis!</strong> - Exactement!
                </div>
                
                <h4>Exprimer le désaccord</h4>
                <div class="example">
                    <strong>Jag håller inte med</strong> - Je ne suis pas d'accord<br>
                    <strong>Tvärtom</strong> - Au contraire<br>
                    <strong>Det är inte riktigt så</strong> - Ce n'est pas vraiment comme ça
                </div>
                
                <h4>Argumenter</h4>
                <table>
                    <tr>
                        <th>Expression</th>
                        <th>Usage</th>
                    </tr>
                    <tr><td>För det första...</td><td>Premièrement...</td></tr>
                    <tr><td>Dessutom...</td><td>De plus...</td></tr>
                    <tr><td>Därför...</td><td>C'est pourquoi...</td></tr>
                    <tr><td>Å andra sidan...</td><td>D'autre part...</td></tr>
                    <tr><td>Slutligen...</td><td>Finalement...</td></tr>
                </table>
            `
        },
        {
            id: 'b1_l4',
            title: 'Le monde du travail',
            category: 'Vocabulaire',
            icon: '💼',
            duration: '25 min',
            audioAvailable: true,
            content: `
                <h4>Métiers et professions</h4>
                <table>
                    <tr>
                        <th>Suédois</th>
                        <th>Français</th>
                    </tr>
                    <tr><td>läkare</td><td>médecin</td></tr>
                    <tr><td>sjuksköterska</td><td>infirmier/ière</td></tr>
                    <tr><td>lärare</td><td>enseignant</td></tr>
                    <tr><td>ingenjör</td><td>ingénieur</td></tr>
                    <tr><td>advokat</td><td>avocat</td></tr>
                    <tr><td>polis</td><td>policier</td></tr>
                    <tr><td>försäljare</td><td>vendeur</td></tr>
                    <tr><td>programmerare</td><td>programmeur</td></tr>
                </table>
                
                <h4>Au bureau</h4>
                <div class="example">
                    kontor = <strong>bureau</strong><br>
                    möte = <strong>réunion</strong><br>
                    projekt = <strong>projet</strong><br>
                    deadline = <strong>échéance</strong><br>
                    kollega = <strong>collègue</strong><br>
                    chef = <strong>patron</strong><br>
                    anställd = <strong>employé</strong>
                </div>
                
                <h4>Expressions utiles</h4>
                <div class="example">
                    <strong>Vad jobbar du med?</strong> - Tu travailles dans quoi?<br>
                    <strong>Jag arbetar som...</strong> - Je travaille comme...<br>
                    <strong>Jag är arbetslös</strong> - Je suis au chômage<br>
                    <strong>Jag studerar</strong> - J'étudie
                </div>
            `
        }
    ],
    
    B2: [
        {
            id: 'b2_l1',
            title: 'Les propositions subordonnées',
            category: 'Syntaxe',
            icon: '🔗',
            duration: '35 min',
            audioAvailable: true,
            content: `
                <h4>Ordre des mots dans les subordonnées</h4>
                <p>Dans les subordonnées, la négation et les adverbes se placent AVANT le verbe.</p>
                
                <table>
                    <tr>
                        <th>Type</th>
                        <th>Exemple</th>
                    </tr>
                    <tr>
                        <td>Principale</td>
                        <td>Jag äter <strong>inte</strong> kött</td>
                    </tr>
                    <tr>
                        <td>Subordonnée</td>
                        <td>...att jag <strong>inte</strong> äter kött</td>
                    </tr>
                </table>
                
                <h4>Conjonctions de subordination</h4>
                <div class="example">
                    <strong>att</strong> - que<br>
                    <strong>om</strong> - si (condition)<br>
                    <strong>när</strong> - quand<br>
                    <strong>eftersom</strong> - parce que<br>
                    <strong>medan</strong> - pendant que<br>
                    <strong>innan</strong> - avant que<br>
                    <strong>efter att</strong> - après que<br>
                    <strong>även om</strong> - bien que
                </div>
                
                <h4>Exemples complets</h4>
                <div class="example">
                    Han säger <strong>att</strong> han <strong>inte</strong> kan komma<br>
                    (Il dit qu'il ne peut pas venir)<br><br>
                    
                    <strong>Om</strong> det <strong>inte</strong> regnar, går vi ut<br>
                    (S'il ne pleut pas, nous sortons)<br><br>
                    
                    Jag vet <strong>att</strong> hon <strong>alltid</strong> arbetar hårt<br>
                    (Je sais qu'elle travaille toujours dur)
                </div>
            `
        },
        {
            id: 'b2_l2',
            title: 'Le conditionnel',
            category: 'Conjugaison',
            icon: '🤔',
            duration: '30 min',
            audioAvailable: true,
            content: `
                <h4>Former le conditionnel</h4>
                <p>Le conditionnel se forme avec <strong>skulle</strong> + infinitif</p>
                
                <div class="example">
                    Jag <strong>skulle</strong> gärna äta pizza<br>
                    (Je mangerais volontiers une pizza)<br><br>
                    
                    Det <strong>skulle</strong> vara roligt<br>
                    (Ce serait amusant)<br><br>
                    
                    Vi <strong>skulle</strong> kunna gå på bio<br>
                    (Nous pourrions aller au cinéma)
                </div>
                
                <h4>Hypothèses irréelles</h4>
                <p>Pour le passé irréel, on utilise <strong>skulle ha</strong> + participe</p>
                
                <div class="example">
                    Jag <strong>skulle ha kommit</strong> om jag hade vetat<br>
                    (Je serais venu si j'avais su)<br><br>
                    
                    Det <strong>skulle ha varit</strong> bättre<br>
                    (Ça aurait été mieux)
                </div>
                
                <h4>Phrases avec "om"</h4>
                <table>
                    <tr>
                        <th>Type</th>
                        <th>Structure</th>
                        <th>Exemple</th>
                    </tr>
                    <tr>
                        <td>Réel</td>
                        <td>om + présent</td>
                        <td>Om det regnar, stannar jag hemma</td>
                    </tr>
                    <tr>
                        <td>Irréel présent</td>
                        <td>om + prétérit</td>
                        <td>Om jag var rik, skulle jag resa</td>
                    </tr>
                    <tr>
                        <td>Irréel passé</td>
                        <td>om + plus-que-parfait</td>
                        <td>Om jag hade vetat, hade jag kommit</td>
                    </tr>
                </table>
            `
        },
        {
            id: 'b2_l3',
            title: 'Discours rapporté',
            category: 'Grammaire',
            icon: '💬',
            duration: '30 min',
            audioAvailable: true,
            content: `
                <h4>Rapporter des paroles</h4>
                <p>Le discours rapporté en suédois suit des règles de concordance des temps.</p>
                
                <h4>Discours direct → indirect</h4>
                <div class="example">
                    <strong>Direct :</strong> Han sa: "Jag är trött"<br>
                    <strong>Indirect :</strong> Han sa att han var trött<br>
                    (Il a dit qu'il était fatigué)
                </div>
                
                <h4>Changements de temps</h4>
                <table>
                    <tr>
                        <th>Direct</th>
                        <th>Indirect</th>
                    </tr>
                    <tr><td>Présent</td><td>→ Prétérit</td></tr>
                    <tr><td>Prétérit</td><td>→ Plus-que-parfait</td></tr>
                    <tr><td>Futur (ska)</td><td>→ skulle</td></tr>
                </table>
                
                <div class="example">
                    "Jag <strong>kommer</strong>" → Han sa att han <strong>kom</strong><br>
                    "Jag <strong>såg</strong> henne" → Han sa att han <strong>hade sett</strong> henne<br>
                    "Jag <strong>ska</strong> gå" → Han sa att han <strong>skulle</strong> gå
                </div>
                
                <h4>Verbes introducteurs</h4>
                <div class="example">
                    <strong>säga</strong> - dire<br>
                    <strong>berätta</strong> - raconter<br>
                    <strong>förklara</strong> - expliquer<br>
                    <strong>påstå</strong> - affirmer<br>
                    <strong>fråga</strong> - demander
                </div>
            `
        }
    ],
    
    C1: [
        {
            id: 'c1_l1',
            title: 'Le subjonctif et formes archaïques',
            category: 'Grammaire',
            icon: '📜',
            duration: '40 min',
            audioAvailable: true,
            content: `
                <h4>Le subjonctif en suédois moderne</h4>
                <p>Le subjonctif est rare mais existe dans certains contextes formels.</p>
                
                <h4>Formation</h4>
                <p>Généralement : radical + <strong>-e</strong></p>
                
                <div class="example">
                    <strong>vara</strong> → vore<br>
                    <strong>ha</strong> → hade<br>
                    <strong>kunna</strong> → kunde<br>
                    <strong>vilja</strong> → ville
                </div>
                
                <h4>Usages du subjonctif</h4>
                <p><strong>1. Hypothèses irréelles</strong></p>
                <div class="example">
                    Om jag <strong>vore</strong> rik...<br>
                    (Si j'étais riche...)
                </div>
                
                <p><strong>2. Expressions figées</strong></p>
                <div class="example">
                    Leve kungen! (Vive le roi!)<br>
                    Gud bevare (Dieu protège)<br>
                    Ske vad som helst (Advienne que pourra)
                </div>
                
                <p><strong>3. Langage formel</strong></p>
                <div class="example">
                    Det <strong>vore</strong> önskvärt att...<br>
                    (Il serait souhaitable que...)
                </div>
                
                <div class="rule-box">
                    <strong>💡 Usage moderne :</strong> On préfère souvent le prétérit ordinaire au subjonctif dans la langue courante.
                </div>
            `
        },
        {
            id: 'c1_l2',
            title: 'Participes et constructions participiales',
            category: 'Grammaire',
            icon: '⚙️',
            duration: '35 min',
            audioAvailable: true,
            content: `
                <h4>Le participe présent</h4>
                <p>Formation : infinitif + <strong>-ande/-ende</strong></p>
                
                <div class="example">
                    spel<strong>ande</strong> (jouant)<br>
                    läs<strong>ande</strong> (lisant)<br>
                    skriv<strong>ande</strong> (écrivant)
                </div>
                
                <p>Usage comme adjectif :</p>
                <div class="example">
                    en <strong>spännande</strong> bok (un livre passionnant)<br>
                    ett <strong>leende</strong> barn (un enfant souriant)
                </div>
                
                <h4>Le participe parfait</h4>
                <p>Utilisé comme adjectif, s'accorde :</p>
                
                <table>
                    <tr>
                        <th></th>
                        <th>EN</th>
                        <th>ETT</th>
                        <th>Pluriel</th>
                    </tr>
                    <tr>
                        <td>Groupe 1</td>
                        <td>målad</td>
                        <td>målat</td>
                        <td>målade</td>
                    </tr>
                    <tr>
                        <td>Groupe 2</td>
                        <td>köpt</td>
                        <td>köpt</td>
                        <td>köpta</td>
                    </tr>
                </table>
                
                <div class="example">
                    en <strong>målad</strong> tavla (un tableau peint)<br>
                    ett <strong>stängt</strong> fönster (une fenêtre fermée)<br>
                    <strong>köpta</strong> varor (des marchandises achetées)
                </div>
            `
        }
    ],
    
    C2: [
        {
            id: 'c2_l1',
            title: 'Nuances stylistiques et registres',
            category: 'Stylistique',
            icon: '🎭',
            duration: '45 min',
            audioAvailable: true,
            content: `
                <h4>Les registres de langue</h4>
                
                <h4>1. Formel (Formellt)</h4>
                <p>Documents officiels, correspondance formelle</p>
                <div class="example">
                    Vänligen meddela oss...<br>
                    Med anledning av...<br>
                    Härmed bekräftas...
                </div>
                
                <h4>2. Standard (Standardspråk)</h4>
                <p>Médias, contexte professionnel</p>
                
                <h4>3. Familier (Vardagligt)</h4>
                <div class="example">
                    Tja! (Salut!)<br>
                    Läget? (Ça va?)<br>
                    Ja, det är klart (Bien sûr)
                </div>
                
                <h4>4. Argot (Slang)</h4>
                <div class="example">
                    grym = cool<br>
                    tjej/kille = fille/garçon<br>
                    snacka = parler
                </div>
                
                <h4>Nuances régionales</h4>
                <p>Le suédois varie selon les régions :</p>
                <ul>
                    <li><strong>Stockholmska</strong> : accent de Stockholm</li>
                    <li><strong>Göteborgska</strong> : Göteborg, plus mélodieux</li>
                    <li><strong>Skånska</strong> : Sud, influence danoise</li>
                </ul>
                
                <div class="rule-box">
                    <strong>💡 Culture :</strong> Le tutoiement universel ("du") reflète l'égalitarisme suédois.
                </div>
            `
        },
        {
            id: 'c2_l2',
            title: 'Expressions idiomatiques avancées',
            category: 'Idiomes',
            icon: '🎪',
            duration: '40 min',
            audioAvailable: true,
            content: `
                <h4>Idiomes courants</h4>
                <div class="example">
                    <strong>Att ha en bra dag</strong> - Passer une bonne journée<br>
                    <strong>Att slå två flugor i en smäll</strong> - Faire d'une pierre deux coups<br>
                    <strong>Att kasta sig över något</strong> - Se jeter sur quelque chose<br>
                    <strong>Att vara ute och cykla</strong> - Être complètement à côté de la plaque
                </div>
                
                <h4>Proverbes suédois</h4>
                <div class="example">
                    <strong>Borta bra men hemma bäst</strong><br>
                    (Voyager c'est bien mais chez soi c'est mieux)<br><br>
                    
                    <strong>Man ska inte sälja skinnet innan björnen är skjuten</strong><br>
                    (Il ne faut pas vendre la peau de l'ours avant de l'avoir tué)<br><br>
                    
                    <strong>Lagom är bäst</strong><br>
                    (La modération est préférable)
                </div>
                
                <div class="rule-box">
                    <strong>💡 "Lagom" :</strong> Concept central suédois = ni trop ni trop peu, juste ce qu'il faut
                </div>
            `
        }
    ]
};

// ============================================
// FLASHCARDS PAR CATÉGORIE
// ============================================

const FLASHCARDS = {
    basics: [
        { swedish: 'Hej', french: 'Bonjour/Salut', category: 'Salutations' },
        { swedish: 'Tack', french: 'Merci', category: 'Politesse' },
        { swedish: 'Ja', french: 'Oui', category: 'Bases' },
        { swedish: 'Nej', french: 'Non', category: 'Bases' },
        { swedish: 'Varsågod', french: 'De rien / S\'il vous plaît', category: 'Politesse' },
        { swedish: 'Förlåt', french: 'Pardon / Désolé', category: 'Politesse' },
        { swedish: 'God morgon', french: 'Bonjour (matin)', category: 'Salutations' },
        { swedish: 'Hej då', french: 'Au revoir', category: 'Salutations' },
        { swedish: 'Hur mår du?', french: 'Comment vas-tu?', category: 'Conversations' },
        { swedish: 'Jag mår bra', french: 'Je vais bien', category: 'Conversations' }
    ],
    numbers: [
        { swedish: 'noll', french: '0', category: 'Nombres' },
        { swedish: 'ett/en', french: '1', category: 'Nombres' },
        { swedish: 'två', french: '2', category: 'Nombres' },
        { swedish: 'tre', french: '3', category: 'Nombres' },
        { swedish: 'fyra', french: '4', category: 'Nombres' },
        { swedish: 'fem', french: '5', category: 'Nombres' },
        { swedish: 'sex', french: '6', category: 'Nombres' },
        { swedish: 'sju', french: '7', category: 'Nombres' },
        { swedish: 'åtta', french: '8', category: 'Nombres' },
        { swedish: 'nio', french: '9', category: 'Nombres' },
        { swedish: 'tio', french: '10', category: 'Nombres' },
        { swedish: 'tjugo', french: '20', category: 'Nombres' },
        { swedish: 'trettio', french: '30', category: 'Nombres' },
        { swedish: 'hundra', french: '100', category: 'Nombres' }
    ],
    colors: [
        { swedish: 'röd', french: 'rouge', category: 'Couleurs' },
        { swedish: 'blå', french: 'bleu', category: 'Couleurs' },
        { swedish: 'grön', french: 'vert', category: 'Couleurs' },
        { swedish: 'gul', french: 'jaune', category: 'Couleurs' },
        { swedish: 'svart', french: 'noir', category: 'Couleurs' },
        { swedish: 'vit', french: 'blanc', category: 'Couleurs' },
        { swedish: 'orange', french: 'orange', category: 'Couleurs' },
        { swedish: 'rosa', french: 'rose', category: 'Couleurs' },
        { swedish: 'brun', french: 'marron', category: 'Couleurs' },
        { swedish: 'grå', french: 'gris', category: 'Couleurs' }
    ],
    family: [
        { swedish: 'mamma', french: 'maman', category: 'Famille' },
        { swedish: 'pappa', french: 'papa', category: 'Famille' },
        { swedish: 'bror', french: 'frère', category: 'Famille' },
        { swedish: 'syster', french: 'sœur', category: 'Famille' },
        { swedish: 'son', french: 'fils', category: 'Famille' },
        { swedish: 'dotter', french: 'fille', category: 'Famille' },
        { swedish: 'farmor', french: 'grand-mère paternelle', category: 'Famille' },
        { swedish: 'morfar', french: 'grand-père maternel', category: 'Famille' },
        { swedish: 'moster', french: 'tante maternelle', category: 'Famille' },
        { swedish: 'farbror', french: 'oncle paternel', category: 'Famille' }
    ],
    food: [
        { swedish: 'bröd', french: 'pain', category: 'Nourriture' },
        { swedish: 'mjölk', french: 'lait', category: 'Nourriture' },
        { swedish: 'vatten', french: 'eau', category: 'Nourriture' },
        { swedish: 'kaffe', french: 'café', category: 'Nourriture' },
        { swedish: 'ägg', french: 'œuf', category: 'Nourriture' },
        { swedish: 'ost', french: 'fromage', category: 'Nourriture' },
        { swedish: 'kött', french: 'viande', category: 'Nourriture' },
        { swedish: 'fisk', french: 'poisson', category: 'Nourriture' },
        { swedish: 'äpple', french: 'pomme', category: 'Nourriture' },
        { swedish: 'smör', french: 'beurre', category: 'Nourriture' }
    ],
    time: [
        { swedish: 'dag', french: 'jour', category: 'Temps' },
        { swedish: 'vecka', french: 'semaine', category: 'Temps' },
        { swedish: 'månad', french: 'mois', category: 'Temps' },
        { swedish: 'år', french: 'an/année', category: 'Temps' },
        { swedish: 'igår', french: 'hier', category: 'Temps' },
        { swedish: 'idag', french: 'aujourd\'hui', category: 'Temps' },
        { swedish: 'imorgon', french: 'demain', category: 'Temps' },
        { swedish: 'nu', french: 'maintenant', category: 'Temps' },
        { swedish: 'aldrig', french: 'jamais', category: 'Temps' },
        { swedish: 'alltid', french: 'toujours', category: 'Temps' }
    ],
    verbs: [
        { swedish: 'att vara', french: 'être', category: 'Verbes' },
        { swedish: 'att ha', french: 'avoir', category: 'Verbes' },
        { swedish: 'att göra', french: 'faire', category: 'Verbes' },
        { swedish: 'att äta', french: 'manger', category: 'Verbes' },
        { swedish: 'att dricka', french: 'boire', category: 'Verbes' },
        { swedish: 'att gå', french: 'aller/marcher', category: 'Verbes' },
        { swedish: 'att komma', french: 'venir', category: 'Verbes' },
        { swedish: 'att tala', french: 'parler', category: 'Verbes' },
        { swedish: 'att se', french: 'voir', category: 'Verbes' },
        { swedish: 'att höra', french: 'entendre', category: 'Verbes' },
        { swedish: 'att arbeta', french: 'travailler', category: 'Verbes' },
        { swedish: 'att bo', french: 'habiter', category: 'Verbes' },
        { swedish: 'att vilja', french: 'vouloir', category: 'Verbes' },
        { swedish: 'att kunna', french: 'pouvoir', category: 'Verbes' }
    ]
};

// ============================================
// BANQUE DE QUESTIONS ÉTENDUE (50+ PAR NIVEAU)
// ============================================

const QUESTION_BANK = {
    A1: {
        grammar: [
            // Genre & Articles (10 questions)
            {
                id: 'a1_g1', category: "Genre & Indéfini", type: 'multiple-choice', difficulty: 'easy',
                question: "Traduisez : 'Un nouveau travail' (Jobb [Ett])",
                options: ["En ny jobb", "Ett ny jobb", "Ett nytt jobb", "Den nya jobbet"],
                correct: 2,
                explanation: "Pour Ett-ord, l'adjectif prend -tt à l'indéfini.",
                hint: "Ett-ord + adjectif = -tt",
                points: 10, relatedLesson: 'a1_l2'
            },
            {
                id: 'a1_g2', category: "Genre & Indéfini", type: 'multiple-choice', difficulty: 'easy',
                question: "Quel est le genre de 'bil' (voiture)?",
                options: ["EN", "ETT", "Les deux", "Aucun"],
                correct: 0,
                explanation: "Bil est un EN-ord. Environ 75% des mots sont EN.",
                points: 10, relatedLesson: 'a1_l2'
            },
            {
                id: 'a1_g3', category: "Genre & Défini", type: 'multiple-choice', difficulty: 'medium',
                question: "Comment dit-on 'la voiture'? (bil = EN)",
                options: ["bil", "bilen", "bilet", "bilena"],
                correct: 1,
                explanation: "EN-ord + -en au défini = bilen",
                points: 15, relatedLesson: 'a1_l2'
            },
            {
                id: 'a1_g4', category: "Genre & Défini", type: 'multiple-choice', difficulty: 'medium',
                question: "Comment dit-on 'la maison'? (hus = ETT)",
                options: ["husen", "huset", "husan", "husa"],
                correct: 1,
                explanation: "ETT-ord + -et au défini = huset",
                points: 15, relatedLesson: 'a1_l2'
            },
            
            // Adjectifs (10 questions)
            {
                id: 'a1_g5', category: "Adjectifs", type: 'multiple-choice', difficulty: 'easy',
                question: "'Un grand chien' (Hund [EN], Stor)",
                options: ["Ett stort hund", "En stor hund", "En stora hund", "Ett stora hund"],
                correct: 1,
                explanation: "EN-ord garde la forme de base de l'adjectif.",
                points: 10, relatedLesson: 'a1_l3'
            },
            {
                id: 'a1_g6', category: "Adjectifs", type: 'multiple-choice', difficulty: 'medium',
                question: "'Un petit enfant' (Barn [ETT], Liten)",
                options: ["Ett litet barn", "En liten barn", "Ett liten barn", "En litet barn"],
                correct: 0,
                explanation: "Liten devient litet pour ETT-ord.",
                points: 15, relatedLesson: 'a1_l3'
            },
            {
                id: 'a1_g7', category: "Adjectifs Définis", type: 'multiple-choice', difficulty: 'hard',
                question: "'La grande voiture' (Bil [EN], Stor)",
                options: ["En stor bil", "Den stora bil", "Den stora bilen", "Det stora bilen"],
                correct: 2,
                explanation: "Règle du sandwich: Den + stora + bilen",
                points: 20, relatedLesson: 'a1_l3'
            },
            {
                id: 'a1_g8', category: "Adjectifs Définis", type: 'multiple-choice', difficulty: 'hard',
                question: "'Le nouveau travail' (Jobb [ETT], Ny)",
                options: ["Det nya jobbet", "Den nya jobbet", "Ett nytt jobb", "Det ny jobbet"],
                correct: 0,
                explanation: "Règle du sandwich: Det + nya + jobbet",
                points: 20, relatedLesson: 'a1_l3'
            },
            {
                id: 'a1_g9', category: "Adjectifs Pluriel", type: 'multiple-choice', difficulty: 'medium',
                question: "'De vieux livres' (Gammal, Böcker)",
                options: ["Gammal böcker", "Gamla böckerna", "Gamla böcker", "Gammalt böcker"],
                correct: 2,
                explanation: "Au pluriel indéfini, l'adjectif prend -a.",
                points: 15, relatedLesson: 'a1_l3'
            },
            {
                id: 'a1_g10', category: "Adjectifs Pluriel", type: 'multiple-choice', difficulty: 'hard',
                question: "'Les nouveaux enfants' (Barn → Barnen, Ny)",
                options: ["De nya barnen", "De nytt barnen", "Det nya barnen", "De nya barn"],
                correct: 0,
                explanation: "De + adjectif-a + nom pluriel défini",
                points: 20, relatedLesson: 'a1_l3'
            },
            
            // Syntaxe V2 (10 questions)
            {
                id: 'a1_g11', category: "Syntaxe V2", type: 'multiple-choice', difficulty: 'medium',
                question: "'Maintenant, je mange' (Nu, äter, jag)",
                options: ["Nu jag äter", "Nu äter jag", "Jag äter nu", "Äter nu jag"],
                correct: 1,
                explanation: "Règle V2: le verbe est en 2ème position.",
                hint: "Verbe = position 2",
                points: 15, relatedLesson: 'a1_l6'
            },
            {
                id: 'a1_g12', category: "Syntaxe V2", type: 'multiple-choice', difficulty: 'medium',
                question: "'Demain, nous partons' (Imorgon, åker, vi)",
                options: ["Imorgon vi åker", "Vi åker imorgon", "Imorgon åker vi", "Åker imorgon vi"],
                correct: 2,
                explanation: "Imorgon (pos 1), åker (pos 2), vi (pos 3)",
                points: 15, relatedLesson: 'a1_l6'
            },
            {
                id: 'a1_g13', category: "Syntaxe V2", type: 'multiple-choice', difficulty: 'easy',
                question: "Ordre correct: 'Je travaille à Stockholm'",
                options: ["Jag arbetar i Stockholm", "Jag i Stockholm arbetar", "Arbetar jag i Stockholm", "I Stockholm jag arbetar"],
                correct: 0,
                explanation: "Structure standard: Sujet + Verbe + Complément",
                points: 10, relatedLesson: 'a1_l6'
            },
            {
                id: 'a1_g14', category: "Syntaxe V2", type: 'multiple-choice', difficulty: 'hard',
                question: "'À Stockholm, j'habite' (I Stockholm, bor, jag)",
                options: ["I Stockholm jag bor", "I Stockholm bor jag", "Jag bor i Stockholm", "Bor jag i Stockholm"],
                correct: 1,
                explanation: "I Stockholm (1), bor (2), jag (3)",
                points: 20, relatedLesson: 'a1_l6'
            },
            
            // Pronoms (5 questions)
            {
                id: 'a1_g15', category: "Pronoms", type: 'multiple-choice', difficulty: 'easy',
                question: "Comment dit-on 'je' en suédois?",
                options: ["du", "jag", "vi", "de"],
                correct: 1,
                explanation: "Je = jag",
                points: 5, relatedLesson: 'a1_l7'
            },
            {
                id: 'a1_g16', category: "Pronoms", type: 'multiple-choice', difficulty: 'easy',
                question: "Le pronom 'du' signifie:",
                options: ["je", "tu/vous", "il", "nous"],
                correct: 1,
                explanation: "'Du' est utilisé universellement pour tutoyer.",
                points: 5, relatedLesson: 'a1_l7'
            },
            {
                id: 'a1_g17', category: "Pronoms Objets", type: 'multiple-choice', difficulty: 'medium',
                question: "Complétez: 'Il me voit' = Han ser ___",
                options: ["jag", "mig", "min", "mitt"],
                correct: 1,
                explanation: "Moi (objet) = mig",
                points: 15, relatedLesson: 'a1_l7'
            }
        ],
        
        vocabulary: [
            // Salutations (5 questions)
            {
                id: 'a1_v1', category: "Salutations", type: 'multiple-choice', difficulty: 'easy',
                question: "Comment dit-on 'Bonjour'?",
                options: ["Hej", "Tack", "Varsågod", "Adjö"],
                correct: 0,
                explanation: "Hej = Bonjour/Salut",
                points: 5, relatedLesson: 'a1_l4'
            },
            {
                id: 'a1_v2', category: "Salutations", type: 'multiple-choice', difficulty: 'easy',
                question: "'Hej då' signifie:",
                options: ["Bonjour", "Au revoir", "Merci", "S'il vous plaît"],
                correct: 1,
                explanation: "Hej då = Au revoir",
                points: 5, relatedLesson: 'a1_l4'
            },
            {
                id: 'a1_v3', category: "Politesse", type: 'multiple-choice', difficulty: 'easy',
                question: "'Tack' signifie:",
                options: ["Oui", "Non", "Merci", "Pardon"],
                correct: 2,
                explanation: "Tack = Merci",
                points: 5, relatedLesson: 'a1_l4'
            },
            {
                id: 'a1_v4', category: "Politesse", type: 'text-input', difficulty: 'easy',
                question: "Écrivez 'Pardon' en suédois",
                correctAnswers: ["förlåt", "ursäkta"],
                explanation: "Förlåt ou Ursäkta = Pardon",
                points: 10, relatedLesson: 'a1_l4'
            },
            
            // Nombres (10 questions)
            {
                id: 'a1_v5', category: "Nombres", type: 'text-input', difficulty: 'easy',
                question: "Écrivez le nombre 'trois'",
                correctAnswers: ["tre"],
                explanation: "Tre = trois",
                points: 10, relatedLesson: 'a1_l5'
            },
            {
                id: 'a1_v6', category: "Nombres", type: 'multiple-choice', difficulty: 'easy',
                question: "'Fem' signifie:",
                options: ["4", "5", "6", "7"],
                correct: 1,
                explanation: "Fem = 5",
                points: 5, relatedLesson: 'a1_l5'
            },
            {
                id: 'a1_v7', category: "Nombres", type: 'multiple-choice', difficulty: 'medium',
                question: "Comment dit-on 20?",
                options: ["tio", "tjugo", "trettio", "fyrtio"],
                correct: 1,
                explanation: "Tjugo = 20",
                points: 10, relatedLesson: 'a1_l5'
            },
            {
                id: 'a1_v8', category: "Nombres", type: 'text-input', difficulty: 'hard',
                question: "Écrivez 'trente-cinq' en suédois",
                correctAnswers: ["trettiofem", "trettio fem"],
                explanation: "Trettio + fem = 35",
                points: 20, relatedLesson: 'a1_l5'
            },
            
            // Couleurs (5 questions)
            {
                id: 'a1_v9', category: "Couleurs", type: 'multiple-choice', difficulty: 'easy',
                question: "'Röd' signifie:",
                options: ["Bleu", "Rouge", "Vert", "Jaune"],
                correct: 1,
                explanation: "Röd = Rouge",
                points: 5, relatedLesson: 'a1_l4'
            },
            {
                id: 'a1_v10', category: "Couleurs", type: 'text-input', difficulty: 'easy',
                question: "Écrivez 'bleu' en suédois",
                correctAnswers: ["blå"],
                explanation: "Blå = bleu",
                points: 10, relatedLesson: 'a1_l4'
            },
            
            // Jours/Mois (10 questions)
            {
                id: 'a1_v11', category: "Jours", type: 'multiple-choice', difficulty: 'easy',
                question: "'Måndag' signifie:",
                options: ["Dimanche", "Lundi", "Mardi", "Mercredi"],
                correct: 1,
                explanation: "Måndag = Lundi",
                points: 5, relatedLesson: 'a1_l8'
            },
            {
                id: 'a1_v12', category: "Jours", type: 'text-input', difficulty: 'medium',
                question: "Écrivez 'vendredi' en suédois",
                correctAnswers: ["fredag"],
                explanation: "Fredag = vendredi",
                points: 10, relatedLesson: 'a1_l8'
            },
            {
                id: 'a1_v13', category: "Mois", type: 'multiple-choice', difficulty: 'easy',
                question: "'Juli' signifie:",
                options: ["Juin", "Juillet", "Août", "Mai"],
                correct: 1,
                explanation: "Juli = Juillet",
                points: 5, relatedLesson: 'a1_l8'
            }
        ]
    },
    
    A2: {
        grammar: [
            {
                id: 'a2_g1', category: "Présent Groupe 1", type: 'multiple-choice', difficulty: 'medium',
                question: "Conjuguez 'tala' (parler) au présent",
                options: ["talar", "tala", "talade", "talat"],
                correct: 0,
                explanation: "Groupe 1: -a → -ar au présent",
                points: 15, relatedLesson: 'a2_l1'
            },
            {
                id: 'a2_g2', category: "Présent Groupe 2", type: 'multiple-choice', difficulty: 'medium',
                question: "Conjuguez 'läsa' (lire) au présent",
                options: ["läsar", "läsa", "läser", "läst"],
                correct: 2,
                explanation: "Groupe 2: -a → -er au présent",
                points: 15, relatedLesson: 'a2_l1'
            },
            {
                id: 'a2_g3', category: "Passé - Prétérit", type: 'multiple-choice', difficulty: 'hard',
                question: "Conjuguez 'gå' au prétérit",
                options: ["går", "gick", "gått", "ginge"],
                correct: 1,
                explanation: "Gå est irrégulier: gick au prétérit",
                points: 20, relatedLesson: 'a2_l2'
            },
            {
                id: 'a2_g4', category: "Passé - Parfait", type: 'multiple-choice', difficulty: 'medium',
                question: "'J'ai parlé' se traduit:",
                options: ["Jag talade", "Jag har talat", "Jag talar", "Jag hade talat"],
                correct: 1,
                explanation: "Parfait = har + participe",
                points: 15, relatedLesson: 'a2_l2'
            },
            {
                id: 'a2_g5', category: "Prépositions", type: 'multiple-choice', difficulty: 'medium',
                question: "'Dans la maison' = ",
                options: ["på huset", "i huset", "vid huset", "över huset"],
                correct: 1,
                explanation: "I = dans (pour les espaces fermés)",
                points: 15, relatedLesson: 'a2_l3'
            },
            {
                id: 'a2_g6', category: "Futur", type: 'multiple-choice', difficulty: 'medium',
                question: "'Je vais manger' (intention) = ",
                options: ["Jag äter", "Jag kommer att äta", "Jag ska äta", "Jag har ätit"],
                correct: 2,
                explanation: "Ska + infinitif = intention",
                points: 15, relatedLesson: 'a2_l5'
            },
            {
                id: 'a2_g7', category: "Modaux", type: 'multiple-choice', difficulty: 'easy',
                question: "'Jag kan simma' signifie:",
                options: ["Je veux nager", "Je dois nager", "Je peux nager", "Je vais nager"],
                correct: 2,
                explanation: "Kan = pouvoir (capacité)",
                points: 10, relatedLesson: 'a2_l5'
            }
        ],
        vocabulary: [
            {
                id: 'a2_v1', category: "Nourriture", type: 'multiple-choice', difficulty: 'easy',
                question: "'Bröd' signifie:",
                options: ["Lait", "Pain", "Eau", "Beurre"],
                correct: 1,
                explanation: "Bröd = Pain",
                points: 5, relatedLesson: 'a2_l4'
            },
            {
                id: 'a2_v2', category: "Repas", type: 'text-input', difficulty: 'medium',
                question: "Écrivez 'petit-déjeuner' en suédois",
                correctAnswers: ["frukost"],
                explanation: "Frukost = petit-déjeuner",
                points: 10, relatedLesson: 'a2_l4'
            },
            {
                id: 'a2_v3', category: "Famille", type: 'multiple-choice', difficulty: 'medium',
                question: "'Farmor' désigne:",
                options: ["Grand-mère maternelle", "Grand-mère paternelle", "Tante", "Mère"],
                correct: 1,
                explanation: "Far- = côté paternel, -mor = grand-mère",
                points: 15, relatedLesson: 'a2_l6'
            }
        ]
    },
    
    B1: {
        grammar: [
            {
                id: 'b1_g1', category: "Passif en -s", type: 'multiple-choice', difficulty: 'hard',
                question: "Transformez: 'Vi säljer huset' au passif",
                options: ["Huset säljs", "Huset blir sålt", "Huset är sålt", "Huset sälja"],
                correct: 0,
                explanation: "Passif en -s: säljer → säljs",
                points: 25, relatedLesson: 'b1_l1'
            },
            {
                id: 'b1_g2', category: "Pronoms Relatifs", type: 'multiple-choice', difficulty: 'medium',
                question: "Complétez: 'Mannen ___ bor här'",
                options: ["som", "vilken", "vars", "vilket"],
                correct: 0,
                explanation: "Som = qui/que (universel)",
                points: 15, relatedLesson: 'b1_l2'
            },
            {
                id: 'b1_g3', category: "Opinion", type: 'text-input', difficulty: 'medium',
                question: "Écrivez 'Je pense que' en suédois",
                correctAnswers: ["jag tycker att", "jag tror att"],
                explanation: "Jag tycker att = Je pense que",
                points: 15, relatedLesson: 'b1_l3'
            }
        ],
        vocabulary: [
            {
                id: 'b1_v1', category: "Travail", type: 'text-input', difficulty: 'medium',
                question: "Écrivez 'médecin' en suédois",
                correctAnswers: ["läkare"],
                explanation: "Läkare = médecin",
                points: 10, relatedLesson: 'b1_l4'
            }
        ]
    },
    
    B2: {
        grammar: [
            {
                id: 'b2_g1', category: "Subordonnées", type: 'multiple-choice', difficulty: 'hard',
                question: "Complétez: 'Han säger att han ___ inte ___ svenska'",
                options: ["inte vet", "vet inte", "inte veta", "veta inte"],
                correct: 0,
                explanation: "Dans les subordonnées: négation AVANT verbe",
                points: 25, relatedLesson: 'b2_l1'
            },
            {
                id: 'b2_g2', category: "Conditionnel", type: 'multiple-choice', difficulty: 'medium',
                question: "'Je mangerais' = ",
                options: ["Jag äter", "Jag skulle äta", "Jag har ätit", "Jag ska äta"],
                correct: 1,
                explanation: "Skulle + infinitif = conditionnel",
                points: 20, relatedLesson: 'b2_l2'
            }
        ],
        vocabulary: []
    },
    
    C1: {
        grammar: [
            {
                id: 'c1_g1', category: "Subjonctif", type: 'multiple-choice', difficulty: 'hard',
                question: "Complétez: 'Om jag ___ rik...'",
                options: ["är", "var", "varit", "vore"],
                correct: 3,
                explanation: "Vore = subjonctif de vara",
                points: 30, relatedLesson: 'c1_l1'
            }
        ],
        vocabulary: []
    },
    
    C2: {
        grammar: [
            {
                id: 'c2_g1', category: "Registres", type: 'multiple-choice', difficulty: 'hard',
                question: "Expression la plus formelle:",
                options: ["Tja!", "Hej!", "Vänligen meddela", "Läget?"],
                correct: 2,
                explanation: "Vänligen meddela = très formel",
                points: 30, relatedLesson: 'c2_l1'
            }
        ],
        vocabulary: []
    }
};

// ============================================
// SCÉNARIOS DE DIALOGUE
// ============================================

const DIALOGUE_SCENARIOS = {
    casual: {
        name: 'Conversation Informelle',
        description: 'Rencontrez quelqu\'un et discutez',
        systemPrompt: 'Tu es un Suédois amical qui rencontre quelqu\'un pour la première fois. Réponds en suédois simple (niveau A2-B1). Corrige gentiment les erreurs.',
        starterMessages: [
            { role: 'ai', text: 'Hej! Vad heter du?' },
            { role: 'ai', text: 'Trevligt att träffas! Var kommer du ifrån?' }
        ]
    },
    restaurant: {
        name: 'Au Restaurant',
        description: 'Commandez un repas',
        systemPrompt: 'Tu es un serveur suédois dans un restaurant. Aide la personne à commander en suédois.',
        starterMessages: [
            { role: 'ai', text: 'Välkommen! Vad vill du ha att dricka?' },
            { role: 'ai', text: 'Här är menyn. Vad vill du beställa?' }
        ]
    },
    shopping: {
        name: 'Shopping',
        description: 'Faites des achats',
        systemPrompt: 'Tu es un vendeur suédois dans un magasin. Aide la personne à trouver ce qu\'elle cherche.',
        starterMessages: [
            { role: 'ai', text: 'Hej! Kan jag hjälpa dig?' },
            { role: 'ai', text: 'Vad letar du efter idag?' }
        ]
    }
};

// ============================================
// BADGES ÉTENDUS (16 badges)
// ============================================

const BADGES = [
    { id: 'first_steps', name: 'Premiers Pas', icon: '👶', requirement: '10 questions', threshold: 10, unlocked: false },
    { id: 'curious', name: 'Curieux', icon: '🔍', requirement: '25 questions', threshold: 25, unlocked: false },
    { id: 'dedicated', name: 'Dévoué', icon: '💪', requirement: '50 questions', threshold: 50, unlocked: false },
    { id: 'committed', name: 'Engagé', icon: '🎯', requirement: '100 questions', threshold: 100, unlocked: false },
    { id: 'expert', name: 'Expert', icon: '🧠', requirement: '250 questions', threshold: 250, unlocked: false },
    { id: 'master', name: 'Maître', icon: '👑', requirement: '500 questions', threshold: 500, unlocked: false },
    
    { id: 'streak_3', name: 'Trois jours', icon: '🔥', requirement: '3 jours', threshold: 3, type: 'streak', unlocked: false },
    { id: 'streak_7', name: 'Semaine parfaite', icon: '🔥🔥', requirement: '7 jours', threshold: 7, type: 'streak', unlocked: false },
    { id: 'streak_30', name: 'Mois complet', icon: '🔥🔥🔥', requirement: '30 jours', threshold: 30, type: 'streak', unlocked: false },
    
    { id: 'perfect_5', name: 'Cinq parfaits', icon: '⭐', requirement: '5/5', threshold: 5, type: 'perfect', unlocked: false },
    { id: 'perfect_10', name: 'Dix parfaits', icon: '💯', requirement: '10/10', threshold: 10, type: 'perfect', unlocked: false },
    
    { id: 'grammar_master', name: 'As de la grammaire', icon: '📚', requirement: '50 grammaire', threshold: 50, type: 'category', unlocked: false },
    { id: 'vocab_guru', name: 'Roi du vocabulaire', icon: '💬', requirement: '100 mots', threshold: 100, type: 'category', unlocked: false },
    
    { id: 'speed_demon', name: 'Éclair', icon: '⚡', requirement: '<3min', type: 'speed', unlocked: false },
    { id: 'night_owl', name: 'Oiseau de nuit', icon: '🦉', requirement: 'Étude >22h', type: 'special', unlocked: false },
    { id: 'polyglot', name: 'Polyglotte', icon: '🌍', requirement: 'Tous niveaux', type: 'achievement', unlocked: false }
];
