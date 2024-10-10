"use client";

import { useState } from "react";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { WorkspaceTexts } from "@/models/WorkspaceText";
import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/UseWorkspaceId";
import { toast } from "sonner";
import { PreferencesModalProps } from "@/models/interfaces/WorkspaceInterface";

export const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) => {
  const workspaceId = useWorkspaceId();

  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace({ 
      workspaceId: workspaceId,
      name: value
    }, {
      onSuccess: () => {
        setIsEditing(false);
        toast.success("Workspace updated successfully")
      },
      onError: () => {
        toast.error("Failed to update workspace")
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    {WorkspaceTexts.workspaceName}
                  </p>
                  <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                    {WorkspaceTexts.workspaceEdit}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{value}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{WorkspaceTexts.workspaceRename}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEdit} className="space-y-4">
                <Input 
                  value={value}
                  disabled={isUpdatingWorkspace}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={WorkspaceTexts.workspaceName}
                  required
                  autoFocus
                  minLength={3}
                  maxLength={80}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isUpdatingWorkspace}>
                      {WorkspaceTexts.workspaceCancel}
                    </Button>
                  </DialogClose>
                  <Button variant="outline" disabled={isUpdatingWorkspace}>
                      {WorkspaceTexts.workspaceSave}
                    </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <button
            disabled={false}
            onClick={() => {}}
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
