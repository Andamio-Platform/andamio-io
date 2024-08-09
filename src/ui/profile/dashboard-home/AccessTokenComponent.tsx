import Link from "next/link";
import { useState } from "react";

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

import Loading from "~/components/loading";
import MintAccessToken from "~/components/transactions/MintAccessToken";

import { api } from "~/utils/api";

import { useSession } from "next-auth/react";
import { BellIcon, BookOpenText, GlobeLockIcon } from "lucide-react";

export default function AccessTokenComponent() {
  const { data: sessionData } = useSession();
  const { data: user, isLoading: isLoadingUser } =
    api.user.getUserById.useQuery({
      id: sessionData?.user.id ? sessionData?.user.id : "",
    });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      {isLoadingUser ? (
        <Loading />
      ) : (
        <Card className="mx-auto w-11/12 lg:w-2/3">
          <CardHeader className="mb-10 text-center">
            <CardTitle className="my-5 font-beckman text-4xl">
              Connect to the Andamio Network
            </CardTitle>
            <CardDescription className="mx-auto w-11/12 md:w-1/2">
              Your Discord Account is connected to the Andamio Platform. To
              access the full features of Andamio, you can also connect a
              Cardano wallet and mint an Andamio Token.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Link href="/course/andamio101">
                <div className="flex w-full flex-col items-center justify-center rounded-md border border-foreground bg-primary p-5 text-primary-foreground hover:bg-primary/90">
                  <BookOpenText width={50} height={50} className="mb-5" />
                  <p>Learn About Andamio Network</p>
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
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3"></CardFooter>
        </Card>
      )}
    </div>
  );
}
