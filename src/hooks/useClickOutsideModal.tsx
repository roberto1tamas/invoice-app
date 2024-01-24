import { useEffect } from "react";

export function useClickOutsideModal(
  modalContentRef: React.MutableRefObject<HTMLDivElement | null>,
  modalOverlayRef: React.MutableRefObject<HTMLDivElement | null>,
  onClose: () => void,
): void {
  useEffect(() => {
    const checkIfClickedOutsite = (e: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (modalOverlayRef.current !== null) {
      modalOverlayRef.current.addEventListener("click", checkIfClickedOutsite);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    const modalOverlayCleanup = modalOverlayRef.current;
    return () => {
      if (modalOverlayCleanup !== null) {
        modalOverlayCleanup.removeEventListener("click", checkIfClickedOutsite);
      }

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, modalContentRef, modalOverlayRef]);
}
