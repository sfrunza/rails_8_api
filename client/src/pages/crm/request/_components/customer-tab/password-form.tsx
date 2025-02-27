import { api } from "@/api";
import { LoadingButton } from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const formSchema = z.object({
  password: z.string().min(6),
});

type Inputs = z.infer<typeof formSchema>;

export default function PasswordForm() {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const request = useAppSelector((state) => state.request.request);
  const customer_id = request?.customer_id;

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: Inputs) {
    const { password } = values;
    if (!customer_id || password) return null;
    setIsUpdating(true);
    try {
      const response: {
        data: { error?: string; success?: string };
      } = await api.patch(`/users/${customer_id}/update_password`, {
        password: password,
      });
      const data = response.data;
      if (data.error) {
        toast.error(data.error);
        return null;
      }
      if (data.success) {
        toast.success(data.success);
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="border-b border-t bg-muted px-4 py-4 md:px-6">
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-[1fr_5rem] items-end gap-4 md:grid-cols-[1fr_10rem]"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="hidden">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    title="Please enter password"
                    autoComplete="off"
                    className="w-full bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={isUpdating} disabled={isUpdating}>
            Save
            <span className="ml-1 hidden md:inline-flex">password</span>
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
