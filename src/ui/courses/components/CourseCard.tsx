import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { type CoursePublic } from "~/types/db";
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
import { CardanoWallet, useWallet } from "@meshsdk/react";
import checkIfEnrolled from "../utils/checkIfEnrolled";
import Markdown from "react-markdown";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

export default function CourseCard({ course }: { course: CoursePublic }) {
  const ctx = api.useUtils();
  const { data: sessionData, update: updateSessionData } = useSession();
  const { connected, wallet } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const { mutate: saveCourseForLearner } =
    api.learner.saveCourseForLearner.useMutation({
      onSuccess: () => {
        void ctx.learner.getSavedCoursesByLearner.invalidate();
        void updateSessionData();
        toast.success("Course saved");
      },
    });
  useEffect(() => {
    const check = async () => {
      if (connected && course.onchainInstance[0]) {
        console.log("check");
        const isEnrolled = await checkIfEnrolled(
          course.onchainInstance[0].CourseCreatorNFTPolicyID,
          wallet,
        );
        setIsEnrolled(isEnrolled);
      }
    };
    void check();
  }, [wallet, connected, course.onchainInstance]);

  const handleSaveCourse = () => {
    if (sessionData) {
      saveCourseForLearner({
        learnerId: sessionData.user.learnerId,
        courseId: course.id,
      });
    }
  };

  if (!course) return;
  return (
    <Card
      key={course.id}
      className="border-none bg-blue-200 shadow-xl"
      size="md"
    >
      <CardHeader className="relative m-0 p-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={600}
          height={400}
          className="aspect-[3/2] w-full rounded-t-md object-cover"
          src={
            course.imageUrl ? course.imageUrl : "/images/sample-covers/1.jpg"
          }
          alt=""
        />
        <div className="absolute bottom-2 right-2">
          {course.accessTier == "FREE" && <Badge variant="free">Free</Badge>}
          {/* {course.accessTier == "FEATURED" && (
            <Badge variant="free">Featured</Badge>
          )} */}
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
        <p className="prose max-h-16 overflow-hidden text-sm">
          {course.description && <Markdown>{course.description}</Markdown>}
        </p>
      </CardContent>
      <CardFooter className="flex flex-row gap-5">
        <Link href={`/course/${course.courseCode}`}>
          <Button>View Course</Button>
        </Link>
        <Button onClick={handleSaveCourse}>Save Course</Button>

        {course.onchainInstance.length !== 0 && (
          <>
            {!isEnrolled ? (
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
                                  <div>Currently Enrolled</div>
                                ) : (
                                  <MintLocalState
                                    courseCode={course.courseCode}
                                  />
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
            ) : (
              <Link href={`/course/${course.courseCode}`}>
                <Button className="bg-success text-white">
                  Currently Enrolled
                </Button>
              </Link>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
