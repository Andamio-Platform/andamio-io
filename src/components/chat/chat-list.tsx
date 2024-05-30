import { cn } from "~/utils/shadcn";
import { useRef, useEffect } from "react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import { Message } from "./chat-types";
import { api } from "~/utils/api";
import useNostrChat from "~/lib/nostr/chat-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface ChatListProps {
  messages?: Message[];
  sendMessage: (newMessage: Message) => void;
}

export function ChatList({ messages, sendMessage }: ChatListProps) {
  const { nostrChatUser } = useNostrChat();

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <TooltipProvider>
      <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
        <div
          ref={messagesContainerRef}
          className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden"
        >
          <AnimatePresence>
            {messages &&
              messages
                .sort((a, b) => a.timestamp! - b.timestamp!)
                .map((message, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                    transition={{
                      opacity: { duration: 0.1 },
                      layout: {
                        type: "spring",
                        bounce: 0.3,
                        duration: messages.indexOf(message) * 0.05 + 0.2,
                      },
                    }}
                    style={{
                      originX: 0.5,
                      originY: 0.5,
                    }}
                    className={cn(
                      "flex flex-col gap-2 whitespace-pre-wrap p-4",
                      message.pubkey === nostrChatUser?.pubkey
                        ? "items-end"
                        : "items-start",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {(nostrChatUser &&
                        message.pubkey !== nostrChatUser.pubkey) ||
                        (nostrChatUser === undefined && (
                          <UserAvatar pubkey={message.pubkey} />
                        ))}
                      <span className="max-w-xs rounded-md bg-accent p-3">
                        {message.message}
                      </span>
                      {nostrChatUser &&
                        message.pubkey === nostrChatUser.pubkey && (
                          <UserAvatar pubkey={message.pubkey} />
                        )}
                    </div>
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>
        <ChatBottombar sendMessage={sendMessage} />
      </div>
    </TooltipProvider>
  );
}

function UserAvatar({ pubkey }: { pubkey: string }) {
  const { data: user } = api.user.getUserByPubkey.useQuery({
    pubkey: pubkey,
  });

  if (user)
    return (
      <Tooltip>
        <TooltipTrigger>
          <Avatar className="flex items-center justify-center">
            <AvatarImage
              src={user.image || ""}
              alt={user.name || ""}
              width={6}
              height={6}
            />
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>{user.name}</p>
        </TooltipContent>
      </Tooltip>
    );

  return null;
}
