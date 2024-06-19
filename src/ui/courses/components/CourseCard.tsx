import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Course, CoursePublic } from "~/types/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import MintLocalState from "~/components/transactions/mintLocalState/mintLocalState";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { useSession } from "next-auth/react";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import checkIfEnrolled from "../utils/checkIfEnrolled";

export default function CourseCard({
  course,
  enabled,
}: {
  course: CoursePublic;
  enabled: boolean;
}) {
  const { connected, wallet } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const { data: sessionData } = useSession();
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Next step 2024-06-12: Show learner enrollment status from course page

  useEffect(() => {
    (async () => {
      if (connected &&  course.onchainInstance[0]) {
        console.log("check")
        const isEnrolled = await checkIfEnrolled(
          course.onchainInstance[0].CourseCreatorNFTPolicyID,
          wallet,
        );
        setIsEnrolled(isEnrolled);
      }
    })();
  }, [wallet]);

  if (!course) return;
  return (
    <Card
      key={course.id}
      className="border-none bg-blue-200 shadow-xl"
      size="md"
    >
      <CardHeader className="relative m-0 p-0">
        <img
          className="aspect-[3/2] w-full rounded-t-md object-cover"
          src={
            course.imageUrl ? course.imageUrl : "/images/sample-covers/1.jpg"
          }
          alt=""
        />
        <div className="absolute bottom-2 right-2">
          {course.accessTier == "FREE" && <Badge variant="free">Free</Badge>}
          {course.accessTier == "FEATURED" && (
            <Badge variant="free">Featured</Badge>
          )}
          {course.accessTier == "PREMIUM" && (
            <Badge variant="premium">Premium</Badge>
          )}
          {course.accessTier == "NETWORK" && (
            <Badge variant="network">Network Only</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="mt-5">
        <h3 className="text-lg font-semibold leading-8 tracking-tight text-foreground">
          {course.title}
        </h3>
        <p className="prose text-sm">
          {course.description && truncateString(course.description, 100)}
        </p>
      </CardContent>
      <CardFooter className="flex flex-row gap-5">
        <Link href={`/course/${course.courseCode}`}>
          <Button>View Course</Button>
        </Link>

        {course.onchainInstance.length !== 0 && (
          <Dialog>
            <DialogTrigger>
              <Button>Enroll</Button>
            </DialogTrigger>
            <DialogContent className="flex items-center justify-center justify-items-center">
              <DialogHeader>
                <DialogTitle className="py-4">
                  Thinking of taking this course?
                </DialogTitle>
                <DialogDescription>
                  <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-[350px] space-y-2 py-4"
                  >
                    <div className="flex items-center justify-start">
                      <CollapsibleTrigger asChild>
                        <Button>
                          {isOpen ? <>Back</> : <>Enroll On-Chain</>}
                        </Button>
                      </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent className="space-y-2">
                      <>
                        {!connected ? (
                          <CardanoWallet />
                        ) : (
                          <>
                            {isEnrolled ? (
                              <div>Already Enrolled</div>
                            ) : (
                              <MintLocalState courseCode={course.courseCode} />
                            )}
                          </>
                        )}
                      </>
                    </CollapsibleContent>
                  </Collapsible>
                </DialogDescription>
                <DialogFooter className="py-4 text-xs sm:justify-start">
                  <Link href={`/course/${course.courseCode}`}>
                    I&apos;ll do it after taking a look inside first
                  </Link>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}

function CourseDetails({ course }: { course: CoursePublic }) {
  return <></>;
}

function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + "...";
  }
}
