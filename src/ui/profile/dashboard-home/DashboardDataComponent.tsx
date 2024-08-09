export default function DashboardDataComponent({
  title,
  data,
}: {
  title: string;
  data: string;
}) {
  return (
    <div className=" text-center md:col-span-2">
      <p className="text-4xl">
        <b>{data}</b>
      </p>
      <h2 className="py-5 text-xl font-bold">{title}</h2>
    </div>
  );
}
