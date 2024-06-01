import Link from "next/link";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

import { useRouter } from "next/router";
import Loading from "~/components/loading";
import MintAccessToken from "~/components/transactions/mintAccessToken/mintAccessToken";

import { api } from "~/utils/api";

import { useSession } from "next-auth/react";
import { BellIcon, BookOpenText, GlobeLockIcon } from "lucide-react";

export default function JoinAndamioNetwork() {
  const router = useRouter();

  const { data: sessionData } = useSession();
  const { data: user, isLoading: isLoadingUser } =
    api.user.getUserById.useQuery({
      id: sessionData?.user.id ? sessionData?.user.id : "",
    });

  if (user?.hasMintedAccessToken) {
    void router.push("/home");
  }

  // TO-DO: If access-token is available in user's wallet, populate user.hasMintedAccessToken and redirect to /home

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center">
      {isLoadingUser || user?.hasMintedAccessToken ? (
        <Loading />
      ) : (
        <Card className="mx-auto w-11/12 lg:w-2/3">
          <CardHeader className="text-center mb-10">
            <CardTitle className="text-4xl my-5">Connect to the Andamio Network</CardTitle>
            <CardDescription className="w-11/12 md:w-1/2 mx-auto">
              Your Discord Account is connected to the Andamio Platform. To access the full
              features of Andamio, you can also connect a Cardano wallet and
              mint an Andamio Token.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <Link href="/course/andamio101">
                <div className="flex w-full flex-col items-center justify-center rounded-md border border-foreground bg-primary p-5 text-primary-foreground hover:bg-primary/90">
                  <BookOpenText width={50} height={50} className="mb-5" />
                  <p>Tell me more</p>
                </div>
              </Link>
              <div>
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className=""
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex w-full flex-col items-center justify-center rounded-md border border-foreground bg-primary p-5 text-primary-foreground hover:bg-primary/90">
                      <GlobeLockIcon width={50} height={50} className="mb-5" />
                      <p>{isOpen ? <>Back</> : <>Get Token</>}</p>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-2">
                    <MintAccessToken />
                  </CollapsibleContent>
                </Collapsible>
              </div>
              <Link href="/home" className="text-start text-sm">
                <div className="flex w-full flex-col items-center justify-center rounded-md border border-foreground bg-primary p-5 text-primary-foreground hover:bg-primary/90">
                  <BellIcon width={50} height={50} className="mb-5" />

                  <p>I&apos;ll get it later</p>
                </div>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3"></CardFooter>
        </Card>
      )}
    </div>
  );
}
