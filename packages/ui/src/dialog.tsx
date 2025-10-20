import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  useRef,
} from "react";
import { createPortal } from "react-dom";

export const useDialog = () => {
  const targetRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = useCallback(
    (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      const target = e.currentTarget;
      targetRef.current = target;
      setIsOpen(true);
    },
    [],
  );
  const closeDialog = useCallback(() => {
    setIsOpen(false);
    targetRef.current?.focus();
    targetRef.current = null;
  }, []);

  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDialog();
      }
    };
    addEventListener("keyup", handleEsc);
    return () => {
      removeEventListener("keyup", handleEsc);
    };
  }, [closeDialog]);

  return {
    isOpen,
    openDialog,
    closeDialog,
  };
};

export const Dialog = ({
  children,
  isOpen,
  backdropLabel,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: VoidFunction;
  backdropLabel?: string;
}) => {
  if (!isOpen) {
    return;
  }
  return createPortal(
    <div className="top-0 left-0 w-full h-full dark:bg-stone-800 fixed">
      <button
        className="w-full h-full"
        onClick={onClose}
        type="button"
        aria-label={backdropLabel}
      ></button>
      <dialog
        className="dark:bg-stone-900 dark:text-stone-300 font-extralight dark:bg-stone-900 fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg"
        open
      >
        {children}
      </dialog>
    </div>,
    globalThis.document.body,
  );
};
