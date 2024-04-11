import { Button } from "@headlessui/react";
import axios from "axios";

export default function ai() {
  async function test() {
    const result = await axios.post(
      `/api/ai/get-lesson-plan`,
      {
        slt: "i can build a website",
      },
    );
    console.log(12, result)
  }

  return (
    <>
      <Button onClick={() => test()}>test</Button>
    </>
  );
}
