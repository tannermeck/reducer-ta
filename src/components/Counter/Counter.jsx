import { useEffect, useReducer, useState } from 'react';
import styles from './Counter.css';

const colors = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};
let initialCount = { count: 0, color: 'rgb(236, 222, 153)' };

const countReducer = (count, action) => {
  console.log('COUNT:', count, 'action', action);
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
    case 'CHANGE_COLOR': {
      return { ...count, color: action.color };
    }
    default: {
      throw Error('Unknown action type');
    }
  }
};
export default function Counter() {
  const [countObj, dispatch] = useReducer(countReducer, initialCount);

  useEffect(() => {
    if (countObj.count === 0) {
      dispatch({ type: 'CHANGE_COLOR', color: colors.yellow });
    }

    if (countObj.count > 0) {
      dispatch({ type: 'CHANGE_COLOR', color: colors.green });
    }

    if (countObj.count < 0) {
      dispatch({ type: 'CHANGE_COLOR', color: colors.red });
    }
  }, [countObj.count]);

  return (
    <main className={styles.main}>
      <h1 style={{ color: countObj.color }}>{countObj.count}</h1>
      <div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'add', ...countObj })}
          aria-label="increment"
          style={{ backgroundColor: colors.green }}
        >
          Increment
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'subtract', ...countObj })}
          aria-label="decrement"
          style={{ backgroundColor: colors.red }}
        >
          Decrement
        </button>
        <button
          type="button"
          aria-label="reset"
          onClick={() => dispatch({ type: 'reset', ...countObj })}
          style={{ backgroundColor: colors.yellow }}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
