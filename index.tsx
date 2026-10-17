import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import {
  disciplines,
  method,
  practice,
  projects,
  studio,
  type Discipline,
} from "@/content/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [filter, setFilter] = useState<Discipline | "Tous">("Tous");
  const visible = useMemo(
    () =>
      filter === "Tous" ? projects : projects.filter((project) => project.disciplines.includes(filter)),
    [filter],
  );

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Aller au contenu
      </a>
      <SiteHeader />
      <main id="contenu">
        <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:pt-24">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-widest text-oxide">{studio.eyebrow}</p>
            <h1 className="mt-4 font-serif text-6xl leading-none sm:text-8xl lg:text-9xl">
              <span className="block">Code</span>
              <span className="block italic text-oxide">contenu</span>
            </h1>
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-4">
            <p className="text-lg leading-relaxed">{studio.description}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                hash="projets"
                className="inline-flex min-h-11 items-center justify-center bg-ink px-5 text-sm text-paper"
              >
                Voir les projets
              </Link>
              <Link
                to="/"
                hash="contact"
                className="inline-flex min-h-11 items-center justify-center border border-ink px-5 text-sm"
              >
                Décrire un besoin
              </Link>
            </div>
          </div>
        </section>

        <section id="studio" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-4">
              <p className="text-xs uppercase tracking-widest text-muted">Studio</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Un interlocuteur, un périmètre, un livrable qu’on ouvre dans un navigateur.
              </h2>
            </div>
            <div className="flex flex-col gap-5 lg:col-span-7 lg:col-start-6">
              {studio.about.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <div className="mt-4 grid gap-8 sm:grid-cols-2">
                <Practice title="Code" items={practice.code} />
                <Practice title="Contenu" items={practice.contenu} />
              </div>
            </div>
          </div>
        </section>

        <section id="projets" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-widest text-muted">Projets</p>
                <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                  Les pièces du studio.
                </h2>
                <p className="mt-4 text-muted">
                  Quatre travaux menés par Codecontenu : une revue, l’outil qui la produit, sa page de
                  lancement, et la prise de brief. Pas de logos empruntés.
                </p>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les projets">
                {disciplines.map((item) => {
                  const active = filter === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setFilter(item)}
                      className={
                        active
                          ? "min-h-11 border border-ink bg-ink px-4 text-sm text-paper"
                          : "min-h-11 border border-line px-4 text-sm text-ink"
                      }
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
            <ul className="mt-12 border-t border-ink">
              {visible.map((project) => (
                <li key={project.slug}>
                  <Link
                    to="/projets/$slug"
                    params={{ slug: project.slug }}
                    className="group grid gap-3 border-b border-line py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6"
                  >
                    <span className="font-serif text-2xl tabular-nums text-oxide sm:col-span-1">
                      {project.index}
                    </span>
                    <span className="sm:col-span-3">
                      <span className="font-serif text-4xl leading-none">{project.title}</span>
                    </span>
                    <span className="text-muted sm:col-span-5">{project.summary}</span>
                    <span className="flex items-center justify-between gap-3 text-sm sm:col-span-3 sm:justify-end">
                      <span>{project.disciplines.join(" · ")}</span>
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {visible.length === 0 ? (
              <p className="mt-8 text-muted">Aucun projet dans cette sélection.</p>
            ) : null}
          </div>
        </section>

        <section id="methode" className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
            <p className="text-xs uppercase tracking-widest text-line">Méthode</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
              Quatre temps, dans cet ordre.
            </h2>
            <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {method.map((step) => (
                <li key={step.index}>
                  <p className="font-serif text-3xl text-oxide">{step.index}</p>
                  <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-line">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-widest text-muted">Contact</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Dites ce qu’il faut construire, et pour qui.
              </h2>
              <p className="mt-5 text-muted">
                Le formulaire prépare un courriel. Il n’enregistre rien. Vous pouvez aussi écrire
                directement.
              </p>
              <a
                href={`mailto:${studio.email}`}
                className="mt-6 inline-flex min-h-11 items-center font-serif text-2xl underline decoration-oxide decoration-2 underline-offset-4"
              >
                {studio.email}
              </a>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Practice({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-serif text-2xl">{title}</h3>
      <ul className="mt-3 flex flex-col">
        {items.map((item) => (
          <li key={item} className="border-t border-line py-2 text-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
