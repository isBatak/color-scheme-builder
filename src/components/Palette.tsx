import { Flex, Box } from "@/styled-system/jsx";
import { Color } from "@/components/Color";
import { LockButton } from "@/components/LockButton";
import { ClearButton } from "@/components/ClearButton";
import { atom, useAtom } from "jotai";
import { defaultColors, defaultScales } from "@/consts/defaultValues";
import { sortNumbers } from "src/utils/math-utils";
import { generateColors, rgbaToHex } from "src/utils/color-utils";
import { distributionAtom } from "./Distribution";

export const colorsAtom = atom(defaultColors);
export const scalesAtom = atom(defaultScales);
// export const defaultColorsAtom = atom(defaultColors);
// export const customScaleValuesAtom = atom<number[]>([]);
// export const customScaleValueAtom = atom<number>(550);

export const paletteAtom = atom((get) => {
  const distribution = get(distributionAtom);
  const colors = get(colorsAtom);
  const scales = get(scalesAtom);

  console.log(colors, scales);

  return generateColors(colors, scales, distribution);
});

export interface PaletteProps {}

export function Palette() {
  const [scales] = useAtom(scalesAtom);
  const [palette] = useAtom(paletteAtom);

  //   const removeCustomScale = (scale: number) => {
  //     if (!scales.includes(scale)) {
  //       return;
  //     }

  //     const customScaleIndex = customScaleValues.indexOf(scale);
  //     const scaleIndex = scales.indexOf(scale);
  //     customScaleValues.splice(customScaleIndex, 1);
  //     definedColors.splice(scaleIndex, 1);

  //     setCustomScaleValues(customScaleValues);
  //     defineColors(definedColors);

  //     const newScale = sortNumbers(defaultScales.concat(customScaleValues));
  //     updateColors(definedColors, newScale);
  //   };

  //   const defineColor = (scale: number, color: string) => {
  //     const index = scales.indexOf(scale);
  //     definedColors[index] = color;
  //     defineColors(definedColors);
  //     updateColors(definedColors);
  //   };

  return (
    <Box p="4">
      {palette.map((color, i) => {
        // hide first and last scale
        if (i === 0 || i === scales.length - 1) return null;

        // const isCustom = customScaleValues.includes(scale);
        // const isDefined = Boolean(definedColors[i]);

        return (
          <Flex
            key={scales[i]}
            alignItems="center"
            // bg={isDefined ? "gray.100" : undefined}
          >
            {/* <ClearButton
              label="Clear custom scale value"
              onClick={() => removeCustomScale(scale)}
              disabled={!isCustom}
            /> */}

            <Color
              name={scales[i].toString()}
              value={color}
              onChange={(value) => {
                // defineColor(scale, rgbaToHex(value));
              }}
            />

            {/* <LockButton
              label="Clear defined color"
              onClick={() => defineColor(scale, "")}
              disabled={!isDefined}
            /> */}
          </Flex>
        );
      })}
    </Box>
  );
}
