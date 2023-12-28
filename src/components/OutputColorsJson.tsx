import { useState } from "react";
import {
  getChakraUITokensObjectString,
  getPandaCssTokensObjectString,
} from "@/utils/color-utils";
import * as Tabs from "@/components/ui/tabs";
import { copyToClipboard } from "@/utils/common-utils";
import { useAtom } from "jotai";
import { colorsAtom, scalesAtom } from "./Palette";
import { Box } from "@/styled-system/jsx";
import { Button } from "./ui/button";
import { Code } from "./ui/code";
import { toast } from "src/App";

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

export const OutputColorsJson = () => {
  const [scales] = useAtom(scalesAtom);
  const [colors] = useAtom(colorsAtom);

  const [selectedSystem, selectSystem] = useState<string>(() => options[0].id);
  const tokenObjectString =
    selectedSystem === options[0].id
      ? getChakraUITokensObjectString(colors, scales)
      : getPandaCssTokensObjectString(colors, scales);

  const onTokenCopy = async () => {
    const isCopied = await copyToClipboard(tokenObjectString);

    if (isCopied) {
      toast.create({
        title: "Tokens copied to clipboard!",
        duration: 1000,
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
