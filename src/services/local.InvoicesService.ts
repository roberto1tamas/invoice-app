import { ZodError } from "zod";
import { invoiceSchema, type Invoice } from "../interfaces/Invoice";

const API_BASE_URL = "http://localhost:3000";

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

export const listInvoices = async (abortController: AbortController) => {
  const response = await fetch(`${API_BASE_URL}/invoices`, {
    signal: abortController.signal,
  });

  if (response.ok) {
    return await response.json();
    //parseInvoice(response);
  }

  throw new Error("Something went wrong in listInvoices");
};

export const retrieveInvoice = async (
  id: string,
  abortController: AbortController,
) => {
  const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
    signal: abortController.signal,
  });

  if (response.ok) {
    //return await response.json();

    const data: Invoice = await response.json();

    return await parseInvoice(data);
  }
  throw new Error(`Something went wrong in retrieveInvoice, ID: ${id}`);
};

export const createInvoice = async (payload: Invoice) => {
  const parsedPayload = await parseInvoice(payload);

  const response = await fetch(`${API_BASE_URL}/invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Error(`Something went wrong on updateInvoice: ${parsedPayload.id}`);
};

export const updateInvoice = async (payload: Invoice) => {
  const parsedPayload = await parseInvoice(payload);

  const response = await fetch(`${API_BASE_URL}/invoices/${parsedPayload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedPayload),
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Error(`Something went wrong on updateInvoice: ${parsedPayload.id}`);
};

export const deleteInvoice = async (id: string) => {
  const request = await fetch(`${API_BASE_URL}/invoices/${id}`, {
    method: "DELETE",
  });

  if (request.ok) {
    return await request.json();
  }
  throw new Error(`Something went wrong in deleteInvoice, ID: ${id}`);
};
