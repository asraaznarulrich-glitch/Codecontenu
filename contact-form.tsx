import { studio } from "@/content/site";
import { useState, type FormEvent } from "react";
import { z } from "zod";

const briefSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom."),
  email: z.email("Cette adresse n’est pas valide."),
  message: z
    .string()
    .trim()
    .min(20, "Décrivez le besoin en quelques phrases.")
    .max(2000, "Le message est trop long."),
});

type Fields = z.infer<typeof briefSchema>;
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", message: "" };

export function ContactForm({
  subject = "Brief — Codecontenu",
  intro,
}: {
  subject?: string;
  intro?: string;
}) {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);

  function update(key: keyof Fields, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setReady(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = briefSchema.safeParse({
      ...values,
      email: values.email.trim(),
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "name" || key === "email" || key === "message") {
          next[key] ??= issue.message;
        }
      }
      setErrors(next);
      setReady(false);
      return;
    }
    setErrors({});
    const body = `Nom : ${parsed.data.name}\nEmail : ${parsed.data.email}\n\n${parsed.data.message}`;
    const href = `mailto:${studio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setReady(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {intro ? <p className="text-muted">{intro}</p> : null}
      <Field
        id="nom"
        label="Nom"
        value={values.name}
        error={errors.name}
        autoComplete="name"
        onChange={(value) => update("name", value)}
      />
      <Field
        id="email"
        label="Email"
        type="email"
        value={values.email}
        error={errors.email}
        autoComplete="email"
        onChange={(value) => update("email", value)}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-erreur" : undefined}
          onChange={(event) => update("message", event.target.value)}
          className="min-h-36 resize-y border border-line bg-paper px-3 py-3 text-ink outline-none"
        />
        {errors.message ? (
          <p id="message-erreur" className="text-sm text-oxide">
            {errors.message}
          </p>
        ) : (
          <p className="text-sm text-muted">Contexte, public, délai. Pas besoin d’un cahier des charges.</p>
        )}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center bg-oxide px-5 text-sm text-paper transition-colors duration-200 hover:bg-oxide-deep"
        >
          Préparer le courriel
        </button>
        <p className="text-sm text-muted">
          Ouvre votre messagerie vers {studio.email}. Rien n’est stocké ici.
        </p>
      </div>
      {ready ? (
        <p className="text-sm" role="status">
          Le courriel est prêt. S’il ne s’est pas ouvert, écrivez directement à {studio.email}.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  const errorId = `${id}-erreur`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 border border-line bg-paper px-3 text-ink outline-none"
      />
      {error ? (
        <p id={errorId} className="text-sm text-oxide">
          {error}
        </p>
      ) : null}
    </div>
  );
}
