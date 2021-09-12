import * as React from "react";
import * as ReactDOM from "react-dom";

import "reset-css";
import "@fontsource/paytone-one";
import "./global-styles.css";

import { App } from "./components";

declare const __NAME__: string;
declare const __VERSION__: string;

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.render(<App name={__NAME__} version={__VERSION__} />, rootElement);

/// #if DEBUG
console.log(`${__NAME__} v${__VERSION__}`);
/// #endif
