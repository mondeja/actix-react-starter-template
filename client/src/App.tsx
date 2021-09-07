import * as React from 'react';
import * as ReactDOM from 'react-dom';

declare var __NAME__: string;
declare var __VERSION__: string;

interface AppComponentProps {
  name: string,
  version: string,
}

class App extends React.Component<AppComponentProps> {
  render() {
    return <p>
      Hello world from {this.props.name} v{this.props.version}.
    </p>
  }
}

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.render(<App name={__NAME__} version={__VERSION__}/>, rootElement);

// #if __DEBUG__
console.log(`${__NAME__} v${__VERSION__}`);
// #endif
