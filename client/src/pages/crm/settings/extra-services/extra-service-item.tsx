import { CSSProperties } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon, TrashIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { TExtraService } from "@/types/extra-service";
import PriceInput from "@/components/price-input";
import LoadingButton from "@/components/loading-button";
import { useResource } from "@/hooks/use-resource";

export default function ExtraServiceItem({
  id,
  item,
  onChange,
}: {
  id: number;
  item: TExtraService;
  onChange: (itemId: number, value: Partial<TExtraService>) => void;
}) {
  const { isDeleting, handleDelete } = useResource("extra_services");
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
        "grid grid-cols-[18px_3fr_1fr_1fr_1fr] items-center gap-4 font-medium",
        {
          "bg-background": isDragging,
        },
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
        onValueChange={(val) => {
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
        <LoadingButton
          disabled={isDeleting}
          loading={isDeleting}
          variant="ghost"
          className="hover:text-red-500"
          onClick={() => handleDelete(item.id)}
        >
          <span className="flex gap-2">
            <TrashIcon className="size-4" />
            Delete
          </span>
        </LoadingButton>
      </div>
    </div>
  );
}
