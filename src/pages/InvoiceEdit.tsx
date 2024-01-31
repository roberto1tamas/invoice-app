import { useOutletContext } from "react-router-dom";
import SlideOver from "../components/SlideOver/SlideOver";
import InvoiceForm from "../components/InvoiceForm/InvoiceForm";

import { SlideOverOutletContext } from "../interfaces/context";

export default function InvoiceEdit() {
  const [invoice] = useOutletContext<SlideOverOutletContext>() || [];

  return (
    <SlideOver>
      <h2 className="my-6 text-hm text-dark-cinder dark:text-white-pure md:my-11">
        {invoice ? (
          <>
            Edit <span className="dark:grey-regent text-blue-wild">#</span>
            {invoice?.id}
          </>
        ) : (
          <>New Invoice</>
        )}
      </h2>

      <div className="pb-16 sm:pb-20">
        <InvoiceForm />
      </div>
    </SlideOver>
  );
}
