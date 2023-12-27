import { Box, Button, Code, useToast } from "@chakra-ui/react";
import { FC } from "react";
import { getChakraUITokensObjectString, getPandaCssTokensObjectString } from "../utils/color-utils";
import { copyToClipboard } from "../utils/common-utils";

interface IOutputColorsJson {
  colors: string[];
  system: string;
  scales: number[];
}

export const OutputColorsJson: FC<React.PropsWithChildren<IOutputColorsJson>> = ({ colors, scales, system }) => {
  const toast = useToast();
  const tokenObjectString = system === 'Chakra UI' ? getChakraUITokensObjectString(colors, scales) : getPandaCssTokensObjectString(colors, scales);

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
    <Box position="relative" mt="4">
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
  );
};
