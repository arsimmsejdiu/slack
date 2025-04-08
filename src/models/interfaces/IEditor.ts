import Quill, { Delta, Op } from "quill/core";
import { TEditorType } from "../types/TEditor";
import { MutableRefObject } from "react";

export interface IEditorProps {
  onSubmit: ({ image, body }: TEditorType) => void;
  onCancel: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  variant?: "create" | "update";
}
