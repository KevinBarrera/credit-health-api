import { z } from "zod";

const EmailSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email")
  })
});

export type EmailBody = z.infer<typeof EmailSchema>["body"];

export { EmailSchema };
