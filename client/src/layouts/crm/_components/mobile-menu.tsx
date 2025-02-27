import { PanelLeftIcon } from "lucide-react";
import { NavLink } from "react-router";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { navLinks } from "./navLinks";

export function MobileMenu() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
      <SheetContent side="left">
        <SheetHeader className="hidden">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigation links</SheetDescription>
        </SheetHeader>
        <div>
          <ul role="list" className="mt-8 flex flex-col items-start space-y-2">
            {navLinks.map((item, i) => {
              return (
                <li key={i} className="w-full">
                  <NavLink
                    to={item.href}
                    viewTransition
                    className={({ isActive }) =>
                      cn(
                        buttonVariants({
                          variant: isActive ? "secondary" : "ghost",
                          size: "lg",
                          className: "h-12 w-full justify-start",
                        }),
                      )
                    }
                    onClick={() => setOpen(false)}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
