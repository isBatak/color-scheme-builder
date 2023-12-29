import { PipetteIcon } from "lucide-react";
import { Box, Flex, HStack, Stack, styled } from "styled-system/jsx";
import * as ColorPicker from "@/components/ui/color-picker";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { ratio, score } from "wcag-color";
import { rgbaToHex, rgbaToRgb } from "src/utils/color-utils";
import { type Color } from "@zag-js/color-utils";

const ColorButton = (props: any) => {
  return (
    <styled.button
      w="400px"
      pos="relative"
      p="2"
      display="flex"
      flexDir="row"
      justifyContent="flex-end"
      alignItems="center"
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
        border="1px solid token(colors.border.default)"
      />
      {ratio(foreground, background)} {score(foreground, background)}
    </Badge>
  );
};

interface ColorProps {
  name: string;
  value: string;
  onChange: (value: Color) => void;
}

export const PaletteColor = ({ value, onChange, name }: ColorProps) => {
  return (
    <ColorPicker.Root
      value={value}
      onValueChange={(details) => {
        onChange(details.value);
      }}
    >
      {(api) => (
        <>
          <ColorPicker.Control>
            <Flex direction="column" w="50px">
              <Text textStyle="md" fontWeight="bold">
                {name}
              </Text>
              {/* <Text textStyle="xs" color="gray.9">
                {rgbaToHex(api.valueAsString)}
              </Text>
              <Text textStyle="xs" color="gray.9">
                {rgbaToRgb(api.valueAsString)}
              </Text> */}
            </Flex>

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
                  <ColorPicker.Swatch
                    value={api.value}
                    w="100%"
                    h="100%"
                    borderRadius="0"
                  />
                </Box>
              </ColorButton>
            </ColorPicker.Trigger>
          </ColorPicker.Control>
          <ColorPicker.Positioner>
            <ColorPicker.Content>
              <Stack gap="3">
                <ColorPicker.Area>
                  <ColorPicker.AreaBackground />
                  <ColorPicker.AreaThumb />
                </ColorPicker.Area>
                <HStack gap="3">
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
      )}
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
