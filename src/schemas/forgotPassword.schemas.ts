import { z } from "zod";

const ResetPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6, "New password must be at least 6 characters"),
    otp: z
      .string({ required_error: "OTP is required" })
      .length(6, "OTP code must contain exactly 6 character(s)")
  })
});

export type ResetPasswordBody = z.infer<typeof ResetPasswordSchema>["body"];

export { ResetPasswordSchema };
