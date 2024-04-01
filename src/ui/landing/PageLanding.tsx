import MenuBar from "./MenuBar";
import Hero from "./Hero";

export default function PageLanding() {
  return (
    <div className="">
      <MenuBar />

      <main className="isolate">
        <Hero />
      </main>
    </div>
  );
}
