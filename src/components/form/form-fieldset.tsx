import FormLabel from "./form-label";

export default function FormFieldset({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <div className="mt-1">{children}</div>
    </div>
  );
}
