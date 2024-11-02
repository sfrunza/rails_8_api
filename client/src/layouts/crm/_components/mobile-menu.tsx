import { PanelLeftIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { navLinks } from './navLinks';
import { cn } from '@/lib/utils';

export function MobileMenu() {
  const { pathname } = useLocation();
  return (
    <Sheet>
      <SheetTrigger asChild className="flex lg:hidden">
        <Button
          variant="outline"
          size="icon"
          className="border-none bg-transparent p-0 shadow-none hover:bg-muted/10"
        >
          <PanelLeftIcon className="h-5 w-5 rounded-md text-white" />
          <span className="sr-only">Open Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="hidden">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigation links</SheetDescription>
        </SheetHeader>
        <div>
          <ul role="list" className="flex flex-col items-start space-y-2 mt-8">
            {navLinks.map((item, i) => {
              const isCurrentPage = pathname.includes(item.href);

              return (
                <li key={i} className="w-full">
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant={isCurrentPage ? 'secondary' : 'ghost'}
                      size="lg"
                      className={cn('justify-start w-full', {
                        'shadow-button': isCurrentPage,
                      })}
                    >
                      <Link to={item.href}>
                        <item.icon className="mr-2 size-5" aria-hidden="true" />
                        <span>{item.name}</span>
                      </Link>
                    </Button>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
