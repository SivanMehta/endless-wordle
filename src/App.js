import React, { useState, useEffect } from 'react';
import { getWord } from './utils';
import Board from './Board';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [ state, setState ] = useState({
    word: '',
    ready: false,
    dictionary: {}
  });
  const { word, ready, dictionary } = state;

  const loadWords = async () => {
    const { word, dictionary } = await getWord(5);

    setState({
      word,
      dictionary,
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

  return (
    <div className='container'>
      <h1>{ word }</h1>
      <Board word={ word }/>
    </div>
  );
}

export default App;
