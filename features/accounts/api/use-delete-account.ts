import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// @ts-ignore
type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;

export function useDeleteAccount(id?: string) {
    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error>({
        mutationFn: async () => {
            // @ts-ignore
            const response = await client.api.accounts[":id"]["$delete"]({ param: { id } });
            return response.json();
        },
        onSuccess() {
            toast.success("Account deleted");
            queryClient.invalidateQueries({ queryKey: ["accounts", { id }]});
            queryClient.invalidateQueries({ queryKey: ["accounts"]});
        },
        onError(e) {
            console.log(e);
            toast.error("Failed to delete account");
        },
    });
}