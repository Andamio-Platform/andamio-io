import { Course, Lesson, Module, ModuleSLT } from "~/types/db";
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

import { useForm, FieldValues } from "react-hook-form";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import ControlPanel from "~/ui/studio/components/form-sections/ControlPanel";
import CardSLT from "~/ui/studio/components/slt/CardSLT";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import VideoLink from "~/ui/studio/components/form-sections/VideoLink";
import { ToggleEditableField } from "~/components/ui/toggle-editable-field";

export default function HeaderSection({
    form,
    course,
    editContent,
    setEditContent,
    isLoadingUpdate,
    onCancel,
    onSubmit,
    courseCode,
    moduleCode,
    slt,
    lesson,
  }: {
    form: FieldValues;
    course: Course;
    editContent: boolean;
    setEditContent: React.Dispatch<React.SetStateAction<boolean>>;
    isLoadingUpdate: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    courseCode: string;
    moduleCode: string;
    slt: ModuleSLT;
    lesson: Lesson;
  }) {
    const handleCheckboxChange = (checked: boolean) => {
      form.setValue("live", checked);
      onSubmit();
    };
  
    return (
      <div className="flex flex-col">
        <div className="flex min-h-[100px] flex-row items-center justify-between bg-card p-5">
          <div className="flex items-center">
            <ToggleEditableField
              name="title"
              form={form}
              intent="title"
              formTextSize="lg"
              editText={editContent}
              setEditText={setEditContent}
              text={lesson.title ?? "Edit this lesson title"}
              hasForm={true}
              placeholder="Lesson Title"
            />
          </div>
          <CardSLT
            moduleCode={moduleCode}
            moduleIndex={slt.moduleIndex}
            sltText={slt.sltText}
          />
        </div>
        <div className="flex flex-row items-center justify-between bg-primary text-primary-foreground">
          <Menubar className="rounded-none border-none bg-primary  text-primary-foreground shadow-none">
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onSelect={onSubmit}>Save</MenubarItem>
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
  
                <MenubarItem>See lesson page</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Go To Lesson</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Lesson 101.1</MenubarItem>
                <MenubarItem>Lesson 101.2</MenubarItem>
                <MenubarItem>Lesson 101.3</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Go To Module</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Lesson 101.1</MenubarItem>
                <MenubarItem>Lesson 101.2</MenubarItem>
                <MenubarItem>Lesson 101.3</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Import Lesson</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>From My Course</MenubarItem>
                <MenubarItem>From Andamio Marketplace</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Link href={`/studio/${courseCode}`}>Back to Course Page</Link>
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
          <ControlPanel
            editContent={editContent}
            isLoadingUpdate={isLoadingUpdate}
            onCancel={onCancel}
            courseCode={courseCode}
            moduleCode={moduleCode}
            contentPath={`lesson/${slt.moduleIndex.toString()}`}
            live={lesson.live}
          />
        </div>
      </div>
    );
  }