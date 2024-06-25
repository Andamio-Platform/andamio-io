export default function CardSLT({
  moduleCode,
  moduleIndex,
  sltText,
}: {
  moduleCode: string;
  moduleIndex: number;
  sltText: string;
}) {
  return (
    <div className="flex flex-col md:flex-row w-11/12 lg:w-1/2 justify-between px-5 py-3">
      <p className="text-2xl font-bold leading-7 text-right text-muted-foreground">
        SLT {moduleCode}.{moduleIndex}
      </p>
      <p className="text-xl font-semibold leading-7 text-right">
        {sltText}
      </p>
    </div>
  );
}
