import * as React from "react";

import renderer from "react-test-renderer";

import App from "./App";

test("renders hello world paragraph", () => {
  const componentA = renderer.create(<App name="foo" version="1.2.0" />);
  const treeA = componentA.toJSON();
  expect(treeA).toMatchInlineSnapshot(`
<p
  className="app"
>
  Hello world from 
  foo
   v
  1.2.0
  .
</p>
`);

  const componentB = renderer.create(<App name="bar" version="0.0.1" />);
  const treeB = componentB.toJSON();
  expect(treeB).toMatchInlineSnapshot(`
<p
  className="app"
>
  Hello world from 
  bar
   v
  0.0.1
  .
</p>
`);
});
