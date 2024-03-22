import { Underline } from "@tiptap/extension-underline";
import { StarterKit, Link, Heading, SlashCommand, ImageUpload, ImageBlock } from "./extensions";

export function ExtensionKit() {
  return [
    StarterKit,
    Underline,
    Link.configure({
      openOnClick: false,
    }),
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    SlashCommand,
    ImageUpload.configure({
      clientId: 'provider?.document?.clientID',
    }),
    ImageBlock,
  ];
}
