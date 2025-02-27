import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppSelector } from "@/store";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import useRequest from "@/hooks/use-request";
import { LoadingButton } from "@/components/loading-button";

type TQuestions = {
  id: number;
  name:
    | "delicate_items_question_answer"
    | "bulky_items_question_answer"
    | "disassemble_items_question_answer";
  question: string;
};

const questions: TQuestions[] = [
  {
    id: 1,
    name: "delicate_items_question_answer",
    question:
      "Do you have items that easily break and need extra love (lamps, mirrors, electronics, artwork)?",
  },
  {
    id: 2,
    name: "bulky_items_question_answer",
    question:
      "Do you have bulky items that require added handling? (e.g armoires, ellipticals, treadmills, appliances)",
  },
  {
    id: 3,
    name: "disassemble_items_question_answer",
    question: "Do you have items that we'll need to disassemble for you?",
  },
];

const formSchema = z.object({
  delicate_items_question_answer: z.string(),
  bulky_items_question_answer: z.string(),
  disassemble_items_question_answer: z.string(),
  comments: z.string(),
});

type Inputs = z.infer<typeof formSchema>;

export default function DetailsTab() {
  const request = useAppSelector((state) => state.request.request);
  if (!request) return null;

  const { handleRequestUpdate, isUpdating } = useRequest();

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    defaultValues: request.details,
  });

  function handleSaveChanges(values: Inputs) {
    if (!request) return;
    handleRequestUpdate(request.id, { details: values });
    form.reset(values);
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Additional questions</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveChanges)}>
            <CardContent className="space-y-10">
              <div className="divide-y *:py-4">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="flex flex-col justify-between gap-4 md:flex-row"
                  >
                    <p className="text-sm text-muted-foreground">
                      {q.question}
                    </p>
                    <FormField
                      control={form.control}
                      name={q.name}
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value}
                          onValueChange={(val) => {
                            field.onChange(val);
                          }}
                          className="flex justify-start gap-4 lg:justify-end"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="yes" id={`q${q.id}1`} />
                            <Label htmlFor={`q${q.id}1`}>Yes</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="no" id={`q${q.id}2`} />
                            <Label htmlFor={`q${q.id}2`}>No</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>
                ))}
              </div>

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional details</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={8}
                        placeholder="Enter your comments..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter
              className={cn(
                "justify-end gap-4 transition-opacity duration-500",
                {
                  "invisible opacity-0": !form.formState.isDirty,
                  "visible opacity-100": form.formState.isDirty,
                },
              )}
            >
              <Button
                type="button"
                onClick={() => {
                  form.reset();
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <LoadingButton
                disabled={isUpdating || !form.formState.isDirty}
                loading={isUpdating}
                type="submit"
              >
                Save changes
              </LoadingButton>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
