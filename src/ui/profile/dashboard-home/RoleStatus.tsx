import { BoxIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export default function RoleStatus({
  roleName,
  userHasRole,
  roleDetail,
  roleInfoUrl,
}: {
  roleName: string;
  userHasRole: boolean;
  roleDetail?: string;
  roleInfoUrl?: string;
}) {
  return (
    <Card intent="roleStatus" size="md">
      <div className="flex items-center justify-center">
        {userHasRole ? <CheckCircledIcon /> : <BoxIcon />}
      </div>
      <div className="flex w-full flex-row justify-between">
        <div className="text-sm font-semibold">
          {roleName}
          {!!roleDetail && `: ${roleDetail}`}
        </div>
        {roleInfoUrl && (
          <Link href={roleInfoUrl} className="">
            <Button size="sm" intent="learnMore">
              ?
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
