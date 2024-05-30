import React from "react";
import { Chat } from "./chat";
import { ChatProvider } from "~/lib/nostr/chat-provider";

interface ChatLayoutProps {
  roomId: string;
}

export function ChatLayout({ roomId }: ChatLayoutProps) {
  return (
    <ChatProvider>
      <Chat roomId={roomId} />
    </ChatProvider>
  );
}
