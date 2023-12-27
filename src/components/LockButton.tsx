import { FC, MouseEventHandler } from "react";
import { LockIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";

interface ILockButton {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

export const LockButton: FC<React.PropsWithChildren<ILockButton>> = ({ label, onClick, disabled,  }) => {
  return (
    <IconButton
      aria-label={label}
      icon={<LockIcon />}
      variant="unstyled"
      onClick={onClick}
      disabled={disabled}
    />
  );
};
