import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SquarePenIcon } from 'lucide-react';

import { api } from '@/api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

import LoadingButton from '@/components/loading-button';
import PriceInput from '@/components/price-input';
import SettingPageWrapper from '@/components/setting-page-wrapper';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import useRates from '@/hooks/use-rates';
import { formatMoney, hexToRgb } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { TRate } from '@/types/rates';

export default function RatesPage() {
  const { dbRates, isLoading, mutate } = useRates();

  const [items, setItems] = useState<TRate[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [currentEdit, setCurrentEdit] = useState<number | null>(null);

  useEffect(() => {
    if (dbRates) {
      setItems(dbRates);
    }
  }, [dbRates]);

  function handleUpdateRate(rate: TRate) {
    const updatedItems = items.map((item) =>
      item.id === rate.id ? rate : item
    );
    setItems(updatedItems);
    setIsChanged(true);
  }

  async function handleSaveChanges() {
    try {
      const response = await api.post('/rates/bulk_update', {
        rates: items,
      });

      if (response.data.success) {
        mutate();
        toast.success(response.data.success);
        setIsChanged(false);
        setCurrentEdit(null);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  if (!items) return null;

  return (
    <SettingPageWrapper>
      <Card className="max-w-screen-lg overflow-hidden">
        <CardHeader>
          <CardTitle>Rates</CardTitle>
          <CardDescription>Manage your rates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 py-6">
          <ScrollArea className="w-fullwhitespace-nowrap">
            <div className="grid gap-4 px-1 text-muted-foreground font-medium text-sm mb-4 items-center grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
              <p>Name</p>
              <p>2 movers</p>
              <p>3 movers</p>
              <p>4 movers</p>
              <p>Extra mover</p>
              <p>Extra truck</p>
              <p>On/Off</p>
              <p></p>
            </div>
            <Separator />
            <div className="divide-y min-w-[900px]">
              {isLoading && <LoadingSkeleton />}
              {items?.map((rate, idx) => (
                <div
                  key={idx}
                  className="grid px-1 gap-4 py-4 text-sm font-medium items-center grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
                >
                  {currentEdit === idx ? (
                    <div className="grid grid-cols-[auto_36px] gap-2">
                      <Input
                        value={rate.name}
                        onChange={(e) => {
                          handleUpdateRate({
                            ...rate,
                            name: e.target.value,
                          });
                        }}
                      />
                      <Input
                        type="color"
                        value={rate.color}
                        onChange={(e) => {
                          handleUpdateRate({
                            ...rate,
                            color: e.target.value,
                          });
                        }}
                        className="py-0 px-[2px]"
                      />
                    </div>
                  ) : (
                    <span
                      className="flex items-center gap-2 h-9 rounded-sm px-2 py-1"
                      style={{
                        color: rate.color,
                        backgroundColor: `rgba(${hexToRgb(rate.color)}, 0.1)`,
                      }}
                    >
                      {rate.name}
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: rate.color,
                        }}
                      ></span>
                    </span>
                  )}
                  {Object.keys(rate.movers_rates)
                    .slice(0, 3)
                    .map((mover, i) => {
                      const hRate = rate.movers_rates[mover].hourly_rate;
                      // console.log(hRate);
                      if (currentEdit === idx) {
                        return (
                          <PriceInput
                            value={hRate}
                            onChange={(val) => {
                              rate.movers_rates[mover].hourly_rate = val;
                              handleUpdateRate({
                                ...rate,
                                ...rate.movers_rates,
                              });
                            }}
                            key={i}
                          />
                        );
                      }
                      return <div key={i}>{formatMoney(hRate)}</div>;
                    })}
                  <div>
                    {currentEdit === idx ? (
                      <PriceInput
                        value={rate.extra_mover_rate}
                        onChange={(val) =>
                          handleUpdateRate({
                            ...rate,
                            extra_mover_rate: val,
                          })
                        }
                      />
                    ) : (
                      formatMoney(rate.extra_mover_rate)
                    )}
                  </div>
                  <div>
                    {currentEdit === idx ? (
                      <PriceInput
                        value={rate.extra_truck_rate}
                        onChange={(val) =>
                          handleUpdateRate({
                            ...rate,
                            extra_truck_rate: val,
                          })
                        }
                      />
                    ) : (
                      formatMoney(rate.extra_truck_rate)
                    )}
                  </div>
                  <Switch
                    id={rate.name}
                    checked={rate.enable}
                    onCheckedChange={(checked) => {
                      handleUpdateRate({
                        ...rate,
                        enable: checked,
                      });
                    }}
                  />
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary"
                    onClick={() => {
                      setCurrentEdit((prev) => (prev === idx ? null : idx));
                    }}
                  >
                    <SquarePenIcon className="size-4" />
                    Edit
                  </Button>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t justify-end py-4">
          <div
            className={cn(
              'flex min-h-9 w-full gap-4 sm:w-auto transition-opacity duration-500',
              {
                'invisible opacity-0': !isChanged,
                'visible opacity-100': isChanged,
              }
            )}
          >
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setItems(dbRates!);
                setIsChanged(false);
                setCurrentEdit(null);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              type="button"
              className="w-full sm:w-auto"
              disabled={false}
              loading={false}
              onClick={handleSaveChanges}
            >
              Save changes
            </LoadingButton>
          </div>
        </CardFooter>
      </Card>
    </SettingPageWrapper>
  );
}

function LoadingSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="grid px-1 gap-4 py-4 text-sm font-medium items-center grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
        >
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
    </>
  );
}
