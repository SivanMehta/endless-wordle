import React from 'react';
import { generateEmojis, difficulty } from './utils';

function Submit({ onSubmit, disabled }) {
  return (
    <button
      onClick={ onSubmit }
      disabled={ disabled }>
        Submit
    </button>
  );
}

function Reset() {
  return (
    <button
      onClick={ () => location.reload() }>
      Reset
    </button>
  );
}

export default function Result({ word, guesses, guess, onSubmit }) {
  if(guesses[guesses.length - 1] === word) { // win condition
    const emojis = generateEmojis(word, guesses);
    const score = '🌮'.repeat(difficulty - guesses.length + 1);
    return (
      <div>
        <Reset />
        <pre>
          <p>{ score }</p>
          { emojis }
        </pre>
      </div>
    )
  } else if (guesses.length > difficulty) { // lose condition
    return (
      <div>
        <Reset />
        <>
          <p>You lose =(</p>
          <p>The word was { word }</p>
        </>
      </div>
    );
  } else { // active game
    return (
      <Submit onSubmit={ onSubmit } disabled={ guess.length !== difficulty } />
    );
  }
}
