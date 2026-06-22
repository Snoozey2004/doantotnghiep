import { useState, useCallback } from 'react';

export function useUndoRedo(initialState = []) {
  const [history, setHistory] = useState([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const undo = useCallback(() => {
    if (canUndo) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [canRedo]);

  const recordChange = useCallback((newState) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, currentIndex + 1);
      return [...newHistory, newState];
    });
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex]);

  const currentState = history[currentIndex];

  const reset = useCallback((state) => {
    setHistory([state]);
    setCurrentIndex(0);
  }, []);

  return {
    currentState,
    canUndo,
    canRedo,
    undo,
    redo,
    recordChange,
    reset
  };
}
