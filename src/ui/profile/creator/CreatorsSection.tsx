import { DocumentCheckIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { TimestampedDatum } from "@maestro-org/typescript-sdk";
import { Asset, AssetExtended, UTxO } from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";
import { CourseOnChainInstance } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { use, useEffect, useState } from "react";
import AcceptDenyAssignment from "~/components/transactions/acceptDenyAssignment/acceptDenyAssignment";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import maestro, { maestroClient } from "~/config/maestro";
import useAllCoursesOnchain from "~/hooks/useAllCoursesOnchain";
import useCreatorsCoursesPolicies from "../hooks/useCreatorsCoursesPolicies";
import CommittedAssignments from "./CommittedAssignments";

export default function CreatorsSection({
  accessTokenAlias,
}: {
  accessTokenAlias: string;
}) {
  const { data, isLoading, isError, error } =
    useCreatorsCoursesPolicies(accessTokenAlias);

  return (
    <div>
      {data &&
        data.map((c, i) => (
          <CommittedAssignments key={i} courseNftPolicy={c} />
        ))}
    </div>
  );
}
