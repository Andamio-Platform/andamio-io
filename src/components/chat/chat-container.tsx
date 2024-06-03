import React from "react";
import { Chat } from "./chat";
import { ChatProvider } from "~/lib/nostr/chat-provider";
import { env } from "~/env";

interface ChatContainerProps {
  roomId: string;
}

export function ChatContainer({ roomId }: ChatContainerProps) {
  return (
    <ChatProvider>
      <div className="flex flex-col items-center justify-center gap-4 p-2 h-96">
        <div className="z-10 h-full w-full max-w-5xl rounded-lg border border-slate-300 text-sm lg:flex p-1">
          <Chat roomId={`${env.NEXT_PUBLIC_CHAT_PREFIX}-${roomId}`} />
        </div>
      </div>
    </ChatProvider>
  );
}
