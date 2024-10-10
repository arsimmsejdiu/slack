import React from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WorkspaceTexts } from "@/models/WorkspaceText";
import { EditWorkspaceNameDialogProps } from "@/models/interfaces/WorkspaceInterface";

export const EditWorkspaceNameDialog: React.FC<EditWorkspaceNameDialogProps> = ({
  isEditing,
  setIsEditing,
  value,
  setValue,
  isUpdatingWorkspace,
  handleEdit,
}) => {
  return (
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
            placeholder={WorkspaceTexts.workspacePlaceholder}
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
  );
};