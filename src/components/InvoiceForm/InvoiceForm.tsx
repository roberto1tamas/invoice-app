import { FormEvent, useContext, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import DatePicker from "react-datepicker";
import "../../assets/css/react-datepicker.css";

import {
  invoiceSchema,
  statusSchema,
  type Invoice,
  type InvoiceStatus,
} from "../../interfaces/Invoice";

import RowContainer from "../ui/RowContainer";
import { Input } from "../ui/form/Input";
import Label from "../ui/form/Label";
import FormSection from "./FormSection";
import Button from "../ui/Button";
import SelectPaymentTerms from "./SelectPaymentTerms";
import FormItemsList from "./FormItemsList";
import FormListItem from "./FormListItem";
import FormMenu from "./FormMenu";
import { SlideOverContext } from "../SlideOver/SlideOver";

import { generateUniqueId, getFakerInvoice } from "../../utils/utils";
import { createInvoice, updateInvoice } from "../../services/InvoicesService";
import { useOutletContext } from "react-router";
import { SlideOverOutletContext } from "../../interfaces/context";

export default function InvoiceForm() {
  const [submitingStatus, setSubmitingStatus] = useState<
    "idle" | InvoiceStatus
  >("idle");

  const { handleCloseEdit: handleCloseSlideOver } =
    useContext(SlideOverContext);

  const [invoice, handleSetInvoice] =
    useOutletContext<SlideOverOutletContext>() || [];

  let isEdit: boolean;
  invoice === undefined || invoice === null
    ? (isEdit = false)
    : (isEdit = true);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Invoice>({
    //resolver: zodResolver(invoiceSchema),
    resolver: async (data, context, options) => {
      const validationResult = await zodResolver(invoiceSchema)(
        data,
        context,
        options,
      );

      const hasErrors = Object.keys(validationResult.errors).length !== 0;
      hasErrors ? setSubmitingStatus("idle") : "";

      return validationResult;
    },
    ...(invoice ? { defaultValues: invoiceSchema.parse(invoice) } : {}),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itemsList",
  });

  const onSubmitUpdate = async (invoice: Invoice) => {
    try {
      const updatedInvoice = await updateInvoice(invoice);
      //console.log("Invoice updated with data: ", updatedInvoice);
      handleSetInvoice(updatedInvoice);
      handleCloseSlideOver();
    } catch (error) {
      throw new Error(`Something went wrong onSubmitUpdate: ${error}`);
    }
  };

  const onSubmitNew = async (data: Invoice) => {
    try {
      await createInvoice(data);
      //console.log("New Invoice created: ", newInvoice);
      handleCloseSlideOver();
    } catch (error) {
      throw new Error(`Something went wrong onSubmitNew: ${error}`);
    }
  };

  const beforeHandleSubmit = (
    e: FormEvent<HTMLFormElement> & { nativeEvent: SubmitEvent },
  ) => {
    e.preventDefault();

    const statusFromID =
      (e.nativeEvent.submitter as HTMLElement | null)?.id || "draft";

    const parsedStatus = statusSchema.safeParse(statusFromID);
    if (!parsedStatus.success) {
      console.warn(
        `Invalid status ${statusFromID} provided via ID property.`,
        parsedStatus.error,
      );
      return;
    }
    setSubmitingStatus(parsedStatus.data);

    if (!isEdit) {
      setValue("status", parsedStatus.data);
    }

    if (isEdit) {
      handleSubmit(onSubmitUpdate)();
      return;
    }
    setValue("id", generateUniqueId());
    handleSubmit(onSubmitNew)();
  };

  const resetFormRandomValues = () => {
    reset(getFakerInvoice());
  };

  return (
    <form onSubmit={beforeHandleSubmit}>
      {!isEdit && (
        <div className="flex flex-row items-center gap-4">
          <p className="text-sm text-purple">
            &gt; Let me help you to test this form.
          </p>
          <Button color="white" onClick={resetFormRandomValues} type="button">
            Insert random data
          </Button>
        </div>
      )}

      <FormSection title="Bill From">
        <RowContainer>
          <fieldset className="w-full">
            <Label htmlFor="fromStreet" errorMessage={errors.billFrom?.street}>
              Street Address
            </Label>
            <Input
              id="fromStreet"
              {...register("billFrom.street")}
              required={Boolean(errors.billFrom?.street?.message)}
            />
          </fieldset>
        </RowContainer>

        <RowContainer addClass="grid grid-cols-2">
          <fieldset className="w-full">
            <Label htmlFor="fromCity" errorMessage={errors.billFrom?.city}>
              City
            </Label>
            <Input
              id="fromCity"
              {...register("billFrom.city")}
              required={Boolean(errors.billFrom?.city?.message)}
            />
          </fieldset>

          <fieldset className="w-full">
            <Label
              htmlFor="fromPostCode"
              errorMessage={errors.billFrom?.postCode}
            >
              Post Code
            </Label>
            <Input
              id="fromPostCode"
              {...register("billFrom.postCode")}
              required={Boolean(errors.billFrom?.postCode?.message)}
            />
          </fieldset>

          <fieldset className="col-span-2 w-full">
            <Label
              htmlFor="fromCountry"
              errorMessage={errors.billFrom?.country}
            >
              Country
            </Label>
            <Input
              id="fromCountry"
              {...register("billFrom.country")}
              required={Boolean(errors.billFrom?.country?.message)}
            />
          </fieldset>
        </RowContainer>
      </FormSection>

      <FormSection title="Bill To">
        <RowContainer>
          <fieldset className="w-full">
            <Label htmlFor="toClientName" errorMessage={errors.billTo?.name}>
              Client's Name
            </Label>
            <Input
              id="toClientName"
              {...register("billTo.name")}
              required={Boolean(errors.billTo?.name?.message)}
            />
          </fieldset>
        </RowContainer>
        <RowContainer>
          <fieldset className="w-full">
            <Label htmlFor="toClientEmail" errorMessage={errors.billTo?.email}>
              Client's Email
            </Label>
            <Input
              id="toClientEmail"
              {...register("billTo.email")}
              required={Boolean(errors.billTo?.email?.message)}
            />
          </fieldset>
        </RowContainer>
        <RowContainer>
          <fieldset className="w-full">
            <Label htmlFor="toStreet" errorMessage={errors.billTo?.street}>
              Street Address
            </Label>
            <Input
              id="toStreet"
              {...register("billTo.street")}
              required={Boolean(errors.billTo?.street?.message)}
            />
          </fieldset>
        </RowContainer>

        <RowContainer addClass="grid grid-cols-2">
          <fieldset className="w-full">
            <Label htmlFor="toCity" errorMessage={errors.billTo?.city}>
              City
            </Label>
            <Input
              id="toCity"
              {...register("billTo.city")}
              required={Boolean(errors.billTo?.city?.message)}
            />
          </fieldset>

          <fieldset className="w-full">
            <Label htmlFor="toPostCode" errorMessage={errors.billTo?.postCode}>
              Post Code
            </Label>
            <Input
              id="toPostCode"
              {...register("billTo.postCode")}
              required={Boolean(errors.billTo?.postCode?.message)}
            />
          </fieldset>

          <fieldset className="col-span-2 w-full">
            <Label htmlFor="toCountry" errorMessage={errors.billTo?.country}>
              Country
            </Label>
            <Input
              id="toCountry"
              {...register("billTo.country")}
              required={Boolean(errors.billTo?.country?.message)}
            />
          </fieldset>
        </RowContainer>
      </FormSection>

      <FormSection>
        <RowContainer>
          <fieldset className="w-full">
            <Label htmlFor="invoiceDate" errorMessage={errors.invoiceDate}>
              Issue date
            </Label>
            <Controller
              control={control}
              name="invoiceDate"
              defaultValue={new Date()}
              render={({
                field: { value, onChange },
                fieldState: { invalid },
              }) => (
                <DatePicker
                  selected={value}
                  onChange={onChange}
                  customInput={<Input id="invoiceDate" required={invalid} />}
                  wrapperClassName="w-full"
                />
              )}
            />
          </fieldset>

          <fieldset className="relative w-full">
            <Label htmlFor="paymentTerms" errorMessage={errors.paymentTerms}>
              Payment Terms
            </Label>
            <Controller
              control={control}
              name="paymentTerms"
              defaultValue="14"
              render={({
                field: { value, onChange },
                fieldState: { invalid },
              }) => (
                <SelectPaymentTerms
                  selectedValue={value}
                  onChange={onChange}
                  invalid={invalid}
                />
              )}
            />
          </fieldset>
        </RowContainer>

        <RowContainer>
          <fieldset className="w-full">
            <Label
              htmlFor="projectDescription"
              errorMessage={errors.projectDescription}
            >
              Project Description
            </Label>
            <Input
              id="projectDescription"
              {...register("projectDescription")}
              required={Boolean(errors.projectDescription?.message)}
            />
          </fieldset>
        </RowContainer>
      </FormSection>

      <FormSection>
        <h3 className="mb-6 text-hs-variant text-purple">Item List</h3>

        <FormItemsList>
          {errors?.itemsList && (
            <p className="text-center text-base text-red">
              {errors?.itemsList?.message}
            </p>
          )}

          {fields.map((field, index) => (
            <FormListItem
              key={field.id}
              index={index}
              remove={remove}
              register={register}
              control={control}
              errors={errors}
            />
          ))}

          <Button
            onClick={() => {
              append({ itemName: "", quantity: 1, price: 0 });
            }}
            color="white"
            fullWidth
            type="button"
          >
            + Add New Item
          </Button>
        </FormItemsList>
      </FormSection>

      <FormMenu
        isEdit={isEdit}
        submitingStatus={submitingStatus}
        onSubmit={beforeHandleSubmit}
        onDiscard={handleCloseSlideOver}
      />
    </form>
  );
}
