import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "./utils";

type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  type: AccordionType;
  openValues: string[];
  toggleValue: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null,
);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within <Accordion>");
  }
  return context;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AccordionType;
  collapsible?: boolean;
  defaultValue?: string | string[];
}

function toArray(value: string | string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function Accordion({
  className,
  children,
  type = "single",
  collapsible = false,
  defaultValue,
  ...props
}: AccordionProps) {
  const [openValues, setOpenValues] = React.useState<string[]>(
    toArray(defaultValue),
  );

  const toggleValue = React.useCallback(
    (value: string) => {
      setOpenValues((previous) => {
        const isOpen = previous.includes(value);
        if (type === "multiple") {
          if (isOpen) {
            return previous.filter((item) => item !== value);
          }
          return [...previous, value];
        }

        if (isOpen) {
          return collapsible ? [] : previous;
        }

        return [value];
      });
    },
    [type, collapsible],
  );

  const value = React.useMemo<AccordionContextValue>(
    () => ({ type, openValues, toggleValue }),
    [type, openValues, toggleValue],
  );

  return (
    <AccordionContext.Provider value={value}>
      <div
        data-slot="accordion"
        className={cn("divide-y rounded-lg border border-gray-200", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error("Accordion sub-components must be used within AccordionItem");
  }
  return context;
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function AccordionItem({
  className,
  children,
  value,
  ...props
}: AccordionItemProps) {
  const { openValues } = useAccordionContext();
  const isOpen = openValues.includes(value);

  const itemValue = React.useMemo(
    () => ({ value, isOpen }),
    [value, isOpen],
  );

  return (
    <AccordionItemContext.Provider value={itemValue}>
      <div
        data-slot="accordion-item"
        data-state={isOpen ? "open" : "closed"}
        className={cn("bg-white", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { toggleValue } = useAccordionContext();
  const { value, isOpen } = useAccordionItemContext();

  return (
    <button
      type="button"
      data-slot="accordion-trigger"
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "flex w-full items-start justify-between gap-4 py-4 text-left text-base font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
        "hover:text-primary",
        className,
      )}
      onClick={() => toggleValue(value)}
      {...props}
    >
      <span>{children}</span>
      <ChevronDownIcon
        className={cn(
          "h-5 w-5 flex-shrink-0 transition-transform",
          isOpen && "rotate-180",
        )}
        aria-hidden="true"
      />
    </button>
  );
}

interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { isOpen } = useAccordionItemContext();

  return (
    <div
      data-slot="accordion-content"
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "overflow-hidden text-sm text-muted-foreground transition-all",
        isOpen ? "max-h-[500px] py-4" : "max-h-0 py-0",
        className,
      )}
      {...props}
    >
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
