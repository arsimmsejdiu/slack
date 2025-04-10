import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import {
  Options,
  RequestUpdateType,
  ResponseType,
} from "@/models/types/FeaturesChannelTypes";
import { Status } from "@/models/types/StatusType";

export const useUpdateChannel = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);

  const [status, setStatus] = useState<Status>(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);

  const mutation = useMutation(api.channels.update);

  const mutate = useCallback(
    async (values: RequestUpdateType, options?: Options) => {
      try {
        // reset state
        setData(null);
        setError(null);
        setStatus("pending");

        const response = await mutation(values); // call mutation
        options?.onSuccess?.(response); // call onSuccess callback
        return response; // return response
      } catch (error) {
        setStatus("error"); // set status to error
        options?.onError?.(error as Error);
        if (options?.throwOnError) {
          throw error; // throw error if throwOnError is true
        }
      } finally {
        setStatus("settled"); // set status to null
        setData(null);
        setError(null);
        options?.onSettled?.(); // call onSettled callback
      }
    },
    [mutation] // dependency array
  ); // return mutate function

  return { mutate, data, error, isPending, isError, isSuccess, isSettled }; // return mutate function, data, error, isPending, isError, isSuccess, isSettled
};
