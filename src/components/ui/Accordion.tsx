"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/types";
import { cn } from "@/lib/cn";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-deep hover:bg-mist"
              >
                {item.question}
                <ChevronDown className={cn("h-5 w-5 shrink-0 text-forest motion-safe:transition", expanded && "rotate-180")} />
              </button>
            </h3>
            {expanded ? (
              <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-5 text-sm leading-7 text-charcoal/80">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
