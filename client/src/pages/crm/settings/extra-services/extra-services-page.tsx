import SettingPageWrapper from '@/components/setting-page-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ExtraServiceList from './extra-service-list';

export default function ExtraServicesPage() {
  return (
    <SettingPageWrapper>
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Extra Services</CardTitle>
          <CardDescription>Manage your extra services.</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <ExtraServiceList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}