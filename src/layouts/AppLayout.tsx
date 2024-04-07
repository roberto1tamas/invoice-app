import { Outlet, ScrollRestoration } from "react-router-dom";

import loadable from "@loadable/component";
import Nav from "../components/Navigation/Nav";
import Login from "../pages/Login";
const ErrorPage = loadable(() => import("../pages/ErrorPage"));
const Invoice = loadable(() => import("../pages/Invoice"));
const InvoiceEdit = loadable(() => import("../pages/InvoiceEdit"));

import { type PropsWithChildren, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function AppLayout({ children }: PropsWithChildren) {
  const { authState } = useContext(AuthContext);

  if (authState.session === null) {
    return <Login />;
  }

  InvoiceEdit.preload();
  Invoice.preload();
  ErrorPage.preload();

  return (
    <div className="min-h-screen bg-white dark:bg-dark-mirage lg:flex lg:flex-row">
      <Nav />
      <main className="mx-auto w-full max-w-3xl px-6 py-12 md:px-6 md:py-20 lg:px-0">
        {children ?? <Outlet />}
      </main>
      <ScrollRestoration />
    </div>
  );
}
