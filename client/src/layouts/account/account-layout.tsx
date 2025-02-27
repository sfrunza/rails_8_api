import { Outlet } from "react-router";
import { useAppDispatch } from "@/store";
import logo from "@/assets/logos/mono-logo.png";
import { Button } from "@/components/ui/button";
import { logout } from "@/slices/auth-slice";
import SideBar from "./side-bar";
import { SideBarMobile } from "./sidebar-mobile";

export default function AccountLayout() {
  const dispatch = useAppDispatch();

  return (
    <div className="from min-h-screen bg-muted">
      <header className="h-48 bg-foreground lg:h-56">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
          <ul className="flex w-full items-center justify-between text-sm font-medium">
            <SideBarMobile requests={[]} />
            <li>
              <div className="hidden max-w-[10rem] lg:block">
                <img src={logo} alt="logo" />
              </div>
            </li>

            <div className="flex items-center gap-4">
              <li>
                <a href="#" className="text-muted">
                  About us
                </a>
              </li>
              <li>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Log out
                </Button>
              </li>
            </div>
          </ul>
        </nav>
      </header>

      <main className="-mt-28">
        <div className="mx-auto max-w-6xl p-2 md:p-4">
          <div className="grid grid-cols-12 gap-6">
            <aside className="col-span-12 hidden lg:col-span-3 lg:block">
              <SideBar requests={[]} />
              <p className="p-4 text-xs text-muted-foreground">
                © Copyright <br />
                Brave Movers is fully licensed, bonded and insured moving
                company.
                <br />
                We carry general liability, cargo and workers&apos;
                compensation.
                <br />
                <br />
                USDOT # 3791733 | MC# 1361288.
                <br />
                <br />
                Brave Movers. All rights reserved
              </p>
            </aside>

            <div className="col-span-12 lg:col-span-9">
              <Outlet />
              {/* <DialogProvider /> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
