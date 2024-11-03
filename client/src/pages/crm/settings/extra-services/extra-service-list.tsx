import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToFirstScrollableAncestor,
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import ExtraServiceItem from './extra-service-item';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/loading-button';
import { cn } from '@/lib/utils';
import { TExtraService } from '@/types/extra-services';

const extraServices = [
  {
    id: 1,
    name: 'Piano Fee',
    price: 10000,
    enabled: true,
    index: 0,
  },
  {
    id: 2,
    name: 'Piano1 Fee',
    price: 10000,
    enabled: true,
    index: 1,
  },
  {
    id: 3,
    name: 'Piano2 Fee',
    price: 10000,
    enabled: true,
    index: 2,
  },
  {
    id: 4,
    name: 'Piano3 Fee',
    price: 10000,
    enabled: true,
    index: 3,
  },
];

export default function ExtraServiceList() {
  const [items, setItems] = useState<TExtraService[]>(extraServices);
  const [orderChanged, setOrderChanged] = useState<boolean>(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function onDragEnd(event: any) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const updatedItems = arrayMove(items, oldIndex, newIndex).map(
        (item, index) => ({ ...item, index: index })
      );

      setItems(updatedItems);
      setOrderChanged(true);
    }
  }

  function onChange(itemId: number, values: Partial<TExtraService>) {
    setItems((prev) => {
      return prev.map((item) =>
        item.id === itemId ? { ...item, ...values } : item
      );
    });
    setOrderChanged(true);
  }

  return (
    <div className="">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="grid gap-4 text-muted-foreground font-medium text-sm border-b pb-4 items-center grid-cols-[18px_3fr_1fr_1fr_1fr]">
          <p></p>
          <p>Service name</p>
          <p>Service cost</p>
          <p>Enable</p>
          <p></p>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          modifiers={[
            restrictToVerticalAxis,
            restrictToFirstScrollableAncestor,
            restrictToParentElement,
          ]}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="min-w-[700px] space-y-4 py-4">
              {items.map((item) => (
                <ExtraServiceItem
                  key={item.id}
                  id={item.id}
                  item={item}
                  onChange={onChange}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="border-t pt-4">
        <div
          className={cn('flex transition-opacity duration-500 sm:justify-end', {
            'invisible opacity-0': !orderChanged,
            'visible opacity-100': orderChanged,
          })}
        >
          <div className="flex min-h-9 w-full gap-4 sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setItems(extraServices);
                setOrderChanged(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              type="button"
              className="w-full sm:w-auto"
              disabled={false}
              loading={false}
              onClick={() => console.log('click')}
            >
              Save changes
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
