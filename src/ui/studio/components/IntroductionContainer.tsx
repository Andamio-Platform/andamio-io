import Link from "next/link";
import { Card } from "~/components/ui/card";
import { Introduction } from "~/types/db";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useIntroduction from "~/hooks/useIntroduction";
import { Button } from "~/components/ui/button";

export default function IntroductionContainer({
  moduleId,
  courseCode,
  moduleCode,
}: {
  moduleId: string;
  courseCode: string;
  moduleCode: string;
}) {
  const ctx = api.useUtils();

  const [hasIntro, setHasIntro] = useState<boolean>(false);
  const { introduction } = useIntroduction(moduleId);

  useEffect(() => {
    if (introduction) {
      setHasIntro(true);
    }
  }, [introduction]);

  const { mutate: introCreate, isLoading: isLoadingIntroCreate } =
    api.introduction.create.useMutation({
      onSuccess: (data) => {
        toast.success("Module Introduction created!");
        setHasIntro(true);
        void ctx.module.getCourseModules.invalidate({
          courseCode: courseCode,
        });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Could not create introduction");
        } else {
          toast.error("Introduction ID taken. Please try again.");
        }
      },
    });

  function handleCreateIntroduction() {
    if (hasIntro) return;

    introCreate({
      moduleId: moduleId,
      title: "Introduction",
    });
  }

  return (
    <Card className="hover:secondary-foreground mx-auto my-5 flex w-11/12 flex-row justify-between rounded-md bg-primary px-10 py-3 text-primary-foreground">
      <div>Introduction</div>
      {hasIntro ? (
        <Link href={`/studio/${courseCode}/${moduleCode}/intro`}>
          Go to Intro
        </Link>
      ) : (
        <Button onClick={handleCreateIntroduction}>Create Intro</Button>
      )}
    </Card>
  );
}
