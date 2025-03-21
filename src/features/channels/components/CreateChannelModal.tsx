import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCreateChannelModal } from "../store/UseCreateChannelModal";
import { useCreateChannel } from "../api/UseCreateChannel";

import { ChannelText } from "@/models/ChannelText";
import { useWorkspaceId } from "@/hooks/UseWorkspaceId";

export const UseCreateChannelModal = () => {
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();
  const { mutate, isPending } = useCreateChannel();

  const router = useRouter();
  const [name, setName] = useState<string>("");

  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLocaleLowerCase();
    setName(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name: name, workspaceId: workspaceId },
      {
        onSuccess: (id) => {
          toast.success("Channel created successfully");
          // router.push(`/channels/${id}`);
          handleClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{ChannelText.addChannel}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            disabled={isPending}
            onChange={handleChange}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder={ChannelText.channelPlaceholder}
          />
          <div className="flex justify-end">
            <Button disabled={isPending} type="submit">
              {ChannelText.createChannel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
