import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode,setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(nextMode, replace = false) {
    setMode(nextMode)

    if(replace) {
      setHistory(prev => [prev[0]])
    }
    setHistory(prev => [...prev, nextMode])
  }

  function back() {
    history.pop()

    if(history.length) {
      const prevMode = history[history.length - 1]
      setMode(prevMode);
    }
  }
  return {mode,transition,back};
}

// Create a transition function within useVisualMode that will take in a new mode and update the mode state with the new value. If we used useState to initialize the mode state in useVisualMode, what will we have to do to update the mode value?