import { FC } from "react";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";

interface ICustomScaleInput {
  customScaleValue: number;
  setCustomScaleValue: Function;
  addCustomScale: Function;
}

export const CustomScaleInput: FC<ICustomScaleInput> = ({
  customScaleValue,
  setCustomScaleValue,
  addCustomScale,
}) => {
  return (
    <Flex justifyContent="center" p="4">
      <HStack>
        <Text>Add new scale value:</Text>
        <NumberInput
          w="100px"
          min={10}
          max={990}
          value={customScaleValue}
          onChange={(valueString) => setCustomScaleValue(parseInt(valueString))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button
          variant="outline"
          onClick={() => addCustomScale(customScaleValue)}
        >
          Add
        </Button>
      </HStack>
    </Flex>
  );
};
