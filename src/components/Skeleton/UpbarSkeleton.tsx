export default function UpbarSkeleton() {
  return (
    <header className="mb-8 flex animate-pulse md:mb-16">
      <div>
        <div className="bg-slate-200 dark:bg-slate-600 mb-2 h-6 w-28 rounded-full"></div>
        <div className="bg-slate-200 dark:bg-slate-600 h-4 w-28  rounded-full"></div>
      </div>
      <div className="ml-auto">
        <div className="flex items-center gap-8">
          <div className="bg-slate-200 dark:bg-slate-600 h-12 w-36 rounded-full"></div>

          <div className="bg-slate-200 dark:bg-slate-600 h-12 w-36 rounded-full"></div>
        </div>
      </div>
    </header>
  );
}
