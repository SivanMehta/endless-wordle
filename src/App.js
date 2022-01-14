import React, { useState, useEffect } from 'react';
import { getWord } from './utils';
import Board from './Board';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [ state, setState ] = useState({
    word: '',
    ready: false
  });
  const { word, ready } = state;

  const loadWords = async () => {
    const word = await getWord(5);

    setState({
      word,
      ready: true
    });
  };

  useEffect(() => {
    if(!ready) {
      loadWords();
    }
  });

  if(!ready) {
    return <h1>loading ...</h1>
  }

  console.log('This word is:', word);

  return (
    <div className='container'>
      <Board word={ word } />
    </div>
  );
}

export default App;
