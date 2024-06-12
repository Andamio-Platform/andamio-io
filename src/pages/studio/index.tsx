import { useSession } from "next-auth/react";
import Loading from "~/components/loading";
import PageStudio from "~/ui/studio/PageStudio";
import ContactSales from "~/ui/studio/ContactSales";
import Metatags from "~/components/site/metatags";

export default function Page() {
  const { data: sessionData, status } = useSession();

  return (
    <>
      <Metatags title="Studio" />
      {status === "loading" && (
        <div className="mx-auto mt-32 min-h-[50vh] max-w-7xl px-6 sm:mt-56 lg:px-8">
          <Loading />
        </div>
      )}
      {sessionData && sessionData.user.creatorId && <PageStudio />}
      {sessionData && !sessionData.user.creatorId && <ContactSales />}
    </>
  );
}
