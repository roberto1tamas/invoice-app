import { type PropsWithChildren } from "react";

export default function RowContainer({
  children,
  addClass,
}: PropsWithChildren<{ addClass?: string }>) {
  return (
    <div className={`${addClass} my-3 w-full gap-6 sm:flex sm:flex-row`}>
      {children}
    </div>
  );
}
