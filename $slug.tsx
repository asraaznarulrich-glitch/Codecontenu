import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ProjectSpecimen } from "@/components/specimens";
import { getProject, nextProject } from "@/content/site";

export const Route = createFileRoute("/projets/$slug")({
  head: ({ params }) => {
    const project = getProject(params.slug);
    return {
      meta: [
        {
          title: project ? `${project.title} — Codecontenu` : "Projet introuvable — Codecontenu",
        },
        {
          name: "description",
          content: project?.summary ?? "Ce projet ne fait pas partie du studio.",
        },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <>
        <SiteHeader />
        <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-5 py-20">
          <p className="text-xs uppercase tracking-widest text-oxide">Introuvable</p>
          <h1 className="mt-3 font-serif text-5xl">Ce projet n’est pas dans le studio.</h1>
          <Link to="/" hash="projets" className="mt-8 inline-flex min-h-11 items-center text-sm underline">
            Retour aux projets
          </Link>
        </main>
        <SiteFooter />
      </>
    );
  }

  const following = nextProject(project.slug);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pt-10 pb-20">
        <Link to="/" hash="projets" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted">
          <ArrowLeft className="size-4" />
          Projets
        </Link>
        <p className="mt-8 font-serif text-2xl text-oxide">{project.index}</p>
        <div className="mt-2 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="font-serif text-6xl leading-none sm:text-8xl lg:col-span-7">{project.title}</h1>
          <p className="text-lg lg:col-span-5">{project.summary}</p>
        </div>
        <dl className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted">Disciplines</dt>
            <dd className="mt-2">{project.disciplines.join(" · ")}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-widest text-muted">Rôle</dt>
            <dd className="mt-2">{project.role}</dd>
          </div>
        </dl>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-4">
            <div>
              <h2 className="font-serif text-3xl">Situation</h2>
              <p className="mt-3 text-muted">{project.situation}</p>
            </div>
            <div>
              <h2 className="font-serif text-3xl">Façon de faire</h2>
              <p className="mt-3 text-muted">{project.approach}</p>
            </div>
            <div>
              <h2 className="font-serif text-3xl">Livré</h2>
              <ul className="mt-3">
                {project.delivered.map((item) => (
                  <li key={item} className="border-t border-line py-2 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ProjectSpecimen specimen={project.specimen} />
          </div>
        </div>

        <Link
          to="/projets/$slug"
          params={{ slug: following.slug }}
          className="mt-16 flex items-center justify-between gap-4 border-t border-ink pt-6"
        >
          <span>
            <span className="block text-xs uppercase tracking-widest text-muted">Projet suivant</span>
            <span className="mt-1 block font-serif text-3xl">
              {following.index} {following.title}
            </span>
          </span>
          <ArrowRight className="size-5" />
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
