import SettingPageWrapper from "@/components/setting-page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ServiceForm from "./service-form";
import ServiceList from "./service-list";

export default function ServicesPage() {
  return (
    <SettingPageWrapper>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Moving Services</CardTitle>
          <CardDescription>Manage your moving services.</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <ServiceForm />
          <Separator />
          <ServiceList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}
