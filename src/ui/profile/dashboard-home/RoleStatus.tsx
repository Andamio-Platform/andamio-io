import { BoxIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
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
      <div className="col-span-3">
        {roleName}
        {!!roleDetail && `: ${roleDetail}`}
      </div>
      {roleInfoUrl && (
        <Link href={roleInfoUrl} className="font-bold text-secondary">
          Learn More
        </Link>
      )}
    </Card>
  );
}
