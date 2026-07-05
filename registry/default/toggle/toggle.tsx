"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  // Off (resting): muted ghost so the on-state clearly stands apart.
  // Hover (off): lift onto the surface overlay and go full-contrast.
  // On (pressed): a filled secondary chip — the same "engaged" plate as the
  // secondary Button, with its own hover feedback via --secondary-hover.
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-transparent text-sm font-medium whitespace-nowrap text-muted-foreground select-none hover:not-data-pressed:bg-surface-hover hover:not-data-pressed:text-foreground data-pressed:bg-secondary data-pressed:text-secondary-foreground data-pressed:hover:bg-(--secondary-hover) active:scale-[0.97] data-disabled:pointer-events-none data-disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 transition-[background-color,color,border-color,box-shadow,outline-width,outline-offset,outline-color,scale] duration-100 ease-out focus-visible:outline-ring/50 outline-0 outline-offset-0 outline-transparent outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 aria-invalid:outline-destructive/50 aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-solid",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "border bg-card bg-clip-padding shadow-xs hover:not-data-pressed:bg-(--outline-hover) data-pressed:border-transparent data-pressed:shadow-none",
      },
      size: {
        sm: "h-9 min-w-9 gap-1.5 px-2 sm:h-8 sm:min-w-8",
        default: "h-10 min-w-10 px-2.5 sm:h-9 sm:min-w-9",
        lg: "h-11 min-w-11 px-3 sm:h-10 sm:min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ToggleProps = BaseToggle.Props &
  VariantProps<typeof toggleVariants>;

function Toggle({ className, variant, size, ...props }: ToggleProps) {
  return (
    <BaseToggle
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
