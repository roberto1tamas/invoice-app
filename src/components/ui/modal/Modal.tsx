import { type PropsWithChildren, useRef, Fragment } from "react";
import { createPortal } from "react-dom";

import { Transition } from "@headlessui/react";

import { useClickOutsideModal } from "../../../hooks/useClickOutsideModal";
import { usePreventBodyScroll } from "../../../hooks/usePreventBodyScroll";

type Modal = {
  isOpen: boolean;
  onClose: () => void;
} & PropsWithChildren;

export default function Modal({ isOpen, onClose, children }: Modal) {
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const modalOverlayRef = useRef<HTMLDivElement | null>(null);

  useClickOutsideModal(modalContentRef, modalOverlayRef, onClose);
  usePreventBodyScroll(isOpen);

  return createPortal(
    <div className="relative z-50" ref={modalOverlayRef}>
      <Transition as={Fragment} show={isOpen}>
        <div className="fixed inset-0 z-50 h-screen overflow-hidden overscroll-y-contain overscroll-x-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-dark-cinder bg-opacity-50 transition-opacity dark:bg-opacity-80" />
          </Transition.Child>

          <div className="absolute inset-0 flex min-h-screen transform items-center justify-center px-6 transition-all sm:px-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                ref={modalContentRef}
                className="block max-w-[30rem] transform rounded-lg bg-white-pure p-12 shadow-10 transition-all dark:bg-dark"
              >
                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>
    </div>,
    document.body,
  );
}
