import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { QueryCtx } from "../../convex/_generated/server";
import { Id } from "../../convex/_generated/dataModel";
import { Dispatch, SetStateAction } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateJoinCode = () => {
  const code = Array.from(
    { length: 6 },
    () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("");

  return code
};

export const populateUser = async (ctx: QueryCtx, id: Id<"users"> ) => {
  return await ctx.db.get(id);
}

export const toggleToolbar = (
  containerRef: React.RefObject<HTMLDivElement>,
  setToolbarVisible: Dispatch<SetStateAction<boolean>>
) => {
  setToolbarVisible((prev: boolean) => !prev);
  const toolbar = containerRef.current?.querySelector(".ql-toolbar");
  if (toolbar) {
    toolbar.classList.toggle("hidden");
  }
};