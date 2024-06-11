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

interface Datum {
  constructor: number;
  fields: (
    | {
        bytes: string;
      }
    | {
        constructor: number;
        fields: Datum[];
      }
    | {
        constructor: number;
        fields: {
          constructor: number;
          fields: {
            constructor: number;
            fields: {
              constructor: number;
              fields: {
                bytes: string;
              }[];
            }[];
          }[];
        }[];
      }
    | {
        constructor: number;
        fields: {
          constructor: number;
          fields: {
            constructor: number;
            fields: {
              constructor: number;
              fields: {
                constructor: number;
                fields: {
                  constructor: number;
                  fields: {
                    bytes: string;
                  }[];
                }[];
              }[];
            }[];
          }[];
        }[];
      }
    | {
        constructor: number;
        fields: {
          constructor: number;
          fields: {
            constructor: number;
            fields: {
              constructor: number;
              fields: {
                constructor: number;
                fields: {
                  constructor: number;
                  fields: {
                    constructor: number;
                    fields: {
                      bytes: string;
                    }[];
                  }[];
                }[];
              }[];
            }[];
          }[];
        }[];
      }
    | {
        constructor: number;
        fields: (string[] | { bytes: string })[];
      }
  )[];
}

export default function CreatorsSection() {
  const [userAssets, setUserAssets] = useState<AssetExtended[]>([]);
  const { wallet } = useWallet();
  const { AllCoursesOnchain, isLoadingAllCoursesOnchain } =
    useAllCoursesOnchain();
  const [courseCreatorToken, setCourseCreatorToken] = useState<
    AssetExtended | undefined
  >(undefined);
  const [course, setCourse] = useState<CourseOnChainInstance | undefined>(
    undefined,
  );
  const [Assignments, setAssignments] = useState<
    {
      alias: string;
      assignmentCode: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchUserAssets = async () => {
      const userAssets = await wallet.getAssets();
      setUserAssets(userAssets);
    };
    if (wallet) {
      void fetchUserAssets();
    }

    const findCreatorToken = async () => {
      const courseCreatorToken = userAssets.find((asset) => {
        return AllCoursesOnchain?.some((course: CourseOnChainInstance) => {
          if (asset.policyId === course.CourseCreatorNFTPolicyID) {
            setCourse(course);
            return true;
          }
        });
      });
      setCourseCreatorToken(courseCreatorToken);
      if (course) {
        console.log("course");
        const assignmentUTxOs = await maestro.fetchAddressUTxOs(
          course.AssignmentValidatorAddress,
        );
        for (const utxo of assignmentUTxOs) {
          let asset;
          let datum: TimestampedDatum;
          let datumJSON: Datum;
          try {
            asset = utxo.output.amount.find((item: Asset) =>
              item.unit.includes(course.LocalStatePolicyID),
            );
            datum = await maestroClient.datum.lookupDatum(utxo.output.dataHash);
            datumJSON = datum.data.json as Datum;
          } catch (error) {
            throw error;
          }
          const assignmentCodeJSON = datumJSON!.fields[0] as { bytes: string };
          setAssignments((assignments) => [
            ...assignments,
            {
              alias: Buffer.from(asset!.unit.substring(56), "hex").toString(),
              assignmentCode: Buffer.from(
                assignmentCodeJSON.bytes,
                "hex",
              ).toString(),
            },
          ]);
        }
      }
    };

    if (userAssets.length > 0 && AllCoursesOnchain) {
      void findCreatorToken();
    }
  }, [wallet, isLoadingAllCoursesOnchain, course]);

  return (
    <>
      <Card className="col-span-3">
        <div className="text-center">
          <h2 className="py-5 text-xl font-bold">Course Creator Token</h2>
          <p className="pt-5 text-lg">
            <b>{courseCreatorToken?.assetName}</b>
          </p>
          <p className="text-sm font-light">COURSE CREATOR TOKEN</p>
        </div>
      </Card>
      <Card className="col-span-6 row-span-2" size="md">
        <CardHeader className="flex flex-row items-center gap-2 rounded-t-md bg-indigo-200 p-2">
          <DocumentCheckIcon width={"35px"} height={"35px"} />
          <h2 className="text-2xl font-semibold">
            Approve Student Assignments
          </h2>
        </CardHeader>
        <CardContent>
          {Assignments.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Alias</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Accept</TableHead>
                  <TableHead>Deny</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Assignments.map((assignment, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      {assignment.alias}
                    </TableCell>
                    <TableCell>{assignment.assignmentCode}</TableCell>
                    <TableCell>
                      <AcceptDenyAssignment
                        courseCode={course!.courseCode}
                        learnerAlias={assignment.alias}
                        decision="accept"
                        assignmentCode={assignment.assignmentCode}
                      />
                    </TableCell>
                    <TableCell>
                      <AcceptDenyAssignment
                        courseCode={course!.courseCode}
                        learnerAlias={assignment.alias}
                        decision="deny"
                        assignmentCode={assignment.assignmentCode}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
