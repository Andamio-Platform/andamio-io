import { Underline } from "@tiptap/extension-underline";
import Bold from "@tiptap/extension-bold";
import {
  StarterKit,
  Link,
  Heading,
  SlashCommand,
  ImageUpload,
  ImageBlock,
  TextAlign,
} from "./extensions";
import { BubbleMenu } from "@tiptap/extension-bubble-menu";
import { Color } from "@tiptap/extension-color";
import { Code } from "@tiptap/extension-code";
import TextStyle from "@tiptap/extension-text-style";
import { ReactNodeViewRenderer, markInputRule } from "@tiptap/react";
import { TipTapLink } from "./components/link";

const CustomBold = Bold.extend({
  renderHTML({ HTMLAttributes }) {
    return ["b", HTMLAttributes, 0];
  },
});

export const inputRegex = /(?:^|\s)(`(?!\s+`)((?:[^`]+))`(?!\s+`))$/;

const CustomCode = Code.extend({
  renderHTML({ HTMLAttributes }) {
    return ["code", { ...HTMLAttributes, class: "custom-code" }, 0];
  },
  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },
});

const CustomLink = Link.extend({
  openOnClick: false,
  addNodeView() {
    return ReactNodeViewRenderer(TipTapLink);
  },
});

export function ExtensionKit() {
  return [
    StarterKit,
    Underline,
    CustomBold,
    CustomCode,
    CustomLink,
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    SlashCommand,
    ImageUpload.configure({
      clientId: "provider?.document?.clientID",
    }),
    ImageBlock,
    BubbleMenu,
    Color,
    TextStyle,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
  ];
}
