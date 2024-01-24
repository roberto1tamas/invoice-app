import { useSearchParams } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IconArrowDown } from "../ui/Icon";
import CheckBox from "../ui/form/CheckBox";

import { type InvoiceStatus } from "../../interfaces/Invoice";

export default function FilterButton({
  updateParams,
}: {
  updateParams: (status: InvoiceStatus, isChecked: boolean) => void;
}) {
  const [filterParams] = useSearchParams();
  const statusParams = Object.fromEntries([...filterParams])?.status?.split(
    ",",
  );

  const [statusFilter, setStatusFilter] = useState({
    draft: statusParams?.includes("draft") ?? false,
    pending: statusParams?.includes("pending") ?? false,
    paid: statusParams?.includes("paid") ?? false,
  });

  function handleCheck(status: InvoiceStatus) {
    setStatusFilter({ ...statusFilter, [status]: !statusFilter[status] });

    updateParams(status, !statusFilter[status]);
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="relative flex appearance-none items-center gap-3 text-hs focus-visible:outline-none dark:text-white-pure">
            <span>
              Filter <span className="hidden sm:inline-block">by status</span>
            </span>
            <span>
              <IconArrowDown
                className={`stroke-purple transition duration-300 ease-in-out ${
                  open && "-rotate-180 transform"
                }`}
              />
            </span>
          </Popover.Button>

          <Transition
            as={Fragment}
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0 -translate-y-4"
            enterTo="transform scale-100 opacity-100 translate-y-0"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100 translate-y-0"
            leaveTo="transform scale-95 opacity-0 -translate-y-4"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-48 -translate-x-1/2 translate-y-0 transform rounded-lg bg-white-pure px-4 opacity-100 shadow-[0px_10px_20px_0px_rgba(72,84,159,0.25)] dark:bg-grey-yankees sm:px-0">
              <div className="relative flex flex-col gap-4 p-6">
                <CheckBox
                  id="draft"
                  isChecked={statusFilter.draft}
                  onClick={handleCheck}
                >
                  Draft
                </CheckBox>
                <CheckBox
                  id="pending"
                  isChecked={statusFilter.pending}
                  onClick={handleCheck}
                >
                  Pending
                </CheckBox>
                <CheckBox
                  id="paid"
                  isChecked={statusFilter.paid}
                  onClick={handleCheck}
                >
                  Paid
                </CheckBox>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
