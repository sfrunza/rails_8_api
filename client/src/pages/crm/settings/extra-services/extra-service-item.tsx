import { CSSProperties } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon, TrashIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TExtraService } from '@/types/extra-services';
import PriceInput from '@/components/price-input';

export default function ExtraServiceItem({
  id,
  item,
  onChange,
}: {
  id: number;
  item: TExtraService;
  onChange: (itemId: number, value: Partial<TExtraService>) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
    position: isDragging ? 'relative' : 'static',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'grid gap-4 items-center font-medium grid-cols-[18px_3fr_1fr_1fr_1fr]',
        {
          'bg-background': isDragging,
        }
      )}
    >
      <div {...attributes} {...listeners} className="flex min-w-6">
        <GripVerticalIcon className="size-5 text-muted-foreground" />
      </div>
      <Input
        value={item.name}
        onChange={(e) => {
          const value = e.target.value;
          onChange(item.id, { name: value });
        }}
        name={item.name}
      />

      <PriceInput
        value={item.price}
        onChange={(val) => {
          onChange(item.id, {
            price: val,
          });
        }}
      />
      <Switch
        checked={item.enabled}
        onCheckedChange={(val) => {
          onChange(item.id, { enabled: val });
        }}
      />
      <div className="flex justify-end">
        <Button variant="ghost" className="hover:text-red-500">
          <TrashIcon className="size-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
