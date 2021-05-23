import React, { useState } from "react";
import { Input, Box, Container, Flex, Text, HStack, Select } from "@chakra-ui/react";
import { defaultColors, defaultScales } from "../consts/defaultValues";
import { CustomScaleInput } from "./CustomScaleInput";
import { OutputColorsJson } from "./OutputColorsJson";
import { ClearButton } from "./ClearButton";
import { generateColors, distributionFunctionTypes } from "../utils/color-utils";
import { sortNumbers } from "../utils/math-utils";

export const App = () => {
  const [colors, setColors] = useState(defaultColors);
  const [definedColors, defineColors] = useState(defaultColors);

  const [selectedFunction, selectFunction] = useState<string>('linear');

  const [customScaleValues, setCustomScaleValues] = useState<number[]>([]);
  const [customScaleValue, setCustomScaleValue] = useState<number>(550);

  const scales = sortNumbers(defaultScales.concat(customScaleValues));

  const updateColors = (_colors?: string[], _scales?: number[]) => {
    setColors(generateColors(_colors || definedColors, _scales || scales, selectedFunction));
  };

  const defineColor = (scale: number, color: string) => {
    const index = scales.indexOf(scale);
    definedColors[index] = color;
    defineColors(definedColors);
    updateColors(definedColors);
  };

  const addCustomScale = (scale: number) => {
    if (scales.includes(scale)) {
      return;
    }

    customScaleValues.push(scale);
    const newScale = sortNumbers(defaultScales.concat(customScaleValues));

    const index = newScale.indexOf(scale);
    const newDefinedColors = [
      ...definedColors.slice(0, index),
      "",
      ...definedColors.slice(index),
    ];

    setCustomScaleValues(customScaleValues);
    defineColors(newDefinedColors);
    updateColors(newDefinedColors, newScale);
  };

  const removeCustomScale = (scale: number) => {
    if (!scales.includes(scale)) {
      return;
    }

    const index = customScaleValues.indexOf(scale);
    customScaleValues.splice(index, 1);
    definedColors.splice(index, 1);

    setCustomScaleValues(customScaleValues);
    defineColors(definedColors);
    updateColors(definedColors, customScaleValues);
  };

  React.useEffect(() => {
    updateColors();
  }, [selectedFunction]);

  return (
    <div className="App">
      <Flex justifyContent="center" p="4">
        <HStack>
          <Text>Distribution function:</Text>
          <Select
            w="100px"
            value={selectedFunction}
            onChange={(e) => selectFunction(e.target.value)}
          >
            {distributionFunctionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </HStack>
      </Flex>

      <Container>
        <Box borderColor="gray.200" borderRadius="md" p="4">
          {scales.map((scale, i) => {
            if (i === 0 || i === scales.length - 1) return null;

            const isCustom = customScaleValues.includes(scale);
            const isDefined = Boolean(definedColors[i]);

            return (
              <Flex
                key={scale}
                alignItems="center"
                bg={isDefined ? "gray.100" : undefined}
              >
                <ClearButton
                  label="Clear custom scale value"
                  onClick={() => removeCustomScale(scale)}
                  disabled={!isCustom}
                />

                <Text
                  w="80px"
                  textAlign="center"
                  textDecoration={isCustom ? "underline" : undefined}
                  fontWeight={isDefined ? "bold" : "normal"}
                >
                  {scale}
                </Text>

                <Input
                  type="text"
                  w="160px"
                  value={colors[i]}
                  fontWeight={isDefined ? "bold" : "normal"}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value.length === 7 && value.startsWith("#")) {
                      defineColor(scale, e.target.value);
                    }
                  }}
                />

                <Input
                  type="color"
                  border="none"
                  px="10px"
                  h="50px"
                  value={colors[i]}
                  onChange={(e) => defineColor(scale, e.target.value)}
                />

                <ClearButton
                  label="Clear defined color"
                  onClick={() => defineColor(scale, "")}
                  disabled={!isDefined}
                />
              </Flex>
            );
          })}

          <CustomScaleInput
            {...{ addCustomScale, customScaleValue, setCustomScaleValue }}
          />

          <OutputColorsJson {...{ colors, scales }} />
        </Box>
      </Container>
    </div>
  );
};
