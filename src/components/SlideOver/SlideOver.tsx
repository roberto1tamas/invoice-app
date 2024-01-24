import {
  Fragment,
  PropsWithChildren,
  createContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";

import { Transition } from "@headlessui/react";

import { useClickOutsideModal } from "../../hooks/useClickOutsideModal";
import { usePreventBodyScroll } from "../../hooks/usePreventBodyScroll";
import ButtonGoBack from "../ui/ButtonGoBack";

const defaultSlideOverContext = {
  isOpen: true,
  handleCloseEdit: () => {},
};

export const SlideOverContext = createContext(defaultSlideOverContext);

export default function SlideOver({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function handleCloseEdit() {
    setIsOpen(false);
  }

  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const modalOverlayRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  useClickOutsideModal(modalContentRef, modalOverlayRef, handleCloseEdit);
  usePreventBodyScroll(true);

  return createPortal(
    <SlideOverContext.Provider value={{ isOpen, handleCloseEdit }}>
      <Transition.Root
        show={isOpen}
        as={Fragment}
        appear
        afterLeave={() => {
          if (window.history.state.idx > 0) {
            navigate(-1);
            return;
          }
          navigate("/");
        }}
      >
        <div
          className="fixed bottom-0 left-0 right-0 top-[4.5rem] z-10 h-[calc(100vh-4.5rem)] overflow-y-scroll lg:left-[4.5rem] lg:top-0 lg:h-screen"
          ref={modalOverlayRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-dark-mirage bg-opacity-50 transition-opacity dark:bg-opacity-80" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-400"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-400"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="left-0 top-0 h-full w-full overflow-y-scroll sm:w-4/5 lg:w-4/6">
              <div
                ref={modalContentRef}
                className="w-full transform overflow-y-scroll bg-white-pure p-6 pb-28 shadow-10 dark:bg-dark-mirage sm:rounded-r-lg sm:p-12 lg:pb-12"
              >
                <ButtonGoBack onClick={handleCloseEdit} />

                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition.Root>
    </SlideOverContext.Provider>,
    document.querySelector("main") || document.body,
  );
}
