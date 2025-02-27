import { CSSProperties } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import PackingForm from "./packing-form";
import { LoadingButton } from "@/components/loading-button";
import { useResource } from "@/hooks/use-resource";
import { TPacking } from "@/types/packing";

export default function PackingItem({ item }: { item: TPacking }) {
  const isMobile = useIsMobile();
  const { isDeleting, handleDelete } = useResource("packings");
  const isDefaultItem = item.is_default;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
    position: isDragging ? "relative" : "static",
  };

  return (
    <div
      ref={!isDefaultItem ? setNodeRef : null}
      style={style}
      className={cn("grid grid-cols-[2rem_auto] items-center", {
        "bg-background": isDragging,
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
      <div className="grid grid-cols-[auto_5rem] items-center overflow-hidden border-b py-2 md:grid-cols-[auto_12rem]">
        <p className="truncate text-sm font-medium">{item.name}</p>
        <div className="flex items-center justify-between">
          <PackingForm data={item} />
          {isDefaultItem ? (
            <Button
              variant="ghost"
              disabled
              size={isMobile ? "icon" : "default"}
            >
              <ButtonText text="Default" />
            </Button>
          ) : (
            <LoadingButton
              disabled={isDeleting}
              loading={isDeleting}
              variant="ghost"
              className="hover:text-red-500"
              onClick={() => handleDelete(item.id)}
              size={isMobile ? "icon" : "default"}
            >
              <span className="flex gap-2">
                <TrashIcon />
                <span className="hidden md:inline-flex">Delete</span>
              </span>
            </LoadingButton>
          )}
        </div>
      </div>
    </div>
  );
}

function ButtonText({ text }: { text: string }) {
  return <span className="hidden md:inline-flex">{text}</span>;
}
