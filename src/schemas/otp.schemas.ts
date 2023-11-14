import { z } from "zod";

const EmailContentSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    subject: z.string({ required_error: "Subject is required" }),
    message: z.string({ required_error: "Message is required" }),
    duration: z.number().int().positive().lte(24).default(1)
  })
});

export type EmailContentBody = z.infer<typeof EmailContentSchema>["body"];

export { EmailContentSchema };
