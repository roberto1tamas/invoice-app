import { useLocation } from "react-router-dom";
import SlideOver from "../components/SlideOver/SlideOver";
import InvoiceForm from "../components/InvoiceForm/InvoiceForm";

import { type Invoice } from "../interfaces/Invoice";

export default function InvoiceEdit() {
  const invoice: Invoice | undefined = useLocation().state?.invoice;

  let isEdit: boolean;
  invoice === undefined ? (isEdit = false) : (isEdit = true);

  return (
    <SlideOver>
      <h2 className="my-6 text-hm text-dark-cinder dark:text-white-pure md:my-11">
        {isEdit ? (
          <>
            Edit <span className="dark:grey-regent text-blue-wild">#</span>
            {invoice?.id}
          </>
        ) : (
          <>New Invoice</>
        )}
      </h2>

      <div className="pb-16 sm:pb-20">
        {/* <InvoiceForm isEdit={isEdit} defaultValues={invoice} /> */}
        <InvoiceForm />
      </div>
    </SlideOver>
  );
}
