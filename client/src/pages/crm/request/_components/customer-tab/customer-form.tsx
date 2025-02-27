import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { api } from "@/api";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useRequest from "@/hooks/use-request";
import { debounce } from "@/lib/helpers";
import { formatPhone } from "@/lib/utils";
import { useAppSelector } from "@/store";
import { TUser } from "@/types/user";

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

type Inputs = z.infer<typeof formSchema>;

export default function CustomerForm() {
  const request = useAppSelector((state) => state.request.request);
  if (!request) return null;

  const { handleRequestUpdate, isUpdating } = useRequest();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [existingCustomer, setExistingCustomer] = useState<TUser | null>(null);
  const [open, setOpen] = useState(false);

  const { customer_id, customer, id: requestId } = request;

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      first_name: customer?.first_name ?? "",
      last_name: customer?.last_name ?? "",
      email: customer?.email ?? "",
      add_email: customer?.add_email ?? "",
      phone: customer?.phone ?? "",
      add_phone: customer?.add_phone ?? "",
    },
  });

  // useEffect(() => {
  //   form.reset(customer);
  // }, [customer]);

  console.log("Customer", customer_id);

  function handleSaveChanges(newData: Inputs) {
    if (!customer_id) {
      handleCreate(newData);
    } else {
      handleUpdate(newData);
    }
  }

  const findCustomerByEmail = debounce(async (email: string) => {
    const isValid = form.getFieldState("email").error ? false : true;
    if (!isValid || !email) return null;

    try {
      const response = await api.get(`/users/check_email?email=${email}`);
      const user = response.data;

      console.log("User", user);

      // if (!user || user.id === customer_id) {
      //   return null;
      // }
      if (!user) {
        return null;
      }
      setExistingCustomer(user);
      setOpen(true);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }, 1000);

  async function handleCreate(newProfileData: Partial<TUser>) {
    setIsLoading(true);
    try {
      const res = await api.post("/users", {
        user: {
          ...newProfileData,
          password: window.crypto.randomUUID(),
        },
      });

      const data = res.data;
      handleRequestUpdate(requestId, { customer_id: data.id });
      form.reset(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(newProfileData: Partial<TUser>) {
    setIsLoading(true);
    try {
      await api.put(`/users/${customer_id}`, newProfileData);
      toast.success("Profile updated");
      form.reset(newProfileData);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(handleSaveChanges)}
          className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:p-6"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    title="Please enter your First Name"
                    autoComplete="off"
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
                    autoComplete="off"
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
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      findCustomerByEmail(e.target.value);
                    }}
                    title="Please enter your Email"
                    autoComplete="off"
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
                <FormLabel className="inline-flex w-full justify-between">
                  <span>Additional email</span>
                  <span className="text-muted-foreground">Optional</span>
                </FormLabel>
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
                    autoComplete="off"
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
                <FormLabel className="inline-flex w-full justify-between">
                  <span>Additional phone</span>
                  <span className="text-muted-foreground">Optional</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric"
                    value={formatPhone(field.value ?? "")}
                    title="Please enter Additional phone"
                    autoComplete="off"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid md:col-span-2 md:justify-end">
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => {
                  form.reset();
                }}
                variant="outline"
                className="w-full md:w-auto"
              >
                Cancel
              </Button>
              <LoadingButton
                disabled={isLoading || !form.formState.isDirty}
                loading={isLoading}
                className="w-full md:w-auto"
              >
                Save changes
              </LoadingButton>
            </div>
          </div>
        </form>
      </Form>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              User with this email already exists
            </AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to merge this request with the existing profile?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, cancel</AlertDialogCancel>
            <LoadingButton
              loading={isUpdating}
              disabled={isUpdating}
              type="button"
              onClick={() => {
                handleRequestUpdate(request.id, {
                  customer_id: existingCustomer?.id,
                });
                form.reset(existingCustomer!);
                setOpen(false);
              }}
            >
              Yes
            </LoadingButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <div className="mt-12">
        <Table className="min-w-[750px]">
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Service type</TableHead>
              <TableHead>Move date</TableHead>
              <TableHead>Move szie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerRequests?.map((r: TFullRequest) => {
              return (
                <TableRow key={r.id} className="text-xs font-medium">
                  <TableCell className="font-medium">
                    <Button
                      size="sm"
                      onClick={() => {
                        setActiveTab("request");
                        navigate(`/crm/requests/${r.id}`);
                      }}
                    >
                      {`# ${r.id}`}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "w-fit rounded px-3 py-1 tracking-wide",
                        statusTextBgColors[r.status],
                      )}
                    >
                      {r.status}
                    </span>
                  </TableCell>
                  <TableCell>{r.service.name}</TableCell>
                  <TableCell>{formatDate(r.moving_date)}</TableCell>
                  <TableCell>{r.size}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div> */}
    </>
  );
}
