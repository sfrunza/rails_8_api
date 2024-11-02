import SettingPageWrapper from '@/components/setting-page-wrapper';
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
    <SettingPageWrapper>
      <Card className="max-w-screen-md">
        <CardHeader>
          <CardTitle>Calendar Rates</CardTitle>
          <CardDescription>Manage your calendar rates.</CardDescription>
        </CardHeader>
        <CardContent className="relative py-6">
          <CalendarRatesList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}
