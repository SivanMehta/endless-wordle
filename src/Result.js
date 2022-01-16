import React from 'react';
import { generateEmojis } from './utils';

export default function Result({ word, guesses }) {
  // win condition
  if(guesses[guesses.length - 1] === word) {
    const emojis = generateEmojis(word, guesses);
    const score = '🌮'.repeat(6 - guesses.length);
    return (
      <div>
        <p>{ score }</p>
        <pre>
          { emojis }
        </pre>
      </div>
    )
  } else if (guesses.length > 5) { // lose condition
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
