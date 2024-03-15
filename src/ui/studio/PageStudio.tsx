import { useState } from "react";
import StudioHeader from "./components/StudioHeader";
import ListCourses from "./components/ListCourses";
import DialogCourse from "./components/dialogs/DialogCourse";
import StudioLayout from "./components/layout/StudioLayout";
import CourseFileUploadTest from "./components/CourseFileUploadTest";

export default function PageStudio() {
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);

  return (
    <StudioLayout>
      <div className="flex flex-col gap-4">
        <StudioHeader setCourseDialogOpen={setCourseDialogOpen} />
        <ListCourses />
      </div>

      <DialogCourse
        courseDialogOpen={courseDialogOpen}
        setCourseDialogOpen={setCourseDialogOpen}
      />

      <CourseFileUploadTest />
    </StudioLayout>
  );
}
