import {
  CalendarCogIcon,
  DollarSignIcon,
  HousePlusIcon,
  Package2Icon,
  PencilRulerIcon,
} from "lucide-react";
import { TruckIcon } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import PageContainer from "@/components/page-container";
// import { preload } from "swr";

export const navLinks = [
  {
    name: "Moving Services",
    href: "services",
    icon: PencilRulerIcon,
    prefetchUrl: "/services",
  },
  {
    name: "Extra Services",
    href: "extra-services",
    icon: HousePlusIcon,
    prefetchUrl: "/extra_services",
  },
  {
    name: "Packing",
    href: "packing",
    icon: Package2Icon,
    prefetchUrl: "/packings",
  },
  { name: "Trucks", href: "trucks", icon: TruckIcon, prefetchUrl: "/trucks" },
  {
    name: "Rates",
    href: "rates",
    icon: DollarSignIcon,
    prefetchUrl: "/rates",
  },
  {
    name: "Calendar Rates",
    href: "calendar-rates",
    icon: CalendarCogIcon,
    prefetchUrl: "/calendar_rates",
  },
];

export default function SettingsPage() {
  const { pathname } = useLocation();
  const pageUrl = "/crm/settings";
  const isSettingsPage = pathname === pageUrl;

  return (
    <div className="grid h-full overflow-hidden bg-muted lg:grid-cols-[16rem_1fr] lg:rounded-tl-2xl">
      <PageContainer
        className={cn("hidden border-r p-4 pb-28 lg:block", {
          block: isSettingsPage,
        })}
      >
        <div className="flex w-full flex-col gap-2">
          {navLinks.map((item, i) => {
            return (
              <NavLink
                key={i}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({
                      variant: isActive ? "secondary" : "ghost",
                      size: "lg",
                      className: "w-full justify-start",
                    }),
                  )
                }
                viewTransition
              >
                <item.icon />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </PageContainer>
      {!isSettingsPage ? (
        <Outlet />
      ) : (
        <div className="hidden h-full w-full items-center justify-center lg:flex" />
      )}
    </div>
  );
}
