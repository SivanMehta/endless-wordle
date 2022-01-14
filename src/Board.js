import React, { useState } from 'react';

function Guess({ word, guess, submitted }) {
  if(!guess) return null;
  return (
    <div className={'guess ' + (submitted && 'submitted')}>
      { guess.split("").map((letter, i) => <span key={ i }>{ letter }</span>) }
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

export default function Board({ word }) {
  const [ guesses, setGuesses ] = useState([
    'ABBEY',
    'TINNI',
    'BARBE'
  ]);

  const [ guess, setGuess ] = useState('');

  function submit() {
    if(guess.length -== 0) return;
    setGuesses([...guesses, guess]);
    setGuess('');
  }
  
  return (
    <>
      { guesses.map((guess, i) => <Guess key={ i } word={ word } guess={ guess } submitted={ true }/>) }
      <Guess word={ word } guess={ guess } submitted={ false }/>
      <Input word={ word } guess={ guess } setGuess={ setGuess } onSubmit={submit} />
      <br />
      <Submit onSubmit={ submit }/>
    </>
  )
}
