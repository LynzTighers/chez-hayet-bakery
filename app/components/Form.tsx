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

export default function OrderForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState<string>();
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(undefined);

    const result = await submitForm("/api/orders", event.currentTarget);

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
      <ThankYou title="Thank you for your order!">
        We&apos;ve received your request and will call you soon to confirm the
        details.
      </ThankYou>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-2xl space-y-6 rounded-3xl bg-[#fffaf6] p-8 shadow-sm"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="firstName" label="First Name" error={errors.firstName}>
          <input
            type="text"
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            placeholder="Enter your first name"
            className={`${inputClass} ${borderClass(errors.firstName)}`}
          />
        </FormField>

        <FormField id="lastName" label="Last Name" error={errors.lastName}>
          <input
            type="text"
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            placeholder="Enter your last name"
            className={`${inputClass} ${borderClass(errors.lastName)}`}
          />
        </FormField>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="phone" label="Phone Number" error={errors.phone}>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            placeholder="(614) 555-0123"
            className={`${inputClass} ${borderClass(errors.phone)}`}
          />
        </FormField>

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
      </div>

      <FormField id="category" label="Category" error={errors.category}>
        <select
          id="category"
          name="category"
          className={`${inputClass} ${borderClass(errors.category)}`}
        >
          <option value="">Choose a category</option>
          <option value="cakes">Celebration Cakes</option>
          <option value="algerian-sweets">Tarts and Pastries</option>
          <option value="custom">Custom Creation</option>
        </select>
      </FormField>

      <FormField id="product" label="Product" optional error={errors.product}>
        <select
          id="product"
          name="product"
          className={`${inputClass} ${borderClass(errors.product)}`}
        >
          <option value="">Choose a product</option>
          <option value="product-1">Product 1</option>
          <option value="product-2">Product 2</option>
          <option value="product-3">Product 3</option>
        </select>
      </FormField>

      <FormField id="pickupDate" label="Pickup Date" error={errors.pickupDate}>
        <input
          type="date"
          id="pickupDate"
          name="pickupDate"
          // Grey out past days in the picker. Set in the browser, not during
          // server rendering, so it uses the customer's own "today".
          onFocus={(event) => {
            event.currentTarget.min = new Date().toLocaleDateString("en-CA");
          }}
          className={`${inputClass} ${borderClass(errors.pickupDate)}`}
        />
      </FormField>

      <FormField id="details" label="Order Details" error={errors.details}>
        <textarea
          id="details"
          name="details"
          rows={5}
          placeholder="Tell us what you would like..."
          className={`${inputClass} ${borderClass(errors.details)} resize-none`}
        />
      </FormField>

      <FormStatus message={message} />
      <SubmitButton submitting={submitting} label="Submit Order" />
    </form>
  );
}
