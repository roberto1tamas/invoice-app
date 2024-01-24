import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import { type PropsWithChildren, useContext } from "react";

import loadable from "@loadable/component";
import Nav from "./components/Navigation/Nav";
import Invoices from "./pages/Invoices";
import Login from "./pages/Login";
import AuthProvider, { AuthContext } from "./providers/AuthProvider";
const ErrorPage = loadable(() => import("./pages/ErrorPage"));
const Invoice = loadable(() => import("./pages/Invoice"));
const InvoiceEdit = loadable(() => import("./pages/InvoiceEdit"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: <Invoices />,
        children: [
          {
            path: "/new",
            element: <InvoiceEdit />,
          },
        ],
      },
      {
        path: "/invoice/:id",
        element: <Invoice />,
        children: [
          {
            path: "/invoice/:id/edit",
            element: <InvoiceEdit />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

function Layout({ children }: PropsWithChildren) {
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

export default App;
