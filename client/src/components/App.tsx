import * as React from "react";

interface AppComponentProps {
  name: string;
  version: string;
}

export default class App extends React.Component<AppComponentProps> {
  render() {
    return (
      <p>
        Hello world from {this.props.name} v{this.props.version}.
      </p>
    );
  }
}
