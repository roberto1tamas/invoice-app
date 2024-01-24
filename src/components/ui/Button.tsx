import { IconSpinner } from "./Icon";
import { type ElementType, ComponentPropsWithoutRef } from "react";

export type ButtonProps = {
  color: "purple" | "dark" | "red" | "white";
  onClick?: () => void;
  showSpinner?: boolean;
  icon?: ElementType | null;
  fullWidth?: boolean;
} & ComponentPropsWithoutRef<"button">;

export default function Button({
  children,
  color = "purple",
  showSpinner = false,
  icon: IconComponent = undefined,
  fullWidth = false,
  ...otherProps
}: ButtonProps) {
  let colorClass: string;

  switch (color) {
    case "purple":
      colorClass =
        "text-white fill-purple bg-purple hover:bg-purple-light hover:fill-purple-white";
      break;

    case "white":
      colorClass =
        "text-blue-wild fill-blue-wild bg-[#F9FAFE] hover:text-blue-wild hover:bg-link-water dark:text-link-water dark:bg-grey-yankees dark:hover:bg-white-pure dark:hover:text-link-water";
      break;

    case "red":
      colorClass = "text-white bg-red fill-red hover:bg-pink hover:text-[#fff]";
      break;

    case "dark":
      colorClass =
        "text-grey-regent bg-[#373B53] fill-[#373B53] dark:text-link-water dark:hover:bg-dark hover:bg-dark-cinder";
      break;

    default:
      colorClass = "text-white bg-purple";
      break;
  }

  return (
    <button
      {...otherProps}
      className={`easy-in-out group flex h-12 items-center justify-center rounded-full px-2 text-hs duration-100 disabled:cursor-not-allowed md:gap-1 ${colorClass} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {IconComponent && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white group-hover:scale-105 group-hover:transition group-hover:ease-in">
          <IconComponent width="10" height="10" />
        </div>
      )}

      <div className="flex items-center justify-center px-2 md:px-4">
        {showSpinner ? (
          <>
            <IconSpinner />

            {children}
          </>
        ) : (
          children
        )}
      </div>
    </button>
  );
}
