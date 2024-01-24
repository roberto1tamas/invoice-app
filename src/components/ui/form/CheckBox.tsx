import { PropsWithChildren } from "react";
import { IconCheck } from "../Icon";

import { type InvoiceStatus } from "../../../interfaces/Invoice";

export default function CheckBox({
  children,
  id,
  isChecked,
  onClick,
}: PropsWithChildren<{
  id: InvoiceStatus;
  isChecked: boolean;
  onClick: (statusToUpdate: InvoiceStatus) => void;
}>) {
  return (
    <div
      className="group flex cursor-pointer items-center"
      onClick={() => onClick(id)}
    >
      <button
        className={`${
          isChecked ? "bg-purple" : "bg-link-water dark:bg-dark"
        } flex h-4 w-4 appearance-none items-center justify-center rounded-sm outline-none  group-hover:border group-hover:border-purple group-focus:border-purple `}
        defaultChecked
      >
        {isChecked && <IconCheck />}
      </button>

      <input
        type="checkbox"
        aria-hidden="true"
        value={isChecked.toString()}
        className="pointer-events-none absolute m-0 h-4 w-4 -translate-x-full opacity-0"
        tabIndex={-1}
        defaultChecked={isChecked}
        id={id}
      ></input>

      <label
        className={`${
          isChecked ? "text-dark" : "text-dark-cinder"
        } -z-10 block appearance-none pl-4 text-hs-variant dark:text-white-pure`}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
}
