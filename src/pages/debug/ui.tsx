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

export default function DebugUiPage() {
  return (
    <>
      <div className="flex w-full flex-col">
        <HeaderSection />
        <div className="flex w-full">
          <EditorSection />
          <RightSection />
        </div>
      </div>
    </>
  );
}

function HeaderSection() {
  return (
    <div className="flex flex-col p-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-xl">Title of lesson</div>
        </div>
      </div>
      <MenubarSection />
    </div>
  );
}

function MenubarSection() {
  return (
    <Menubar className="border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => {
              console.log("save");
            }}
          >
            Save
          </MenubarItem>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Publish</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Publish</MenubarCheckboxItem>
          <MenubarItem>See lesson page</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function RightSection() {
  return (
    <div className="flex w-96 flex-col gap-2 p-2">
      <Card className="min-h-0 p-0">
        <CardHeader>
          <CardTitle>Student Learning Target</CardTitle>
          <CardDescription>
            The objective of the lesson that students will learn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            How to do something amazing. How to do something amazing. How to do
            something amazing. How to do something amazing.
          </p>
        </CardContent>
      </Card>

      <Card className="min-h-0 p-0">
        <CardHeader>
          <CardTitle>Lesson Description</CardTitle>
          <CardDescription>A brief description of the lesson</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Textarea placeholder="A brief description" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="min-h-0 p-0">
        <CardHeader>
          <CardTitle>Lesson video</CardTitle>
          <CardDescription>The video for the lesson.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input placeholder="Video ID from YouTube" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EditorSection() {
  return (
    <div className="mx-2 h-[calc(100vh-84px)] w-full overflow-y-auto border bg-gray-100">
      <div className="mx-auto my-4 w-full max-w-2xl">
        <div className="bg-white">
          {/* editor here */}
          {[...Array(50)].map((_, i) => (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem ipsa veritatis quidem? Doloremque ea, consectetur
              officia excepturi reiciendis in necessitatibus sed deleniti
              consequuntur suscipit asperiores quasi enim voluptates unde odit!
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
