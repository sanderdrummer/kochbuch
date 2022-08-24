import { StrictMode } from "react";
import { BaseStyles } from "./common/reset";

import { RootRoutes } from "./routes";

function App() {
  return (
    <StrictMode>
      <BaseStyles />
      <RootRoutes />
    </StrictMode>
  );
}

export default App;
