import { useEffect, useReducer } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import loadable from "@loadable/component";

import ButtonGoBack from "../components/ui/ButtonGoBack";

const InvoiceDetails = loadable(
  () => import("../components/Invoice/InvoiceDetails"),
);
import InvoiceDetailsSkeleton from "../components/Skeleton/InvoiceDetailsSkeleton";

const UpbarInvoice = loadable(() => import("../components/Upbar/UpbarInvoice"));
import UpbarInvoiceSkeleton from "../components/Skeleton/UpbarInvoiceSkeleton";

import invoiceReducer from "../reducers/invoiceReducer";

import { type Invoice as InvoiceType } from "../interfaces/Invoice";
import { retrieveInvoice } from "../services/InvoicesService";

export default function Invoice() {
  const { id } = useParams();
  const invoiceID = parseInt(id ?? "");

  const [invoice, dispatch] = useReducer(invoiceReducer, {} as InvoiceType);

  const navigate = useNavigate();

  const handleSetInvoice = (invoice: InvoiceType) =>
    dispatch({ type: "setInvoice", payload: invoice });

  useEffect(() => {
    if (invoiceID === undefined) {
      navigate("/error");
      return;
    }

    const abortController = new AbortController();

    (async () => {
      try {
        const invoice: InvoiceType = await retrieveInvoice(
          invoiceID as InvoiceType["id"],
          abortController,
        );
        handleSetInvoice(invoice);
      } catch (error) {
        console.warn(error);

        if (!abortController.signal.aborted) {
          navigate("/error");
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [invoiceID, navigate]);

  if (invoice === null || !("id" in invoice)) {
    return (
      <>
        <ButtonGoBack onClick={() => navigate(-1)} className="mb-8" />
        <UpbarInvoiceSkeleton />
        <InvoiceDetailsSkeleton />
      </>
    );
  }

  return (
    <>
      <ButtonGoBack onClick={() => navigate(-1)} className="mb-8" />
      <UpbarInvoice
        invoice={invoice}
        setInvoiceState={handleSetInvoice}
        fallback={<UpbarInvoiceSkeleton />}
      />

      <InvoiceDetails invoice={invoice} fallback={<InvoiceDetailsSkeleton />} />
      <Outlet context={[invoice, handleSetInvoice]} />
    </>
  );
}
