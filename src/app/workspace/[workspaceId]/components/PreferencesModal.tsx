"use client";

import { useState } from "react";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { WorkspaceTexts } from "@/models/WorkspaceText";
import { TrashIcon } from "lucide-react";
import { useWorkspaceId } from "@/hooks/UseWorkspaceId";
import { toast } from "sonner";
import { PreferencesModalProps } from "@/models/interfaces/WorkspaceInterface";
import { EditWorkspaceNameDialog } from "./EditWorkspaceNameDialog";
import { useRouter } from "next/navigation";

export const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();

  const handleRemove = () => {
    deleteWorkspace(
      {
        workspaceId: workspaceId,
      },
      {
        onSuccess: () => {
          router.replace("/");
          toast.success(WorkspaceTexts.workspaceRemoved);
        },
        onError: () => {
          toast.error(WorkspaceTexts.workspaceRemoveError);
        },
      }
    );
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace(
      {
        workspaceId: workspaceId,
        name: value,
      },
      {
        onSuccess: () => {
          toast.success(WorkspaceTexts.workspaceSuccessfull);
          setIsEditing(false);
        },
        onError: () => {
          toast.error(WorkspaceTexts.workspaceError);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <EditWorkspaceNameDialog
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            value={value}
            setValue={setValue}
            isUpdatingWorkspace={isUpdatingWorkspace}
            handleEdit={handleEdit}
          />
          <button
            disabled={isDeletingWorkspace}
            onClick={handleRemove}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
          >
            <TrashIcon className="size-4" />
            <span className="text-sm font-semibold">
              {WorkspaceTexts.workspaceDelete}
            </span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
