import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNewAccounts } from "@/features/hooks/use-new-accounts";
import { AccountForm, FormValues } from "@/features/components/account-form";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

export function NewAccountSheet() {
    const { isOpen, onClose } = useNewAccounts();
    
    const mutation = useCreateAccount();
    
    function onSubmit(values: FormValues) {
        mutation.mutate(values, {
            onSuccess() {
                onClose();
            }
        });
    }
    
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>

                    <SheetDescription>
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                
                <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{ name: "" }}/>
            </SheetContent>
        </Sheet>
    );
}