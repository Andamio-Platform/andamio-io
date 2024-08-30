import Link from "next/link";
import { useState } from "react";

import { Card } from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

import { BookOpenText, GlobeLockIcon } from "lucide-react";
import MintAccessTokenDialog from "~/components/transactions/dialogs/MintAccessTokenDialog";

export default function AccessTokenComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <Card className="">
        <h2 className="mb-3 text-lg font-bold">
          Connect to the Andamio Network
        </h2>
        <p className="mb-3">
          Your Discord Account is connected to the Andamio Platform. To access
          the full features of Andamio, you can also connect a Cardano wallet
          and mint an Andamio Token.
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Link href="/course/andamio101">
            <div className="flex w-full flex-row items-center gap-8 rounded-md border border-foreground bg-primary px-8 py-2 text-primary-foreground">
              <BookOpenText width={35} height={35} className="" />
              <p>Learn About Andamio Network</p>
            </div>
          </Link>
          <div>
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
              <CollapsibleTrigger asChild>
                <div className="flex w-full flex-row items-center gap-8 rounded-md border border-foreground bg-primary px-8 py-2 text-primary-foreground">
                  <GlobeLockIcon width={35} height={35} className="" />
                  <p>{isOpen ? <>close</> : <>Get Token</>}</p>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-2 py-3">
                <MintAccessTokenDialog />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </Card>
    </div>
  );
}
