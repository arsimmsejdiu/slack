import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { UseGetChannelProps } from "@/models/interfaces/ChannelsInterface";

export const useGetChannel = ({ workspaceId }: UseGetChannelProps) => {
  const data = useQuery(api.channels.get, { workspaceId });
  const isLoading = data === undefined;

  return { data, isLoading };
};
