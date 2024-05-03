export default function AboutNetwork() {
  return (
    <div>
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>About the Network</h1>
      </div>
      <div className="w-full max-w-5xl items-center justify-between font-mono">
        <h2>The Andamio Network</h2>
        <p>
          We are building a network. What do we want to say about it on this
          page? It depends on whether this page is behind the Discord login or
          not. If not: what do we want to tell the world? If so: what journey do
          we assume that the person is already on?
        </p>
      </div>
      <div className="w-full max-w-5xl items-center justify-between font-mono">
        <h2>Details</h2>
        <ul className="ml-10 list-disc">
          <li>
            <a
              href="https://www.notion.so/andamio/The-Andamio-Network-cea97f8095f444f78812705f126c9da0?pvs=4"
              className="underline"
            >
              Andamio Network Definition in Andamio Glossary
            </a>
          </li>
          <li>
            Review{" "}
            <a
              href="https://www.notion.so/andamio/Landing-Page-Epic-2eb97125f2a64fe19661a969ae55735b?pvs=4"
              className="underline"
            >
              Landing Page Epic (on Notion)
            </a>
            , if there is content that does not fit on the landing page, maybe
            it fits here?
          </li>
          <li>Todo: Write user-facing welcome copy for this page</li>
        </ul>
      </div>
    </div>
  );
}
