import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useTrucks from '@/hooks/use-trucks';
import LoadingButton from '@/components/loading-button';

const FormDataSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Truck name must be at least 2 characters' }),
});

type Inputs = z.infer<typeof FormDataSchema>;

export default function TruckForm() {
  const { isAdding, addNewTruck } = useTrucks();

  const form = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
    },
  });

  async function _handleSubmit({ name }: Inputs) {
    try {
      await addNewTruck(name, {
        onSuccess: () => {
          toast.success('Truck added successfully!');
          form.reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } catch (err) {
      toast.error('An unexpected error occurred.');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(_handleSubmit)} className="flex gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input {...field} placeholder="Truck name" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton disabled={isAdding} loading={isAdding}>
          <span className="flex items-center space-x-2">
            <PlusIcon className="flex size-5" />
            <span className="hidden lg:block">Add Truck</span>
          </span>
        </LoadingButton>
      </form>
    </Form>
  );
}
