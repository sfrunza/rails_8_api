import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CalendarRatesList from './calendar-rates-list';

export default function CalendarRatesPage() {
  return (
    <>
      <Link
        to="/crm/settings"
        className="md:hidden flex gap-2 items-center text-muted-foreground mb-6"
      >
        <ChevronLeftIcon className="size-5" />
        Settings
      </Link>
      <Card className="max-w-screen-md">
        <CardHeader>
          <CardTitle>Calendar Rates</CardTitle>
          <CardDescription>Manage your calendar rates.</CardDescription>
        </CardHeader>
        <CardContent className="relative py-6">
          <CalendarRatesList />
        </CardContent>
      </Card>
    </>
  );
}
