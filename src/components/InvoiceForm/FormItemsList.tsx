import { PropsWithChildren } from "react";

export default function FormItemsList({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-12 sm:gap-2">
      <div className="hidden w-full grid-cols-12 gap-4 text-sm text-blue-wild sm:grid">
        <div className="col-span-5">Item Name</div>
        <div className="col-span-2">Qty.</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Total</div>
      </div>

      {children}
    </div>
  );
}
