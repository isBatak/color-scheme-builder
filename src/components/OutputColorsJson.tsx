import { FC } from "react";
import { Textarea } from "@chakra-ui/textarea";

interface IOutputColorsJson {
  colors: string[];
  scales: number[];
}

export const OutputColorsJson: FC<IOutputColorsJson> = ({ colors, scales }) => {
  return (
    <Textarea
      readOnly
      mt="4"
      fontSize="xs"
      rows={scales.length + 2}
      value={
        colors
          .slice(1, colors.length - 1)
          .reduce(
            (prev, current, index) =>
              `${prev}${index === 0 ? "{\n" : "\n"}\t${
                scales[index + 1]
              }: ${current.toUpperCase()},`,
            ""
          ) + "\n}"
      }
    />
  );
};
