import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { UseGetChannelsProps } from "@/models/interfaces/ChannelsInterface";

export const useGetChannels = ({ workspaceId }: UseGetChannelsProps) => {
  const data = useQuery(api.channels.get, { workspaceId });
  const isLoading = data === undefined;

  return { data, isLoading };
};
