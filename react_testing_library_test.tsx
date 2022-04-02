import { HiddenMessage } from "./component.tsx";
import jsdom from "https://esm.sh/jsdom@19.0.0?pin=v74";
import { expect } from "./dev_deps.ts";

Deno.test("setup", async (t) => {
  const { JSDOM } = jsdom;
  const doc = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  globalThis.document = doc.window.document;
  globalThis.HTMLIFrameElement = doc.window.HTMLIFrameElement;

  await t.step({
    name: "shows the children when the checkbox is checked",
    fn: async () => {
      // this module depends on DOM. it should mock DOM before importing this module
      const { render, screen, fireEvent } = await import(
        "@testing-library/react"
      )
        .then((module) => module.default);

      const testMessage = "Test Message";
      render(<HiddenMessage>{testMessage}</HiddenMessage>);

      expect(screen.queryByText(testMessage)).toBeNull();
      fireEvent.click(screen.getByLabelText(/show/i));
      expect(screen.getByText(testMessage)).toBeDefined();
    },
  });
});
