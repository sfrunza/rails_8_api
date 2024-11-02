import { cn } from '@/lib/utils';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};
export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div className={cn('overflow-y-auto bg-background', className)}>
      {children}
    </div>
  );
}
