import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { Doc } from "../../../convex/_generated/dataModel";

export interface WorkspaceHeaderProps {
    workspace: Doc<"workspaces">;
    isAdmin: boolean;
  }

export interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

export interface SidebarButtonProps {
  icon: LucideIcon | IconType;
  label: string;
  isActive?: boolean;
}
