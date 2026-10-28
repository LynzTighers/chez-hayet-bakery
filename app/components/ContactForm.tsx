"use client";
import { useState } from "react";
import { submitForm, type FieldErrors } from "../lib/api";
import {
  FormField,
  FormStatus,
  SubmitButton,
  ThankYou,
  borderClass,
  inputClass,
} from "./FormField";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState<string>();
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(undefined);

    const result = await submitForm("/api/contacts", event.currentTarget);

    setSubmitting(false);
    if (result.ok) {
      setDone(true);
      return;
    }
    setMessage(result.message);
    setErrors(result.fieldErrors ?? {});
  }

  if (done) {
    return (
      <ThankYou title="Message sent!">
        Thank you for reaching out. We&apos;ll reply to your email as soon as we
        can.
      </ThankYou>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-2xl space-y-6 rounded-3xl bg-[#fffaf6] p-8 shadow-sm"
    >
      <FormField id="name" label="Name" error={errors.name}>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Enter your name"
          className={`${inputClass} ${borderClass(errors.name)}`}
        />
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="email" label="Email" error={errors.email}>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`${inputClass} ${borderClass(errors.email)}`}
          />
        </FormField>

        <FormField id="phone" label="Phone Number" optional error={errors.phone}>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            placeholder="(614) 555-0123"
            className={`${inputClass} ${borderClass(errors.phone)}`}
          />
        </FormField>
      </div>

      <FormField id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="How can we help?"
          className={`${inputClass} ${borderClass(errors.message)} resize-none`}
        />
      </FormField>

      <FormStatus message={message} />
      <SubmitButton submitting={submitting} label="Send Message" />
    </form>
  );
}
