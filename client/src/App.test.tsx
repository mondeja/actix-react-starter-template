import * as React from "react";
import renderer from "react-test-renderer";
import App from "./App";

test("renders hello world paragraph", () => {
  const component = renderer.create(<App name="foo" version="1.2.0" />);

  let tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
<p>
  Hello world from 
  foo
   v
  1.2.0
  .
</p>
`);
});
