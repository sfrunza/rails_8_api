import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/store";
import { Input } from "@/components/ui/input";
import { updateField } from "@/slices/request-slice";
import { centsToDollars } from "@/lib/helpers";

const formSchema = z.object({
  deposit: z.number(),
});

export type Inputs = z.infer<typeof formSchema>;

export default function EditDepositModal({ onClose }: any) {
  const dispatch = useAppDispatch();
  const { request, changes } = useAppSelector((state) => state.request);

  if (!request) return null;

  const currentDeposit = changes?.deposit ?? request.deposit;

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      deposit: currentDeposit,
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  function onSubmit(values: Inputs) {
    dispatch(updateField({ deposit: values.deposit }));
    handleClose();
  }

  return (
    <Form {...form}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reservation price</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="deposit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    pattern="[0-9]+"
                    value={centsToDollars(form.watch("deposit")) || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        field.onChange(Math.round(parseFloat(value) * 100));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  );
}
