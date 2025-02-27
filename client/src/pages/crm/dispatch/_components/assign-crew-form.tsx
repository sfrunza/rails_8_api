import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  foreman: z.string().optional(),
  movers: z.array(z.string().optional()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AssignCrewForm() {
  const moversNumber = 3;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foreman: " ",
      movers: Array(moversNumber).fill(" "),
    },
  });

  const { fields } = useFieldArray<FormValues>({
    control: form.control,
    name: "movers" as never, // as never to avoid type error
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <div className="mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="foreman"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foreman</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Not selected" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        {
                          label: "Not selected",
                          value: " ",
                        },
                        {
                          label: "Foreman 1",
                          value: 1,
                        },
                        {
                          label: "Foreman 2",
                          value: 2,
                        },
                        {
                          label: "Foreman 3",
                          value: 3,
                        },
                        {
                          label: "Foreman 4",
                          value: 4,
                        },
                      ]?.map((item, i) => {
                        return (
                          <SelectItem key={i} value={item.value.toString()}>
                            {item.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div>
              <Label>Movers</Label>

              {fields.map((moverField, index) => {
                return (
                  <FormField
                    key={moverField.id}
                    control={form.control}
                    name={`movers.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="hidden">Movers</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Not selected" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              {
                                label: "Not selected",
                                value: " ",
                              },
                              {
                                label: "Mover 1",
                                value: 1,
                              },
                              {
                                label: "Mover 2",
                                value: 2,
                              },
                              {
                                label: "Mover 3",
                                value: 3,
                              },
                              {
                                label: "Mover 4",
                                value: 4,
                              },
                            ]?.map((item, i) => {
                              return (
                                <SelectItem
                                  key={i}
                                  value={item.value.toString()}
                                >
                                  {item.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Unassign
            </Button>
            <Button type="submit">Assign crew</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
