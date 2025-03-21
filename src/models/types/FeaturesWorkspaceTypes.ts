import { Id } from "../../../convex/_generated/dataModel";

export type RequestType = { name: string };

export type ResponseType = Id<"workspaces"> | null;

export type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwOnError?: boolean;
};
