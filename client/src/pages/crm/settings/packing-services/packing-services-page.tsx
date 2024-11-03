import SettingPageWrapper from '@/components/setting-page-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PackingList from './packing-list';

export default function PackingServicesPage() {
  return (
    <SettingPageWrapper>
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Packing Services</CardTitle>
          <CardDescription>Manage your packing services.</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <PackingList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}
