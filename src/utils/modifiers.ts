import { Invoice, InvoiceItemList } from "../interfaces/Invoice";
import { InvoicesInsert, InvoicesRow } from "../interfaces/supabase";

export const modifierInvoice = (dbInvoice: InvoicesRow): Invoice => ({
  id: dbInvoice.id,
  status: dbInvoice.status,
  billFrom: {
    street: dbInvoice.billFromStreet,
    city: dbInvoice.billFromCity,
    postCode: dbInvoice.billFromPostCode,
    country: dbInvoice.billFromCountry,
  },
  billTo: {
    name: dbInvoice.billToName,
    email: dbInvoice.billToEmail,
    street: dbInvoice.billToStreet,
    city: dbInvoice.billToCity,
    postCode: dbInvoice.billToPostCode,
    country: dbInvoice.billToCountry,
  },
  invoiceDate: dbInvoice.invoiceDate,
  paymentTerms: dbInvoice.paymentTerms,
  projectDescription: dbInvoice.projectDescription,
  itemsList: dbInvoice.itemsList as InvoiceItemList[],
});

export const modifierInvoices = (dbInvoices: InvoicesRow[]) => {
  const invoices = dbInvoices.map((dbInvoice) => modifierInvoice(dbInvoice));
  return invoices;
};

/**
 * Modifies an Invoice object in InvoicesRow object to be inserted in the database
 * @param invoice
 * @returns dbInvoice (db row like object to be inserted)
 */
export const modifierInvoiceToDB = (invoice: Invoice): InvoicesInsert => ({
  status: invoice.status,
  billFromStreet: invoice.billFrom.street,
  billFromCity: invoice.billFrom.city,
  billFromPostCode: invoice.billFrom.postCode,
  billFromCountry: invoice.billFrom.country,

  billToName: invoice.billTo.name,
  billToEmail: invoice.billTo.email,
  billToStreet: invoice.billTo.street,
  billToCity: invoice.billTo.city,
  billToPostCode: invoice.billTo.postCode,
  billToCountry: invoice.billTo.country,

  invoiceDate: invoice.invoiceDate.toDateString(),
  paymentTerms: invoice.paymentTerms,
  projectDescription: invoice.projectDescription,
  itemsList: invoice.itemsList,
});
