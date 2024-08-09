import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { api } from "~/utils/api";
import GetStartedButton from "../landing/ViewCoursesButton";
import { BoxIcon, CheckCircledIcon } from "@radix-ui/react-icons";

export default function AboutUser() {
  const { data: sessionData } = useSession();

  // ok make some buttons so that user can become
  // then test it
  // then nuke the db

  // any time left? ok look at UI components...

  const { mutate: learnerCreate } = api.learner.create.useMutation({
    onSuccess: () => {
      toast.success("Ok, you are a Learner!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors;
      if (errorMessage) {
        toast.error("Some SLT inputs are missing or invalid");
      } else {
        toast.error("SLT ID taken. Please try again.");
      }
    },
  });

  function onEnableLearner() {
    if (sessionData) {
      learnerCreate({
        userId: sessionData.user.id,
      });
    }
  }

  return (
    <div className="mx-auto w-3/4 pt-32">
      <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Getting Started with Andamio
      </h2>
      <div className="mx-auto my-3 w-full">
        <div className="my-12 grid grid-cols-1 gap-12">
          <Card size="md" className="border-none bg-accent shadow-xl">
            <CardHeader>
              <h2 className="text-2xl font-bold">
                Step 1: Log into Andamio with Discord
              </h2>
            </CardHeader>
            <CardContent>
              <p className="prose mx-auto mt-6 text-left text-lg leading-8">
                When you create an Andamio account, you will have the default
                role of <span className="font-bold">Learner</span> on the
                Andamio Platform.
              </p>

              {sessionData?.user.name ? (
                <div className="mt-10 grid grid-cols-3 gap-3">
                  <div className="flex w-full items-center justify-center">
                    <CheckCircledIcon className="h-[50px] w-[50px] rounded-full bg-green-300" />
                  </div>
                  <div className="col-span-2">
                    <p className="prose mx-auto text-left text-lg leading-8">
                      You are currently logged in with Discord account:{" "}
                      {sessionData.user.name}
                    </p>
                  </div>
                </div>
              ) : (
                <GetStartedButton />
              )}
            </CardContent>
          </Card>
          <Card size="md" className="border-none bg-accent shadow-xl">
            <CardHeader>
              <h2 className="text-2xl font-bold">
                Step 2: View Getting Started With Andamio Course
              </h2>
            </CardHeader>
            <CardContent>
              <div>
                {sessionData?.user.learnerId ? (
                  <>
                    <p className="prose mx-auto mt-6 text-left text-lg leading-8">
                      The Andamio &quot;Getting Started&quot; guide is published
                      in the format of an Andamio Course. Taking this course is
                      the best way to learn about Andamio.
                    </p>
                    <div className="mt-10 grid grid-cols-3 gap-3">
                      <div className="flex w-full items-center justify-center">
                        <BoxIcon className="h-[50px] w-[50px] rounded-md bg-secondary" />
                      </div>
                      <div className="col-span-2">
                        <p className="prose mx-auto text-left text-lg font-bold leading-8 underline">
                          <Link href="/course/andamio101">
                            Course: Getting Started With Andamio
                          </Link>
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <Button onClick={onEnableLearner}>Enable Learner Role</Button>
                )}
              </div>
            </CardContent>
          </Card>
          {/* TODO: All new accounts must be learners */}
          <Card size="md" className="border-none bg-accent shadow-xl">
            <CardHeader>
              <h2 className="text-2xl font-bold">
                Step 3: Enable Course Creation
              </h2>
            </CardHeader>
            <CardContent>
              {sessionData?.user.creatorId ? (
                <>
                  <p className="prose mx-auto mt-6 text-left text-lg">
                    <Link href="/dashboard">View your Dashboard</Link>
                  </p>
                  <div className="mt-10 grid grid-cols-3 gap-3">
                    <div className="flex w-full items-center justify-center">
                      <CheckCircledIcon className="h-[50px] w-[50px] rounded-full bg-green-300" />
                    </div>
                    <div className="col-span-2">
                      <p className="prose mx-auto text-left text-lg leading-8">
                        You are a Course Creator on Andamio!
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                // <CTA />
                <>
                  <p className="prose mx-auto my-6 text-left text-lg">
                    If you would like to join us in this early stage of the
                    Andamio story, we would like to hear from you!
                  </p>
                  <Link href="/contact">
                    <Button>Get in Touch</Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>
          {/* TODO: Show pathway to becoming a Course Creator -- see Sprint 2024.11 task */}
        </div>
      </div>
    </div>
  );
}
