import { api } from '@/api';
import { SquarePenIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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

import { centsToDollars, formatMoney, hexToRgb } from '@/lib/helpers';
import LoadingButton from '@/components/loading-button';
import SettingPageWrapper from '@/components/setting-page-wrapper';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useRates from '@/hooks/use-rates';
import { cn } from '@/lib/utils';
import { TRate } from '@/types/rates';
import { Skeleton } from '@/components/ui/skeleton';

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
          <Table className="min-w-[770px]">
            <TableHeader>
              <TableRow className="hover:bg-background">
                <TableHead className="w-48">Name</TableHead>
                <TableHead>2 movers</TableHead>
                <TableHead>3 movers</TableHead>
                <TableHead>4 movers</TableHead>
                <TableHead>Extra mover</TableHead>
                <TableHead>Extra truck</TableHead>
                <TableHead>Off/On</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow className="h-16 hover:bg-background" key={i}>
                    <TableCell>
                      <Skeleton className="h-9 w-[176px]" />
                    </TableCell>
                    <TableCell className="w-[92px]">
                      <Skeleton className="h-9 w-full" />
                    </TableCell>
                    <TableCell className="w-[92px]">
                      <Skeleton className="h-9 w-full" />
                    </TableCell>
                    <TableCell className="w-[92px]">
                      <Skeleton className="h-9 w-full" />
                    </TableCell>
                    <TableCell className="w-[115px]">
                      <Skeleton className="h-9 w-full" />
                    </TableCell>
                    <TableCell className="w-[107px]">
                      <Skeleton className="h-9 w-full" />
                    </TableCell>
                    <TableCell className="w-[76px]">
                      <Skeleton className="h-9 w-full" />
                    </TableCell>
                    <TableCell className="w-[115px]">
                      <Skeleton className="h-9 w-full" />
                    </TableCell>
                  </TableRow>
                ))}

              {items?.map((rate, idx) => (
                <TableRow key={idx} className="h-16 hover:bg-background">
                  <TableCell className="font-medium">
                    {currentEdit === idx ? (
                      <div className="flex items-center justify-between gap-2">
                        <Input
                          className="p-2"
                          value={rate.name}
                          onChange={(e) => {
                            // console.log(e.target.value);
                            handleUpdateRate({
                              ...rate,
                              name: e.target.value,
                            });
                          }}
                        />
                        <input
                          className="size-9 rounded p-0"
                          type="color"
                          value={rate.color}
                          onChange={(e) => {
                            handleUpdateRate({
                              ...rate,
                              color: e.target.value,
                            });
                          }}
                        />
                      </div>
                    ) : (
                      <span
                        className="flex items-center gap-2 rounded-sm px-2 py-1"
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
                  </TableCell>
                  {Object.keys(rate.movers_rates)
                    .slice(0, 3)
                    .map((mover) => {
                      const hRate = rate.movers_rates[mover].hourly_rate;
                      // console.log(hRate);
                      if (currentEdit === idx) {
                        return (
                          <TableCell key={mover}>
                            <Input
                              className="w-14 p-2"
                              pattern="[0-9]+"
                              inputMode="numeric"
                              value={centsToDollars(hRate) || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                  rate.movers_rates[mover].hourly_rate =
                                    Math.round(parseFloat(value) * 100);
                                  handleUpdateRate({
                                    ...rate,
                                    ...rate.movers_rates,
                                  });
                                }
                              }}
                            />
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={mover}>{formatMoney(hRate)}</TableCell>
                      );
                    })}
                  <TableCell>
                    {currentEdit === idx ? (
                      <Input
                        className="w-14 p-2"
                        pattern="[0-9]+"
                        inputMode="numeric"
                        value={centsToDollars(rate.extra_mover_rate) || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            handleUpdateRate({
                              ...rate,
                              extra_mover_rate: Math.round(
                                parseFloat(value) * 100
                              ),
                            });
                          }
                        }}
                      />
                    ) : (
                      formatMoney(rate.extra_mover_rate)
                    )}
                  </TableCell>
                  <TableCell>
                    {currentEdit === idx ? (
                      <Input
                        className="w-14 p-2"
                        pattern="[0-9]+"
                        inputMode="numeric"
                        value={centsToDollars(rate.extra_truck_rate) || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            handleUpdateRate({
                              ...rate,
                              extra_truck_rate: Math.round(
                                parseFloat(value) * 100
                              ),
                            });
                          }
                        }}
                      />
                    ) : (
                      formatMoney(rate.extra_truck_rate)
                    )}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-primary hover:text-primary"
                      onClick={() => {
                        setCurrentEdit((prev) => (prev === idx ? null : idx));
                      }}
                    >
                      <SquarePenIcon className="mr-2 size-4" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
