import { Link, Outlet } from "react-router";

import logoLight from "@/assets/logos/color-logo.png";
import logoDark from "@/assets/logos/mono-logo.png";
import CreateRequestButton from "./_components/create-request-button";
import MessageNotification from "./_components/message-notification";
import { MobileMenu } from "./_components/mobile-menu";
import SearchForm from "./_components/search-form";
import SideBar from "./_components/side-bar";
import UserMenu from "./_components/user-menu";

export default function AdminLayout() {
  return (
    <div className="fixed h-full w-full overflow-hidden bg-foreground">
      <header className="sticky z-30 w-full">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden max-w-[8rem] lg:block">
              <Link to="/">
                <img
                  src={logoDark}
                  alt="Light theme image"
                  className="block max-w-32 dark:hidden"
                />
                <img
                  src={logoLight}
                  alt="Dark theme image"
                  className="hidden max-w-32 dark:block"
                />
              </Link>
            </div>
            <MobileMenu />
            <CreateRequestButton />
            <SearchForm />
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <MessageNotification />
            <UserMenu />
          </div>
        </div>
      </header>
      <main className="grid h-full lg:grid-cols-[4rem_1fr]">
        <div className="hidden lg:inline-block">
          <SideBar />
        </div>
        <Outlet />
      </main>
      {/* <OpenedRequests /> */}
    </div>
  );
}
