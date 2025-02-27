import { Button } from "@/components/ui/button";
import { PhoneCallIcon } from "lucide-react";
import { useAppSelector } from "@/store";
import { Link } from "react-router";

export default function StatusMessages() {
  const request = useAppSelector((state) => state.request.request);
  if (!request) return null;

  const { id, status, service } = request;
  const isFlatRate = service?.name === "Flat Rate";
  return (
    <div className="grid grid-cols-2 gap-4 border-b p-4">
      <div className="col-span-2 flex h-full w-full items-center justify-center lg:col-span-1">
        <div className="flex items-center space-x-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-600 text-3xl text-white">
            SA
          </div>
          <div>
            <p className="text-base font-semibold">Sam Adam</p>
            <p className="text-sm text-muted-foreground">Moving Assistant</p>
            <p className="text-sm text-muted-foreground">(617) 991-3552</p>
          </div>
          <Button
            asChild
            size="icon"
            variant="ghost"
            className="size-12 rounded-full border-none bg-background text-green-600 shadow-icon hover:text-green-700"
          >
            <a href="tel:(617)9913552">
              <PhoneCallIcon className="size-6" />
            </a>
          </Button>
        </div>
      </div>

      <div className="col-span-2 flex w-full gap-2 text-left text-sm lg:col-span-1">
        {isFlatRate && status === "pending" && (
          <MessageWrapper>
            <p className="font-semibold text-primary">
              This is a Flat Rate request. We need the following information in
              order to start working on your quote.
            </p>
            <ol className="list-decimal space-y-2 px-4">
              <li>
                Choose preferred{" "}
                <span className="font-semibold">
                  Pick Up and Delivery dates.
                </span>
              </li>
              <li>
                Provide full{" "}
                <span className="font-semibold">
                  Origin and Destination addresses
                </span>
                , including additional pick up and drop off stops, if needed.
              </li>
              <li>
                Add <span className="font-semibold">Inventory</span> of all
                items, including approximate number of boxes, that you will be
                moving.
              </li>
            </ol>
          </MessageWrapper>
        )}
        {status === "completed" && null}
        {status === "confirmed" && (
          <MessageWrapper>
            <p className="font-semibold">
              Your move is now booked and confirmed.
            </p>
            <p>
              Our team will be calling you on the day prior to the move to
              reconfirm the arrival time frame. You will also receive a 30
              minute heads up call from your team on the day of the move.
            </p>
          </MessageWrapper>
        )}
        {!isFlatRate && status === "pending" && (
          <MessageWrapper>
            <p className="font-semibold">
              We&apos;re currently checking if we&apos;re available for your
              upcoming move.
            </p>
            <p>
              While we&apos;re working on that, could you please update your
              list of items, addresses, and any special details for your move?
            </p>
          </MessageWrapper>
        )}

        {status === "pending_info" && (
          <MessageWrapper>
            <p>
              Looks like there was an update to your Request. We will process
              all the updates and will get back to you shortly.
            </p>
          </MessageWrapper>
        )}

        {status === "canceled" && (
          <MessageWrapper>
            <p className="font-semibold">Your move is now canceled.</p>
            <p>
              Please feel free to give us a call at +1 (617) 991-3552 with any
              questions or concerns you might have.
            </p>
          </MessageWrapper>
        )}
        {status === "expired" && (
          <MessageWrapper>
            <p className="font-semibold">
              It looks like you move plan has EXPIRED.
            </p>
            <p>This may be for a number of reasons:</p>
            <ul className="list-disc">
              <li className="ml-6">Due to no action taken on time.</li>
              <li className="ml-6">We no longer have the availability.</li>
              <li className="ml-6">
                Someone else booked your spot or the moving date got booked up.
              </li>
            </ul>
            <p>
              Please let us know if your move date is flexible and/or if you are
              still interested in using Brave Movers for your upcoming move and
              we will reactivate your request.
            </p>
          </MessageWrapper>
        )}
        {status === "not_confirmed" && (
          <MessageWrapper>
            <p className="font-semibold">
              We have checked our schedule and it looks like we can make your
              move happen.
            </p>
            <p>
              Click the{" "}
              <span className="font-semibold">
                Proceed to Confirmation Page
              </span>{" "}
              if you wish to confirm your move.
            </p>
            <p>
              <span className="font-semibold">Note:</span> We have a first come,
              first serve reservation system, so we encourage you to act fast if
              your move date is not flexible.
            </p>
            <Button asChild>
              <Link to={`/account/requests/${id}/confirmation`}>
                Proceed to Confirmation Page
              </Link>
            </Button>
          </MessageWrapper>
        )}
        {status === "not_available" && (
          <MessageWrapper>
            <p className="font-semibold">
              Sorry... It looks we are not available for this move on this day.
            </p>
            <p>
              Please give us a call at{" "}
              <span className="font-semibold">(617) 991-3552</span> to explore
              alternative dates for your move.
            </p>
          </MessageWrapper>
        )}
      </div>
    </div>
  );
}

function MessageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col space-y-2 rounded-e-xl rounded-es-xl bg-muted p-4">
      {children}
    </div>
  );
}
