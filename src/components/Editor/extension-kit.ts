import { Underline } from "@tiptap/extension-underline";
import Bold from "@tiptap/extension-bold";
import { StarterKit, Link, Heading, SlashCommand, ImageUpload, ImageBlock } from "./extensions";

const CustomBold = Bold.extend({
  renderHTML({ HTMLAttributes }) {
    return ['b', HTMLAttributes, 0]
  }
})

export function ExtensionKit() {
  return [
    StarterKit,
    Underline,
    CustomBold,
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
