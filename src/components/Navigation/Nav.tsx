import { Link } from "react-router-dom";
import Logo from "./Logo";

import loadable from "@loadable/component";
const UserAvatar = loadable(() => import("./UserAvatar"));
const DarkModeIconButton = loadable(() => import("./DarkModeIconButton"));

export default function Nav() {
  return (
    <nav className="sticky left-0 top-0 z-20 h-[4.5rem] w-full lg:h-screen lg:w-[4.5rem] ">
      <div className="flex h-[4.5rem] w-full flex-row bg-[#373B53] lg:h-screen lg:w-[4.5rem] lg:flex-col lg:rounded-br-[1.25rem] lg:rounded-tr-[1.25rem]">
        <div className="h-[4.5rem] w-[4.5rem] self-start">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="ml-auto flex h-full lg:mt-auto lg:h-auto lg:w-full lg:flex-col">
          <div className="relative h-full px-6 py-5 lg:h-auto lg:w-full lg:px-5 lg:py-6">
            <DarkModeIconButton />
          </div>

          <div className="relative h-full border-l border-[#494E6E] px-6 py-5 lg:h-auto lg:w-full lg:border-l-0 lg:border-t lg:px-5 lg:py-6">
            <UserAvatar
              fallback={
                <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-600"></div>
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
