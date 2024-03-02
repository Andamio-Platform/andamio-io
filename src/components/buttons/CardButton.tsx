export default function CardButton({
  children,
  className,
  onClickHandler,
}: {
  children: React.ReactNode;
  className?: string;
  onClickHandler?: () => void;
}) {
  return (
    <button onClick={onClickHandler} className={className}>
      <div className="flex w-full	items-center justify-center rounded-md border-2 border-dotted	border-indigo-200 py-6">
        <div className="flex items-center gap-2 text-indigo-600">{children}</div>
      </div>
    </button>
  );
}
