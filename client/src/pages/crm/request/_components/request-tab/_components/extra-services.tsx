import { HomeIcon, SquarePenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store";
import { formatMoney, priceObjectToString } from "@/lib/helpers";
import { openModal } from "@/slices/modal-slice";
import { useResource } from "@/hooks/use-resource";

const packingIcons = {
  1: "",
  2: "👜",
  3: "📦",
} as any;

export default function ExtraServices() {
  const dispatch = useAppDispatch();
  const { request, changes } = useAppSelector((state) => state.request);
  const { data: packings } = useResource("packings");

  if (!request) return null;

  const { total_price } = request;
  const currentSize = changes.size ?? request.size;
  const currentDeposit = changes.deposit ?? request.deposit;
  const currentPackingId = changes.packing_id ?? request.packing_id;
  const packing = packings?.find((p: any) => p.id === currentPackingId);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted p-2">
            <HomeIcon className="size-5" />
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle>{currentSize}</CardTitle>
            <CardDescription>676 cbf, 50 items, 8 boxes</CardDescription>
          </div>
        </div>
        <Button
          size="sm"
          className="right-4 top-4 mt-0"
          variant="outline"
          onClick={() => dispatch(openModal("editMoveSize"))}
        >
          <SquarePenIcon className="size-3" />
          Edit
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-xs font-medium [&>*:nth-child(odd)]:bg-muted">
          <div
            className="group flex items-center justify-between px-8 py-4 hover:cursor-pointer hover:bg-muted"
            onClick={() => dispatch(openModal("editDeposit"))}
          >
            <p className="text-muted-foreground group-hover:text-accent-foreground">
              Reservation price
            </p>
            <p className="group-hover:text-primary">
              {formatMoney(currentDeposit)}
            </p>
          </div>
          <div
            className="group flex items-center justify-between px-8 py-4 hover:cursor-pointer hover:bg-muted"
            onClick={() => dispatch(openModal("editPacking"))}
          >
            <p className="text-muted-foreground group-hover:text-accent-foreground">
              Packing
            </p>
            <p className="group-hover:text-primary">
              <span className="mr-2">{packingIcons[currentPackingId]}</span>
              {packing?.name}
            </p>
          </div>
          <div className="flex items-center justify-between px-8 py-4">
            <p className="text-muted-foreground">Extra services</p>
            <p>$100.00</p>
          </div>
          <div className="flex items-center justify-between px-8 py-4">
            <p className="text-muted-foreground">Reservation price</p>
            <p>$100.00</p>
          </div>
          <div className="flex items-center justify-between px-8 py-4">
            <p className="text-muted-foreground">Reservation price</p>
            <p>$100.00</p>
          </div>
          <div className="flex items-center justify-between px-8 py-4">
            <p className="text-muted-foreground">Reservation price</p>
            <p>$100.00</p>
          </div>
          <div className="flex items-center justify-between px-8 py-4">
            <p className="text-muted-foreground">Reservation price</p>
            <p>$100.00</p>
          </div>
          <div className="flex items-center justify-between px-8 py-4">
            <p className="text-muted-foreground">Reservation price</p>
            <p>$100.00</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-foreground px-8 py-4 text-sm font-bold text-muted">
        {/* <div className="flex w-full items-center justify-between px-8 py-4 text-sm font-bold"> */}
        <p>Total price</p>
        <p>{priceObjectToString(total_price)}</p>
        {/* </div> */}
      </CardFooter>
    </Card>
  );
}
