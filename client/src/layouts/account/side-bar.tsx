import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store";
import {
  FileTextIcon,
  HistoryIcon,
  LayoutPanelLeftIcon,
  MailIcon,
  PhoneIcon,
  SettingsIcon,
  UmbrellaIcon,
} from "lucide-react";
import { NavLink } from "react-router";
// import RequestsMenu from "./requests-menu";

export default function SideBar({ requests }: { requests: any[] }) {
  const { user } = useAppSelector((state) => state.auth);

  const iconClassName = "size-5 mr-4 flex-shrink-0";

  return (
    <Card>
      <CardHeader className="border-b p-2">
        <CardTitle className="rounded-md bg-muted p-6">
          Welcome, {user?.first_name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4 pt-4">
        <NavLink
          to="/account"
          viewTransition
          end
          className={({ isActive }) => {
            return cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start",
              isActive && "bg-muted",
            );
          }}
        >
          <LayoutPanelLeftIcon className={iconClassName} />
          Account Overview
        </NavLink>
        <Accordion type="single" collapsible>
          <AccordionItem value="1" className="border-b-0">
            <AccordionTrigger
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "max-w-full justify-between hover:no-underline",
              )}
            >
              <span className="flex w-full justify-start">
                <HistoryIcon className={iconClassName} />
                <span className="truncate">My Moves History</span>
                <span className="ml-1">({requests?.length})</span>
              </span>
            </AccordionTrigger>
            {/* <RequestsMenu requests={requests} /> */}
          </AccordionItem>
        </Accordion>
        <Separator />
        <NavLink
          to="/account/profile"
          viewTransition
          className={({ isActive }) => {
            return cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start",
              isActive && "bg-muted",
            );
          }}
        >
          <SettingsIcon className={iconClassName} /> Edit Profile
        </NavLink>
        <Separator />
        <a
          href="#"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          <UmbrellaIcon className={iconClassName} />
          <span className="truncate">Certificate of Insurance</span>
        </a>
        <a
          href="#"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          <FileTextIcon className={iconClassName} /> Bill of Lading
        </a>
        <Separator />
        <p className="pl-4 text-sm font-semibold">Need Help?</p>
        <a
          href="tel:(617)9913552"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          <PhoneIcon className={iconClassName} /> (617) 991-3552
        </a>
        <a
          href="mailto:info@bravemovers.com"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          <MailIcon className={iconClassName} />
          <span className="truncate">info@bravemovers.com</span>
        </a>
      </CardContent>
    </Card>
  );
}
