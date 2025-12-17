"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const Schema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof Schema>;

/**
 * Contact form for the webshop.
 * Validates fields with Zod + react-hook-form and shows toast feedback on submit.
 *
 * Accessibility:
 * - Associates labels with fields using htmlFor + id
 * - Links error messages using aria-describedby
 */
export default function ContactForm() {
  const formId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  /**
   * Handles form submission.
   * This demo simulates sending a message and resets the form afterwards.
   */
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 300));
    toast.success("Message sent!");
    reset();
  };

  const fullNameId = `${formId}-fullName`;
  const subjectId = `${formId}-subject`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;

  const fullNameErrorId = `${fullNameId}-error`;
  const subjectErrorId = `${subjectId}-error`;
  const emailErrorId = `${emailId}-error`;
  const messageErrorId = `${messageId}-error`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4" noValidate>
      <h1 className="text-2xl">Contact</h1>

      <div>
        <label htmlFor={fullNameId} className="block mb-1">
          Full name
        </label>
        <input
          id={fullNameId}
          type="text"
          autoComplete="name"
          {...register("fullName")}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? fullNameErrorId : undefined}
          className="w-full rounded bg-white/10 px-3 py-2"
        />
        {errors.fullName && (
          <p id={fullNameErrorId} className="text-red-400 text-sm mt-1">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={subjectId} className="block mb-1">
          Subject
        </label>
        <input
          id={subjectId}
          type="text"
          autoComplete="off"
          {...register("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? subjectErrorId : undefined}
          className="w-full rounded bg-white/10 px-3 py-2"
        />
        {errors.subject && (
          <p id={subjectErrorId} className="text-red-400 text-sm mt-1">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={emailId} className="block mb-1">
          Email
        </label>
        <input
          id={emailId}
          type="email"
          autoComplete="email"
          inputMode="email"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? emailErrorId : undefined}
          className="w-full rounded bg-white/10 px-3 py-2"
        />
        {errors.email && (
          <p id={emailErrorId} className="text-red-400 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={messageId} className="block mb-1">
          Message
        </label>
        <textarea
          id={messageId}
          rows={5}
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? messageErrorId : undefined}
          className="w-full rounded bg-white/10 px-3 py-2"
        />
        {errors.message && (
          <p id={messageErrorId} className="text-red-400 text-sm mt-1">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex rounded px-4 py-2 bg-white text-black cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : "Send"}
      </button>
    </form>
  );
}