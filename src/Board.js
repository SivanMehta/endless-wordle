import React, { useState } from 'react';
import { generateColors, generateEmojis } from './utils';

function Guess({ word, guess, submitted }) {
  let colors = new Array(word.length).fill('false');
  if(submitted) {
    colors = generateColors(word, guess);
  }

  const letters = guess.padEnd(word.length, '-'); // empty space
  return (
    <div className={'guess'}>
      { letters.split("").map((letter, i) => <span key={ i } className={ colors[i] }>{ letter }</span>) }
    </div>
  );
}

function Input({ guess, setGuess, word }) {
  return (
    <input
      type='text'
      value={ guess }
      onChange={e => setGuess(e.target.value.slice(0, word.length).toUpperCase()) } // limit to word length
    />
  )
}

function Submit({ onSubmit }) {
  return <button type='submit' onClick={ onSubmit }>Submit</button>
}

function Result({ outcome, word, guesses }) {
  if(outcome == 0) return null;

  if(outcome == 1) {
    const emojis = generateEmojis(word, guesses);
    return (
      <pre>
        { emojis }
      </pre>
    )
  }

  if(outcome == 2) {
    return (
      <>
        <p>You lose =(</p>
        <p>The word was { word }</p>
      </>
    );
  }
}


export default function Board({ word }) {
  const [ guesses, setGuesses ] = useState([]);
  const [ guess, setGuess ] = useState('');
  const [ outcome, setOutcome ] = useState(0);
  const [ done, setDone ] = useState(false);

  function submit() {
    if(guess.length === 0) return;
    setGuesses([...guesses, guess]);
    setGuess('');
  }

  if(!done) {
    if(guesses[guesses.length - 1] === word) {
      setOutcome(1);
      setDone(true);
    } else if(guesses.length > 5) {
      setOutcome(2);
      setDone(true);
    }
  }

  return (
    <>
      { guesses.map((g, i) => <Guess key={ i } word={ word } guess={ g } submitted={ true }/>) }
      <Guess word={ word } guess={ guess } submitted={ false }/>
      <Input word={ word } guess={ guess } setGuess={ setGuess } onSubmit={submit} />
      <br />
      <Submit onSubmit={ submit }/>
      <Result
        outcome={ outcome }
        word={ word }
        guesses={ guesses }/>
    </>
  )
}
