import React, { useState } from 'react';
import { generateColors, generateEmojis, difficultyMap, Link } from './utils';
import Result from './Result';
import Keyboard from "./Keyboard";

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

function Difficulties() {
  const url = window.location.origin + window.location.pathname;
  return (
    <details>
      <summary>Difficulties</summary>
      <div>
        <Link href={`${url}?difficulty=easy`}>Easy</Link>
        <Link href={`${url}`}>Normal</Link>
        <Link href={`${url}?difficulty=hard`}>Hard</Link>
        <Link href={`${url}?difficulty=impossible`}>Impossible</Link>
      </div>
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
      <Keyboard word={ word } guess={ guess } setGuess={ setGuess } onSubmit={ submit } />
      <br />
      <Result
        word={ word }
        guess={ guess }
        guesses={ guesses }/>
      <Difficulties />
    </>
  )
}
