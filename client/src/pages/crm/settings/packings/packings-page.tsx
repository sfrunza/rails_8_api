import SettingPageWrapper from "@/components/setting-page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PackingList from "./packing-list";
import PackingForm from "./packing-form";

export default function PackingsPage() {
  return (
    <SettingPageWrapper>
      <Card className="relative max-w-4xl">
        <CardHeader>
          <CardTitle>Packing Services</CardTitle>
          <CardDescription>Manage your packing services.</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <PackingForm />
          <PackingList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}
