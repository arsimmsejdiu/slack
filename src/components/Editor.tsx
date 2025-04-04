import { useEffect, useRef } from "react";
import Quill, { QuillOptions } from "quill";
import { MdSend } from "react-icons/md";
import { PiTextAa } from "react-icons/pi";
import { ImageIcon, Smile } from "lucide-react";

import { Button } from "./ui/button";

import "quill/dist/quill.snow.css";
import { ActionTooltip } from "./ActionTooltip";

const Editor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
    };

    new Quill(editorContainer, options); //TODO: add after cont quill but dont need to add it now

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  });

  return (
    <div className="flex flex-col mb-5">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className="h-fiull ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <ActionTooltip label="Hide Formating">
            <Button
            disabled={false}
            size="iconSm"
            variant="ghost"
            onClick={() => {}}
          >
            <PiTextAa className="size-4" />
          </Button>
          </ActionTooltip>
          
          <ActionTooltip label="Emoji">
            <Button
              disabled={false}
              size="iconSm"
              variant="ghost"
              onClick={() => {}}
            >
              <Smile className="size-4" />
            </Button>
          </ActionTooltip>

          <ActionTooltip label="Attach an image">
            <Button
              disabled={false}
              size="iconSm"
              variant="ghost"
              onClick={() => {}}
            >
              <ImageIcon className="size-4" />
            </Button>
          </ActionTooltip>

          <ActionTooltip label="send">
            <Button
              disabled={false}
              onClick={() => {}}
              size="iconSm"
              className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
            >
              <MdSend className="size-4" />
            </Button>
          </ActionTooltip>
        </div>
      </div>
    </div>
  );
};

export default Editor;
