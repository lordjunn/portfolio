import { z } from "zod"

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be less than 100 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be less than 5,000 characters."),
  sendConfirmation: z.boolean().default(true),
  website: z.string().optional().or(z.literal("")), // Honeypot field (bots will fill this)
})

export type ContactFormData = z.infer<typeof contactFormSchema>
