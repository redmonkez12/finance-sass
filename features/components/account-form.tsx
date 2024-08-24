import { insertAccountSchema } from "@/db/schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const formSchema = insertAccountSchema.pick({
    name: true,
});

export type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit(values: FormValues): void;
    onDelete?(): void;
    disabled?: boolean;
};

export function AccountForm({ id, defaultValues, onDelete, disabled, onSubmit }: Props) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });
    
    function handleSubmit(values: FormValues) {
        onSubmit(values);
    }
    
    function handleDelete() {
        onDelete?.();
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="e.g. Cash, Bank, Credit Card"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                
                <Button className="w-full" disabled={disabled}>
                    {id ? "Save changes" : "Create Account"}
                </Button>

                {!!id && <Button type="button" disabled={disabled} onClick={handleDelete} className="w-full" variant="outline">
                    <Trash className="size-4 mr-2"/>
                    Delete Account
                </Button>}
            </form>
        </Form>
    );
}