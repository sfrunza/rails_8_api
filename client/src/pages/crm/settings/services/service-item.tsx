import { CSSProperties } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';

import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function ServiceItem({
  id,
  item,
  onEnabledChange,
}: {
  id: number;
  item: any;
  onEnabledChange: (index: number, value: boolean) => void;
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
      className={cn('grid gap-4 grid-cols-[18px_1fr_3rem] items-center py-3', {
        'bg-background': isDragging,
      })}
    >
      <div {...attributes} {...listeners} className="flex min-w-6">
        <GripVerticalIcon className="size-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">{item.name}</p>
      </div>
      <div className="flex justify-end">
        <Switch
          checked={item.enabled}
          onCheckedChange={(val) => {
            console.log('switched', val);
            onEnabledChange(item.id, val);
          }}
          className="ml-10"
        />
      </div>
    </div>
  );
}
