import { useSession } from "next-auth/react";
import Loading from "~/components/loading";
import PageStudio from "~/ui/studio/PageStudio";
import ContactSales from "~/ui/studio/ContactSales";

export default function Page() {
  const { data: sessionData, status } = useSession();

  return (
    <>
      {status === "loading" && <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8 min-h-[50vh]"><Loading /></div>}
      {sessionData && sessionData.user.creatorId && <PageStudio />}
      {sessionData && !sessionData.user.creatorId && <ContactSales />}
    </>
  );
}
