import { Underline } from "@tiptap/extension-underline";
import Bold from "@tiptap/extension-bold";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
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
import TextStyle from "@tiptap/extension-text-style";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { TipTapLink } from "./components/link";

// -- Start Codeblock Config
// Languages
import { common, createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import go from "highlight.js/lib/languages/go";
import bash from "highlight.js/lib/languages/bash";
import python from "highlight.js/lib/languages/python";
import haskell from "highlight.js/lib/languages/haskell";
import json from "highlight.js/lib/languages/json";

const lowlight = createLowlight(common);
lowlight.register({ javascript });
lowlight.register({ typescript });
lowlight.register({ go });
lowlight.register({ bash });
lowlight.register({ python });
lowlight.register({ haskell });
lowlight.register({ json });
// enable rust for aiken highlighting
// or is aiken addedes

// -- END Codeblock Config

const CustomBold = Bold.extend({
  renderHTML({ HTMLAttributes }) {
    return ["b", HTMLAttributes, 0];
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
    StarterKit.configure({
      // codeBlock: false,
      // implement custom code next
      // code: false,
    }),
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: "bash",
    }),
    Underline,
    CustomBold,
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
