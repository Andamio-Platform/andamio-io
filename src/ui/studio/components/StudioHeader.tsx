import { useState } from "react";
import DialogCourse from "./dialogs/DialogCourse";

export default function StudioHeader() {
  return (
    <div className="flex">
      <div className="flex-grow">
        <h1>Your Courses</h1>
      </div>
      <div>
        <DialogCourse />
      </div>
    </div>
  );
}
