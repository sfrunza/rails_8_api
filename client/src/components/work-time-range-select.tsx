import { TIME_OPTIONS } from "@/constants/request";

import { useAppDispatch, useAppSelector } from "@/store";

import SelectWithSearch from "./ui/select-with-search";
import { Separator } from "./ui/separator";
import { updateField } from "@/slices/request-slice";

export default function WorkTimeRangeSelect() {
  const dispatch = useAppDispatch();
  const { request, changes } = useAppSelector((state) => state.request);

  if (!request) return null;

  const currentWorkTime = changes.work_time ?? request.work_time;

  return (
    <div className="flex w-full gap-[1px] rounded-md border shadow-sm">
      <SelectWithSearch
        options={TIME_OPTIONS}
        value={currentWorkTime.min}
        handleSelect={(val) =>
          dispatch(
            updateField({
              work_time: {
                max: currentWorkTime.max,
                min: val,
              },
            }),
          )
        }
        id="workTime"
        className="flex-grow rounded-r-none border-none shadow-none"
      />
      <Separator className="h-9" orientation="vertical" />

      <SelectWithSearch
        options={TIME_OPTIONS}
        value={currentWorkTime.max}
        handleSelect={(val) =>
          dispatch(
            updateField({
              work_time: {
                min: currentWorkTime.min,
                max: val,
              },
            }),
          )
        }
        className="flex-grow rounded-l-none border-none shadow-none"
      />
    </div>
  );
}
