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
    <div className="flex flex-col w-1/2 rounded-md px-5 py-3">
      <p className="text-xs font-bold leading-7 text-right text-muted-foreground uppercase">
        Student Learning Target {moduleCode}.{moduleIndex}
      </p>
      <p className="text-xl font-semibold leading-7 text-right">
        {sltText}
      </p>
    </div>
  );
}
