import { Id } from "../../../convex/_generated/dataModel";

export interface useCurrentMemberProps {
  workspaceId: Id<"workspaces">;
}

export interface useGetMembersProps {
  workspaceId: Id<"workspaces">;
}

export interface UseGetWorkspaceProps {
  workspaceId: Id<"workspaces">;
}
