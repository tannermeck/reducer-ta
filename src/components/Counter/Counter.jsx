import { useEffect, useReducer, useState } from 'react';
import styles from './Counter.css';

const colors = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};
let initialCount = { count: 0, color: 'rgb(236, 222, 153)' };

const countReducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      return state.count + 1;
    }
    case 'subtract': {
      return state.count - 1;
    }
    case 'reset': {
      return state.count === 0;
    }
    default: {
      throw Error('Unknown action type');
    }
  }
};
export default function Counter() {
  // const [count, setCount] = useState(0);
  // const [currentColor, setCurrentColor] = useState(colors.yellow);

  const [state, dispatch] = useReducer(countReducer, initialCount);

  useEffect(() => {
    if (state.count === 0) {
      setCurrentColor(colors.yellow);
    }

    if (state.count > 0) {
      setCurrentColor(colors.green);
    }

    if (state.count < 0) {
      setCurrentColor(colors.red);
    }
  }, [state.count]);

  // const increment = () => {
  //   setCount((prevState) => prevState + 1);
  // };

  // const decrement = () => {
  //   setCount((prevState) => prevState - 1);
  // };

  // const reset = () => {
  //   setCount(0);
  // };

  return (
    <main className={styles.main}>
      <h1 style={{ color: currentColor }}>{count}</h1>
      <div>
        <button
          type="button"
          onClick={increment}
          aria-label="increment"
          style={{ backgroundColor: colors.green }}
        >
          Increment
        </button>
        <button
          type="button"
          onClick={decrement}
          aria-label="decrement"
          style={{ backgroundColor: colors.red }}
        >
          Decrement
        </button>
        <button
          type="button"
          aria-label="reset"
          onClick={reset}
          style={{ backgroundColor: colors.yellow }}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
