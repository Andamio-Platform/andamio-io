import Editor from "~/components/Editor";

export default function DebugUiPage() {

  const editor = new Editor({
    initialContent: '',
  });

  return <> {editor.render()}</>;
}
