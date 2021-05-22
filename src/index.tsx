import { ChakraProvider } from "@chakra-ui/react";
import { render } from "react-dom";

import { App } from "./components/App";

const rootElement = document.getElementById("root");

render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  rootElement
);
