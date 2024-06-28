import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { api } from "~/utils/api";
import GetStartedButton from "../landing/ViewCoursesButton";
import CTA from "../landing/CTA";

export default function AboutUser() {
  const ctx = api.useUtils();
  const { data: sessionData, update: updateSession } = useSession();

  // ok make some buttons so that user can become
  // then test it
  // then nuke the db

  // any time left? ok look at UI components...

  const { mutate: learnerCreate, isLoading: isLoadingLearner } =
    api.learner.create.useMutation({
      onSuccess: (data) => {
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

  if (!sessionData)
    return <>Log into Andamio with Discord to access account features</>;

  return (
    <div className=" mx-auto max-w-7xl border-t border-accent-foreground/50 py-3">
      <h2 className="my-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        How to Get Started with Andamio
      </h2>
      <div className="mx-auto my-3 w-3/4 lg:w-2/5 ">
        <div className="my-12 grid grid-cols-1 gap-12">
          <Card size="md" className="border-none bg-blue-200 shadow-xl">
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
                <p className="prose mx-auto mt-6 text-left text-lg leading-8">
                  You are currently logged in with Discord account:{" "}
                  {sessionData.user.name}
                </p>
              ) : (
                <GetStartedButton />
              )}
            </CardContent>
          </Card>
          <Card size="md" className="border-none bg-blue-200 shadow-xl">
            <CardHeader>
              <h2 className="text-2xl font-bold">
                Step 2: View Getting Started With Andamio Course
              </h2>
            </CardHeader>
            <CardContent>
              <div>
                {sessionData.user.learnerId ? (
                  <>
                    <p className="prose mx-auto mt-6 text-left text-lg leading-8">
                      The Andamio &quot;Getting Started&quot; guide is published
                      in the format of an Andamio Course. Taking this course is
                      the best way to learn about Andamio.
                    </p>
                    <p className="prose mx-auto mt-6 text-left text-lg font-bold leading-8 underline">
                      <Link href="/course/andamio101">
                        Course: Getting Started With Andamio
                      </Link>
                    </p>
                  </>
                ) : (
                  <Button onClick={onEnableLearner}>Enable Learner Role</Button>
                )}
              </div>
            </CardContent>
          </Card>
          {/* TODO: All new accounts must be learners */}
          <Card size="md" className="border-none bg-blue-200 shadow-xl">
            <CardHeader>
              <h2 className="text-2xl font-bold">
                Step 3: Enable Course Creation
              </h2>
            </CardHeader>
            <CardContent>
              {sessionData.user.creatorId ? (
                <>
                  <p className="prose mx-auto mt-6 text-left text-lg">
                    You are a Course Creator on Andamio!
                  </p>
                  <p className="prose mx-auto mt-6 text-left text-lg">
                    <Link href="/studio">View your Dashboard</Link>
                  </p>
                </>
              ) : (
                // <CTA />
                <>
                  <p className="prose mx-auto my-6 text-left text-lg">
                    If you would like to join us in this early stage of the Andamio story, we
                    would like to hear from you!
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
