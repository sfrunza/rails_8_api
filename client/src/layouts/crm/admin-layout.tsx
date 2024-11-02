import { MessageCircleMore } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

import logoLight from '@/assets/logos/color-logo.png';
import logoDark from '@/assets/logos/mono-logo.png';
import { Button } from '@/components/ui/button';
import { MobileMenu } from './_components/mobile-menu';
import SideBar from './_components/side-bar';
import UserMenu from './_components/user-menu';
import CreateRequestButton from './_components/create-request-button';

export default function AdminLayout() {
  const location = useLocation();
  const isCurrentPage = location.pathname.includes('messages');
  return (
    <div className="fixed h-full w-full overflow-hidden bg-foreground">
      <header className="sticky z-30 w-full">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="hidden max-w-[8rem] lg:block">
              <Link to="/">
                <img
                  src={logoDark}
                  alt="Light theme image"
                  className="block dark:hidden max-w-32"
                />
                <img
                  src={logoLight}
                  alt="Dark theme image"
                  className="hidden dark:block max-w-32"
                />
              </Link>
            </div>
            <MobileMenu />
            <CreateRequestButton />
          </div>
          <div className="flex items-center gap-4">
            <Button
              asChild
              size="icon"
              variant={isCurrentPage ? 'outline' : 'ghost'}
              className={cn(
                'size-10 rounded-[36%]',
                !isCurrentPage && 'text-white'
              )}
            >
              <Link to="messages">
                <div className="relative">
                  <MessageCircleMore className="size-8" aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-red-600 p-2 text-xs text-white">
                    2
                  </span>
                </div>
              </Link>
            </Button>
            <UserMenu />
          </div>
        </div>
      </header>
      <main className="grid lg:grid-cols-[4rem_1fr] h-full">
        <div
          className="hidden lg:inline-block"
          // className="hidden lg:left-0 lg:z-20 lg:block lg:min-w-16 lg:bg-foreground lg:pb-4"
        >
          <SideBar />
        </div>
        <Outlet />
        {/* <div
          className="bg-background overflow-y-auto lg:rounded-tl-md"
          className="h-[calc(100%-64px)] w-full overflow-y-auto overflow-x-hidden rounded-none bg-muted p-4 lg:w-[calc(100%-4rem)] lg:rounded-tl-md"
        > */}
        {/* <DialogProvider /> */}
        {/* </div> */}
      </main>
      {/* <OpenedRequests /> */}
    </div>
  );
}
