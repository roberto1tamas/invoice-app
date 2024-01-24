import Button from "../ui/Button";
import { type InvoiceStatus } from "../../interfaces/Invoice";
import { type FormEvent } from "react";

type FormMenuProps = {
  isEdit?: boolean;
  submitingStatus: "idle" | InvoiceStatus;
  onDiscard: () => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement> & { nativeEvent: SubmitEvent },
  ) => void;
};

export default function FormMenu({
  isEdit = true,
  submitingStatus,
  onDiscard,
  onSubmit,
}: FormMenuProps) {
  return (
    <section className="absolute bottom-0 left-0 w-full">
      <div className="w-full rounded-t-[1.25rem] bg-white-pure px-6 py-6 shadow-[2px_-7px_5px_1px_rgba(145,145,145,0.1)] dark:bg-dark dark:shadow-none sm:px-12">
        <div
          className={`mb-20 flex w-full items-center justify-between gap-2 sm:mb-0  ${
            isEdit ? "sm:justify-end" : ""
          } `}
        >
          <Button
            onClick={onDiscard}
            color="white"
            type="button"
            disabled={submitingStatus !== "idle"}
          >
            Discard
          </Button>

          <div className="flex gap-2">
            {isEdit || (
              <Button
                onClick={() => onSubmit}
                id="draft"
                color="dark"
                type="submit"
                disabled={submitingStatus !== "idle"}
                showSpinner={submitingStatus === "draft"}
              >
                Save as Draft
              </Button>
            )}

            <Button
              onClick={() => onSubmit}
              id="pending"
              color="purple"
              type="submit"
              disabled={submitingStatus !== "idle"}
              showSpinner={submitingStatus === "pending"}
            >
              {isEdit ? "Save Changes" : "Save & Send"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
