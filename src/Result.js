import React from 'react';
import { generateEmojis } from './utils';

export default function Result({ word, guesses }) {
  // win condition
  if(guesses[guesses.length - 1] === word) {
    const emojis = generateEmojis(word, guesses);
    return (
      <pre>
        { emojis }
      </pre>
    )
  } else if (guesses.length > 5) { // loose condition
    return (
      <>
        <p>You lose =(</p>
        <p>The word was { word }</p>
      </>
    );
  } else {
    return null
  }
}
