import React from "react";
import Metatags from "~/components/site/metatags";
import StoryFork from "~/ui/system/StoryFork";

/**
 * /show-me — the locked full-screen story flow. The hero's "Show me" button
 * lands here; every screen of the flow fills the viewport exactly.
 */
export default function StoryPage() {
  return (
    <>
      <Metatags
        title="Show me"
        description="Which of these sounds like you? Pick a door and Andamio shows you how you can use it, how it's built, and why that matters."
      />
      <StoryFork />
    </>
  );
}
