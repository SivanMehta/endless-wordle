import React, { useState } from 'react';
import { generateColors, generateEmojis, difficultyMap } from './utils';
import Result from './Result';

function Guess({ word, guess, submitted }) {
  let colors = new Array(word.length).fill('false');
  if(submitted) {
    colors = generateColors(word, guess);
  }

  const letters = guess
    .padEnd(word.length, '-') // empty space
    .split("")
    .map((letter, i) => (
      <div key={ i } className={ `tile ${colors[i]}` }>{ letter }</div>
    ));
  return (
    <div className='guess'>
      { letters }
    </div>
  );
}

function Input({ guess, setGuess, word }) {
  return (
    <input
      className='guess'
      type='text'
      value={ guess }
      onChange={e => setGuess(e.target.value.slice(0, word.length).toUpperCase()) } // limit to word length
    />
  )
}

function Difficulties() {
  const url = window.location.origin + window.location.pathname;
  return (
    <details>
      <summary>Difficulties</summary>
      <nav>
        <a href={`${url}?difficulty=easy`}>Easy</a>
        <a href={`${url}`}>Normal</a>
        <a href={`${url}?difficulty=hard`}>Hard</a>
        <a href={`${url}?difficulty=impossible`}>Impossible</a>
      </nav>
    </details>
  )
}

export default function Board({ word }) {
  const [ guesses, setGuesses ] = useState([]);
  const [ guess, setGuess ] = useState('');

  function submit() {
    setGuesses([...guesses, guess]);
    setGuess('');
  }

  return (
    <>
      { guesses.map((g, i) => <Guess key={ i } word={ word } guess={ g } submitted={ true }/>) }
      <Guess word={ word } guess={ guess } submitted={ false }/>
      <Input word={ word } guess={ guess } setGuess={ setGuess } onSubmit={submit} />
      <br />
      <Result
        onSubmit={ submit }
        word={ word }
        guess={ guess }
        guesses={ guesses }/>
      <Difficulties />
    </>
  )
}
