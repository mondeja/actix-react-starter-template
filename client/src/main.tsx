import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App";

declare const __NAME__: string;
declare const __VERSION__: string;

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.render(<App name={__NAME__} version={__VERSION__} />, rootElement);

/// #if DEBUG
console.log(`${__NAME__} v${__VERSION__} hola`);
/// #endif
