import { forwardRef, type ComponentPropsWithRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithRef<"input">
>(function Input(props, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className="my-2 block w-full appearance-none rounded-[0.25rem] border-0 px-5 py-5 text-hs-variant text-dark-cinder outline-none ring-1 ring-inset ring-link-water duration-150 required:ring-red  hover:ring-purple-light  focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-purple-light dark:bg-dark dark:text-white-pure dark:ring-grey-yankees"
    />
  );
});
