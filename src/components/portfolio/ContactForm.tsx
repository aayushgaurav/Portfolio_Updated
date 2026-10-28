import { useState, useEffect, type FormEvent, type FocusEvent } from "react";
import { Check, Copy, Loader2, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { profile } from "@/data/portfolio";
import { btn } from "./primitives";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

type Fields = { name: string; email: string; subject: string; message: string; phone: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.subject.trim().length < 3) e.subject = "Please add a short subject.";
  if (f.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  if (f.phone && !/^\+?[\d\s\-().]{7,15}$/.test(f.phone.trim())) e.phone = "Please enter a valid phone number.";
  return e;
}

const inputCls =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none aria-[invalid=true]:border-destructive";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy email:", profile.email);
    }
  };
  return (
    <button type="button" onClick={copy} className={btn.outline} aria-live="polite">
      {copied ? <Check className="h-4 w-4 text-success" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      {copied ? "Email copied" : "Copy email"}
    </button>
  );
}

const empty: Fields = { name: "", email: "", subject: "", message: "", phone: "" };

export function ContactForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    setErrors((prev) => { const next = { ...prev }; delete next[k]; return next; });
  };

  const handleBlur = (e: FocusEvent<HTMLFormElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setErrors({});
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: f.name,
          from_email: f.email,
          phone: f.phone.trim() || "",
          subject: f.subject,
          message: f.message,
          to_email: "aayushgaurav46@gmail.com",
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      setF(empty);
    } catch {
      setStatus("error");
    }
  };

  const field = (k: keyof Fields, label: string, type = "text", optional = false) => (
    <div>
      <label htmlFor={`c-${k}`} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {optional && <span className="ml-1 text-xs text-muted-foreground">(optional)</span>}
      </label>
      {k === "message" ? (
        <textarea
          id={`c-${k}`}
          rows={5}
          value={f[k]}
          onChange={set(k)}
          aria-invalid={!!errors[k]}
          aria-describedby={errors[k] ? `c-${k}-err` : undefined}
          className={inputCls}
        />
      ) : (
        <input
          id={`c-${k}`}
          type={type}
          value={f[k]}
          onChange={set(k)}
          aria-invalid={!!errors[k]}
          aria-describedby={errors[k] ? `c-${k}-err` : undefined}
          className={inputCls}
          autoComplete={k === "name" ? "name" : k === "email" ? "email" : k === "phone" ? "tel" : "off"}
        />
      )}
      {errors[k] && <p id={`c-${k}-err`} className="mt-1.5 text-xs text-destructive">{errors[k]}</p>}
    </div>
  );

  useEffect(() => {
    if (status !== "sent") return;
    const id = setTimeout(() => setStatus("idle"), 7000);
    return () => clearTimeout(id);
  }, [status]);

  if (status === "sent") {
    return (
      <div className="card-surface flex flex-col items-center justify-center gap-4 p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15">
          <Check className="h-6 w-6 text-success" />
        </span>
        <p className="text-lg font-semibold text-foreground">Message sent!</p>
        <p className="text-sm text-muted-foreground">
          Thanks for reaching out, I've received your message and will get back to you as soon as possible.
        </p>
        <p className="text-xs text-muted-foreground">This message will disappear in 7 seconds.</p>
        <button type="button" onClick={() => setStatus("idle")} className={btn.outline}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate onBlur={handleBlur} className="card-surface space-y-4 p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("name", "Full Name")}
        {field("email", "Email Address", "email")}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {field("subject", "Subject")}
        {field("phone", "Phone Number", "tel", true)}
      </div>
      {field("message", "Message")}
      {status === "error" && (
        <p className="text-sm text-destructive" role="alert">
          Something went wrong. Please try again or email me directly.
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className={btn.primary + " w-full sm:w-auto"}>
        {status === "sending" ? (
          <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…</>
        ) : (
          <><Send className="h-4 w-4" aria-hidden /> Send Message</>
        )}
      </button>
    </form>
  );
}
