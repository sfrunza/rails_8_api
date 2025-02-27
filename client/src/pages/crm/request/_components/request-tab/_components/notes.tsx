// import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/store";
import useRequest from "@/hooks/use-request";
import { LoadingButton } from "@/components/loading-button";
import { useEffect } from "react";

const formSchema = z.object({
  sales_notes: z.string().optional(),
  driver_notes: z.string().optional(),
  customer_notes: z.string().optional(),
  dispatch_notes: z.string().optional(),
});

type Inputs = z.infer<typeof formSchema>;

export default function Notes() {
  const request = useAppSelector((state) => state.request.request);

  const { sales_notes, driver_notes, customer_notes, dispatch_notes } =
    request ?? {};

  const { handleRequestUpdate, isUpdating } = useRequest();

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sales_notes: "",
      driver_notes: "",
      customer_notes: "",
      dispatch_notes: "",
    },
  });

  useEffect(() => {
    form.reset({
      sales_notes: sales_notes ?? "",
      driver_notes: driver_notes ?? "",
      customer_notes: customer_notes ?? "",
      dispatch_notes: dispatch_notes ?? "",
    });
  }, [sales_notes, driver_notes, customer_notes, dispatch_notes]);

  function onSubmit(values: Inputs) {
    if (!request) return null;
    handleRequestUpdate(request.id, values);
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Tabs defaultValue="sales_notes">
          <ScrollArea className="w-full whitespace-nowrap pb-2">
            <TabsList className="justify-start gap-1">
              <TabsTrigger value="sales_notes">
                <div className="relative px-1">
                  Sales notes{" "}
                  {form.watch("sales_notes") && (
                    <span className="absolute -right-1 top-0 size-1.5 rounded-full bg-green-600" />
                  )}
                </div>
              </TabsTrigger>
              <TabsTrigger value="driver_notes">
                <div className="relative px-1">
                  Driver notes{" "}
                  {form.watch("driver_notes") && (
                    <span className="absolute -right-1 top-0 size-1.5 rounded-full bg-green-600" />
                  )}
                </div>
              </TabsTrigger>
              <TabsTrigger value="customer_notes">
                <div className="relative px-1">
                  Customer notes{" "}
                  {form.watch("customer_notes") && (
                    <span className="absolute -right-1 top-0 size-1.5 rounded-full bg-green-600" />
                  )}
                </div>
              </TabsTrigger>
              <TabsTrigger value="dispatch_notes">
                <div className="relative px-1">
                  Dispatch notes{" "}
                  {form.watch("dispatch_notes") && (
                    <span className="absolute -right-1 top-0 size-1.5 rounded-full bg-green-600" />
                  )}
                </div>
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" className="mt-2" />
          </ScrollArea>
          <TabsContent value="sales_notes">
            <Textarea rows={7} {...form.register("sales_notes")} />
          </TabsContent>
          <TabsContent value="driver_notes">
            <Textarea rows={7} {...form.register("driver_notes")} />
          </TabsContent>
          <TabsContent value="customer_notes">
            <Textarea rows={7} {...form.register("customer_notes")} />
          </TabsContent>
          <TabsContent value="dispatch_notes">
            <Textarea rows={7} {...form.register("dispatch_notes")} />
          </TabsContent>
        </Tabs>
        <div className="flex justify-end">
          <LoadingButton
            loading={isUpdating}
            disabled={!form.formState.isDirty || isUpdating}
            type="submit"
          >
            Save notes
          </LoadingButton>
        </div>
      </div>
    </form>
  );
}
