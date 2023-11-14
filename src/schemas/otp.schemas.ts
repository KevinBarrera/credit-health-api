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

const VerifyOtpSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    otp: z
      .string({ required_error: "OTP is required" })
      .length(6, "OTP code must contain exactly 6 character(s)")
  })
});

export type EmailContentBody = z.infer<typeof EmailContentSchema>["body"];
export type VerifyOtpBody = z.infer<typeof VerifyOtpSchema>["body"];

export { EmailContentSchema, VerifyOtpSchema };
