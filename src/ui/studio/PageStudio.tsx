import { useState } from "react";
import StudioHeader from "./components/StudioHeader";
import ListCourses from "./components/ListCourses";
import DialogCourse from "./components/dialogs/DialogCourse";
import StudioLayout from "./components/layout/StudioLayout";

export default function PageStudio() {
  return (
    <StudioLayout>
      <div className="flex flex-col gap-4">
        <StudioHeader />
        <ListCourses />
      </div>
    </StudioLayout>
  );
}
