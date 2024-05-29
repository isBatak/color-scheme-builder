import { Container } from "@/styled-system/jsx";
import { FC, ReactNode } from "react";

export const SectionContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return <Container maxW="75%">{children}</Container>;
};
