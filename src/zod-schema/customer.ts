import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (field) => field.min(1, "First name is required"),
  lastName: (field) => field.min(1, "Last name is required"),
  address1: (field) => field.min(1, "Address is required"),
  city: (field) => field.min(1, "City is required"),
  state: (field) => field.length(2, "State must be exactly 2 character"),
  email: (field) => field.email("Invalid email address"),
  zip: (field) =>
    field.regex(
      /^\d{5}(-\d{4})?$/,
      "Invaild Zip code. Use 5 digits or 5 digits followed by a hyphen and 4 digits"
    ),
  phone: (field) =>
    field.regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Invaild phone number format. Use XXX-XXX-XXXX"
    ),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;

export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
