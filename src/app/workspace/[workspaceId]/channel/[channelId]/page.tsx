"use client";

import { Loader, TriangleAlert } from "lucide-react";

import { useGetChannel } from "@/features/channels/api/UseGetChannel";
import { useChannelId } from "@/hooks/UseChannelId";

import Header from "./Header";
import { ChatInput } from "./ChatInput";

const ChannelIdPage = () => {
  const channelId = useChannelId();

  const { data: channel, isLoading: channelLoading } = useGetChannel({
    channelId,
  });

  if (channelLoading) {
    return (
      <div className="flex flex-1 justify-center items-center h-full">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex flex-1 flex-col gap-y-2 justify-center items-center h-full">
        <TriangleAlert className="size-10 animate-bounce text-destructive" />
        <span className="text-muted-foreground text-sm">Channel not found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title={channel.name} />
      <div className="flex-1" />
      <ChatInput />
    </div>
  );
};

export default ChannelIdPage;
