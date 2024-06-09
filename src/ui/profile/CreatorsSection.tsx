import { TimestampedDatum } from "@maestro-org/typescript-sdk";
import { Asset, AssetExtended, UTxO } from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";
import { CourseOnChainInstance } from "@prisma/client";
import { use, useEffect, useState } from "react";
import AcceptDenyAssignment from "~/components/transactions/acceptDenyAssignment/acceptDenyAssignment";
import { Button } from "~/components/ui/button";
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
            datum = await maestroClient.datum.lookupDatum(
              utxo.output.dataHash,
            );
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
    <div>
      <h1>Creators Section</h1>
      {courseCreatorToken && (
        <pre>{JSON.stringify(courseCreatorToken, null, 4)}</pre>
      )}
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
    </div>
  );
}
