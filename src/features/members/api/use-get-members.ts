import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useGetMembersProps } from "@/models/interfaces/FeaturesInterfaces";

export const useGetMembers = ({ workspaceId }: useGetMembersProps) => {
  const data = useQuery(api.members.get, { workspaceId });
  const isLoading = data === undefined;

  return { data, isLoading };
};
