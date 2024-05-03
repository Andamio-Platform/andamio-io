import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "axios";
import useUnconfirmedTx from "./useUnconfirmedTx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Loader } from "lucide-react";

interface Response {
  block: string;
  state: string;
  timestamp: string;
  transaction_hash: string;
}

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
      <PopoverContent className="bg-white max-w-fit">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error</div>}
        {data && <>{unconfirmedTxHash.substring(0,3)}...{unconfirmedTxHash.substring(61)} : {data.state}</>}
      </PopoverContent>
    </Popover>
  );
}
