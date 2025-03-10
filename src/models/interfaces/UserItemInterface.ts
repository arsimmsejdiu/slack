import { Id } from "../../../convex/_generated/dataModel";
import { UserItemVariantProps } from "../Variants";

export interface UserItemProps {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: UserItemVariantProps;
}
