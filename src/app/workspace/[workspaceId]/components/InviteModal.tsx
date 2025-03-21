import React from "react";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InviteCode } from "@/components/invite/InviteCode";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { useNewJoinCode } from "@/features/workspaces/api/UseNewJoinCode";

import { InviteModalProps } from "@/models/interfaces/ChannelInterface";
import { ChannelText } from "@/models/ChannelText";

import { useWorkspaceId } from "@/hooks/UseWorkspaceId";
import { useConfirm } from "@/hooks/UseConfirm";

export const InviteModal = ({
  open,
  setOpen,
  name,
  joinCode,
}: InviteModalProps) => {
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useNewJoinCode();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This will deactivate the current code and generate a new one."
  );

  const handleNewCode = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate(
      { workspaceId },
      {
        onSuccess: () => {
          toast.success(ChannelText.newCodeSuccess);
        },
        onError: () => {
          toast.error(ChannelText.newCodeError);
        },
      }
    );
  };

  return (
    <>
    <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {ChannelText.invitePeople}
              {name}
            </DialogTitle>
            <DialogDescription>
              {ChannelText.inviteDescription}
              {name}
            </DialogDescription>
          </DialogHeader>
          <InviteCode code={joinCode} workspaceId={workspaceId} />
          <div className="flex justify-between items-center w-full">
            <Button
              onClick={handleNewCode}
              variant="outline"
              disabled={isPending}
            >
              {ChannelText.newCode}
              <RefreshCcw
                className={cn("size-4 ml-2", isPending && "animate-spin")}
              />
            </Button>
            <DialogClose asChild>
              <Button disabled={isPending}>{ChannelText.close}</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
