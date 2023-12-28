import { FC, MouseEventHandler } from "react";
import { IconButton } from "./ui/icon-button";
import { XIcon } from "lucide-react";

interface IClearButton {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

export const ClearButton: FC<React.PropsWithChildren<IClearButton>> = ({
  label,
  onClick,
  disabled,
}) => {
  return (
    <IconButton aria-label={label} onClick={onClick} disabled={disabled}>
      <XIcon />
    </IconButton>
  );
};
