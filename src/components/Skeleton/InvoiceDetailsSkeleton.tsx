export default function InvoiceDetailsSkeleton() {
  return (
    <section className="mb-24 max-w-3xl rounded-lg bg-white-pure px-8 py-6 shadow-10 dark:bg-dark sm:mb-8 sm:shadow-none">
      <div className="block w-full animate-pulse sm:flex sm:justify-between">
        <div className="h-12 w-20 rounded-lg bg-slate-200 dark:bg-slate-600"></div>

        <div className="mt-8 h-16 w-24 items-center rounded-lg bg-slate-200 dark:bg-slate-600 sm:mt-auto"></div>
      </div>

      <div className="mt-8 grid w-full animate-pulse grid-cols-2 gap-x-14 gap-y-8 sm:grid-cols-3">
        <div className="mt-3 h-14 w-24 rounded-lg bg-slate-200  dark:bg-slate-600"></div>

        <div className="col-start-2 row-span-2 h-36 max-w-48 rounded-lg bg-slate-200 dark:bg-slate-600"></div>

        <div className="col-start-1 mt-3 h-14 w-24 rounded-lg bg-slate-200 dark:bg-slate-600"></div>

        <div className="col-start-1 mt-3 flex h-14 w-28 rounded-lg bg-slate-200 dark:bg-slate-600 sm:col-start-3 sm:row-start-1"></div>
      </div>

      <div className="mt-8 animate-pulse rounded-lg bg-slate-200 dark:bg-grey-yankees">
        <div className="p-6">
          <table className="w-full table-auto">
            <thead>
              <tr className="hidden text-blue-wild dark:text-link-water sm:table-row">
                <th className="py-4 text-left text-base">Item Name</th>
                <th className="hidden py-4 text-center text-base sm:table-cell">
                  QTY.
                </th>
                <th className="hidden py-4 text-right text-base sm:table-cell">
                  Price
                </th>
                <th className="py-4 text-right text-base">Total</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>

        <div className="w-full rounded-b-lg bg-slate-400 p-6 dark:bg-dark-cinder">
          <dl className="flex items-center justify-between text-white-pure">
            <dt className="text-base">Amount Due</dt>
            <dd className="text-hm">€ </dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
