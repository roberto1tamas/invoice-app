import { ComponentPropsWithoutRef } from "react";
import { type FieldError } from "react-hook-form";

export default function Label({
  children,
  errorMessage,
  ...props
}: ComponentPropsWithoutRef<"label"> & {
  errorMessage?: FieldError | undefined;
}) {
  return (
    <label
      {...props}
      className={`flex flex-row justify-between text-base ${
        errorMessage ? "text-red dark:text-red" : "text-blue-wild"
      } dark:text-link-water`}
    >
      <p>{children}</p>
      {errorMessage && <p>{errorMessage.message}</p>}
    </label>
  );
}
