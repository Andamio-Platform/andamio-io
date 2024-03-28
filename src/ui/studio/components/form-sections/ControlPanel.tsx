import React from "react";
import { Button } from "~/components/ui/button";
import {
  CrossCircledIcon,
  SymbolIcon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
  GlobeIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

export default function ControlPanel({
  editContent,
  isLoadingUpdate,
  onCancel,
  courseCode,
  moduleCode,
  contentPath,
  live,
}: {
  editContent: boolean;
  isLoadingUpdate: boolean;
  onCancel: () => void;
  courseCode: string;
  moduleCode: string;
  contentPath: string;
  live: boolean | null;
}) {
  const publishedLink = `/course/${courseCode}/${moduleCode}/${contentPath}`;

  return (
    <div className="grid grid-cols-4 gap-10 lg:gap-24">
      <div className="flex h-[30px] w-[30px] items-center justify-center">
        {isLoadingUpdate ? (
          <SymbolIcon className="animate-spin" width="22" height="22" />
        ) : (
          <TooltipProvider>
            {editContent ? (
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    disabled={isLoadingUpdate || !editContent}
                    size="bigIcon"
                    intent="ghost"
                  >
                    <ExclamationTriangleIcon
                      className="text-yellow-800"
                      width="22"
                      height="22"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to save your work</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger>
                  <CheckCircledIcon
                    className="rounded-full bg-green-900 text-white"
                    width="22"
                    height="22"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your work is saved</p>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        )}
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={(e) => {
                e.preventDefault();
                window.open(publishedLink, "_blank");
              }}
              size="bigIcon"
              intent="ghost"
            >
              <GlobeIcon
                width="22"
                height="22"
                className={`${live ? "text-green-900" : "text-secondary-foreground"}`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {live
                ? "This assignment is published!"
                : "This assignment is not published. To publish the assignment, tap the Publish button below."}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="col-start-3 flex flex-row justify-end">
        <Sheet>
          <SheetTrigger>
            <div className="flex h-[30px] w-[30px] items-center justify-center">
              <QuestionMarkCircledIcon width="22" height="22" />
            </div>
          </SheetTrigger>
          <SheetContent>
            <p>Put help content, links, docs, etc here</p>
            <p>
              Can create custom components for this that are easy to edit -
              would be passed as props
            </p>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex h-[30px] w-[30px] items-center justify-center">
        {editContent && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button intent="ghost" size="bigIcon" onClick={onCancel}>
                  <CrossCircledIcon width="22" height="22" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cancel Changes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
