import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCurrentMemberProps } from "@/models/interfaces/FeaturesInterfaces";

export const useCurrentMember = ({ workspaceId }: useCurrentMemberProps) => {
  const data = useQuery(api.members.current, { workspaceId });
  const isLoading = data === undefined;

  return { data, isLoading };
};
