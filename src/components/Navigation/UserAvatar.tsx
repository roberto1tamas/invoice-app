import { Fragment, useContext } from "react";

import { AuthContext } from "../../providers/AuthProvider";
import { getUserAvatarID } from "../../utils/utils";

import { Menu, Transition } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";

import { IconInfo, IconLogout } from "../ui/Icon";

export default function UserAvatar() {
  const [, setFilterParams] = useSearchParams();

  const {
    authState: { user },
    supabase,
  } = useContext(AuthContext);

  const userImgPath = "/src/assets/avatars/";
  const userImgID = getUserAvatarID(user?.created_at);
  const userImg = new URL(`${userImgPath}${userImgID}.jpg`, import.meta.url)
    .href;

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    setFilterParams({});
  };

  return (
    <Menu as="div" className="inline-block text-left">
      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm transition ease-in-out hover:outline-none hover:ring-2 hover:ring-white hover:ring-offset-2 active:ring-offset-gray-800">
        <img className="h-8 w-8 rounded-full" src={userImg} alt="User" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:divide-gray-600 dark:bg-dark lg:bottom-2 lg:left-14 lg:right-auto lg:top-auto lg:ml-2">
          <div className="px-1 py-1 ">
            <Menu.Item disabled>
              <button className="group flex w-full items-center rounded-md  px-2 py-2 text-sm text-gray-900 hover:cursor-default ">
                <IconInfo className="mr-2 h-5 w-5 fill-grey-regent dark:fill-link-water" />

                <span className="max-w-40 text-left text-sm text-grey-regent dark:text-link-water">
                  You're signed-in as a new demo user. Profile image is random
                  but persistent for each user.
                </span>
              </button>
            </Menu.Item>
          </div>

          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={`${
                    active
                      ? "bg-purple text-white dark:text-white-pure"
                      : "text-gray-900 dark:text-white-pure"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <IconLogout className="mr-2 h-5 w-5 stroke-purple-light group-hover:stroke-white" />
                  <span className="max-w-40">Sign out</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
