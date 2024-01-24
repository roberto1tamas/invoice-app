import { Invoice } from "../interfaces/Invoice";

type InvoiceActionReducer =
  | { type: "setInvoice"; payload: Invoice }
  | { type: "updateStatus"; payload: Invoice["status"] };

export default function invoiceReducer(
  state: Invoice,
  action: InvoiceActionReducer,
): Invoice {
  switch (action.type) {
    case "setInvoice": {
      return action.payload;
    }

    case "updateStatus": {
      return {
        ...state,
        status: action.payload,
      };
    }

    default:
      throw Error(`Unknown action ${action}`);
  }
}
