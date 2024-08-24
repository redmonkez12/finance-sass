import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// @ts-ignore
type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
// @ts-ignore
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];

export function useCreateAccount() {
    const queryClient = useQueryClient();
    
    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            // @ts-ignore
            const response = await client.api.accounts.$post({ json });
            return response.json();
        },
        onSuccess() {
            toast.success("Account created");
            queryClient.invalidateQueries({ queryKey: ["accounts"]});
        },
        onError(e) {
            toast.error("Failed to create account")
        },
    });
}