import { NodeViewWrapper } from "@tiptap/react";
import Link from "~/components/link";

/**
 * goal is to replace <a> with <Link>
 * but `addNodeView` dont seems to work
 * even though its `completed` https://github.com/ueberdosis/tiptap/issues/1669
 */
export const TipTapLink = (props: any) => {
  return (
    <NodeViewWrapper>
      <Link href={props.href}>hey</Link>
    </NodeViewWrapper>
  );
};
