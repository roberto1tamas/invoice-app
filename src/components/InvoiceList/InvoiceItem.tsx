import { Link } from "react-router-dom";
import ButtonStatus from "../ui/ButtonStatus";
import { IconArrowRight } from "../ui/Icon";

import { type PropsWithoutRef } from "react";
import { type InvoiceStatus } from "../../interfaces/Invoice";

type InvoiceListItem = PropsWithoutRef<{
  id: number;
  paymentDueDate: string;
  name: string;
  price: string;
  status: InvoiceStatus;
}>;

export default function InvoiceItem({
  id,
  paymentDueDate,
  name,
  price,
  status,
}: InvoiceListItem) {
  return (
    <article className="rounded-lg bg-white-pure shadow-10 dark:bg-dark">
      <Link to={`/invoice/${id}`}>
        <div className="h-32 px-6 py-5 sm:flex sm:h-auto sm:flex-row sm:items-center sm:justify-between">
          <div className="relative h-full sm:flex sm:flex-row sm:items-center sm:gap-10">
            <div className="absolute top-0 sm:static">
              <p className="text-hs dark:text-white-pure">
                <span className="dark:grey-regent text-blue-wild">#</span>
                {id}
              </p>
            </div>

            <div className="absolute bottom-8 left-0 sm:static">
              <p className="text-sm text-blue-wild dark:text-link-water">
                <span className="mr-1.5 ">Due</span>
                <time>{paymentDueDate}</time>
              </p>
            </div>

            <div className="absolute right-0 top-0 sm:static">
              <p className="text-sm text-grey-regent dark:text-white-pure">
                {name}
              </p>
            </div>
          </div>

          <div className="relative sm:flex sm:flex-row sm:items-center sm:gap-10">
            <div className="absolute bottom-0 sm:static">
              <p className="text-hs text-dark-cinder dark:text-white-pure">
                <span>€ </span>
                {price}
              </p>
            </div>

            <div className="absolute bottom-0 right-0 sm:static">
              <ButtonStatus status={status} />
            </div>

            <div className="hidden sm:block">
              <IconArrowRight />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
