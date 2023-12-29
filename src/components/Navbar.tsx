import { css, cx } from "@/styled-system/css";
import { Box, Container, HStack } from "@/styled-system/jsx";
import { button } from "@/styled-system/recipes";
import { GithubIcon, TwitterIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Text } from "@/components/ui/text";

export interface NavbarProps {}

export function Navbar(props: PropsWithChildren<NavbarProps>) {
  return (
    <Box
      borderBottom="1px solid token(colors.border.default)"
      pos="sticky"
      top="0"
      bg="bg.default"
      zIndex="sticky"
      {...props}
    >
      <Container>
        <HStack justify="space-between" py="3" gap="8">
          <Text
            as="a"
            textStyle="lg"
            href="/"
            aria-label="Go to start page"
            fontWeight="bold"
          >
            Color Scheme Builder
          </Text>

          <HStack gap={{ base: "2", md: "4" }}>
            <HStack gap="0.5">
              <a
                href="https://twitter.com/_isBatak"
                target="_blank"
                className={cx(
                  button({ variant: "ghost" }),
                  css({ px: "0", display: { base: "none", sm: "inline-flex" } })
                )}
              >
                <TwitterIcon />
              </a>
              <a
                href="https://github.com/isBatak/color-scheme-builder"
                target="_blank"
                className={cx(
                  button({ variant: "ghost" }),
                  css({ px: "0", display: { base: "none", sm: "inline-flex" } })
                )}
              >
                <GithubIcon />
              </a>
            </HStack>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}