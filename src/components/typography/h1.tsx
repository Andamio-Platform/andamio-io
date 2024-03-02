export default function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
      {children}
    </h1>
  );
}
