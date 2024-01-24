import { IconArrowLeft } from "./Icon";
import { ComponentPropsWithoutRef } from "react";

export default function ButtonGoBack({
  onClick,
  ...props
}: ComponentPropsWithoutRef<"button"> & { onClick: () => void }) {
  return (
    <button {...props} onClick={onClick}>
      <span className="inline-block">
        <IconArrowLeft />
      </span>
      <span className="ml-6 inline-block text-hs-variant text-dark-cinder dark:text-white-pure">
        Go back
      </span>
    </button>
  );
}
