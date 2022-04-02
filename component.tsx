import { ReactNode, useCallback, useState } from "react";

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

export function useCounter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
}

export default HiddenMessage;
