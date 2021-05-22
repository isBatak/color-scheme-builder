import * as React from "react";
import chroma from "chroma-js";
import {
  scaleLog,
  scaleLinear,
  scalePow,
  scaleSqrt,
  scaleSequential
} from "d3-scale";
import { Select } from "@chakra-ui/select";
import { Input } from "@chakra-ui/input";
import { Box, Container, Flex, HStack, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";

function colorBoxStyle(color: string) {
  return {
    backgroundColor: color,
    height: "50px"
  };
}

const scales = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const startDomain = 0.1;
const endDomain = 0.9;

function palette(hex: string, selectedScale: number) {
  const color = chroma(hex);
  const luminance = chroma(hex).luminance();
  const selectedIndex = scales.indexOf(selectedScale);

  // color scale before current color

  const logScaleBefore = scaleLinear()
    .domain([scales[0], scales[selectedIndex + 1]])
    .range([luminance, endDomain]);

  const previousScales = [...Array(selectedIndex + 1)]
    .map((_, index) => {
      return logScaleBefore(scales[index]);
    })
    .reverse();

  const afterCount = scales.length - (selectedIndex + 1);
  const logScaleAfter = scaleLinear()
    .domain([scales[selectedIndex], scales[scales.length - 1]])
    .range([luminance, startDomain]);

  const nextScales = [...Array(afterCount)].map((_, index) => {
    return logScaleAfter(scales[selectedIndex + 1 + index]);
  });

  console.log(scales.length, selectedIndex + 1, [
    ...previousScales,
    ...nextScales
  ]);

  return [...previousScales, ...nextScales].map((lum) => {
    return chroma(hex).luminance(lum).hex();
  });
}

export default function Home() {
  const [hex, setHex] = React.useState("#0070f3");
  const [selectedScale, setSelectedScale] = React.useState(scales[6]);

  const colors = React.useMemo(() => palette(hex, selectedScale), [
    hex,
    selectedScale
  ]);

  return (
    <div className="App">
      <Flex justifyContent="center" p="4">
        <HStack>
          <Select
            placeholder="Select option"
            value={selectedScale}
            onChange={(e) => setSelectedScale(parseInt(e.target.value, 10))}
          >
            {scales.map((scale) => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </Select>
          <Input type="text" value={hex} onChange={(e) => setHex(e.target.value)} />
          <Input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
          />
        </HStack>
      </Flex>
      <Container>
        <Box border="1px" borderColor="gray.200" borderRadius="md" p="4">
          {colors.map((c, index) => {
            const isSelected = selectedScale === scales[index];

            return (
              <Flex
                key={c}
                alignItems="center"
                fontWeight={isSelected ? "bold" : undefined}
                color={isSelected ? "black" : 'gray.600'}
              >
                <Text w="50px" textAlign="center" sx={isSelected ? { borderWidth: '1px', borderColor: 'gray.300', borderRadius: "50px" } : undefined}>
                  {scales[index]}
                </Text>
                <Text w="100px" textAlign="center">
                  {c}
                </Text>
                <div style={{ ...colorBoxStyle(c), flex: 1 }} />
              </Flex>
            );
          })}
          <Textarea readOnly mt="4" fontSize="xs" rows={scales.length + 2}>
            {colors.reduce((prev, current, index) => {
              return `${prev}${index === 0 ? '{\n' : '\n'}\t${scales[index]}: ${current},`;
            }, '') + '\n}'}
          </Textarea>
        </Box>
      </Container>
    </div>
  );
}
