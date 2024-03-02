export default function Text({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-900 dark:text-gray-100 text-lg font-normal tracking-tight">
      {children}
    </p>
  );
}
