import InvoiceItem from "./InvoiceItem";
import { type Invoice } from "../../interfaces/Invoice";

import imgEmpty from "../../assets/illustration-empty.svg";
import { getDueDateString } from "../../utils/utils";
import InvoiceListSkeleton from "../Skeleton/InvoiceListSkeleton";

export default function InvoiceList({
  invoices,
  isDataLoading,
}: {
  invoices: Invoice[] | null;
  isDataLoading: boolean;
}) {
  if (invoices === null) {
    return <InvoiceListSkeleton />;
  }

  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-8">
        <div>
          <img
            src={imgEmpty}
            className="md:w-80"
            alt="Illustration invoice list empty"
          />
        </div>
        <div>
          <h3 className="py-6 text-center text-hm text-dark-cinder dark:text-white">
            There is nothing here
          </h3>
          <p className="text-center text-grey-regent dark:text-link-water">
            Create an invoice by clicking the <br />
            <strong>New Invoice</strong> button and get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`flex flex-col gap-4 ${
        isDataLoading && "animate-pulse opacity-40"
      }`}
    >
      {invoices.map((item) => (
        <InvoiceItem
          key={item.id}
          id={item.id}
          paymentDueDate={getDueDateString(item.invoiceDate, item.paymentTerms)}
          name={item.billTo.name}
          price={item.itemsList
            .reduce((acc, { price, quantity }) => acc + price * quantity, 0)
            .toString()}
          status={item.status}
        />
      ))}
    </section>
  );
}
