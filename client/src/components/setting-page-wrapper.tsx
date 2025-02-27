import PageContainer from "@/components/page-container";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router";

type PageProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SettingPageWrapper({ children, className }: PageProps) {
  return (
    <PageContainer className="grid h-[calc(100%-64px)] grid-rows-[3rem_auto] bg-muted lg:grid-rows-1">
      <div className="flex w-full items-center justify-between border-b bg-background px-2 lg:hidden">
        <Link
          to="/crm/settings"
          className="inline-flex items-center justify-center text-blue-600"
          viewTransition
        >
          <ChevronLeftIcon className="size-8" />
          Back
        </Link>
      </div>
      <div className={cn("overflow-y-auto p-4", className)}>{children}</div>
    </PageContainer>
  );
}
