import React from 'react';
import { generateEmojis, difficulty } from './utils';

export default function Result({ word, guesses }) {
  // win condition
  if(guesses[guesses.length - 1] === word) {
    const emojis = generateEmojis(word, guesses);
    const score = '🌮'.repeat(difficulty - guesses.length);
    return (
      <pre>
        <p>{ score }</p>
        { emojis }
      </pre>
    )
  } else if (guesses.length > difficulty) { // lose condition
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
