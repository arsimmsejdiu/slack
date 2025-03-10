import { cva, type VariantProps } from "class-variance-authority";

const userItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 mt-2 px-4 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const sidebarItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export { sidebarItemVariants, userItemVariants };
export type SidebarItemVariantProps = VariantProps<
  typeof sidebarItemVariants
>["variant"];

export type UserItemVariantProps = VariantProps<
  typeof userItemVariants
>["variant"];
