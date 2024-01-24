import { useNavigate } from "react-router";
import { type InvoiceStatus } from "../../interfaces/Invoice";

import Button from "../ui/Button";
import { IconPlus } from "../ui/Icon";
import FilterButton from "./FilterButton";

type upBarProps = {
  invoicesCount: number | null | undefined;
  updateParams: (status: InvoiceStatus, isChecked: boolean) => void;
};

export default function Upbar({ invoicesCount, updateParams }: upBarProps) {
  const navigate = useNavigate();

  return (
    <header className="mb-8 flex md:mb-16">
      <div>
        <h1 className="text-hm text-dark-cinder dark:text-white-pure">
          Invoices
        </h1>
        <p className="text-sm text-grey-regent dark:text-link-water">
          {invoicesCount ?? "loading"} invoices
        </p>
      </div>
      <div className="ml-auto">
        <div className="flex items-center gap-8">
          <div>
            <FilterButton updateParams={updateParams} />
          </div>

          <div>
            <Button
              color="purple"
              icon={IconPlus}
              onClick={() => navigate("/new", { relative: "path" })}
            >
              <span>
                New <span className="hidden sm:inline-block">invoice</span>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
