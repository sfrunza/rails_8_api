import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import LoadingButton from '@/components/loading-button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Service name must be at least 5 characters' }),
});

type Inputs = z.infer<typeof formSchema>;

export default function ServiceForm() {
  // const [isCreating, setIsCreating] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
    },
  });

  async function _handleSubmit({ name }: Inputs) {
    console.log(name);
    // setIsCreating(true);
    // try {
    //   const response = await api.post('/moving_services', { name });
    //   console.log(response);
    // } catch (err) {
    //   if (err instanceof Error) {
    //     toast.error(err.message);
    //   }
    // } finally {
    //   setIsCreating(false);
    // }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(_handleSubmit)}
          className="mb-4 flex items-center gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Service name"
                    className="w-full"
                    autoComplete="off"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <LoadingButton loading={false} disabled={false}>
            <span className="flex items-center space-x-2">
              <PlusIcon className="flex size-5" />
              <span className="hidden lg:block">Add Service</span>
            </span>
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
