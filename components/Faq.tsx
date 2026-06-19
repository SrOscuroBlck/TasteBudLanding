import { Plus } from "lucide-react";

export type QA = { q: string; a: string };

// Accessible accordion built on native <details>/<summary> — works without JS,
// which keeps the FAQ crawlable and the markup light. The first item is open.
export function Faq({ items }: { items: QA[] }) {
  return (
    <div className="mx-auto flex max-w-[760px] flex-col gap-3">
      {items.map((item, i) => (
        <details key={item.q} className="glass group rounded-2xl px-5" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus className="h-5 w-5 flex-shrink-0 text-primary-light transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <p className="mb-5 text-[15px] leading-relaxed text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
