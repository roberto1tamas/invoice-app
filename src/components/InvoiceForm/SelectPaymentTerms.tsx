import { Listbox, Transition } from "@headlessui/react";
import { type Invoice } from "../../interfaces/Invoice";
import { ComponentPropsWithoutRef, Fragment } from "react";
import { IconArrowDown } from "../ui/Icon";

export default function SelectPaymentTerms({
  selectedValue,
  onChange,
  invalid,
}: ComponentPropsWithoutRef<"button"> & {
  selectedValue: Invoice["paymentTerms"];
  onChange: (selectedValue: Invoice["paymentTerms"]) => void;
  invalid: boolean;
}) {
  const options: (typeof selectedValue)[] = ["1", "7", "14", "30"];

  const getSelectOptionName = (value: Invoice["paymentTerms"]) =>
    `Net ${value} Day${Number(value) > 1 ? "s" : ""}`;

  return (
    <Listbox value={selectedValue} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Button
            className={`${
              open
                ? "ring-purple-light"
                : invalid
                  ? "ring-red"
                  : "ring-link-water"
            } relative my-2 block w-full appearance-none rounded-[0.25rem] border-0 px-5 py-5 text-left text-hs-variant text-dark-cinder outline-none ring-1 ring-inset duration-150 hover:ring-purple-light focus-visible:appearance-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-purple-light dark:bg-dark dark:text-white-pure dark:ring-grey-yankees`}
          >
            <span className="block truncate">
              {getSelectOptionName(selectedValue)}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <IconArrowDown
                className={`stroke-purple transition duration-300 ease-in-out ${
                  open && "-rotate-180 transform"
                }`}
              />
            </span>
          </Listbox.Button>
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
            <Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-lg bg-white-pure shadow-lg dark:bg-grey-yankees dark:text-white-pure">
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className={({ selected }) =>
                    `w-full cursor-pointer border-b-[1px] border-b-link-water px-6 py-4 text-hs-variant hover:text-purple dark:border-b-dark ${
                      selected
                        ? "text-purple dark:text-purple"
                        : "text-dark-cinder dark:text-link-water"
                    }`
                  }
                >
                  {getSelectOptionName(option)}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
}
