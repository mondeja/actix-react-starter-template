import * as React from "react";

import styles from "./App.module.css";

export interface AppProps {
  /** Application name */
  name: string;

  /** Application version */
  version: string;
}

/**
 * Application main entry point component.
 *
 * @property {@link AppProps} props - App component properties.
 */
export class App extends React.Component<AppProps> {
  render(): JSX.Element {
    return (
      <p className={styles.app}>
        Hello world from {this.props.name} v{this.props.version}.
      </p>
    );
  }
}
