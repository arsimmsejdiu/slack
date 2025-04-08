import { useRef } from "react";
import dynamic from "next/dynamic";
import Quill from "quill";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export const ChatInput = ({placeholder}: {placeholder: string}) => {
  const editorRef = useRef<Quill | null>(null);

  return (
    <div className="px-5 w-full">
      <Editor 
        placeholder={placeholder}
        onSubmit={() => {}}
        onCancel={() => {}}
        disabled={false}
        defaultValue={[]}
        innerRef={editorRef}
      />
    </div>
  );
};
