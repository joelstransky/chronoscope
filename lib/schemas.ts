import { z } from "zod";

export const PersonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid birth date",
  }),
  deathDate: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), {
      message: "Invalid death date",
    }),
  description: z.string().optional(),
});

export type PersonFormData = z.infer<typeof PersonSchema>;
