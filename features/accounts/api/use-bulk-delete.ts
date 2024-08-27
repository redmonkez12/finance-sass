import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// @ts-ignore
type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
// @ts-ignore
type RequestType = InferRequestType<typeof client.api.accounts.$post["bulk-delete"]["$post"]>["json"];

export function useBulkDeleteAccounts() {
    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            // @ts-ignore
            const response = await client.api.accounts["bulk-delete"]["$post"]({ json });
            return response.json();
        },
        onSuccess() {
            toast.success("Accounts deleted");
            queryClient.invalidateQueries({ queryKey: ["accounts"]});
        },
        onError(e) {
            toast.error("Failed to delete accounts");
        },
    });
}