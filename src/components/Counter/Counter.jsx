import { useEffect, useReducer, useState } from 'react';
import styles from './Counter.css';

const colors = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};
let initialCount = { count: 0, color: 'rgb(236, 222, 153)' };

const countReducer = (count, action) => {
  console.log('COUNT:', action);
  switch (action.type) {
    case 'add': {
      return { ...count, count: action.count + 1 };
    }
    case 'subtract': {
      return { ...count, count: action.count - 1 };
    }
    case 'reset': {
      return { ...count, count: (action.count = 0) };
    }
    case 'yellow': {
      return { ...count, color: 'rgb(236, 222, 153)' };
    }
    case 'red': {
      return { ...count, color: colors.red };
    }
    case 'green': {
      return { ...count, color: colors.green };
    }
    default: {
      throw Error('Unknown action type');
    }
  }
};
export default function Counter() {
  // const [count, setCount] = useState(0);
  // const [currentColor, setCurrentColor] = useState(colors.yellow);

  const [countObj, dispatch] = useReducer(countReducer, initialCount);
  // const [color, setColor] = useState('rgb(236, 222, 153)');

  const increment = () => {
    dispatch({ type: 'add', count: countObj.count });
  };

  const decrement = () => {
    dispatch({ type: 'subtract', count: countObj.count });
  };

  const reset = () => {
    dispatch({ type: 'reset', count: countObj.count });
  };
  const changeRed = () => {
    dispatch({ type: 'red', color: countObj.color });
  };
  const changeYellow = () => {
    dispatch({ type: 'yellow', color: countObj.color });
  };
  const changeGreen = () => {
    dispatch({ type: 'green', color: countObj.color });
  };

  useEffect(() => {
    if (countObj.count === 0) {
      changeYellow();
    }

    if (countObj.count > 0) {
      changeGreen();
    }

    if (countObj.count < 0) {
      changeRed();
    }
  }, [countObj.count]);

  return (
    <main className={styles.main}>
      <h1 style={{ color: countObj.color }}>{countObj.count}</h1>
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
