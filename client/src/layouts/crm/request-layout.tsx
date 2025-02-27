import { Outlet } from "react-router";

export default function RequestLayout() {
  return (
    <main className="fixed left-0 top-0 h-full w-full bg-foreground">
      <div className="hidden h-10 w-full bg-foreground md:block" />
      <div className="h-full w-full overflow-hidden overflow-y-scroll">
        <div className="m-auto min-h-screen max-w-[1300px] bg-background pb-10 md:min-h-[calc(100vh-40px)] md:rounded-t-md">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
