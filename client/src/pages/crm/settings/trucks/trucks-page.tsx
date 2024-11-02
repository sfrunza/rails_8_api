import SettingPageWrapper from '@/components/setting-page-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TruckList from './truck-list';
import TruckForm from './truck-form';

export default function TrucksPage() {
  return (
    <SettingPageWrapper>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Trucks</CardTitle>
          <CardDescription>Manage your trucks.</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <TruckForm />
          <TruckList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}
