import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import useCourseByPolicyId from "~/hooks/onchain/useCourseByPolicyId";
export default function CurrentCourseSidebarItem({
  lsCs,
  selectedCourse,
  setSelectedCourse,
  key,
}: {
  lsCs: string;
  selectedCourse: string | undefined;
  setSelectedCourse: React.Dispatch<React.SetStateAction<string | undefined>>;
  key: number;
}) {
  const { courseInfo } = useCourseByPolicyId(lsCs);
  const [color, setColor] = useState<string>("background");
  useEffect(() => {
    if (selectedCourse === lsCs) {
      setColor("accent");
    } else {
      setColor("background");
    }
  }, [selectedCourse, lsCs]);
  return (
    <Card key={key} intent="sideNav" className={`bg-${color}`}>
      <h2>{courseInfo?.title}</h2>
      <div className="flex flex-row gap-2">
        <p>3/10</p>
        <Button onClick={() => setSelectedCourse(lsCs)}>VIEW</Button>
      </div>
    </Card>
  );
}
