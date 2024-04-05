import { useState } from "react";
import DialogCourse from "./dialogs/DialogCourse";

export default function StudioHeader() {
  return (
    <div className="flex items-start min-h-[150px]">
      <div className="flex-grow">
        <h1 className="text-2xl md:text-6xl font-bold">Your Courses</h1>
      </div>
      <div>
        <DialogCourse />
      </div>
    </div>
  );
}
