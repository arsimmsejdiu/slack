import { Id } from "../../../convex/_generated/dataModel";

export interface UseGetChannelsProps {
  workspaceId: Id<"workspaces">;
}

export interface UseGetChannelProps {
  channelId: Id<"channels">;
}
