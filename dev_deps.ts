export { expect } from "https://deno.land/x/unitest@v1.0.0-beta.82/mod.ts";
export * from "https://esm.sh/@testing-library/react-hooks/native/pure?dev";

import jsdom from "https://esm.sh/jsdom@19.0.0?pin=v74";

export function setupJSDOM() {
  const { JSDOM } = jsdom;
  const doc = new JSDOM(`<!DOCTYPE html>`);
  globalThis.document = doc.window.document;
  globalThis.HTMLIFrameElement = doc.window.HTMLIFrameElement;
}
