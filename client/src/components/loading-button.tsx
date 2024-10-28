import React, { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import Spinner from '@/components/spinner';
import { Button, ButtonProps } from './ui/button';

const LoadingButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    loading: boolean;
    children: React.ReactNode;
    className?: string;
  }
>(({ loading, children, className, ...rest }, ref) => {
  return (
    <Button ref={ref} className={cn('relative', className)} {...rest}>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      )}
      <span className={loading ? 'invisible' : ''}>{children}</span>
    </Button>
  );
});

LoadingButton.displayName = 'LoadingButton';

export default LoadingButton;
