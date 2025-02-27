// import Parklot from "./parklot";

import { Card, CardContent } from "@/components/ui/card";
import DateTime from "./_components/date-time";
import StatusService from "./_components/status-service";
import { Separator } from "@/components/ui/separator";
import Addresses from "./_components/addresses";
import PageFooter from "./_components/page-footer";
import Notes from "./_components/notes";
import Details from "./_components/details";
import ExtraServices from "./_components/extra-services";

export default function RequestTab() {
  return (
    <div className="bg-muted">
      {/* <Parklot /> */}
      <DateTime />
      <StatusService />
      <div className="grid grid-cols-1 gap-6 px-2 md:grid-cols-3 md:px-4">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="space-y-6 p-4">
              <Addresses />
              <Separator />
              <Notes />
              <Separator />
              <Details />
            </CardContent>
          </Card>
        </div>
        <div>
          <ExtraServices />
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
