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

  if (!sessionData) return <>NO SESSION DATA</>;

  return (
    <div className="mx-auto mt-24 grid w-3/4 grid-cols-3 gap-3 lg:w-1/2">
      <Card className="flex h-12 items-center justify-center bg-primary text-primary-foreground">
        User Name: {sessionData.user.name}
      </Card>
      <Card className="flex h-12 items-center justify-center bg-primary text-primary-foreground">
        {sessionData.user.learnerId ? (
          <p className="mx-5">YOU ARE A LEARNER</p>
        ) : (
          <Button onClick={onEnableLearner}>Be A Learner</Button>
        )}
      </Card>
      <Card className="flex h-12 items-center justify-center bg-primary text-primary-foreground">
        {sessionData.user.creatorId && (
          <Link href="/studio">YOU ARE A CREATOR</Link>
        )}
      </Card>
    </div>
  );
}
