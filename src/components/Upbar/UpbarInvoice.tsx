import { useState } from "react";

import ButtonStatus from "../ui/ButtonStatus";
import Button from "../ui/Button";

import { type Invoice } from "../../interfaces/Invoice";
import Modal from "../ui/modal/Modal";
import ModalDelete from "../ui/modal/ModalDelete";
import { updateInvoice } from "../../services/InvoicesService";
import { useNavigate } from "react-router";

export default function UpbarInvoice({
  invoice,
  setInvoiceState,
}: {
  invoice: Invoice;
  setInvoiceState: (invoice: Invoice) => void;
}) {
  const navigate = useNavigate();
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState<boolean>(false);

  const handleModalClose = () => {
    isModalDeleteOpen ? setModalDeleteOpen(false) : setModalDeleteOpen(true);
  };

  const getNewInvoiceStatus = (
    invoiceStatus: Invoice["status"],
  ): Invoice["status"] => {
    let newStatus: Invoice["status"];
    switch (invoiceStatus) {
      case "draft":
        newStatus = "pending";
        break;

      case "pending":
        newStatus = "paid";
        break;

      case "paid":
        newStatus = "pending";
        break;
    }

    return newStatus;
  };

  const handleUpdateStatus = async (invoice: Invoice) => {
    setIsStatusUpdating(true);
    const newStatus = getNewInvoiceStatus(invoice.status);

    try {
      const newInvoice: Invoice = {
        ...invoice,
        status: newStatus,
      };
      const response: Invoice = await updateInvoice(newInvoice);
      setInvoiceState(response);
    } catch (error) {
      console.warn(`Error in update invoice status: ${error}`);
    } finally {
      setIsStatusUpdating(false);
    }
  };

  return (
    <nav className="mb-4 max-w-3xl items-center rounded-lg bg-white-pure px-8 py-6 shadow-10 dark:bg-dark sm:mb-6 sm:flex sm:shadow-none">
      <div className="flex w-full items-center justify-between gap-5 sm:justify-normal">
        <h3 className="text-sm text-grey-regent dark:text-link-water">
          Status
        </h3>
        <ButtonStatus status={invoice.status} disabled />
      </div>
      <div className="fixed bottom-0 left-0 w-screen bg-white-pure px-8 py-6 shadow-[0px_-1px_9px_0px_rgba(96,96,96,0.2)] dark:bg-dark sm:static sm:bottom-auto sm:left-auto sm:ml-auto sm:w-full sm:p-0 sm:shadow-none">
        <div className="flex items-center justify-between gap-2 sm:justify-end">
          <Button
            color="white"
            onClick={() => navigate(`/invoice/${invoice.id}/edit`)}
            disabled={isModalDeleteOpen || isStatusUpdating}
          >
            <span>Edit</span>
          </Button>

          <Button
            color="red"
            onClick={handleModalClose}
            disabled={isModalDeleteOpen || isStatusUpdating}
          >
            <span>Delete</span>
          </Button>

          <Modal isOpen={isModalDeleteOpen} onClose={handleModalClose}>
            <ModalDelete onClose={handleModalClose} idToDelete={invoice.id} />
          </Modal>

          <Button
            color={invoice.status === "pending" ? "purple" : "dark"}
            onClick={() => handleUpdateStatus(invoice)}
            disabled={isStatusUpdating || isModalDeleteOpen}
            showSpinner={isStatusUpdating}
          >
            <span>
              {invoice.status === "pending" ? "Mark as Paid" : "Put in Pending"}
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
