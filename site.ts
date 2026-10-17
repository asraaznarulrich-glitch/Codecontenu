/**
 * Contenu du studio. Remplace l’adresse, les textes et les projets ici :
 * tout le site s’en sert.
 */
export const studio = {
  name: "Codecontenu",
  email: "bonjour@codecontenu.fr",
  eyebrow: "Studio indépendant",
  description:
    "Codecontenu conçoit des interfaces et les textes qui vont avec. Sites, outils internes, pages de lecture, pages de vente : le code fait tenir le produit, le contenu le rend compréhensible. Les deux avancent ensemble, du plan jusqu’à la mise en ligne.",
  about: [
    "Le studio travaille avec des indépendants, des petites équipes et des marques qui veulent un site net et un discours qui leur ressemble.",
    "On cadre le besoin, on écrit, on construit, on relit, on met en ligne. Le périmètre est écrit avant de commencer. Pas de méthode en douze étapes, pas de promesse de croissance chiffrée à l’avance.",
  ],
};

export type Discipline = "Code" | "Contenu" | "Interface";

export type Specimen = "sillon" | "cahier" | "seuil" | "comptoir";

export type Project = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  disciplines: Discipline[];
  role: string;
  situation: string;
  approach: string;
  delivered: string[];
  specimen: Specimen;
};

export const disciplines: Array<Discipline | "Tous"> = [
  "Tous",
  "Code",
  "Contenu",
  "Interface",
];

export const projects: Project[] = [
  {
    slug: "sillon",
    index: "01",
    title: "Sillon",
    summary:
      "Une revue en ligne pour les textes longs. La lecture passe avant le décor.",
    disciplines: ["Contenu", "Interface"],
    role: "Produit du studio — structure éditoriale, maquette, développement.",
    situation:
      "Les textes longs étaient publiés dans des thèmes de blog : colonnes étroites, blocs publicitaires, sommaire introuvable. Il fallait un endroit où un article tient le temps qu’on le lise.",
    approach:
      "Une page de numéro, un gabarit d’article, des notes en marge sur grand écran, et le même texte en une seule colonne sur téléphone. Le temps de lecture est calculé sur le texte réel, pas estimé au jugé.",
    delivered: [
      "Gabarit d’article et page de numéro",
      "Notes de marge et sommaire",
      "Feuille typographique réutilisable",
    ],
    specimen: "sillon",
  },
  {
    slug: "cahier",
    index: "02",
    title: "Cahier",
    summary:
      "Le suivi de production de Sillon : à écrire, en relecture, publié.",
    disciplines: ["Code", "Interface"],
    role: "Outil interne — parcours, interface, logique d’état.",
    situation:
      "Les textes de la revue circulaient dans des fils de messages. On ne savait plus ce qui était en relecture et ce qui était déjà en ligne.",
    approach:
      "Trois colonnes, pas davantage. Une fiche change d’étape par une action explicite. L’outil ne gère pas les sprints, les budgets, ni les commentaires infinis.",
    delivered: [
      "Tableau à trois statuts",
      "Fiches de texte",
      "Passage d’une étape à l’autre",
    ],
    specimen: "cahier",
  },
  {
    slug: "seuil",
    index: "03",
    title: "Seuil",
    summary:
      "La page qui présente Sillon : ce que c’est, pour qui, comment commencer.",
    disciplines: ["Contenu", "Code"],
    role: "Page de lancement — narration, mise en page, intégration.",
    situation:
      "Le produit existait, mais la première page essayait de tout dire. Les visiteurs repartaient sans comprendre à qui s’adresse la revue.",
    approach:
      "Un seul récit, trois preuves concrètes, un seul envoi. Le formulaire ouvre un courriel prêt à partir : rien n’est enregistré dans une base invisible.",
    delivered: [
      "Page de lancement",
      "Bloc de preuves",
      "Formulaire qui prépare un courriel",
    ],
    specimen: "seuil",
  },
  {
    slug: "comptoir",
    index: "04",
    title: "Comptoir",
    summary:
      "La page par laquelle un client décrit un besoin avant le premier échange.",
    disciplines: ["Interface", "Code"],
    role: "Prise de brief du studio — questions, pages, formulaire.",
    situation:
      "Les premiers messages arrivaient trop vagues : « un site moderne ». Il fallait les bonnes questions, dans le bon ordre, sans transformer ça en questionnaire administratif.",
    approach:
      "Trois offres nommées, ce qu’elles contiennent, ce qu’elles ne contiennent pas. Le brief demande le contexte, le public et la contrainte de délai. Le chiffrage vient après, pas sur la page.",
    delivered: [
      "Page d’offres",
      "Limites écrites pour chaque offre",
      "Formulaire de brief",
    ],
    specimen: "comptoir",
  },
];

export const method = [
  {
    index: "01",
    title: "Cadrage",
    text: "On écrit ce qui doit exister, et ce qui est hors sujet. Le périmètre tient sur une page.",
  },
  {
    index: "02",
    title: "Structure",
    text: "Plan des pages, ton, parcours. Le texte et l’interface sont décidés ensemble, pas l’un après l’autre.",
  },
  {
    index: "03",
    title: "Fabrication",
    text: "Maquette, code, rédaction. On relit sur le produit, pas sur un document à part.",
  },
  {
    index: "04",
    title: "Mise en ligne",
    text: "Relecture finale, vérification sur téléphone, passation. Vous repartez avec les fichiers.",
  },
];

export const practice = {
  code: [
    "Interfaces en React",
    "Sites rapides, lisibles sur téléphone",
    "Formulaires et parcours",
    "Intégration soignée",
    "Passation du code",
  ],
  contenu: [
    "Pages de vente",
    "Écriture technique exacte",
    "Structure d’une revue ou d’un site",
    "Ton de marque, sans formule creuse",
    "Relecture",
  ],
};

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function nextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  const following = projects[(index + 1) % projects.length];
  return following ?? projects[0];
}
