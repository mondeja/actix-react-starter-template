import * as React from "react";

import styles from "./App.module.css";

interface AppComponentProps {
  name: string;
  version: string;
}

export default class App extends React.Component<AppComponentProps> {
  render(): JSX.Element {
    return (
      <p className={styles.app}>
        Hello world from {this.props.name} v{this.props.version}.
      </p>
    );
  }
}
