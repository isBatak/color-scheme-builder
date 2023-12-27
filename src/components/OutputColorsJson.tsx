import { Box, Button, Code, useToast } from "@chakra-ui/react";
import { FC, useState } from "react";
import {
  getChakraUITokensObjectString,
  getPandaCssTokensObjectString,
} from "../utils/color-utils";
import { copyToClipboard } from "../utils/common-utils";
import * as Tabs from "@/components/ui/tabs";

const options = [
  {
    id: "chakra-ui",
    label: "Chakra UI",
  },
  {
    id: "panda",
    label: "Panda",
  },
];

interface IOutputColorsJson {
  colors: string[];
  scales: number[];
}

export const OutputColorsJson: FC<
  React.PropsWithChildren<IOutputColorsJson>
> = ({ colors, scales }) => {
  const [selectedSystem, selectSystem] = useState<string>(() => options[0].id);
  const toast = useToast();
  const tokenObjectString =
    selectedSystem === options[0].id
      ? getChakraUITokensObjectString(colors, scales)
      : getPandaCssTokensObjectString(colors, scales);

  const onTokenCopy = async () => {
    const isCopied = await copyToClipboard(tokenObjectString);

    if (isCopied) {
      toast({
        title: "Tokens copied to clipboard!",
        status: "info",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <Tabs.Root
      value={selectedSystem}
      onValueChange={({ value }) => selectSystem(value)}
    >
      <Tabs.List>
        {options.map((option) => (
          <Tabs.Trigger key={option.id} value={option.id}>
            {option.label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value={options[0].id}>
        <Box pos="relative">
          <Code whiteSpace="pre-wrap" w="full" px={4} py={2}>
            {tokenObjectString}
          </Code>
          <Button
            size="sm"
            position="absolute"
            bottom="1rem"
            right="1rem"
            variant="outline"
            colorScheme="gray"
            onClick={onTokenCopy}
          >
            COPY
          </Button>
        </Box>
      </Tabs.Content>
      <Tabs.Content value={options[1].id}>
        <Box pos="relative">
          <Code whiteSpace="pre-wrap" w="full" px={4} py={2}>
            {tokenObjectString}
          </Code>
          <Button
            size="sm"
            position="absolute"
            bottom="1rem"
            right="1rem"
            variant="outline"
            colorScheme="gray"
            onClick={onTokenCopy}
          >
            COPY
          </Button>
        </Box>
      </Tabs.Content>
    </Tabs.Root>
  );
};
