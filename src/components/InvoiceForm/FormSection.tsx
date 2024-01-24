import { PropsWithChildren } from "react";

type FormSectionProps = {
  title?: string;
} & PropsWithChildren;

export default function FormSection({
  title,
  children,
  ...props
}: FormSectionProps) {
  return (
    <section {...props} className="my-12">
      {title && <h3 className="mb-6 text-hs-variant text-purple">{title}</h3>}
      {children}
    </section>
  );
}
