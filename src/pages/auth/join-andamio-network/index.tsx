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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center">
      {isLoadingUser || user?.hasMintedAccessToken ? (
        <Loading />
      ) : (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Join The Andamio Network</CardTitle>
            <CardDescription>
              Get a token that represents your membership in Andamio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-[350px] space-y-2"
              >
                <div className="flex items-center justify-center">
                  <CollapsibleTrigger asChild>
                    <Button>{isOpen ? <>Back</> : <>Get Token</>}</Button>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="space-y-2">
                  <MintAccessToken />
                </CollapsibleContent>
              </Collapsible>
            </CardFooter>
            {!isOpen && (
              <Link href="/home" className="text-start text-sm">
                I&apos;ll get it later
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
