import { studio } from "@/content/site";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { hash: "studio", label: "Studio" },
  { hash: "projets", label: "Projets" },
  { hash: "methode", label: "Méthode" },
  { hash: "contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" className="font-serif text-xl leading-none tracking-tight">
          Code<span className="italic text-oxide">contenu</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
          {links.map((link) => (
            <Link
              key={link.hash}
              to="/"
              hash={link.hash}
              activeOptions={{ includeHash: true }}
              className="text-sm text-muted transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/"
          hash="contact"
          className="hidden min-h-11 items-center bg-oxide px-4 text-sm text-paper transition-colors duration-200 hover:bg-oxide-deep md:inline-flex"
        >
          Écrire
        </Link>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <nav id="menu-mobile" className="border-t border-line px-5 py-2 md:hidden" aria-label="Sections">
          {links.map((link) => (
            <Link
              key={link.hash}
              to="/"
              hash={link.hash}
              activeOptions={{ includeHash: true }}
              className="flex min-h-11 items-center text-base"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Codecontenu · Studio indépendant</p>
        <a href={`mailto:${studio.email}`} className="text-ink underline decoration-line underline-offset-4">
          {studio.email}
        </a>
      </div>
    </footer>
  );
}
