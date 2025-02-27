import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { SquarePenIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResource } from "@/hooks/use-resource";
import { TPacking } from "@/types/packing";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  labor_increase: z.number(),
});

type Inputs = z.infer<typeof formSchema>;

type PackingFormProps = {
  data?: TPacking;
};

export default function PackingForm({ data }: PackingFormProps) {
  const { isCreating, isUpdating, handleCreate, handleUpdate } =
    useResource("packings");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const isEditing = !!data;

  const form = useForm<Inputs>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      labor_increase: 0,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  function onClose() {
    form.reset();
    setIsOpen((prev) => !prev);
  }

  function onSubmit(values: Inputs) {
    if (isEditing) {
      handleUpdate(data.id, values);
    } else {
      handleCreate(values);
    }
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger
        asChild
        className={cn("", { "absolute right-6 top-6": !isEditing })}
      >
        {isEditing ? (
          <Button
            variant="ghost"
            className="text-green-600 hover:text-green-600"
            size={isMobile ? "icon" : "default"}
          >
            <SquarePenIcon />
            <span className="hidden md:inline-flex">Edit</span>
          </Button>
        ) : (
          <Button>Add packing</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add packing service</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 sm:p-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={7} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="labor_increase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Labor increse (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        pattern="[0-9]+"
                        inputMode="numeric"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <LoadingButton
                type="submit"
                loading={isCreating ?? isUpdating}
                disabled={isCreating ?? isUpdating}
              >
                {isEditing ? "Save changes" : "Add packing"}
              </LoadingButton>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
