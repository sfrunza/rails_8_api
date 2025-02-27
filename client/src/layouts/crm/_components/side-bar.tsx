import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

import { navLinks } from "./navLinks";

export default function SideBar() {
  return (
    <nav className="mt-6">
      <ul role="list" className="flex flex-col items-center space-y-4">
        {navLinks.map((item, i) => {
          return (
            <li key={i}>
              <NavLink
                to={item.href}
                viewTransition
                className={({ isActive }) =>
                  cn(
                    buttonVariants({ variant: isActive ? "outline" : "ghost" }),
                    "size-10 rounded-[36%] [&_svg]:size-5",
                    !isActive && "text-white",
                  )
                }
              >
                <item.icon />
                <span className="sr-only">{item.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
