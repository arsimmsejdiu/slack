import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { Doc } from "../../../convex/_generated/dataModel";
import { SidebarItemVariantProps } from "../Variants";
import { ReactNode } from "react";

export interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

export interface WorkspaceSectionProps {
  label: string;
  hint: string;
  onNew?: () => void;
  children: ReactNode;
}

export interface SidebarItemProps {
  label: string;
  Icon: LucideIcon | IconType;
  id: string;
  variant?: SidebarItemVariantProps;
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

export interface EditWorkspaceNameDialogProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  value: string;
  setValue: (value: string) => void;
  isUpdatingWorkspace: boolean;
  handleEdit: (e: React.FormEvent<HTMLFormElement>) => void;
}
