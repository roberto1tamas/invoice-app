import { type Invoice } from "../../interfaces/Invoice";
import { getDueDateString } from "../../utils/utils";
import Label from "../ui/form/Label";

export default function InvoiceDetails({ invoice }: { invoice: Invoice }) {
  const invoiceDateString = new Date(invoice.invoiceDate).toLocaleDateString();

  const invoiceDueDateString = getDueDateString(
    invoice.invoiceDate,
    invoice.paymentTerms,
  );

  return (
    <section className="mb-24 max-w-3xl rounded-lg bg-white-pure px-8 py-6 shadow-10 dark:bg-dark sm:mb-8 sm:shadow-none">
      <div className="block w-full sm:flex sm:justify-between">
        <div className="break-words text-hs text-dark-cinder dark:text-white-pure">
          <h1>
            <span className="dark:grey-regent text-blue-wild">#</span>
            {invoice.id}
          </h1>
          <Label>{invoice.projectDescription}</Label>
        </div>

        <div className="mt-8 sm:mt-auto sm:text-right">
          <address className="break-words text-base not-italic text-blue-wild dark:text-link-water">
            {invoice.billFrom.street} <br />
            {invoice.billFrom.city} <br />
            {invoice.billFrom.postCode} <br />
            {invoice.billFrom.country}
          </address>
        </div>
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-x-14 gap-y-8 sm:grid-cols-3">
        <div>
          <Label>Invoice Date</Label>
          <h3 className="mt-3 break-words text-hs text-dark-cinder dark:text-white-pure">
            {invoiceDateString}
          </h3>
        </div>

        <div className="col-start-2 row-span-2 ">
          <Label>Bill to</Label>
          <h3 className="mt-3 break-words text-hs text-dark-cinder dark:text-white-pure">
            {invoice.billTo.name}
          </h3>
          <address className="break-words text-base not-italic text-blue-wild dark:text-link-water">
            {invoice.billTo.street} <br />
            {invoice.billTo.city} <br />
            {invoice.billTo.postCode} <br />
            {invoice.billTo.country}
          </address>
        </div>

        <div className="col-start-1">
          <Label>Payment Due</Label>
          <h3 className="mt-3 break-words text-hs text-dark-cinder dark:text-white-pure">
            {invoiceDueDateString}
          </h3>
        </div>

        <div className="sm:col-start-3 sm:row-start-1">
          <Label>Sent to</Label>
          <h3 className="mt-3 whitespace-pre-line break-words text-hs text-dark-cinder dark:text-white-pure">
            {invoice.billTo.email}
          </h3>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-[#F9FAFE] dark:bg-grey-yankees">
        <div className="p-6">
          <table className="w-full table-fixed sm:table-auto">
            <thead>
              <tr className="hidden text-blue-wild dark:text-link-water sm:table-row">
                <th className="py-4  text-left text-base">Item Name</th>
                <th className="hidden py-4 text-center text-base sm:table-cell">
                  QTY.
                </th>
                <th className="hidden py-4 text-right text-base sm:table-cell">
                  Price
                </th>
                <th className="py-4 text-right text-base">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.itemsList.map((item) => (
                <tr key={item.itemName}>
                  <td className="break-words py-4 text-left text-hs-variant text-dark-cinder dark:text-white-pure">
                    {item.itemName}
                    <span className="mt-2 block text-blue-wild sm:hidden">
                      {item.quantity} x € {item.price}
                    </span>
                  </td>
                  <td className="hidden py-4 text-center text-hs-variant text-blue-wild dark:text-link-water sm:table-cell">
                    {item.quantity}
                  </td>
                  <td className="hidden py-4 text-right text-hs-variant text-blue-wild dark:text-link-water sm:table-cell">
                    € {item.price}
                  </td>
                  <td className="py-4  text-right align-middle text-hs-variant text-dark-cinder dark:text-white-pure">
                    € {item.quantity * item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full rounded-b-lg bg-[#373B53] p-6 dark:bg-dark-cinder">
          <dl className="flex items-center justify-between text-white-pure">
            <dt className="text-base">Amount Due</dt>
            <dd className="text-hm">
              €
              {invoice.itemsList.reduce(
                (total, item) => (total += item.price * item.quantity),
                0,
              )}
            </dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
