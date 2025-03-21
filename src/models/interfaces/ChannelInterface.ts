export interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}

export interface InviteCodeProps {
  code: string;
  workspaceId: string;
}
