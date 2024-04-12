import { Course, Lesson, Module, ModuleSLT } from "~/types/db";
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

export default function RightSection({
  form,
  course,
  courseModule,
  slt,
}: {
  form: FieldValues;
  course: Course;
  courseModule: Module;
  slt?: ModuleSLT;
}) {
  if (!course) return;

  return (
    <div className="my-5 mr-5 flex w-full flex-col gap-2 pr-5">
      <Accordion
        type="single"
        collapsible
        className="w-full bg-background px-3"
      >
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

      <Accordion
        type="single"
        collapsible
        className="w-full bg-background px-3"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Link to Video</AccordionTrigger>
          <AccordionContent>
            <VideoLink form={form} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion
        type="single"
        collapsible
        className="w-full bg-background px-3"
      >
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
    </div>
  );
}
