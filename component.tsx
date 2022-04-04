import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * @see https://reactjs.org/docs/test-renderer.html
 */
export function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Hello</p>
    </div>
  );
}

export function SubComponent({ foo }: { foo: string }) {
  return <p className="sub">{foo}</p>;
}

export function HiddenMessage({ children }: { children: ReactNode }) {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <div>
      <label htmlFor="toggle">Show Message</label>
      <input
        id="toggle"
        type="checkbox"
        // deno-lint-ignore no-explicit-any
        onChange={(e) => setShowMessage((e.currentTarget as any).checked)}
        checked={showMessage}
      />
      {showMessage ? children : null}
    </div>
  );
}

const CounterStepContext = createContext(1);
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const step = useContext(CounterStepContext);
  const increment = useCallback(() => setCount((x) => x + step), [step]);
  const incrementAsync = useCallback(() => setTimeout(increment, 100), [
    increment,
  ]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  if (count > 9000) {
    throw Error("It's over 9000!");
  }

  return { count, increment, incrementAsync, reset };
}

export type CounterStepProviderProps = { step: number; children?: ReactNode };

export const CounterStepProvider = (
  { step, children }: CounterStepProviderProps,
) => (
  <CounterStepContext.Provider value={step}>
    {children}
  </CounterStepContext.Provider>
);

export const useTimer = (initialState = 0) => {
  const [count, setCount] = useState(initialState);
  const reset = useCallback(() => setCount(initialState), []);
  useEffect(() => {
    const intervalId = setInterval(() => setCount((c) => c + 1), 1000);
    return () => {
      clearInterval(intervalId);
    };
  });
  return { count, reset };
};

export default HiddenMessage;
