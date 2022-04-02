import { useCounter } from "./component.tsx";
import { expect } from "./dev_deps.ts";
import { act, renderHook } from "@testing-library/react-hooks";

Deno.test("should use counter", () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
  expect(typeof result.current.increment).toBe("function");

  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);
});
