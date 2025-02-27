import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CalendarWithRequests from "./calendar-with-requests";
import { CalendarDaysIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setOpen } from "@/slices/parklot-slice";
import { AssignCrewForm } from "./assign-crew-form";

export function MobileMenu() {
  const dispatch = useAppDispatch();
  const { open, selectedId } = useAppSelector((state) => state.parklot);

  function onOpenChange(open: boolean) {
    dispatch(setOpen(open));
  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="size-12 rounded-full shadow-icon [&_svg]:size-6"
        >
          <CalendarDaysIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-fit sm:max-w-fit">
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="pt-6">
          <CalendarWithRequests />
          {selectedId && <AssignCrewForm />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
