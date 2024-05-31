import { Assignment, Course, Lesson, Module, ModuleSLT } from "~/types/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import ControlPanel from "~/ui/studio/components/form-sections/ControlPanel";
import CardSLT from "~/ui/studio/components/slt/CardSLT";
import { Button } from "~/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import VideoLink from "~/ui/studio/components/form-sections/VideoLink";
import { ToggleEditableField } from "~/components/ui/toggle-editable-field";
import { FieldValues } from "react-hook-form";
import FormTextArea from "~/components/form/form-textarea";
import SltList from "~/ui/studio/components/assignment-dashboard/slt-list";

export default function RightSection({
  form,
  course,
  courseModule,
  slt,
  assignment,
}: {
  form: FieldValues;
  course: Course;
  courseModule: Module;
  slt?: ModuleSLT;
  assignment?: Assignment | undefined;
}) {
  if (!course) return;

  return (
    <div className="my-5 mr-5 flex w-full flex-col gap-2 pr-5">
      {assignment && (
        <Accordion
          type="single"
          collapsible
          className="w-full bg-background p-3"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Module SLTs</AccordionTrigger>
            <AccordionContent>
              <SltList courseModule={courseModule} assignment={assignment} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <Accordion type="single" collapsible className="w-full bg-background p-3">
        <AccordionItem value="item-1">
          <AccordionTrigger>Creator Notes</AccordionTrigger>
          <AccordionContent>
            <p className="pb-5 text-xs">
              Possible feature: I noticed that we are not using Lesson
              descriptions in the Course view UI, and maybe they are not needed.
              What if we use this space for lesson creators to keep private
              notes about lessons?
            </p>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormTextArea
                  name="description"
                  placeholder="A brief description"
                  className="min-h-[200px]"
                  form={form}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full bg-background p-3">
        <AccordionItem value="item-1">
          <AccordionTrigger>Link to Video</AccordionTrigger>
          <AccordionContent>
            <VideoLink form={form} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full bg-background p-3">
        <AccordionItem value="item-1">
          <AccordionTrigger>Navigation</AccordionTrigger>
          <AccordionContent>
            <Card
              className="col-span-4 flex w-full flex-row items-center justify-between border border-secondary-foreground p-3"
              size="md"
            >
              {slt && (
                <>
                  <div>
                    {slt.moduleIndex > 1 && (
                      <Button>
                        <Link
                          href={`/studio/${course.courseCode}/${courseModule.moduleCode}/lesson/${slt.moduleIndex - 1}`}
                        >
                          <ArrowLeftIcon /> {courseModule.moduleCode}.
                          {slt.moduleIndex - 1}
                        </Link>
                      </Button>
                    )}
                  </div>
                  <div>
                    {slt.moduleIndex < courseModule.slts.length && (
                      <Button>
                        <Link
                          href={`/studio/${course.courseCode}/${courseModule.moduleCode}/lesson/${slt.moduleIndex + 1}`}
                        >
                          <ArrowRightIcon /> {courseModule.moduleCode}.
                          {slt.moduleIndex + 1}
                        </Link>
                      </Button>
                    )}
                  </div>
                </>
              )}
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full bg-background p-3">
        <AccordionItem value="item-1">
          <AccordionTrigger>Help</AccordionTrigger>
          <AccordionContent className="py-2">
            <p className="py-2 text-xs font-bold">Add a Link</p>
            <p className="pb-2 text-xs">
              When you highlight text and paste a URL from your clipboard, the
              highlighted text will become a link.
            </p>
            <p className="pb-2 text-xs">
              You can also add a link by using the hover menu.
            </p>
            <p className="py-2 text-xs font-bold">Add an Image</p>
            <p className="pb-2 text-xs">
              To insert an image, use a &quot;slash&quot; command. In the
              editor, type <span className="font-mono">{"/image"}</span>. Then,
              when an image container appears, you can drag and drop an image
              from your computer into the Andamio editor.
            </p>
            <p className="py-2 text-xs font-bold">Try Andamio AI</p>
            <p className="pb-2 text-xs">
              From the menu bar, you can experiment with Andamio AI. Right now
              it offers one feature: from a Student Learning Target, you can
              generate a set of suggested sub-headings to help you start writing
              a lesson.
            </p>
            <p className="pb-2 text-xs">
              More features will roll out in the coming months.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
