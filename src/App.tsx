import { useState } from "react";
import "./App.css";
import OBR from "@owlbear-rodeo/sdk";
import List from "./components/List/List";
import "./index.css";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MantineProvider>
        <List />
      </MantineProvider>
    </>
  );
}

export default App;
