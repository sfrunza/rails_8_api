import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useAppDispatch, useAppSelector } from "@/store";
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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateField } from "@/slices/request-slice";

const sizes = [
  "Room or less (partial move)",
  "Studio apartment",
  "Small 1 Bedroom apartment",
  "Large 1 Bedroom apartment",
  "Small 2 Bedroom apartment",
  "Large 2 Bedroom apartment",
  "3 Bedroom apartment",
  "2 Bedroom House/Townhouse",
  "3 Bedroom House/Townhouse",
  "4 Bedroom House/Townhouse",
  "Commercial Move",
];

const formSchema = z.object({
  size: z.string(),
});

export type Inputs = z.infer<typeof formSchema>;

export default function EditMoveSizeModal({ onClose }: any) {
  const dispatch = useAppDispatch();
  const { request, changes } = useAppSelector((state) => state.request);

  if (!request) return null;

  const size = changes.size ?? request.size;

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      size,
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  function onSubmit(values: Inputs) {
    dispatch(updateField({ size: values.size }));
    handleClose();
  }

  return (
    <Form {...form}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit move size</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Move Size</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select move size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sizes.map((item, i) => (
                      <SelectItem
                        key={i}
                        value={item}
                        className="hover:cursor-pointer"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
