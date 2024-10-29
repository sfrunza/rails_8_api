import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  BookOpen,
  CalendarDaysIcon,
  LayoutGridIcon,
  LogOut,
  Settings2,
} from 'lucide-react';

import logoLight from '@/assets/logos/color-logo.png';
import logoDark from '@/assets/logos/mono-logo.png';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { logout } from '@/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '@/store';

import { ModeToggle } from '@/components/mode-toggle';
import CreateRequestButton from './create-request-button';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
}

const navData = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/crm/requests',
      icon: LayoutGridIcon,
      isActive: true,
    },
    {
      title: 'Calendar',
      url: '#',
      icon: CalendarDaysIcon,
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
    },
    {
      title: 'Settings',
      url: '/crm/settings',
      icon: Settings2,
    },
  ],
};

export default function AdminLayout() {
  // const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  if (!user) {
    return null;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/">
                  <img
                    src={logoLight}
                    alt="Light theme image"
                    className="block dark:hidden max-w-32"
                  />
                  <img
                    src={logoDark}
                    alt="Dark theme image"
                    className="hidden dark:block max-w-32"
                  />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navData.navMain.map((item, i) => {
                // const { setOpen } = useSidebar();
                const active = item.url === pathname;
                return (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      variant={active ? 'outline' : 'default'}
                      onClick={() => {
                        // setOpen(false);
                      }}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar> */}
      <SidebarInset className="overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center justify-between px-4 w-full">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <CreateRequestButton />
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="size-9 rounded-lg cursor-pointer">
                    <AvatarFallback className="rounded-lg">
                      {getInitials(`${user.first_name} ${user.last_name}`)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">
                          {getInitials(`${user.first_name} ${user.last_name}`)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {`${user.first_name} ${user.last_name}`}
                        </span>
                        <span className="truncate text-xs">{user.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function AppSidebar() {
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <img
                  src={logoLight}
                  alt="Light theme image"
                  className="block dark:hidden max-w-32"
                />
                <img
                  src={logoDark}
                  alt="Dark theme image"
                  className="hidden dark:block max-w-32"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navData.navMain.map((item, i) => {
              // const { setOpen } = useSidebar();
              const active = item.url === pathname;
              return (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    variant={active ? 'outline' : 'default'}
                    onClick={() => {
                      setOpenMobile(false);
                    }}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
