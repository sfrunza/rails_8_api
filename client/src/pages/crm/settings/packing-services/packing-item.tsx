import { CSSProperties } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon, SquarePenIcon, TrashIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TPackingService } from '@/types/packing-services';
import { useIsMobile } from '@/hooks/use-mobile';

export default function PackingItem({ item }: { item: TPackingService }) {
  const isDefaultItem = item.is_default;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const isMobile = useIsMobile();

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
    position: isDragging ? 'relative' : 'static',
  };

  return (
    <div
      ref={!isDefaultItem ? setNodeRef : null}
      style={style}
      className={cn('grid grid-cols-[2rem_auto] items-center', {
        'bg-background': isDragging,
      })}
    >
      <div
        {...(!isDefaultItem ? attributes : {})}
        {...(!isDefaultItem ? listeners : {})}
      >
        {!item.is_default && (
          <GripVerticalIcon className="size-5 text-muted-foreground" />
        )}
      </div>
      <div className="grid md:grid-cols-[auto_12rem] grid-cols-[auto_5rem] items-center border-b py-2 overflow-hidden">
        <p className="text-sm truncate">{item.name}</p>
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            className="text-green-600 hover:text-green-600"
            size={isMobile ? 'icon' : 'default'}
          >
            <SquarePenIcon className="size-4" />
            <ButtonText text="Edit" />
          </Button>
          {isDefaultItem ? (
            <Button
              variant="ghost"
              disabled
              size={isMobile ? 'icon' : 'default'}
            >
              <ButtonText text="Default" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="hover:text-red-500"
              size={isMobile ? 'icon' : 'default'}
            >
              <TrashIcon className="size-4" />
              <ButtonText text="Delete" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ButtonText({ text }: { text: string }) {
  return <span className="hidden md:inline-flex">{text}</span>;
}
