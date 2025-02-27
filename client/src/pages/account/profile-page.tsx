import { api } from "@/api";
import { LoadingButton } from "@/components/loading-button";
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
import { Input } from "@/components/ui/input";
import { cn, formatPhone } from "@/lib/utils";
import { setCredentials } from "@/slices/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store";
import { TUser } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const formSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().min(1, "required").email("Invalid email address"),
  add_email: z
    .string()
    .nullable()
    .optional()
    .refine(
      (email) =>
        !email || email === "" || z.string().email().safeParse(email).success,
      {
        message: "Invalid email address",
      },
    ),
  phone: z
    .string()
    .refine((phoneNumber) => isValidPhoneNumber(phoneNumber, "US"), {
      message: "Invalid phone number",
    }),
  add_phone: z
    .string()
    .nullable()
    .optional()
    .refine(
      (phoneNumber) =>
        !phoneNumber ||
        phoneNumber === "" ||
        isValidPhoneNumber(phoneNumber, "US"),
      {
        message: "Invalid phone number",
      },
    ),
});

export type Inputs = z.infer<typeof formSchema>;

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      add_email: "",
      phone: "",
      add_phone: "",
    },
  });

  useEffect(() => {
    if (user) form.reset(user);
  }, [user]);

  async function _onSubmit(formData: Inputs) {
    handleUpdate(formData);
  }

  async function handleUpdate(newData: Partial<TUser>) {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await api.put(`/users/${user?.id}`, newData);
      const { data } = response;
      form.reset(data);
      dispatch(
        setCredentials({
          user: data,
          token: localStorage.getItem("token") ?? "",
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <div className="px-6 pt-4 lg:hidden">
        {/* <BackButton to="/account" label="Account" /> */}
      </div>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
        <CardDescription>
          Add an additional email and phone to receive quotes and reminders on
          all your preferred contacts.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form autoComplete="off" onSubmit={form.handleSubmit(_onSubmit)}>
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        title="Please enter your First Name"
                        autoComplete="given-name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        title="Please enter your Last Name"
                        autoComplete="family-name"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        title="Please enter your Email"
                        autoComplete="on"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="add_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional email (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        title="Please enter Additional email"
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        inputMode="numeric"
                        value={formatPhone(field.value ?? "")}
                        title="Please enter your Phone"
                        autoComplete="tel"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="add_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional phone (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        inputMode="numeric"
                        value={formatPhone(field.value ?? "")}
                        title="Please enter Additional phone"
                        autoComplete="tel"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter
            className={cn("justify-end gap-4 transition-opacity duration-500", {
              "invisible opacity-0": !form.formState.isDirty,
              "visible opacity-100": form.formState.isDirty,
            })}
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
              disabled={isLoading || !form.formState.isDirty}
              loading={isLoading}
            >
              Save changes
            </LoadingButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
