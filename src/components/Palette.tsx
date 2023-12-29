import { Flex, Box } from "@/styled-system/jsx";
import { PaletteColor } from "@/components/PaletteColor";
import { LockButton } from "@/components/LockButton";
import { ClearButton } from "@/components/ClearButton";
import { atom, useAtom } from "jotai";
import { defaultScales } from "@/consts/defaultValues";
import { sortNumbers } from "src/utils/math-utils";
import { generatePalette, rgbaToHex } from "src/utils/color-utils";
import { distributionAtom } from "./Distribution";
import { Color } from "@zag-js/color-utils";

export const scalesAtom = atom(defaultScales);

export const paletteAtom = atom(
  (get) => {
    const distribution = get(distributionAtom);
    const scales = get(scalesAtom);

    console.log(scales);

    return generatePalette(scales, distribution);
  },
  (get, set, update: Color[]) => {
    set(paletteAtom, update);
  }
);

export interface PaletteProps {}

export function Palette() {
  const [scales] = useAtom(scalesAtom);
  const [palette, setPalette] = useAtom(paletteAtom);

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

            <PaletteColor
              name={scales[i].toString()}
              value={color.toString("hex")}
              onChange={(color) => {
                console.log(color);
                const newPalette = [...palette];
                newPalette[i] = color;
                setPalette(newPalette);
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
