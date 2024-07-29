import DialogCourse from "./dialogs/DialogCourse";

export default function StudioHeader() {
  return (
    <div className="flex min-h-[150px] items-start">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold md:text-6xl">Your Courses</h1>
      </div>
      <div>
        <DialogCourse />
      </div>
    </div>
  );
}
