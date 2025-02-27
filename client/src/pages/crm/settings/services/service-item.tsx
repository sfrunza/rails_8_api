import { CSSProperties } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon, TrashIcon } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useResource } from "@/hooks/use-resource";
import { LoadingButton } from "@/components/loading-button";

export default function ServiceItem({
  id,
  item,
  onEnabledChange,
}: {
  id: number;
  item: any;
  onEnabledChange: (index: number, value: boolean) => void;
}) {
  const { handleDelete, isDeleting } = useResource("services");
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
    zIndex: isDragging ? 1000 : "auto",
    position: isDragging ? "relative" : "static",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "grid h-12 grid-cols-[18px_1fr_2rem_3rem] items-center gap-4",
        {
          "bg-background": isDragging,
        },
      )}
    >
      <div {...attributes} {...listeners} className="flex min-w-6">
        <GripVerticalIcon className="size-5 text-muted-foreground" />
      </div>
      <div className="overflow-hidden">
        <p className="truncate text-sm font-medium">{item.name}</p>
      </div>
      <div className="flex justify-end">
        <Switch
          checked={item.enabled}
          onCheckedChange={(val) => {
            onEnabledChange(item.id, val);
          }}
          className="ml-10"
        />
      </div>
      {!item.is_default && (
        <div className="flex justify-end">
          <LoadingButton
            loading={isDeleting}
            disabled={isDeleting}
            variant="ghost"
            size="icon"
            className="transition-colors hover:text-red-600"
            onClick={() => handleDelete(item.id)}
          >
            <TrashIcon />
          </LoadingButton>
        </div>
      )}
    </div>
  );
}
