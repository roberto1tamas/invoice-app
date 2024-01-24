import { ComponentPropsWithoutRef } from "react";

export default function LogoVector({
  ...props
}: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72 72"
      shapeRendering="geometricPrecision"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.486 23.0003L36 35.8995L42.514 23.0003C46.9652 25.3092 50 29.9105 50 35.21C50 42.8261 43.732 49.0002 36 49.0002C28.268 49.0002 22 42.8261 22 35.21C22 29.9105 25.0348 25.3092 29.486 23.0003Z"
      />
    </svg>
  );
}
