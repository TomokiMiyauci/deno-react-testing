import { CounterStepProvider, useCounter } from "./component.tsx";
import { expect } from "./dev_deps.ts";
import {
  act,
  renderHook,
  suppressErrorOutput,
} from "@testing-library/react-hooks";
import { ReactNode } from "react";

Deno.test("should use counter", () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
  expect(typeof result.current.increment).toBe("function");
});

Deno.test("should increment counter", () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

Deno.test("should increment counter from custom initial value", () => {
  const { result } = renderHook(() => useCounter(100));

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(101);
});

Deno.test("should reset counter to updated initial value", () => {
  let initialValue = 0;
  const { result, rerender } = renderHook(() => useCounter(initialValue));

  initialValue = 10;
  rerender();

  act(() => {
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
});

Deno.test("should reset counter to updated initial value", () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useCounter(initialValue),
    {
      initialProps: { initialValue: 0 },
    },
  );

  rerender({ initialValue: 10 });

  act(() => {
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
});

Deno.test("should use custom step when incrementing", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <CounterStepProvider step={2}>{children}</CounterStepProvider>
  );
  const { result } = renderHook(() => useCounter(), { wrapper });

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(2);
});

Deno.test("should use custom step when incrementing", () => {
  const { result, rerender } = renderHook(() => useCounter(), {
    wrapper: CounterStepProvider,
    initialProps: {
      step: 2,
    },
  });

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(2);

  /**
   * Change the step value
   */
  rerender({ step: 8 });

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(10);
});

Deno.test("should use custom step when incrementing", () => {
  const { result } = renderHook(() => useCounter(), {
    wrapper: ({ children }) => (
      <CounterStepProvider step={2}>{children}</CounterStepProvider>
    ),
  });

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(2);
});

Deno.test("should increment counter after delay", {
  sanitizeResources: false,
  sanitizeOps: false,
}, async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCounter());

  result.current.incrementAsync();

  await waitForNextUpdate();

  expect(result.current.count).toBe(1);
});

Deno.test("should throw when over 9000", () => {
  const reset = suppressErrorOutput();
  const { result } = renderHook(() => useCounter(9000));

  act(() => {
    result.current.increment();
  });

  expect(result.error).toEqual(Error("It's over 9000!"));
  reset();
});
