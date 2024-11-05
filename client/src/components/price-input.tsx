import { useState } from 'react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

function formatCurrency(cents: number): string {
  return (cents / 100).toFixed(2);
}

export default function PriceInput({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (val: number) => void;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(formatCurrency(value));
  return (
    <div className="relative flex justify-center items-center">
      <Input
        pattern="[0-9]+"
        inputMode="numeric"
        value={displayValue}
        onChange={(e) => {
          const inputValue = e.target.value.replace(/[^0-9.]/g, '');
          if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
            setDisplayValue(inputValue);
            const numericValue = parseFloat(inputValue) || 0;
            onChange(numericValue * 100);
          }
        }}
        className={cn('pl-4', className)}
      />
      <span className="absolute left-2 flex text-sm bg-transparent">$</span>
    </div>
  );
}
