import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "./utils";

type SheetContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SheetContext = React.createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet components must be used within <Sheet>");
  }
  return context;
}

interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Sheet({ children, open, onOpenChange }: SheetProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(false);

  const resolvedOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const value = React.useMemo(
    () => ({ open: Boolean(resolvedOpen), setOpen }),
    [resolvedOpen, setOpen],
  );

  return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
}

interface TriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactElement | React.ReactNode;
}

function composeHandlers<
  Event extends React.SyntheticEvent,
  Handler extends ((event: Event) => void) | undefined,
>(handler?: Handler, userHandler?: Handler) {
  return (event: Event) => {
    handler?.(event);
    if (!event.isPropagationStopped()) {
      userHandler?.(event);
    }
  };
}

function SheetTrigger({ asChild, children, onClick, ...props }: TriggerProps) {
  const { open, setOpen } = useSheetContext();
  const clickHandler = React.useCallback<
    React.MouseEventHandler<HTMLElement>
  >(
    (event) => {
      setOpen(true);
      onClick?.(event as never);
    },
    [onClick, open, setOpen],
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: composeHandlers(children.props.onClick, clickHandler),
      "aria-expanded": open,
      "data-state": open ? "open" : "closed",
    } as Record<string, unknown>);
  }

  return (
    <button
      type="button"
      data-slot="sheet-trigger"
      aria-expanded={open}
      data-state={open ? "open" : "closed"}
      onClick={clickHandler}
      {...props}
    >
      {children}
    </button>
  );
}

interface SheetCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactElement | React.ReactNode;
}

function SheetClose({ asChild, children, onClick, ...props }: SheetCloseProps) {
  const { open, setOpen } = useSheetContext();
  const clickHandler = React.useCallback<React.MouseEventHandler<HTMLElement>>(
    (event) => {
      setOpen(false);
      onClick?.(event as never);
    },
    [onClick, setOpen],
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: composeHandlers(children.props.onClick, clickHandler),
      "aria-expanded": open,
      "data-state": open ? "open" : "closed",
    } as Record<string, unknown>);
  }

  return (
    <button
      type="button"
      data-slot="sheet-close"
      aria-expanded={open}
      data-state={open ? "open" : "closed"}
      onClick={clickHandler}
      {...props}
    >
      {children}
    </button>
  );
}

type SheetSide = "top" | "right" | "bottom" | "left";

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: SheetSide;
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetContentProps) {
  const { open, setOpen } = useSheetContext();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!open) {
    return null;
  }

  const positionStyles: Record<SheetSide, string> = {
    right: "right-0 top-0 h-full w-3/4 max-w-sm border-l",
    left: "left-0 top-0 h-full w-3/4 max-w-sm border-r",
    top: "top-0 left-0 w-full border-b",
    bottom: "bottom-0 left-0 w-full border-t",
  };

  return createPortal(
    <div data-slot="sheet-portal">
      <div
        role="presentation"
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed z-50 flex flex-col bg-background shadow-xl",
          "transition-transform duration-200 ease-out",
          positionStyles[side],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      data-slot="sheet-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
