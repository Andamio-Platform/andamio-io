import useUnconfirmedTx from "./useUnconfirmedTx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Loader } from "lucide-react";

export default function UnconfirmedTx({
  unconfirmedTxHash,
}: {
  unconfirmedTxHash: string | undefined;
}) {
  if (!unconfirmedTxHash) return null;
  const { data, error, isLoading } = useUnconfirmedTx(unconfirmedTxHash);

  return (
    <Popover>
      <PopoverTrigger>
        <Loader />
      </PopoverTrigger>
      <PopoverContent className="max-w-fit bg-white">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error</div>}
        {data && (
          <>
            {unconfirmedTxHash.substring(0, 3)}...
            {unconfirmedTxHash.substring(61)} : {data.state}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
