import { z } from "zod";

export const PersonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthDate: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Invalid birth date",
  }),
  deathDate: z
    .string()
    .optional()
    .refine((date) => !date || !Number.isNaN(Date.parse(date)), {
      message: "Invalid death date",
    }),
  description: z.string().optional(),
});

export type PersonFormData = z.infer<typeof PersonSchema>;

export const EventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
  description: z.string().optional(),
  personId: z.string().min(1, "Person ID is required"),
});

export type EventFormData = z.infer<typeof EventSchema>;

export const SearchParamsSchema = z.object({
  people: z.array(z.string()).default([]),
});

export type SearchParamsData = z.infer<typeof SearchParamsSchema>;
