import { useNavigate } from "react-router";
import { deleteInvoice } from "../../../services/InvoicesService";

import Button from "../Button";
import { useState } from "react";

type Modal = {
  idToDelete: string;
  onClose: () => void;
};

export default function ModalDelete({ idToDelete, onClose }: Modal) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleDelete = async (idToDelete: string) => {
    setIsDeleting(true);
    try {
      await deleteInvoice(idToDelete);

      navigate("/");
    } catch (error) {
      console.warn(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <h3 className="mb-3 text-hm dark:text-white-pure">Confirm Deletion</h3>
      <p className="mb-3 text-base text-grey-regent dark:text-link-water">
        Are you sure you want to delete invoice #{idToDelete}? This action
        cannot be undone.
      </p>
      <div className="flex flex-row justify-end gap-4">
        <Button color="white" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="red"
          showSpinner={isDeleting}
          onClick={() => handleDelete(idToDelete)}
        >
          Delete
        </Button>
      </div>
    </>
  );
}
