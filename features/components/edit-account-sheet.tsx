import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AccountForm, FormValues } from "@/features/components/account-form";
import { useOpenAccount } from "@/features/hooks/use-open-account";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";

export function EditAccountSheet() {
    const { isOpen, onClose, id } = useOpenAccount();

    const [ConfirmDialog, confirm] = useConfirm("Are you sure?", "You are about to delete this transaction");
    
    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id);

    const isLoading = accountQuery.isLoading;
    const isPending = editMutation.isPending || deleteMutation.isPending;
    
    function onSubmit(values: FormValues) {
        editMutation.mutate(values, {
            onSuccess() {
                onClose();
            }
        });
    }
    
    const onDelete = async () => {
        const ok = await confirm();
        
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess() {
                    onClose();
                }
            });
        }
    }
    
    const defaultValues = accountQuery.data ? { name: accountQuery.data.name } : { name: "" };

    return (
        <>
            <ConfirmDialog/>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Account</SheetTitle>

                        <SheetDescription>
                            Edit an existing account.
                        </SheetDescription>
                    </SheetHeader>

                    {isLoading ? (
                        <div className="absolute insert-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                        </div>
                    ) : (
                        <AccountForm
                            id={id}
                            onSubmit={onSubmit}
                            onDelete={onDelete}
                            disabled={isPending}
                            defaultValues={defaultValues}/>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
}