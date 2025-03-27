import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { UseGetChannelProps } from "@/models/interfaces/ChannelsInterface";

export const useGetChannel = ({ channelId }: UseGetChannelProps) => {
  const data = useQuery(api.channels.getById, { channelId });
  const isLoading = data === undefined;

  return { data, isLoading };
};
