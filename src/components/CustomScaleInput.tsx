import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import * as NumberInput from "@/components/ui/number-input";
import { Flex, HStack } from "@/styled-system/jsx";
import { atom, useAtom } from "jotai";
import { Button } from "./ui/button";
import { colorsAtom, scalesAtom } from "./Palette";

export const customScaleValueAtom = atom<number>(550);

export const CustomScaleInput = () => {
  const [scales, setScales] = useAtom(scalesAtom);
  const [colors, setColors] = useAtom(colorsAtom);
  const [customScaleValue, setCustomScaleValue] = useAtom(customScaleValueAtom);

  return (
    <NumberInput.Root
      min={10}
      max={990}
      value={customScaleValue.toString()}
      onValueChange={(e) => setCustomScaleValue(e.valueAsNumber)}
      width="2xs"
    >
      <NumberInput.Label>Add new scale value</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.Input />
        <NumberInput.IncrementTrigger>
          <ChevronUpIcon />
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger>
          <ChevronDownIcon />
        </NumberInput.DecrementTrigger>
      </NumberInput.Control>
      <Button
        variant="outline"
        onClick={() => {
          if (scales.includes(customScaleValue)) {
            return;
          }

          const newScale = [...scales, customScaleValue].sort();

          setScales(newScale);

          const index = newScale.indexOf(customScaleValue);
          const newColors = [
            ...colors.slice(0, index),
            "",
            ...colors.slice(index),
          ];

          setColors(newColors);
        }}
      >
        Add
      </Button>
    </NumberInput.Root>
  );
};
