import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Metatags from "~/components/site/metatags";
import PageHome from "~/ui/home/PageHome";

export default function Page() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (!sessionData) {
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);
  return (
    <>
      <Metatags />
      <PageHome />
    </>
  );
}
