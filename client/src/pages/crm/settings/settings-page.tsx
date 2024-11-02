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
import { buttonVariants } from '@/components/ui/button';
import PageContainer from '@/components/page-container';

// import { sidebarMenuButtonVariants } from '@/components/ui/sidebar';

export const navLinks = [
  {
    name: 'Moving Services',
    href: 'services',
    icon: PencilRulerIcon,
  },
  {
    name: 'Extra Services',
    href: '#',
    icon: HousePlusIcon,
  },
  {
    name: 'Packing',
    href: 'packing',
    icon: Package2Icon,
  },
  { name: 'Trucks', href: 'trucks', icon: TruckIcon },
  {
    name: 'Rates',
    href: 'rates',
    icon: DollarSignIcon,
  },
  {
    name: 'Calendar Rates',
    href: 'calendar-rates',
    icon: CalendarCogIcon,
  },
];

export default function SettingsPage() {
  const { pathname } = useLocation();
  const pageUrl = '/crm/settings';
  const lastPathSegment = pathname.split('/').filter(Boolean).pop();

  return (
    <div className="grid lg:rounded-tl-2xl lg:grid-cols-[16rem_1fr] h-full overflow-hidden bg-muted">
      <PageContainer
        className={cn('pb-28 p-4 hidden lg:block border-r', {
          block: pathname === pageUrl,
        })}
      >
        <div className="flex w-full flex-col gap-2">
          {navLinks.map((item, i) => {
            const isCurrentPage = item.href === lastPathSegment;
            return (
              <Link
                key={i}
                to={item.href}
                className={cn(
                  buttonVariants({
                    variant: isCurrentPage ? 'secondary' : 'ghost',
                    size: 'lg',
                    className: 'justify-start w-full',
                  })
                )}
              >
                <item.icon className="size-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </PageContainer>
      {pageUrl !== pathname ? (
        <Outlet />
      ) : (
        <div className="hidden lg:flex justify-center items-center w-full h-full" />
      )}
    </div>
  );
}
