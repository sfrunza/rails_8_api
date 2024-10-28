import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceForm from './service-form';
import ServiceList from './service-list';

export default function ServicesPage() {
  return (
    <>
      <Link
        to="/crm/settings"
        className="md:hidden flex gap-2 items-center text-muted-foreground mb-6"
      >
        <ChevronLeftIcon className="size-5" />
        Settings
      </Link>
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
    </>
  );
}
