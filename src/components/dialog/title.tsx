import { Dialog } from "@headlessui/react";

export default function DialogTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog.Title
      as="h3"
      className="text-base font-semibold leading-6 text-gray-900"
    >
      {children}
    </Dialog.Title>
  );
}
