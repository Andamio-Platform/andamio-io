export default function DialogParagraph({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-sm text-gray-500">{children}</p>;
}
