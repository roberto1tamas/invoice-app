import { z } from "zod";

const defaultError = {
  required: "can't be empty",
};

const invoiceAddressSchema = z.object({
  street: z.string().min(1, defaultError.required),
  city: z.string().min(1, defaultError.required),
  postCode: z.string().min(1, defaultError.required),
  country: z.string().min(1, defaultError.required),
});

const invoiceItemSchema = z.object({
  itemName: z.string().min(1, defaultError.required),
  quantity: z.number().positive().int(),
  price: z.number().nonnegative(),
});

export const statusSchema = z.enum(["draft", "pending", "paid"]);

export const invoiceSchema = z.object({
  id: z.number().positive().int(),
  status: statusSchema,
  billFrom: invoiceAddressSchema,
  billTo: z
    .object({
      name: z.string().min(1, defaultError.required),
      email: z.string().email(),
    })
    .and(invoiceAddressSchema),
  invoiceDate: z.string().pipe(z.coerce.date()).or(z.date()),
  paymentTerms: z.enum(["1", "7", "14", "30"]),
  projectDescription: z.string().min(1, defaultError.required),
  itemsList: invoiceItemSchema
    .array()
    .min(1, "Item list must contain at least 1 element"),
});

export type Invoice = z.infer<typeof invoiceSchema>;

export type InvoiceStatus = z.infer<typeof statusSchema>;

export type InvoiceItemList = z.infer<typeof invoiceItemSchema>;

// export type Invoice = {
//   id: string;
//   status: InvoiceStatus;
//   paymentDueDate: string;
//   billFrom: BillFrom;
//   billTo: BillTo;
//   invoiceDate: string;
//   paymentTerms: 1 | 7 | 14 | 30;
//   projectDescription: string;
//   itemsList: ListItem[];
// };

// export type ListItem = {
//   itemName: string;
//   quantity: number;
//   price: number;
// };

// export type InvoiceStatus = "draft" | "pending" | "paid";

// export type BillFrom = {
//   street: string;
//   city: string;
//   postCode: string;
//   country: string;
// };

// export type BillTo = {
//   name: string;
//   email: string;
//   street: string;
//   city: string;
//   postCode: string;
//   country: string;
// };
