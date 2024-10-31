import { CSSProperties } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function ServiceItem({
  id,
  item,
  updateItemName,
  onEnabledChange,
}: {
  id: number;
  item: any;
  updateItemName: (index: number, value: string) => void;
  onEnabledChange: (index: number, value: boolean) => void;
}) {
  const isDefaultItem = item.is_default;
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
      className={cn('flex flex-row items-center gap-2 rounded-lg', {
        'bg-background': isDragging,
      })}
    >
      <div {...attributes} {...listeners} className="flex min-w-6">
        <GripVerticalIcon className="size-5 text-muted-foreground" />
      </div>
      <Input
        value={item.name}
        onChange={(e) => {
          const value = e.target.value;
          updateItemName(item.id, value);
        }}
        disabled={isDefaultItem}
        name={item.name}
      />
      <Switch
        checked={item.enabled}
        onCheckedChange={(val) => {
          console.log('switched', val);
          onEnabledChange(item.id, val);
        }}
        className="ml-10"
      />
    </div>
  );
}
