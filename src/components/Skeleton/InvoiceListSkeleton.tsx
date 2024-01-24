import InvoiceItemSkeleton from "./InvoiceItemSkeleton";

export default function InvoiceListSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <InvoiceItemSkeleton key={`InvoiceItemSkeleton${index}`} />
      ))}
    </section>
  );
}
