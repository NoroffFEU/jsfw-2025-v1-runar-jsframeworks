"use client";

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

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 300));
    toast.success("Message sent!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl">Contact</h1>

      <div>
        <label className="block mb-1">Full name</label>
        <input {...register("fullName")} className="w-full rounded bg-white/10 px-3 py-2" />
        {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Subject</label>
        <input {...register("subject")} className="w-full rounded bg-white/10 px-3 py-2" />
        {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input {...register("email")} className="w-full rounded bg-white/10 px-3 py-2" />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Message</label>
        <textarea rows={5} {...register("message")} className="w-full rounded bg-white/10 px-3 py-2" />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <button disabled={isSubmitting} className="inline-flex rounded px-4 py-2 bg-white text-black cursor-pointer">
        {isSubmitting ? "Sending…" : "Send"}
      </button>
    </form>
  );
}