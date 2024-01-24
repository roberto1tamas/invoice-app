import {
  type UseFieldArrayRemove,
  type UseFormRegister,
  useWatch,
  type Control,
  type FieldErrors,
} from "react-hook-form";

import { Input } from "../ui/form/Input";
import { IconDelete } from "../ui/Icon";
import { type Invoice } from "../../interfaces/Invoice";

type FormListItemProps = {
  index: number;
  register: UseFormRegister<Invoice>;
  remove: UseFieldArrayRemove;
  control: Control<Invoice>;
  errors: FieldErrors<Invoice>;
};

export default function FormListItem({
  index,
  register,
  remove,
  control,
  errors,
}: FormListItemProps) {
  const price = useWatch({
    name: `itemsList.${index}.price`,
    control: control,
  });
  const quantity = useWatch({
    name: `itemsList.${index}.quantity`,
    control: control,
  });

  const errorItemName = errors?.itemsList?.[index]?.itemName;
  const errorItemPrice = errors?.itemsList?.[index]?.price;
  const errorItemQty = errors?.itemsList?.[index]?.quantity;

  return (
    <fieldset className="grid w-full grid-cols-12 items-center gap-4 text-sm text-blue-wild">
      <div className="col-span-12 sm:col-span-5">
        <label
          htmlFor={`itemName-${index}`}
          className={`flex flex-row justify-between text-base ${
            errorItemName
              ? "text-red dark:text-red"
              : "text-blue-wild sm:hidden"
          } dark:text-link-water sm:hidden`}
        >
          <p>Item Name</p>
          {errorItemName && <p>{errorItemName.message}</p>}
        </label>

        <Input
          id={`itemName-${index}`}
          {...register(`itemsList.${index}.itemName`)}
          required={Boolean(errorItemName)}
        />
      </div>
      <div className="col-span-3 sm:col-span-2">
        <label htmlFor={`quantity-${index}`} className="sm:hidden">
          Qty.
        </label>
        <Input
          type="number"
          min={1}
          id={`quantity-${index}`}
          {...register(`itemsList.${index}.quantity`, { valueAsNumber: true })}
          required={Boolean(errorItemQty)}
        />
      </div>
      <div className="col-span-4 sm:col-span-2">
        <label htmlFor={`price-${index}`} className="sm:hidden">
          Price
        </label>
        <Input
          type="number"
          min={0}
          id={`price-${index}`}
          {...register(`itemsList.${index}.price`, { valueAsNumber: true })}
          required={Boolean(errorItemPrice)}
        />
      </div>
      <div className="col-span-4 overflow-scroll sm:col-span-2">
        <label className="sm:hidden">Total</label>
        <p className="my-2 py-5 text-hs-variant">
          {(Number(price) || 0) * (Number(quantity) || 0)}
        </p>
      </div>
      <div className="col-span-1 justify-self-end">
        <IconDelete
          onClick={() => remove(index)}
          className="my-2 cursor-pointer fill-grey-regent duration-150 hover:fill-red"
        />
      </div>
    </fieldset>
  );
}
