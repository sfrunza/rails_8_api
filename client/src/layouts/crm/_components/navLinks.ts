import {
  BarChart4Icon,
  CalendarDaysIcon,
  FileIcon,
  LayoutGridIcon,
  SettingsIcon,
  TruckIcon,
} from "lucide-react";

export const navLinks = [
  { name: "Dashboard", href: "requests", icon: LayoutGridIcon },
  {
    name: "Calendar",
    href: "#",
    icon: CalendarDaysIcon,
  },
  { name: "Projects", href: "#", icon: TruckIcon },
  { name: "Settings", href: "settings", icon: SettingsIcon },
  { name: "Documents", href: "#", icon: FileIcon },
  { name: "Reports", href: "#", icon: BarChart4Icon },
];
