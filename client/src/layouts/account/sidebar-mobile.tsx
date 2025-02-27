import {
  FileTextIcon,
  HistoryIcon,
  LayoutPanelLeftIcon,
  MailIcon,
  MoveRightIcon,
  PanelLeftIcon,
  PhoneIcon,
  SettingsIcon,
  UmbrellaIcon,
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { statusBgColors, statusTextColors } from "@/constants/request";
import { TStatus } from "@/types/request";
import { useAppSelector } from "@/store";

const iconClassName = "mr-4 size-4";

export function SideBarMobile({ requests }: { requests: any[] }) {
  const { user } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const params = useParams<{ id: string }>();

  return (
    <Sheet>
      <SheetTrigger asChild className="flex lg:hidden">
        <Button
          variant="outline"
          size="icon"
          className="border-none bg-transparent p-0 shadow-none hover:bg-muted/10 [&_svg]:size-5"
        >
          <PanelLeftIcon className="rounded-md text-white" />
          <span className="sr-only">Open Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col gap-2 overflow-y-scroll px-4 pt-10"
      >
        <SheetHeader>
          <SheetTitle>Welcome, {user?.first_name}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Button
          variant="ghost"
          className={cn("justify-start", pathname === "/account" && "bg-muted")}
          asChild
        >
          <SheetClose asChild>
            <Link to="/account">
              <LayoutPanelLeftIcon className={iconClassName} />
              Account Overview
            </Link>
          </SheetClose>
        </Button>
        <Accordion type="single" collapsible className="w-full border-none">
          <AccordionItem value="1" className="border-b-0">
            <AccordionTrigger
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-between hover:no-underline",
              )}
            >
              <span className="flex items-center justify-start">
                <HistoryIcon className={iconClassName} />
                My Moves History ({requests.length})
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 border-none px-1 pt-4">
              {requests.map(({ id, status, origin, destination }) => (
                <SheetClose asChild key={id}>
                  <Link
                    to={`requests/${id}`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      params.id === id.toString() && "bg-muted",
                      "flex h-fit flex-col gap-1 p-2 text-xs",
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <p className="font-semibold"># {id}</p>
                      <p
                        className={`${statusBgColors[status as TStatus]} ${statusTextColors[status as TStatus]} w-fit rounded px-2 py-1`}
                      >
                        {status}
                      </p>
                    </div>
                    <div className="flex w-full items-center gap-2 overflow-hidden text-muted-foreground">
                      {origin && (
                        <p>
                          {origin.city}, {origin.state}
                        </p>
                      )}
                      {origin && destination && (
                        <MoveRightIcon className="size-4 min-w-4" />
                      )}
                      {destination && (
                        <p>
                          {destination.city}, {destination.state}
                        </p>
                      )}
                    </div>
                  </Link>
                </SheetClose>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator />
        <Button
          variant="ghost"
          className={cn(
            "justify-start",
            pathname === "/account/profile" && "bg-muted",
          )}
          asChild
        >
          <SheetClose asChild>
            <Link to="/account/profile">
              <SettingsIcon className={iconClassName} /> Edit Profile
            </Link>
          </SheetClose>
        </Button>
        <Separator />
        <Button variant="ghost" className="justify-start" asChild>
          <a href="#">
            <UmbrellaIcon className={iconClassName} /> Certificate of Insurance
          </a>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <a href="#">
            <FileTextIcon className={iconClassName} /> Bill of Lading
          </a>
        </Button>
        <Separator />
        <p className="pl-4 text-sm font-semibold">Need Help?</p>
        <Button variant="ghost" className="justify-start" asChild>
          <a href="tel:(617)9913552">
            <PhoneIcon className={iconClassName} /> (617) 991-3552
          </a>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <a href="mailto:info@bravemovers.com">
            <MailIcon className={iconClassName} /> info@bravemovers.com
          </a>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
