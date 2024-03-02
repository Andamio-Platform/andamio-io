export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400">
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
