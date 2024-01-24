export default function UpbarInvoiceSkeleton() {
  return (
    <nav className="mb-4 max-w-3xl items-center rounded-lg bg-white-pure px-8 py-6 shadow-10 dark:bg-dark sm:mb-6 sm:flex sm:shadow-none">
      <div className="flex w-full animate-pulse items-center justify-between gap-5 sm:justify-normal">
        <div className="bg-slate-200 dark:bg-slate-600 h-4 w-8 rounded-full"></div>

        <div className="bg-slate-200 dark:bg-slate-600 h-10 w-24 rounded-full"></div>
      </div>
      <div className="fixed bottom-0 left-0 w-screen animate-pulse bg-white-pure px-8 py-6 shadow-10 dark:bg-dark sm:static sm:bottom-auto sm:left-auto sm:ml-auto sm:w-full sm:p-0 sm:shadow-none">
        <div className="flex items-center justify-between gap-2 sm:justify-end">
          <div className="bg-slate-200 dark:bg-slate-600 h-12 w-16 rounded-full"></div>

          <div className="bg-slate-200 dark:bg-slate-600 h-12 w-24 rounded-full"></div>

          <div className="bg-slate-200 dark:bg-slate-600 h-12 w-36 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
}
