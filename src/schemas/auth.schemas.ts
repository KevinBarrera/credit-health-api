import { z } from "zod";

const LoginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters")
  })
});

const RegisterSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Name is required" })
      .email("Invalid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
    phone: z.string({ required_error: "Phone is required" }),
    name: z.string({ required_error: "Name is required" }),
    lastName: z.string({ required_error: "Last name is required" }),
    birthDate: z
      .string({
        required_error: "Please provide a date and time",
        invalid_type_error: "That's not a valid date and time!"
      })
      .datetime()
      .refine((value) => new Date(value) >= new Date("1900-01-01"), {
        message: "Too old"
      })
      .refine((value) => new Date(value) <= new Date(), {
        message: "Too young!"
      })
  })
});

export type LoginSchemaBody = z.infer<typeof LoginSchema>["body"];
export type RegisterSchemaBody = z.infer<typeof RegisterSchema>["body"];

export { LoginSchema, RegisterSchema };
