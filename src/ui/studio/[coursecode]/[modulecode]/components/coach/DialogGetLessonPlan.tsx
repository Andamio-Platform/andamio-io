import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import axios from "axios";
import { ModuleSLT } from "~/types/db";
import { useCourseStore } from "~/lib/zustand/course";
import { Loader2 } from "lucide-react";

export function DialogGetLessonPlan({
  open,
  setOpen,
  slt,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  slt: ModuleSLT;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<undefined | string>(
    `1. When assembling a crew, you combine agents with complementary roles and tools, assign tasks, and select a process that dictates their execution order and interaction.\n2.Crews can utilize memory (short-term, long-term, and entity memory) to enhance their execution and learning over time. This feature allows crews to store and recall execution memories, aiding in decision-making and task execution strategies.\n3. After the crew execution, you can access the usage_metrics attribute to view the language model (LLM) usage metrics for all tasks executed by the crew. This provides insights into operational efficiency and areas for improvement.`,
  );
  const setUpdateLessonEdit = useCourseStore(
    (state) => state.setUpdateLessonEdit,
  );

  async function fetchLessonPlan() {
    setLoading(true);
    const resLessonPlan = await axios.post(`/api/ai/get-lesson-plan`, {
      slt: slt.sltText,
    });
    // console.log("resLessonPlan", resLessonPlan.data);
    setResult(resLessonPlan.data.data.final_output);
    setLoading(false);
  }

  async function addToLesson() {
    if (result) {
      const toUpdateLessonEditor = [];

      for (const _newData of result.split("\n")) {
        const _newRow = {
          attrs: {
            level: 1,
          },
          content: [{ type: "text", text: _newData }],
          type: "heading",
        };
        toUpdateLessonEditor.push(_newRow);
      }

      setUpdateLessonEdit(toUpdateLessonEditor);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get Lesson Plan</DialogTitle>
          <DialogDescription>{slt.sltText}</DialogDescription>
        </DialogHeader>

        {result &&
          result.split("\n").map((line, index) => <p key={index}>{line}</p>)}

        <DialogFooter>
          <Button onClick={() => addToLesson()} disabled={loading}>
            Add to lesson
          </Button>
          {result ? (
            <Button onClick={() => addToLesson()} disabled={loading}>
              Add to lesson
            </Button>
          ) : (
            <Button onClick={() => fetchLessonPlan()} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get lesson plan
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
