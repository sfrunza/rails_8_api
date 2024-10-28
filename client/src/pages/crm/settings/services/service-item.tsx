import { CSSProperties } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';

// import useServices from "@/hooks/useServices";

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
// import LoadingButton from "@/components/ui/loading-button";
// import { TService } from "@/types/service";

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
  // const { deleteService, isDeleting } = useServices();
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

  // async function handleDeleteService(serviceId: number) {
  // try {
  //   await deleteService(serviceId, {
  //     onSuccess: () => {
  //       toast.success("Service deleted successfully!");
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //     },
  //   });
  // } catch (err) {
  //   toast.error("An unexpected error occurred.");
  // }
  // }

  return (
    <div
      ref={setNodeRef}
      style={style}
      // className="flex items-center justify-between gap-2"
      className="flex flex-row items-center gap-2 rounded-lg"
    >
      <div {...attributes} {...listeners} className="flex min-w-6">
        <GripVerticalIcon className="size-5 text-muted-foreground" />
      </div>
      {/* <div
      className="flex flex-1 items-center justify-between gap-4 sm:gap-20"
      > */}
      {/* <div className="flex items-center flex-1 gap-4"> */}
      <Input
        value={item.name}
        onChange={(e) => {
          const value = e.target.value;
          updateItemName(item.id, value);
        }}
        disabled={isDefaultItem}
        name={item.name}
      />
      {/* </div> */}
      <Switch
        checked={item.enabled}
        onCheckedChange={(val) => {
          console.log('switched', val);
          onEnabledChange(item.id, val);
        }}
        className="ml-10"
      />

      {/* <div className="flex items-center">
          <LoadingButton
            size="icon"
            variant="secondary"
            onClick={() => {
              handleDeleteService(item.id);
            }}
            disabled={false || isDefaultItem}
            loading={false}
          >
            <Trash2Icon />
          </LoadingButton>
        </div> */}
      {/* </div> */}
    </div>
  );
}
