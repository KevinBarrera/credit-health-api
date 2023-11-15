import { z } from "zod";

const EmailVerificationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email")
  })
});

export type EmailVerificationBody = z.infer<
  typeof EmailVerificationSchema
>["body"];

export { EmailVerificationSchema };
