import { ChakraProvider } from "@chakra-ui/react";

import "./styles.css";

import Home from "./components/Home";

export default function App() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}
