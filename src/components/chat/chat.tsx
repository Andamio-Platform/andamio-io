import useNostrChat from "~/lib/nostr/chat-provider";
import { ChatList } from "./chat-list";
import React, { useEffect, useRef } from "react";
import { Message } from "./chat-types";

interface ChatProps {
  roomId: string;
}

export function Chat({ roomId }: ChatProps) {
  const { messages, publishMessage, subscribeRoom } = useNostrChat();
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    subscribeRoom(roomId);
    loaded.current = true;
  }, [roomId]);

  const sendMessage = async (newMessage: Message) => {
    publishMessage(newMessage.message);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatList messages={messages} sendMessage={sendMessage} />
    </div>
  );
}
