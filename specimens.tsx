import type { Specimen } from "@/content/site";
import { ContactForm } from "@/components/contact-form";
import { useState, type ReactNode } from "react";

export function SpecimenFrame({
  kind,
  label,
  children,
}: {
  kind: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-line bg-paper">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="text-xs uppercase tracking-widest text-muted">{kind}</p>
        <p className="text-xs text-muted">{label}</p>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

export function ProjectSpecimen({ specimen }: { specimen: Specimen }) {
  if (specimen === "sillon") return <Sillon />;
  if (specimen === "cahier") return <Cahier />;
  if (specimen === "seuil") return <Seuil />;
  return <Comptoir />;
}

function Sillon() {
  return (
    <SpecimenFrame kind="Lecture" label="Sillon · numéro 04">
      <article>
        <p className="text-xs uppercase tracking-widest text-oxide">Essai · 8 min</p>
        <h3 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          Ce qu’une marge peut encore porter
        </h3>
        <p className="mt-2 text-sm text-muted">Note de lecture · Codecontenu</p>
        <p className="drop-cap mt-6 font-serif text-lg leading-relaxed">
          Une revue n’a pas besoin d’occuper tout l’écran. Elle a besoin d’un rythme : un titre qui se lit
          d’un coup, un paragraphe qui ne se casse pas au milieu d’une idée, et, sur un grand écran, une marge
          assez large pour une note sans renvoyer le lecteur ailleurs.
        </p>
        <aside className="mt-6 border-l-2 border-oxide pl-4 font-serif text-lg italic leading-snug">
          « Le temps de lecture affiché vient du texte, pas d’une moyenne inventée. »
        </aside>
      </article>
    </SpecimenFrame>
  );
}

type Column = "write" | "review" | "live";

const columnLabel: Record<Column, string> = {
  write: "À écrire",
  review: "En relecture",
  live: "Publié",
};

type Card = { id: string; title: string; column: Column };

const initialCards: Card[] = [
  { id: "marges", title: "Ce qu’une marge peut encore porter", column: "review" },
  { id: "sommaire", title: "Sommaire du numéro 04", column: "write" },
  { id: "charte", title: "Feuille typographique", column: "live" },
  { id: "accueil", title: "Page du numéro, version 2", column: "write" },
];

function Cahier() {
  const [cards, setCards] = useState<Card[]>(initialCards);

  function move(id: string, direction: -1 | 1) {
    const order: Column[] = ["write", "review", "live"];
    setCards((current) =>
      current.map((card) => {
        if (card.id !== id) return card;
        const next = order.indexOf(card.column) + direction;
        if (next < 0 || next >= order.length) return card;
        return { ...card, column: order[next] ?? card.column };
      }),
    );
  }

  return (
    <SpecimenFrame kind="Suivi" label="Cahier · Sillon">
      <div className="grid gap-4 lg:grid-cols-3">
        {(Object.keys(columnLabel) as Column[]).map((column) => {
          const items = cards.filter((card) => card.column === column);
          return (
            <section key={column} aria-label={columnLabel[column]} className="bg-paper">
              <div className="mb-3 flex items-baseline justify-between border-b border-line pb-2">
                <h3 className="font-serif text-xl">{columnLabel[column]}</h3>
                <span className="text-sm tabular-nums text-muted">{items.length}</span>
              </div>
              <ul className="flex flex-col gap-3">
                {items.map((card) => (
                  <li key={card.id} className="border border-line p-3">
                    <p className="text-sm leading-snug">{card.title}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        className="min-h-11 flex-1 border border-line px-2 text-xs disabled:cursor-not-allowed disabled:text-muted"
                        disabled={card.column === "write"}
                        onClick={() => move(card.id, -1)}
                      >
                        Reculer
                      </button>
                      <button
                        type="button"
                        className="min-h-11 flex-1 bg-ink px-2 text-xs text-paper disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
                        disabled={card.column === "live"}
                        onClick={() => move(card.id, 1)}
                      >
                        Avancer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </SpecimenFrame>
  );
}

function Seuil() {
  return (
    <SpecimenFrame kind="Lancement" label="Seuil · Sillon">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-oxide">Revue en ligne</p>
          <h3 className="mt-3 font-serif text-4xl leading-none">
            Sillon, pour les textes qui prennent le temps.
          </h3>
          <ul className="mt-6 flex flex-col gap-3 text-sm">
            <li className="border-t border-line pt-3">Un gabarit de lecture, pas un thème généraliste.</li>
            <li className="border-t border-line pt-3">Des numéros, un sommaire, des notes de marge.</li>
            <li className="border-t border-line pt-3">Le même article reste lisible sur un téléphone.</li>
          </ul>
        </div>
        <ContactForm
          subject="Sillon — demande"
          intro="Pour recevoir le prochain numéro, écrivez. Le message part depuis votre messagerie."
        />
      </div>
    </SpecimenFrame>
  );
}

const offers = [
  {
    title: "Page",
    fit: "Une offre, un public, une action.",
    includes: ["Récit", "Mise en page", "Formulaire"],
    excludes: "Pas de site complet.",
  },
  {
    title: "Site",
    fit: "Plusieurs pages, un ton, une navigation.",
    includes: ["Structure", "Textes", "Intégration"],
    excludes: "Pas de boutique, sauf si elle est dans le périmètre.",
  },
  {
    title: "Outil",
    fit: "Un geste de travail, répété chaque semaine.",
    includes: ["Parcours", "Écrans", "États"],
    excludes: "Pas une suite logicielle.",
  },
];

function Comptoir() {
  return (
    <SpecimenFrame kind="Brief" label="Comptoir">
      <div className="grid gap-4 md:grid-cols-3">
        {offers.map((offer) => (
          <article key={offer.title} className="flex flex-col border border-line p-4">
            <h3 className="font-serif text-2xl">{offer.title}</h3>
            <p className="mt-2 text-sm text-muted">{offer.fit}</p>
            <ul className="mt-4 flex flex-col gap-1 text-sm">
              {offer.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 border-t border-line pt-3 text-sm text-muted">{offer.excludes}</p>
          </article>
        ))}
      </div>
    </SpecimenFrame>
  );
}
