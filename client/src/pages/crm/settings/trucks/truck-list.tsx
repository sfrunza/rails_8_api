import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TruckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import useTrucks from '@/hooks/use-trucks';
import LoadingButton from '@/components/loading-button';
import { TTruck } from '@/types/trucks';
import { Skeleton } from '@/components/ui/skeleton';

export default function TruckList() {
  const { trucks, isUpdating, isLoading, error, updateTrucks } = useTrucks();
  const [items, setItems] = useState<TTruck[]>([]);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  useEffect(() => {
    if (trucks) {
      setItems(trucks);
    }
  }, [trucks]);

  async function handleSaveChanges() {
    try {
      await updateTrucks(items, {
        onSuccess: () => {
          toast.success('Changes saved successfully!');
          setIsTouched(false);
        },
        onError: (error) => {
          toast.error(error.message);
          setItems(trucks!);
        },
      });
    } catch (err) {
      toast.error('An unexpected error occurred.');
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton className="h-9 w-full" key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full items-center justify-center text-muted-foreground">
        {error.message}
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="space-y-4">
        {items?.map((truck, idx) => (
          <div key={truck.id} className="flex items-center gap-6 md:gap-10">
            <div className="flex min-w-fit items-center gap-4 text-sm text-muted-foreground">
              <TruckIcon className="size-5" />
              <span>Truck {idx + 1}</span>
            </div>
            <Switch
              checked={truck.is_active}
              onCheckedChange={(checked) => {
                const value = checked;
                const newPacking = { ...truck, is_active: value };
                const newPackingList = items.map((item) =>
                  item.id === newPacking.id
                    ? {
                        ...item,
                        is_active: newPacking.is_active,
                      }
                    : item
                );
                setItems(newPackingList);
                setIsTouched(true);
              }}
            />
            <Input
              value={truck.name}
              onChange={(e) => {
                const value = e.target.value;
                const newPacking = { ...truck, name: value };
                const newPackingList = items.map((item) =>
                  item.id === newPacking.id
                    ? {
                        ...item,
                        name: newPacking.name,
                      }
                    : item
                );
                setItems(newPackingList);
                setIsTouched(true);
              }}
            />
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div
          className={cn('flex transition-opacity duration-500 sm:justify-end', {
            'invisible opacity-0': !isTouched,
            'visible opacity-100': isTouched,
          })}
        >
          <div className="flex min-h-9 w-full gap-4 sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setItems(trucks!);
                setIsTouched(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              type="button"
              className="w-full sm:w-auto"
              disabled={isUpdating}
              loading={isUpdating}
              onClick={handleSaveChanges}
            >
              Save changes
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
