import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InviteCode } from "@/components/invite/InviteCode";

import { InviteModalProps } from "@/models/interfaces/ChannelInterface";
import { ChannelText } from "@/models/ChannelText";

import { useWorkspaceId } from "@/hooks/UseWorkspaceId";

export const InviteModal = ({
  open,
  setOpen,
  name,
  joinCode,
}: InviteModalProps) => {
  const workspaceId = useWorkspaceId();
  // TODO: develop the rout to handle the join workspace
  return (
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
      </DialogContent>
    </Dialog>
  );
};
