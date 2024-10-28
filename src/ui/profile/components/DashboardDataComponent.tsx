export default function DashboardDataComponent({
  title,
  data,
}: {
  title: string;
  data: string;
}) {
  return (
    <div className="flex w-full flex-col p-5 text-center">
      <p className="text-4xl">
        <b>{data}</b>
      </p>
      <h2 className="mt-5 text-xl">{title}</h2>
    </div>
  );
}
