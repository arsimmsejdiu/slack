import { Id } from "../../../convex/_generated/dataModel";

export type RequestType = { name: string; workspaceId: Id<"workspaces"> };

export type RequestUpdateType = { name: string; id: Id<"channels"> };

export type RequestDeleteType = { id: Id<"channels"> };

export type ResponseType = Id<"channels"> | null;

export type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwOnError?: boolean;
};
