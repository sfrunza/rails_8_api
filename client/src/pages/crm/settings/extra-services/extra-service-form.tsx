import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoadingButton from "@/components/loading-button";
import PriceInput from "@/components/price-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResource } from "@/hooks/use-resource";

const formSchema = z.object({
  name: z.string(),
  price: z.number(),
  enabled: z.boolean(),
});

type Inputs = z.infer<typeof formSchema>;

export default function ExtraServiceForm() {
  const { isCreating, handleCreate } = useResource("extra_services");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<Inputs>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      enabled: true,
    },
  });

  function onClose() {
    form.reset();
    setIsOpen((prev) => !prev);
  }

  function onSubmit(values: Inputs) {
    handleCreate(values);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild className="absolute right-4 top-4">
        <Button>Add service</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add extra service</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Service name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <PriceInput
                      name="price"
                      value={field.value}
                      onValueChange={(val) => {
                        form.setValue("price", val);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="flex-row justify-center gap-2 pt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                loading={isCreating}
                disabled={isCreating}
                className="w-full sm:w-auto"
              >
                Add service
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
