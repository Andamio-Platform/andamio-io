import { Course, Module } from "~/types/db";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
} from "~/components/ui/menubar";

import { FieldValues } from "react-hook-form";
import Link from "next/link";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import ControlPanel from "~/ui/studio/components/form-sections/ControlPanel";

export default function ContentEditorMenuBar({
  form,
  course,
  courseModule,
  onSubmit,
}: {
  form: FieldValues;
  course: Course;
  courseModule: Module;
  onSubmit: () => void;
}) {
  if (!course) return;

  const handleCheckboxChange = (checked: boolean) => {
    form.setValue("live", checked);
    onSubmit();
  };
  return (
    <Menubar className="rounded-none border-none bg-primary  text-primary-foreground shadow-none">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={onSubmit}>
            Save
            <MenubarShortcut>S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Import</MenubarItem>
          <MenubarItem>Export</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Publish</MenubarTrigger>
        <MenubarContent>
          <FormField
            control={form.control}
            name="live"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 py-1">
                <FormControl>
                  <MenubarCheckboxItem
                    checked={field.value}
                    onCheckedChange={handleCheckboxChange}
                  >
                    Publish Lesson
                  </MenubarCheckboxItem>
                </FormControl>
              </FormItem>
            )}
          />

          <MenubarSeparator />
          <MenubarItem>View Lesson as Learner</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Go To Lesson</MenubarTrigger>
        <MenubarContent>
          {courseModule.slts
            .sort((a, b) => a.moduleIndex - b.moduleIndex)
            .map((s) => (
              <MenubarItem key={s.id}>
                <Link
                  href={`/studio/${course.courseCode}/${courseModule.moduleCode}/lesson/${s.moduleIndex}`}
                >
                  Lesson {courseModule.moduleCode}.{s.moduleIndex}
                </Link>
              </MenubarItem>
            ))}
        </MenubarContent>
      </MenubarMenu>
      {/* <MenubarMenu>
              <MenubarTrigger>Go To Module</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Lesson 101.1</MenubarItem>
                <MenubarItem>Lesson 101.2</MenubarItem>
                <MenubarItem>Lesson 101.3</MenubarItem>
              </MenubarContent>
            </MenubarMenu> */}
      {/* <MenubarMenu>
              <MenubarTrigger>Import Lesson</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>From My Course</MenubarItem>
                <MenubarItem>From Andamio Marketplace</MenubarItem>
              </MenubarContent>
            </MenubarMenu> */}

      <MenubarMenu>
        <MenubarTrigger>Andamio AI</MenubarTrigger>
        <MenubarContent>
            <MenubarItem>Coming Soon</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={`/studio/${course.courseCode}`}>Back to Course Page</Link>
        </MenubarTrigger>
        <MenubarContent>
            <MenubarItem>Help</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
