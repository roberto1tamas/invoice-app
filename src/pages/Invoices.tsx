import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Outlet, useLocation } from "react-router";

import loadable from "@loadable/component";
import InvoiceListSkeleton from "../components/Skeleton/InvoiceListSkeleton";
const InvoiceList = loadable(
  () => import("../components/InvoiceList/InvoiceList"),
);
import UpbarSkeleton from "../components/Skeleton/UpbarSkeleton";
const Upbar = loadable(() => import("../components/Upbar/Upbar"));

import { listInvoices } from "../services/InvoicesService";
import { type InvoiceStatus, type Invoice } from "../interfaces/Invoice";
import { AuthContext } from "../providers/AuthProvider";

export default function Invoices() {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const [invoices, setInvoices] = useState<Invoice[] | null>(null);
  const [filterParams, setFilterParams] = useSearchParams();
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/new" && window.history.state.idx > 0) return;

    const abortController = new AbortController();
    setIsDataLoading(true);

    (async () => {
      const invoices = await listInvoices(user?.id as string, abortController);

      const params = Object.fromEntries([...filterParams]);

      filterInvoicesFromStatusParams(invoices, params);
      setIsDataLoading(false);
    })();

    return () => {
      abortController.abort();
      setIsDataLoading(false);
    };
  }, [filterParams, location.pathname, user]);

  const filterInvoicesFromStatusParams = (
    invoices: Invoice[] | null,
    params: { [k: string]: string },
  ) => {
    if (invoices === null) {
      setInvoices(null);
      return;
    }

    if (params.status === undefined) {
      setInvoices(invoices);
      return;
    }

    const filteredInvoices: Invoice[] = [...invoices].filter((invoice) =>
      params.status.includes(invoice.status),
    );
    setInvoices(filteredInvoices);
  };

  const updateStatusParams = (
    statusToUpdate: InvoiceStatus,
    isChecked: boolean,
  ) => {
    const currentParams = Object.fromEntries([...filterParams]);
    const statusParams: string[] = currentParams?.status?.split(",") ?? [];

    if (isChecked) {
      statusParams.push(statusToUpdate);
    } else {
      statusParams.splice(statusParams.indexOf(statusToUpdate), 1);
    }

    if (statusParams.length === 0) {
      delete currentParams.status;
      setFilterParams(currentParams);
      return;
    }

    const newParams = { ...currentParams, status: statusParams.join(",") };
    setFilterParams(newParams);
  };

  return (
    <>
      <Upbar
        invoicesCount={invoices?.length}
        updateParams={updateStatusParams}
        fallback={<UpbarSkeleton />}
      />

      <InvoiceList
        invoices={invoices}
        isDataLoading={isDataLoading}
        fallback={<InvoiceListSkeleton />}
      />
      <Outlet />
    </>
  );
}
