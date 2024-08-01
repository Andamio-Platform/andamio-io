import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";
import { api } from "~/utils/api";

// TODO: Build a user journey from first login to Course Creator status
export default function AddCreatorPage() {
  const { data: sessionData } = useSession();

  const { mutate: creatorCreate } = api.creator.create.useMutation({
    onSuccess: () => {
      toast.success("Ok, you are a Creator!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors;
      if (errorMessage) {
        toast.error("Cannot add creator");
      } else {
        toast.error("Creator ID taken. Please try again.");
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

  return (
    <StudioLayout>
      <h1>Add Creator</h1>
      {sessionData && sessionData.user.creatorId ? (
        <Link href="/studio">
          You&apos;re a Course Creator - go build a Course!
        </Link>
      ) : (
        <Button onClick={onEnableCreator}>Be a Course Creator</Button>
      )}
    </StudioLayout>
  );
}
