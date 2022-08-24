import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
// @ts-expect-error container is in the dom
const root = createRoot(container);
root.render(<App />);
