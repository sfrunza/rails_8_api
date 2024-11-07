import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoadingButton from "@/components/loading-button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import useMovingServices from "@/hooks/use-moving-service";

const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Service name must be at least 5 characters" }),
});

type Inputs = z.infer<typeof formSchema>;

export default function ServiceForm() {
  const { isAdding, add } = useMovingServices();

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: Inputs) {
    await add(values);
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-4 flex items-center gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Service name"
                    className="w-full"
                    autoComplete="off"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <LoadingButton loading={isAdding} disabled={isAdding}>
            <span className="flex items-center space-x-2">
              <PlusIcon className="flex size-5" />
              <span className="hidden lg:block">Add Service</span>
            </span>
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
