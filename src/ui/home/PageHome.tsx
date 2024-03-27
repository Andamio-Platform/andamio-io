import AboutUser from "./AboutUser";
import SectionStartLearning from "./SectionStartLearning";
import SectionStudio from "./SectionStudio";

export default function PageHome() {
  return (
    <>
      <SectionStudio />

      <AboutUser />

      <SectionStartLearning />
    </>
  );
}
