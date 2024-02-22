import * as React from "react";
import { createRoot } from "react-dom/client";

import "reset-css";
import "@fontsource/paytone-one";
import "./global-styles.scss";

import { App } from "./components";

declare const __NAME__: string;
declare const __VERSION__: string;

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App name={__NAME__} version={__VERSION__} />);

/// #if DEBUG
console.log(`${__NAME__} v${__VERSION__}`);
/// #endif
