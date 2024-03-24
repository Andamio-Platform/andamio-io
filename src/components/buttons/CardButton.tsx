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
      <div className="flex w-11/12 mx-auto items-center justify-center py-3 hover:bg-neutral-400 rounded-md transition-colors ease-in-out duration-300">
        <div className="flex items-center gap-2 text-neutral-900">{children}</div>
      </div>
    </button>
  );
}
