import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as Select from "@/components/ui/select";
import { atom, useAtom } from "jotai";

type Item = { label: string; value: string; disabled?: boolean };

export const distributionFunctionTypes: Array<Item> = [
  { label: "Linear", value: "linear" },
  { label: "Log", value: "log" },
  { label: "Pow", value: "pow" },
  { label: "Sqrt", value: "sqrt" },
];

export const distributionAtom = atom(distributionFunctionTypes[0].value);

export const Distribution = () => {
  const [distribution, setDistribution] = useAtom(distributionAtom);

  return (
    <Select.Root
      positioning={{ sameWidth: true }}
      width="2xs"
      items={distributionFunctionTypes}
      value={[distribution]}
      onValueChange={(e) => setDistribution(e.value[0])}
    >
      <Select.Label>Distribution function</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText
            // @ts-ignore
            placeholder="Select a distribution"
          />
          <ChevronsUpDownIcon />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {distributionFunctionTypes.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator>
                <CheckIcon />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};
