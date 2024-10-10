import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { UseGetWorkspaceProps } from "@/models/interfaces/FeaturesInterfaces";

export const useGetWorkspace = ({ workspaceId }: UseGetWorkspaceProps) => {
  const data = useQuery(api.workspaces.getById, { workspaceId });
  const isLoading = data === undefined;
  return { data, isLoading };
};
