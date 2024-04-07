import Providers from "./providers";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import loadable from "@loadable/component";
import AppLayout from "./layouts/AppLayout";
import Invoices from "./pages/Invoices";
const ErrorPage = loadable(() => import("./pages/ErrorPage"));
const Invoice = loadable(() => import("./pages/Invoice"));
const InvoiceEdit = loadable(() => import("./pages/InvoiceEdit"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: (
      <AppLayout>
        <ErrorPage />
      </AppLayout>
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
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
