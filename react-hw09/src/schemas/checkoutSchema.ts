import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(5, "ПІБ має містити мінімум 5 символів")
    .max(60, "ПІБ не має перевищувати 60 символів"),
  phone: z
    .string()
    .regex(/^\+380\d{9}$/, "Введіть телефон у форматі +380XXXXXXXXX"),
  city: z
    .string()
    .min(5, "Вкажіть місто та відділення (мінімум 5 символів)"),
  paymentMethod: z.enum(["card", "cod", "invoice"], {
    error: "Оберіть спосіб оплати",
  }),
  comment: z
    .string()
    .max(300, "Коментар не має перевищувати 300 символів"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
