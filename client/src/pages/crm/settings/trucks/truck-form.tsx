import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loading-button";
import { useResource } from "@/hooks/use-resource";

const FormDataSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Truck name must be at least 2 characters" }),
});

type Inputs = z.infer<typeof FormDataSchema>;

export default function TruckForm() {
  const { isCreating, handleCreate } = useResource("trucks");

  const form = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: Inputs) {
    handleCreate(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input {...field} placeholder="Truck name" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton disabled={isCreating} loading={isCreating}>
          <span className="flex items-center space-x-2">
            <PlusIcon className="flex size-5" />
            <span className="hidden lg:block">Add Truck</span>
          </span>
        </LoadingButton>
      </form>
    </Form>
  );
}
