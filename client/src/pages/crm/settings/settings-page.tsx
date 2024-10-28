import {
  CalendarCogIcon,
  DollarSignIcon,
  HousePlusIcon,
  Package2Icon,
  PencilRulerIcon,
} from 'lucide-react';
import { TruckIcon } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

import { sidebarMenuButtonVariants } from '@/components/ui/sidebar';

export const navLinks = [
  {
    name: 'Moving Services',
    href: '/crm/settings/services',
    icon: PencilRulerIcon,
  },
  {
    name: 'Extra Services',
    href: '#',
    icon: HousePlusIcon,
  },
  {
    name: 'Packing',
    href: '/crm/settings/packing',
    icon: Package2Icon,
  },
  { name: 'Trucks', href: '/crm/settings/trucks', icon: TruckIcon },
  {
    name: 'Rates',
    href: '/crm/settings/rates',
    icon: DollarSignIcon,
  },
  {
    name: 'Calendar Rates',
    href: '/crm/settings/calendar-rates',
    icon: CalendarCogIcon,
  },
];

export default function SettingsPage() {
  const { pathname } = useLocation();
  return (
    <div className="grid min-h-full w-full rounded-lg md:grid-cols-[12rem_1fr]">
      <div
        className={cn(
          'md:border-r pr-4',
          pathname === '/crm/settings' ? 'block' : 'hidden md:block'
        )}
      >
        <ul role="list" className="flex w-full flex-col gap-2">
          {navLinks.map((item, i) => {
            const active = item.href === pathname;

            return (
              <li key={i} className="w-full">
                <Link
                  to={item.href}
                  className={cn(
                    sidebarMenuButtonVariants({
                      variant: active ? 'outline' : 'default',
                    }),
                    'text-sidebar-foreground'
                  )}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="overflow-hidden md:px-4">
        <Outlet />
      </div>
    </div>
  );
}
