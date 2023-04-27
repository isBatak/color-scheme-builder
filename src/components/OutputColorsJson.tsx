import { FC } from "react";
import { Textarea } from "@chakra-ui/textarea";
import { getChakraUITokensObjectString } from "../utils/color-utils";
import { Box, Button, Code, useToast } from "@chakra-ui/react";
import { copyToClipboard } from "../utils/common-utils";
import { ArrowLeftIcon } from "@chakra-ui/icons";

interface IOutputColorsJson {
  colors: string[];
  scales: number[];
}

export const OutputColorsJson: FC<IOutputColorsJson> = ({ colors, scales }) => {
  const toast = useToast();
  const tokenObjectString = getChakraUITokensObjectString(colors, scales);

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
