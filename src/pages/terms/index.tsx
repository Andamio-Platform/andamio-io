import { Card } from "~/components/ui/card";
import MenuBar from "~/ui/landing/MenuBar";

export default function AboutPage() {
  return (
    <main
      className="items-center justify-center"
      style={{ minHeight: "calc(100vh - 5rem)" }}
    >
      <MenuBar />

      <div className="card z-10 mx-auto mt-24 max-w-5xl p-5 font-mono shadow-xl">
        <h1 className="pt-5 text-2xl">Andamio Terms + Conditions</h1>
        <h1 className="pb-5 text-xl text-secondary-foreground">Version 0.0.0</h1>

        <p className="py-3 font-medium">
          Thank you for supporting Andamio as we continue to build it.
        </p>
        <p className="py-3 font-medium">
          You are currently viewing a pre-release version of Andamio. The
          platform is evolving rapidly, so please expect changes.
        </p>
        <p className="py-3 font-medium">
          We are currently putting finishing touches on a Terms + Conditions
          document and a Privacy Policy. You will be notified by this
          application when these documents are updated. Until then, the Andamio
          team reserves all rights to remove users, change access permissions,
          and edit content published on the Andamio Platform.
        </p>
      </div>
    </main>
  );
}
