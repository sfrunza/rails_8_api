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
import { Form, FormField } from "@/components/ui/form";
import { useResource } from "@/hooks/use-resource";
import { cn } from "@/lib/utils";
import { updateField } from "@/slices/request-slice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const formSchema = z.object({
  packing_id: z.number(),
});

export type Inputs = z.infer<typeof formSchema>;

export default function EditPackingModal({ onClose }: any) {
  const dispatch = useAppDispatch();
  const { request, changes } = useAppSelector((state) => state.request);
  const { data: packings } = useResource("packings");

  if (!request) return null;

  // const { packing_id } = request;

  const currentPackingId = changes.packing_id ?? request.packing_id;

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      packing_id: currentPackingId,
    },
  });

  async function onSubmit(values: Inputs) {
    console.log(values);
    dispatch(updateField({ packing_id: values.packing_id }));
    handleClose();
  }

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Form {...form}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit packing</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid h-full grid-rows-[auto_6rem] overflow-hidden overflow-y-auto sm:grid-rows-[auto_4rem]"
        >
          <div className="h-full max-h-[calc(100vh-11rem)] overflow-y-auto">
            <FormField
              control={form.control}
              name="packing_id"
              render={({ field }) => (
                <RadioGroup
                  value={field.value.toString()}
                  onValueChange={(val) => {
                    console.log(typeof val);
                    field.onChange(val);
                    form.setValue("packing_id", Number(val));
                  }}
                  className="space-y-4 p-1"
                >
                  {packings?.map((packing) => (
                    <div
                      key={packing.id}
                      className={cn(
                        "relative flex cursor-pointer flex-row-reverse gap-4 rounded-lg border-input p-4 shadow-button focus:outline-none",
                        {
                          "border-primary bg-primary/5 ring-2 ring-primary":
                            Number(form.getValues("packing_id")) === packing.id,
                        },
                      )}
                      // ref={
                      //   Number(form.getValues("packing_id")) === packing.id
                      //     ? selectedRef
                      //     : null
                      // }
                    >
                      <RadioGroupItem
                        value={packing.id.toString()}
                        id={packing.id.toString()}
                        className="absolute"
                      />
                      <Label
                        htmlFor={packing.id.toString()}
                        className="w-full hover:cursor-pointer"
                      >
                        <div className="space-y-4">
                          <p
                            className={cn("text-base font-bold", {
                              "text-primary":
                                Number(form.getValues("packing_id")) ===
                                packing.id,
                            })}
                          >
                            {packing.name}
                          </p>
                          <p
                            // dangerouslySetInnerHTML={{
                            //   __html: packing.description,
                            // }}
                            className="whitespace-pre-line text-sm"
                          >
                            {packing.description}
                          </p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </div>
          <DialogFooter className="sm:items-end">
            <DialogClose>Cancel</DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  );
}
