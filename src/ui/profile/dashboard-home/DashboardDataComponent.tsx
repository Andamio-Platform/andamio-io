export default function DashboardDataComponent({
  title,
  data,
  label,
}: {
  title: string;
  data: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <h2 className="py-5 text-xl font-bold">{title}</h2>
      <p className="text-4xl">
        <b>{data}</b>
      </p>
      <p className="font-light">{label}</p>
    </div>
  );
}
