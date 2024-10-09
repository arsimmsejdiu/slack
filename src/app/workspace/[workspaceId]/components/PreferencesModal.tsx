"use client";

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
import { useState } from "react";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

export const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{WorkspaceTexts.workspaceName}</p>
              <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                {WorkspaceTexts.workspaceEdit}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">{value}</p>
          </div>
          <button
            disabled={false}
            onClick={() => {}}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
          >
            <TrashIcon className="size-4" />
            <span className="text-sm font-semibold">{WorkspaceTexts.workspaceDelete}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
