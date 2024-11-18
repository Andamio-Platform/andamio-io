import { useSession } from "next-auth/react";
import Loading from "~/components/loading";
import PageStudio from "~/ui/studio/PageStudio";
import ContactSales from "~/ui/studio/ContactSales";
import Metatags from "~/components/site/metatags";
import DesktopOnlyLayout from "~/components/DesktopOnlyLayout";

export default function Page() {
  const { data: sessionData, status } = useSession();

  if (!sessionData || !sessionData.user.creatorId) return "No access";

  console.log("Accessing Courses", sessionData.user.creatorId);

  if (sessionData.user.creatorId)
    return (
      <DesktopOnlyLayout>
        <Metatags title="Studio" />
        {sessionData && sessionData.user.creatorId && <PageStudio />}
        {sessionData && !sessionData.user.creatorId && <ContactSales />}
      </DesktopOnlyLayout>
    );
}
