export interface IEmojiPopover {
    children: React.ReactNode;
    hint?: string;
    onEmojiSelect: (emoji: any) => void;
}