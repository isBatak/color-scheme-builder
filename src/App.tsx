import React, { useState } from "react";
import {
  Input,
  Container,
  Flex,
  Text,
  HStack,
  Select,
  VStack,
} from "@chakra-ui/react";
import { defaultColors, defaultScales } from "./consts/defaultValues";
import { CustomScaleInput } from "./components/CustomScaleInput";
import { OutputColorsJson } from "./components/OutputColorsJson";
import { ClearButton } from "./components/ClearButton";
import {
  generateColors,
  distributionFunctionTypes,
  rgbaToHex,
} from "./utils/color-utils";
import { sortNumbers } from "./utils/math-utils";
import { LockButton } from "./components/LockButton";
import { Color } from "./components/Color";
import { Box } from "@/styled-system/jsx";
import { SectionContainer } from "./components/shared/SectionContainer";
import { css } from "@/styled-system/css";

export const App = () => {
  const [colors, setColors] = useState(defaultColors);
  const [definedColors, defineColors] = useState(defaultColors);

  const [selectedFunction, selectFunction] = useState<string>("linear");

  const [customScaleValues, setCustomScaleValues] = useState<number[]>([]);
  const [customScaleValue, setCustomScaleValue] = useState<number>(550);

  const scales = sortNumbers(defaultScales.concat(customScaleValues));

  const updateColors = (_colors?: string[], _scales?: number[]) => {
    setColors(
      generateColors(
        _colors || definedColors,
        _scales || scales,
        selectedFunction
      )
    );
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

    const customScaleIndex = customScaleValues.indexOf(scale);
    const scaleIndex = scales.indexOf(scale);
    customScaleValues.splice(customScaleIndex, 1);
    definedColors.splice(scaleIndex, 1);

    setCustomScaleValues(customScaleValues);
    defineColors(definedColors);

    const newScale = sortNumbers(defaultScales.concat(customScaleValues));
    updateColors(definedColors, newScale);
  };

  React.useEffect(() => {
    updateColors();
  }, [selectedFunction]);

  return (
    <div className="App">
      <SectionContainer>
        <VStack w="full" alignItems="flex-start" mb={{ base: 4, md: 10 }}>
          <HStack w="full">
            <Text minW="200px"> Distribution function:</Text>
            <Select
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
        </VStack>

        <Flex flexDirection={{ base: "column", lg: "row" }}>
          <VStack spacing={2} p="4" flex="1" maxW="750px">
            {scales.map((scale, i) => {
              if (i === 0 || i === scales.length - 1) return null;

              const isCustom = customScaleValues.includes(scale);

              const isDefined = Boolean(definedColors[i]);

              const index = scales.indexOf(scale);
              const isLocked = Boolean(definedColors[index] === "");

              console.log("scale:", scale + " - " + isLocked);

              return (
                <Flex
                  key={scale}
                  alignItems="center"
                  className={css({
                    p: 4,
                    borderRadius: "md",
                    bg: "gray.100",
                    _osDark: { bg: "gray.200" },
                  })}
                >
                  <ClearButton
                    label="Clear custom scale value"
                    onClick={() => removeCustomScale(scale)}
                    disabled={!isCustom}
                  />

                  {/* <Text
                  w="80px"
                  textAlign="center"
                  textDecoration={isCustom ? "underline" : undefined}
                  fontWeight={isDefined ? "bold" : "normal"}
                >
                  {scale}
                </Text> */}

                  {/* <Text>{colors[i]}</Text> */}

                  <Color
                    name={scale.toString()}
                    value={colors[i]}
                    onChange={(value) => {
                      defineColor(scale, rgbaToHex(value));
                    }}
                  />

                  {/* <Input
                  type="color"
                  border="none"
                  shadow="md"
                  p="0"
                  h="50px"
                  value={colors[i]}
                  onChange={(e) => {
                    console.log(e.target.value);
                    defineColor(scale, e.target.value);
                  }}
                /> */}

                <LockButton
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
          </VStack>

          <Box flex="1" maxW="500px">
            <OutputColorsJson {...{ colors, scales }} />
          </Box>
        </Flex>
      </SectionContainer>
    </div>
  );
};
