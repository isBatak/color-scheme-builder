import { MouseEventHandler, PropsWithChildren } from "react";
import { IconButton } from "./ui/icon-button";
import { LockIcon } from "lucide-react";

interface ILockButton {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

export const LockButton = ({
  label,
  onClick,
  disabled,
}: PropsWithChildren<ILockButton>) => {
  return (
    <IconButton aria-label={label} onClick={onClick} disabled={disabled}>
      <LockIcon />
    </IconButton>
  );
};
