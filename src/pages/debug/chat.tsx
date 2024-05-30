import { ChatLayout } from "~/components/chat/chat-layout";

export default function ChatPage() {
  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center justify-center gap-4 p-4 py-32 md:px-24">
      <div className="z-10 h-full w-full max-w-5xl rounded-lg border text-sm lg:flex">
        <ChatLayout roomId="mesh-pbl-test" />
      </div>
    </main>
  );
}
