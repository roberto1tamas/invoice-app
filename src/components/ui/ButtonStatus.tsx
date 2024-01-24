import { type ComponentPropsWithoutRef } from "react";

export default function ButtonStatus({
  status = "draft",
  ...otherProps
}: {
  status: "draft" | "pending" | "paid";
} & ComponentPropsWithoutRef<"button">) {
  type ButtonStatus = {
    text: string;
    classList: string;
    classListIcon: string;
  };

  let button: ButtonStatus = {
    text: "Draft",
    classList:
      "text-grey-yankees bg-white dark:text-link-water dark:bg-grey-yankees",
    classListIcon: "bg-grey-yankees dark:bg-link-water",
  };

  switch (status) {
    case "pending":
      button = {
        text: "Pending",
        classList: "text-[#FF8F00] bg-[#FFF9F0] dark:bg-[#2B2736]",
        classListIcon: "bg-[#FF8F00]",
      };
      break;

    case "paid":
      button = {
        text: "Paid",
        classList: "text-[#33D69F] bg-[#F3FDFA] dark:bg-[#1F2B3F]",
        classListIcon: "bg-[#33D69F]",
      };
      break;
  }

  return (
    <button
      className={`${button.classList} flex h-10 w-24 items-center justify-center gap-1 rounded-md`}
      {...otherProps}
    >
      <div className={`${button.classListIcon} h-2 w-2 rounded-full `}></div>
      <div className="text-hs-variant">
        <p>{button.text}</p>
      </div>
    </button>
  );
}
