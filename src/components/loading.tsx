import { ArrowPathIcon } from "@heroicons/react/24/outline";
import MiddleScreen from "./middle-screen";

export default function Loading({ size = 8 }: { size?: number }) {
  return (
    <MiddleScreen>
      <ArrowPathIcon className={`h-${size} w-${size} animate-spin`} />
    </MiddleScreen>
  );
}
