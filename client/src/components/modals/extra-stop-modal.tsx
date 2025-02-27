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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FloorOptionKeys, FloorOptions } from "@/constants/request";
import { updateField } from "@/slices/request-slice";
import { useAppDispatch } from "@/store";
import { AutocompleteInput, TAutocompleteData } from "../autocomplete-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const LatLngSchema = z.object({
  lat: z.function().returns(z.number()),
  lng: z.function().returns(z.number()),
});

// LatLngLiteral definition
const LatLngLiteralSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

// Union of LatLng and LatLngLiteral
const LocationSchema = z.union([LatLngSchema, LatLngLiteralSchema]);

const formSchema = z.object({
  type: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  apt: z.string().optional(),
  floor: z.string().min(1),
  location: LocationSchema.nullable().optional(),
});

export type Inputs = z.infer<typeof formSchema>;

export default function ExtraStopModal({ onClose }: any) {
  const isLoaded =
    google.maps && google.maps?.places?.AutocompleteService ? true : false;
  const dispatch = useAppDispatch();
  // const stops = useAppSelector((state) => state.request.request?.stops);

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    defaultValues: {
      type: "pick_up",
      street: "",
      city: "",
      state: "",
      zip: "",
      apt: "",
      floor: "",
      location: {
        lat: 0,
        lng: 0,
      },
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  function onSubmit(values: Inputs) {
    console.log(values);
    // const newStopsArray = [...stops];

    // if (stop) {
    //   const index = newStopsArray.findIndex((item) => item === stop);
    //   newStopsArray[index] = newStop;
    // } else {
    //   newStopsArray.push(newStop);
    // }

    dispatch(updateField({ stops: [{ ...values }] }));
    handleClose();
  }

  function getNewAddress(d: TAutocompleteData) {
    console.log("d", d);
    form.setValue("street", d.street);
    form.setValue("city", d.city);
    form.setValue("state", d.state);
    form.setValue("zip", d.zip);
    form.setValue("location", d.location);
  }

  return (
    <Form {...form}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Extra stop</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          // className="grid grid-cols-6 gap-2"
        >
          <div className="grid grid-cols-6 gap-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel />
                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="pick_up"
                        className="hover:cursor-pointer"
                      >
                        Pick up
                      </SelectItem>
                      <SelectItem
                        value="drop_off"
                        className="hover:cursor-pointer"
                      >
                        Drop off
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="col-span-4" />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    {isLoaded ? (
                      <AutocompleteInput
                        {...field}
                        value={field.value ?? ""}
                        getAddress={getNewAddress}
                        placeholder="Full Address"
                        title="Please enter your Full Address"
                      />
                    ) : (
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Address"
                        title="Please enter your Full Address"
                      />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apt"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Apt.</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Floor</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      const value = val as FloorOptionKeys;
                      if (value in FloorOptions) {
                        field.onChange(val);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* {floorOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="hover:cursor-pointer"
                      >
                        {option.value}
                      </SelectItem>
                    ))} */}

                      {Object.keys(FloorOptions)
                        .filter((key) => isNaN(Number(key))) // Filter out numeric enum keys
                        .map((key) => (
                          <SelectItem
                            key={key}
                            value={key}
                            className="hover:cursor-pointer"
                          >
                            {key}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  );
}
