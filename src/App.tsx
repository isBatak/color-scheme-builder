import { Container } from "@/styled-system/jsx";
import { CustomScaleInput } from "@/components/CustomScaleInput";
import { OutputColorsJson } from "@/components/OutputColorsJson";
import { Distribution } from "@/components/Distribution";
import { Palette } from "@/components/Palette";
import { createToaster } from "@ark-ui/react/toast";
import { XIcon } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import * as Toast from "@/components/ui/toast";
import { Navbar } from "@/components/Navbar";

export const [Toaster, toast] = createToaster({
  placement: "top-end",
  render(toast) {
    return (
      <Toast.Root>
        <Toast.Title>{toast.title}</Toast.Title>
        <Toast.Description>{toast.description}</Toast.Description>
        <Toast.CloseTrigger asChild>
          <IconButton size="sm" variant="link">
            <XIcon />
          </IconButton>
        </Toast.CloseTrigger>
      </Toast.Root>
    );
  },
});

export const App = () => {
  return (
    <>
      <Navbar />
      <Container py={10} maxW="lg">
        <Distribution />
        <Palette />
        <CustomScaleInput />
        <OutputColorsJson />
      </Container>
      <Toaster />
    </>
  );
};
