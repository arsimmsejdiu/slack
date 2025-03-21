import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { ActionTooltip } from "@/components/ActionTooltip";
import { Button } from "@/components/ui/button";

import { InviteCodeProps } from "@/models/interfaces/ChannelInterface";

export const InviteCode = ({ code, workspaceId }: InviteCodeProps) => {
  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("Invite link copied to clipboard!");
    });
  };

  return (
    <div className="flex flex-col gap-y-4 py-10 items-center justify-between">
      <ActionTooltip label="Click to copy code" align="center" side="bottom">
        <p
          className="text-4xl font-bold tracking-widest uppercase cursor-pointer hover:opacity-75 transition"
          onClick={() => {
            navigator.clipboard.writeText(code);
            toast.success("Invite code copied to clipboard!");
          }}
          role="button"
          title="Click to copy"
        >
          {code}
        </p>
      </ActionTooltip>
      <Button variant="ghost" size="sm" onClick={handleCopy}>
        Copy Link
        <CopyIcon className="size-4 ml-2" />
      </Button>
    </div>
  );
};
