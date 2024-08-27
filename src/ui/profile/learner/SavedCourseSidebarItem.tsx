import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { type LearnerSavedCourse } from "~/types/db";
export default function SavedCourseSidebarItem({
  savedCourse,
  selectedCourseCode,
  setSelectedCourseCode,
  setSelectedCoursePolicyId,
  key,
}: {
  savedCourse: LearnerSavedCourse;
  selectedCourseCode: string;
  setSelectedCourseCode: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setSelectedCoursePolicyId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  key: number;
}) {
  const [color, setColor] = useState<string>("background");
  useEffect(() => {
    if (selectedCourseCode === savedCourse.courseCode) {
      setColor("accent");
    } else {
      setColor("background");
    }
  }, [selectedCourseCode, savedCourse]);

  const handleClick = () => {
    setSelectedCourseCode(savedCourse.courseCode);
    setSelectedCoursePolicyId(undefined);
  };
  return (
    <Card key={key} intent="sideNav" className={`bg-${color}`}>
      <h2 className="text-sm font-semibold">{savedCourse?.title}</h2>
      <div className="flex flex-row gap-2">
        <Button size="sm" intent="learnMore" onClick={handleClick}>
          details
        </Button>
      </div>
    </Card>
  );
}
