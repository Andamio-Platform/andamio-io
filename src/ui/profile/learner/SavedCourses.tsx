import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import SavedCourseSidebarItem from "./SavedCourseSidebarItem";
import useLearnerSavedCourses from "~/hooks/course/useLearnerSavedCourses";

export default function SavedCourses({
  selectedCourseCode,
  setSelectedCourseCode,
  setSelectedCoursePolicyId,
}: {
  selectedCourseCode: string;
  setSelectedCourseCode: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setSelectedCoursePolicyId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}) {
  const { savedCourses } = useLearnerSavedCourses();
  return (
    <Accordion
      type="single"
      collapsible
      disabled={!savedCourses}
      defaultValue="completed"
    >
      <AccordionItem value="completed">
        <AccordionTrigger className="pr-5">
          <h2 className="p-2 text-lg font-bold">Saved For Later</h2>
        </AccordionTrigger>
        <AccordionContent>
          {savedCourses?.map((t, i) => (
            <SavedCourseSidebarItem
              key={i}
              savedCourse={t}
              selectedCourseCode={selectedCourseCode ?? ""}
              setSelectedCourseCode={setSelectedCourseCode}
              setSelectedCoursePolicyId={setSelectedCoursePolicyId}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
