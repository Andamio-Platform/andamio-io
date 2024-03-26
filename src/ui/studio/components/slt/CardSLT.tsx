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
    <div className="flex w-full justify-start rounded-md border border-neutral-900 p-5 h-24">
      <p className="text-xl font-semibold leading-7">
        SLT {moduleCode}.{moduleIndex}: {sltText}
      </p>
    </div>
  );
}
