// import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { CableIcon } from "lucide-react";
import { z } from "zod";

// import { pairRequestAction } from "@/actions/request";
import { Input } from "@/components/ui/input";
// import LoadingButton from "@/components/ui/loading-button";
// import { IsRequestChanged } from "@/slices/requestSlice";
import { useAppSelector } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
// import { IsRequestChanged } from "@/slices/request-slice";
import { LoadingButton } from "@/components/loading-button";
import { api } from "@/api";
import toast from "react-hot-toast";

export const formSchema = z.object({
  pairedRequestId: z.string().min(1),
});

export type Inputs = z.infer<typeof formSchema>;

export default function ConnectRequestForm() {
  const request = useAppSelector((state) => state.request.request);
  const hasChanged = useAppSelector((state) => state.request.hasChanges);

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { pairedRequestId: "" },
  });

  async function _onSubmit(values: Inputs) {
    try {
      await api.post(`/requests/${request?.id}/pair`, {
        paired_request_id: values.pairedRequestId,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(_onSubmit)}
        className="space-y-2"
      >
        <fieldset disabled={hasChanged}>
          <FormField
            control={form.control}
            name="pairedRequestId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Request ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    title="Please enter Request ID"
                    // placeholder="Request ID"
                  />
                </FormControl>
                <FormDescription>
                  Enter the ID of the request you want to connect to this
                  request.
                </FormDescription>
              </FormItem>
            )}
          />
          <LoadingButton
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
            variant="outline"
            type="submit"
            className="w-full"
          >
            <span className="flex items-center">
              <CableIcon className="mr-2 size-4" />
              Connect delivery request
            </span>
          </LoadingButton>
        </fieldset>
      </form>
    </Form>
  );
}
