import { Invoice } from "./Invoice";

export type SlideOverOutletContext = [
  invoice: Invoice | null,
  handleSetInvoice: (invoice: Invoice) => void,
];
