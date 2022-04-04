import {
  act,
  renderHook,
} from "https://esm.sh/@testing-library/react-hooks/server/pure?dev";
import { expect, setupJSDOM } from "./dev_deps.ts";
import { useCounter, useTimer } from "./component.tsx";

// in SSR, DOM mock is needed
setupJSDOM();

Deno.test("should increment counter", () => {
  const { result, hydrate } = renderHook(() => useCounter());
  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(0);

  hydrate();
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);
});

Deno.test("should start the timer", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const { result, waitForValueToChange, hydrate } = renderHook(() =>
    useTimer(0)
  );
  hydrate();

  await waitForValueToChange(() => result.current.count);

  expect(result.current.count).toBe(1);
});
