import PageContainer from '@/components/page-container';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type PageProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SettingPageWrapper({ children, className }: PageProps) {
  return (
    <PageContainer className="bg-muted grid grid-rows-[3rem_auto] lg:grid-rows-1 h-[calc(100%-64px)]">
      <div className="flex lg:hidden bg-background w-full justify-between items-center border-b px-4">
        <Link
          to="/crm/settings"
          className="flex items-center space-x-2 text-blue-500"
        >
          <ChevronLeftIcon className="size-6" />
          Settings
        </Link>
      </div>
      <div className={cn('p-4 overflow-y-auto', className)}>{children}</div>
    </PageContainer>
  );
}
