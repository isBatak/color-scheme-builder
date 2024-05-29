import { Badge } from "@/components/ui/badge";
import * as ColorPicker from "@/components/ui/color-picker";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { parseColor } from "@zag-js/color-utils";
import { PipetteIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { rgbaToHex, rgbaToRgb } from "src/utils/color-utils";
import { useDebounce } from "src/utils/useDebounce";
import { Box, Flex, HStack, Stack, styled } from "styled-system/jsx";
import { ratio, score } from "wcag-color";

const ColorButton = (props: any) => {
  return (
    <styled.button
      w="200px"
      h="100px"
      border="1px solid"
      borderColor="gray.9"
      borderRadius="md"
      pos="relative"
      p="2!"
      display="flex"
      flexDir="column"
      gap="1"
      {...props}
    ></styled.button>
  );
};

interface WcagBadgeProps {
  foreground: string;
  background: string;
}

const WcagBadge = ({ foreground, background }: WcagBadgeProps) => {
  return (
    <Badge pos="relative" zIndex={1}>
      <Box
        w="3"
        h="3"
        borderRadius="full"
        bg={background}
        border="1px solid!"
        borderColor="gray.5!"
      />
      {ratio(foreground, background)} {score(foreground, background)}
    </Badge>
  );
};

interface ColorProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

export const Color = ({ value, onChange, name }: ColorProps) => {
  const [hexValue, setHexValue] = useState(rgbaToHex(value));

  useEffect(() => {
    setHexValue(rgbaToHex(value));
  }, [value]);

  const handleHexChange = useDebounce((newValue) => {
    try {
      const parsedColor = parseColor(newValue);
      onChange(parsedColor.toString("hex"));
    } catch (error) {
      console.error("Invalid color value:", error);
    }
  }, 300);

  return (
    <ColorPicker.Root
      value={value}
      onValueChange={(details) => {
        onChange(details.valueAsString);
      }}
    >
      {(api) => {
        return (
          <>
            <ColorPicker.Control>
              {/* <ColorPicker.ChannelInput channel="hex" asChild>
              <Input />
            </ColorPicker.ChannelInput> */}

              <ColorPicker.Trigger asChild>
                <ColorButton>
                  <WcagBadge
                    foreground={rgbaToHex(api.valueAsString)}
                    background="#ffffff"
                  />
                  <WcagBadge
                    foreground={rgbaToHex(api.valueAsString)}
                    background="#000000"
                  />
                  <Box pos="absolute" inset={0} zIndex={0}>
                    <ColorPicker.Swatch value={api.value} w="100%" h="100%" />
                  </Box>
                </ColorButton>
              </ColorPicker.Trigger>
              <Flex direction="column" minW="150px" gap={2}>
                <Text textStyle="md" fontWeight="bold">
                  {name}
                </Text>
                <Input
                  size="xs"
                  color="gray.9"
                  value={hexValue}
                  onChange={(e) => {
                    setHexValue(e.target.value);
                    handleHexChange(e.target.value);
                  }}
                />
                <Text textStyle="md" fontWeight="bold">
                  {api.valueAsString}
                </Text>
              </Flex>
            </ColorPicker.Control>
            <ColorPicker.Positioner>
              <ColorPicker.Content>
                <Stack gap="2">
                  <ColorPicker.Area>
                    <ColorPicker.AreaBackground />
                    <ColorPicker.AreaThumb />
                  </ColorPicker.Area>

                  <HStack gap="1">
                    <ColorPicker.EyeDropperTrigger asChild>
                      <IconButton
                        size="xs"
                        variant="outline"
                        aria-label="Pick a color"
                      >
                        <PipetteIcon />
                      </IconButton>
                    </ColorPicker.EyeDropperTrigger>
                    <Stack gap="2" flex="1">
                      <ColorPicker.ChannelSlider channel="hue">
                        <ColorPicker.ChannelSliderTrack />
                        <ColorPicker.ChannelSliderThumb />
                      </ColorPicker.ChannelSlider>
                      {/* <ColorPicker.ChannelSlider channel="alpha">
                      <ColorPicker.TransparencyGrid size="8px" />
                      <ColorPicker.ChannelSliderTrack />
                      <ColorPicker.ChannelSliderThumb />
                    </ColorPicker.ChannelSlider> */}
                    </Stack>
                  </HStack>

                  <HStack>
                    <ColorPicker.ChannelInput channel="hex" asChild>
                      <Input size="2xs" />
                    </ColorPicker.ChannelInput>
                    {/* <ColorPicker.ChannelInput channel="alpha" asChild>
                    <Input size="2xs" />
                  </ColorPicker.ChannelInput> */}
                  </HStack>
                  <Stack gap="1.5">
                    <Text textStyle="xs" fontWeight="medium" color="fg.default">
                      Saved Colors
                    </Text>
                    <ColorPicker.SwatchGroup>
                      {presets.map((color, id) => (
                        <ColorPicker.SwatchTrigger key={id} value={color}>
                          <ColorPicker.Swatch value={color} />
                        </ColorPicker.SwatchTrigger>
                      ))}
                    </ColorPicker.SwatchGroup>
                  </Stack>
                </Stack>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </>
        );
      }}
    </ColorPicker.Root>
  );
};

const presets = [
  "hsl(10, 81%, 59%)",
  "hsl(60, 81%, 59%)",
  "hsl(100, 81%, 59%)",
  "hsl(175, 81%, 59%)",
  "hsl(190, 81%, 59%)",
  "hsl(205, 81%, 59%)",
  "hsl(220, 81%, 59%)",
  "hsl(250, 81%, 59%)",
  "hsl(280, 81%, 59%)",
  "hsl(350, 81%, 59%)",
];
