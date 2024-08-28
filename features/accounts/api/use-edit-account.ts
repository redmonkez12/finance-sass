import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// @ts-ignore
type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>;
// @ts-ignore
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"];

export function useEditAccount(id?: string) {
    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            // @ts-ignore
            const response = await client.api.accounts[":id"]["$patch"]({ json, param: { id } });
            return response.json();
        },
        onSuccess() {
            toast.success("Account updated");
            queryClient.invalidateQueries({ queryKey: ["accounts", { id }]});
            queryClient.invalidateQueries({ queryKey: ["accounts"]});
        },
        onError(e) {
            toast.error("Failed to edit account");
        },
    });
}