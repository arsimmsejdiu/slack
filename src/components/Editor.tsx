import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Quill, { QuillOptions } from "quill";
import { MdSend } from "react-icons/md";
import { PiTextAa } from "react-icons/pi";
import { ImageIcon, Smile } from "lucide-react";

import { Button } from "./ui/button";
import { EmojiPopover } from "./EmojiPopover";
import { ActionTooltip } from "./ActionTooltip";

import { IEditorProps } from "@/models/interfaces/IEditor";
import { cn, toggleToolbar } from "@/lib/utils";

import "quill/dist/quill.snow.css";
import { DisplayImage } from "./DisplayImage";

const Editor = ({
  variant = "create",
  onCancel,
  onSubmit,
  placeholder = "Type your message here...",
  defaultValue = [],
  disabled = false,
  innerRef,
}: IEditorProps) => {
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isToolbarVisible, setToolbarVisible] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);
  const imageRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                // TODO: handle submit
                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());
    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const onEmojiSelect = (emoji: any) => {
    const quill = quillRef.current;

    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };

  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  return (
    <div
      className={variant === "update" ? "flex flex-col mb-5" : "flex flex-col"}
    >
      <input type="file" accept="image/*" ref={imageRef} onChange={(event) => setImage(event.target.files![0])} className="hidden"/>
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className="h-full ql-custom" />
        {!!image && (
          <DisplayImage 
            image={image} 
            setImage={setImage}
            imageRef={imageRef}
          />
        )}
        <div className="flex px-2 pb-2 z-[5]">
          <ActionTooltip
            label={isToolbarVisible ? "Hide Toolbar" : "Show Toolbar"}
          >
            <Button
              disabled={disabled}
              size="iconSm"
              variant="ghost"
              onClick={() => toggleToolbar(containerRef, setToolbarVisible)}
            >
              <PiTextAa className="size-4" />
            </Button>
          </ActionTooltip>

          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button disabled={disabled} size="iconSm" variant="ghost">
              <Smile className="size-4" />
            </Button>
          </EmojiPopover>
          {variant === "create" && (
            <ActionTooltip label="Image">
              <Button
                disabled={disabled}
                size="iconSm"
                variant="ghost"
                onClick={() => imageRef.current?.click()}
              >
                <ImageIcon className="size-4" />
              </Button>
            </ActionTooltip>
          )}
          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {}}
                disabled={disabled || isEmpty}
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Save
              </Button>
            </div>
          )}
          {variant === "create" && (
            <ActionTooltip label="send">
              <Button
                disabled={disabled || isEmpty}
                onClick={() => {}}
                size="iconSm"
                className={cn(
                  "ml-auto",
                  isEmpty
                    ? "bg-white hover:bg-white text-muted-foreground"
                    : "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
                )}
              >
                <MdSend className="size-4" />
              </Button>
            </ActionTooltip>
          )}
        </div>
      </div>
      {variant === "create" && (
        <div
          className={cn(
            "p-2 text-[10px] text-muted-foreground flex justify-end opacity-0 transition",
            !isEmpty && "opacity-100"
          )}
        >
          <p>
            <strong>Shift + Return</strong> to add a new line
          </p>
        </div>
      )}
    </div>
  );
};

export default Editor;
