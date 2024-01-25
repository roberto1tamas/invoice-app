import { supabase } from "./supabase";

import { ZodError } from "zod";
import { invoiceSchema, type Invoice } from "../interfaces/Invoice";

import {
  modifierInvoice,
  modifierInvoiceToDB,
  modifierInvoices,
} from "../utils/modifiers";

const parseInvoice = async (data: Invoice) => {
  try {
    const parsedData = invoiceSchema.parse(data);
    return parsedData;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Validation error:", error.errors);
      throw new Error(`Parsing error: Invalid  format for data: ${data}`);
    } else {
      throw new Error("Something went wrong in parsing");
    }
  }
};
const parseInvoices = async (data: Invoice[]) => {
  const invoices = await Promise.all(
    data.map(async (invoice) => await parseInvoice(invoice)),
  );
  return invoices;
};

export const listInvoices = async (
  userId: string,
  abortController: AbortController,
) => {
  try {
    const { data, error } = await supabase
      .from("Invoices")
      .select()
      .eq("createdBy", userId)
      .order("id", { ascending: false })
      .abortSignal(abortController.signal);

    if (error && !abortController.signal.aborted) {
      console.error("Error in getting invoices from Supabase: ", error);
      return [];
    }

    if (data) {
      const invoices = modifierInvoices(data);
      return await parseInvoices(invoices);
    }
    return null;
  } catch (error) {
    throw new Error(`Something went wrong in listInvoices: ${error}`);
  }
};

export const retrieveInvoice = async (
  invoiceId: Invoice["id"],
  abortController: AbortController,
) => {
  try {
    const { data, error } = await supabase
      .from("Invoices")
      .select()
      .eq("id", invoiceId)
      .abortSignal(abortController.signal);

    if (error && !abortController.signal.aborted) {
      throw new Error(
        `Error in getting invoice ${invoiceId} from Supabase: ${error.message}`,
      );
    }

    if (data !== null) {
      const invoice = modifierInvoice(data[0]);
      return await parseInvoice(invoice);
    }

    // Redirect to Error page, access not allowed
    throw new Error(
      `Something went wrong in retrieveInvoice: ${error.message}`,
    );
  } catch (error) {
    throw new Error(
      `Something went wrong in retrieveInvoice ${invoiceId}: ${error}`,
    );
  }
};

export const createInvoice = async (payload: Invoice) => {
  try {
    const parsedPayload = await parseInvoice(payload);
    const dbInvoice = modifierInvoiceToDB(parsedPayload);

    console.log("modifierInvoiceToDB: ", dbInvoice);

    const { data, error } = await supabase
      .from("Invoices")
      .insert(dbInvoice)
      .select();

    if (error) {
      throw new Error(
        `Supabase Error in creating invoice ${parsedPayload}: ${error.message}`,
      );
    }

    console.log("Db responsed after insert: ", data);

    const invoice = modifierInvoice(data[0]);
    return await parseInvoice(invoice);
  } catch (error) {
    throw new Error(`Something went wrong on createInvoice: ${payload}`);
  }
};

export const updateInvoice = async (payload: Invoice) => {
  try {
    const parsedPayload = await parseInvoice(payload);
    const dbInvoice = modifierInvoiceToDB(parsedPayload);

    const { data, error } = await supabase
      .from("Invoices")
      .update(dbInvoice)
      .eq("id", parsedPayload.id)
      .select();

    if (error) {
      throw new Error(
        `Something went wrong in updateInvoice ID ${payload.id}: ${error}`,
      );
    }

    const invoice = modifierInvoice(data[0]);
    return await parseInvoice(invoice);
  } catch (error) {
    throw new Error(`Something went wrong on updateInvoice: ${payload.id}`);
  }
};

export const deleteInvoice = async (id: Invoice["id"]) => {
  try {
    const response = await supabase.from("Invoices").delete().eq("id", id);

    if (response.error) {
      throw new Error(
        `Something went wrong in deleteInvoice ID ${id}: ${response.error}`,
      );
    }

    return response;
  } catch (error) {
    throw new Error(`Something went wrong in deleteInvoice ID ${id}: ${error}`);
  }
};
