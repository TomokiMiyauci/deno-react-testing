import { MyComponent, SubComponent } from "./component.tsx";
import TestRenderer from "react-test-renderer";
import { expect } from "./dev_deps.ts";

Deno.test("should be render props", () => {
  const testRenderer = TestRenderer.create(<MyComponent />);
  const testInstance = testRenderer.root;

  expect(testInstance.findByType(SubComponent).props.foo).toBe("bar");
  expect(testInstance.findByProps({ className: "sub" }).children).toEqual([
    "bar",
  ]);
});
