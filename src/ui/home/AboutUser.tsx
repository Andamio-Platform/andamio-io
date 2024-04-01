import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { api } from "~/utils/api";

export default function AboutUser() {
  const ctx = api.useUtils();
  const { data: sessionData, update: updateSession } = useSession();

  // ok make some buttons so that user can become
  // then test it
  // then nuke the db

  // any time left? ok look at UI components...

  const { mutate: creatorCreate, isLoading: isLoadingCreator } =
    api.creator.create.useMutation({
      onSuccess: (data) => {
        toast.success("Ok, you are a Creator!");
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

  function onEnableCreator() {
    if (sessionData) {
      creatorCreate({
        userId: sessionData.user.id,
      });
    }
  }

  function onEnableLearner() {
    if (sessionData) {
      learnerCreate({
        userId: sessionData.user.id,
      });
    }
  }

  if (!sessionData) return <>NO SESSION DATA</>;

  return (
    <div className="mx-auto my-10 grid w-3/4 grid-cols-3 gap-3">
      <Card className="flex items-center justify-center h-24 bg-primary text-primary-foreground">
        {sessionData.user.creatorId ? (
          <Link href="/studio">YOU ARE A CREATOR - GO BUILD A COURSE</Link>
        ) : (
          <Button onClick={onEnableCreator}>Be A Creator</Button>
        )}
      </Card>
      <Card className="flex items-center justify-center h-24 bg-primary text-primary-foreground">
        {sessionData.user.learnerId ? (
          <p className="mx-5">YOU ARE A LEARNER - GO LEARN (BELOW FOR NOW)</p>
        ) : (
          <Button onClick={onEnableLearner}>Be A Learner</Button>
        )}
      </Card>
      <Card className="flex items-center justify-center h-24 bg-primary text-primary-foreground">User Name: {sessionData.user.name}</Card>
    </div>
  );
}
