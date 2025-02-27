import PageContainer from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { setSelectedDate } from "@/slices/parklot-slice";
import { useAppDispatch, useAppSelector } from "@/store";
import { format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import CalendarWithRequests from "./_components/calendar-with-requests";
import ParklotDay from "./_components/parklot-day";
import { MobileMenu } from "./_components/mobile-menu";
import { AssignCrewForm } from "./_components/assign-crew-form";

export default function DispatchPage() {
  const dispatch = useAppDispatch();
  const { selectedDate, selectedId } = useAppSelector((state) => state.parklot);

  function handleNextDay() {
    const currentDate = new Date(selectedDate);
    const nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    dispatch(setSelectedDate(nextDate.toISOString()));
  }

  function handlePrevDay() {
    const currentDate = new Date(selectedDate);
    const prevDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
    dispatch(setSelectedDate(prevDate.toISOString()));
  }

  return (
    <div className="grid h-full grid-cols-[auto_max-content] overflow-hidden bg-background lg:rounded-tl-2xl">
      <PageContainer className="grid h-[calc(100%-64px)] grid-rows-[max-content_auto]">
        <div className="relative flex w-full items-center justify-center border-b bg-muted p-4 md:p-6">
          <h1 className="absolute left-6 hidden text-2xl font-bold lg:block">
            Dispatch
          </h1>
          <div className="flex w-full items-center justify-between gap-6 lg:w-auto">
            <Button variant="outline" size="icon" onClick={handlePrevDay}>
              <ChevronLeftIcon />
            </Button>
            <p className="text-center text-sm font-semibold lg:min-w-60">
              {format(selectedDate, "PPPP")}
            </p>
            <Button variant="outline" size="icon" onClick={handleNextDay}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
        <div className="overflow-y-auto">
          <ParklotDay />
          <div className="absolute bottom-5 right-5 block md:hidden">
            <MobileMenu />
          </div>
        </div>
      </PageContainer>
      <div className="hidden border-l p-6 shadow-2xl md:block">
        <CalendarWithRequests />
        {selectedId && <AssignCrewForm />}
      </div>
    </div>
  );
}
