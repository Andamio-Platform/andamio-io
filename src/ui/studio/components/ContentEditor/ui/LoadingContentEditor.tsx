export default function LoadingContentEditor({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[100vh] items-center justify-center">
      <div className="flex min-h-[300px] w-full max-w-2xl animate-pulse items-center justify-center rounded-xl bg-secondary text-secondary-foreground opacity-50">
        {children}
      </div>
    </div>
  );
}
