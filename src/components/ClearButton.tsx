import { FC, MouseEventHandler } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";

interface IClearButton {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

export const ClearButton: FC<IClearButton> = ({ label, onClick, disabled,  }) => {
  return (
    <IconButton
      aria-label={label}
      icon={<CloseIcon />}
      variant="unstyled"
      onClick={onClick}
      disabled={disabled}
    />
  );
};
