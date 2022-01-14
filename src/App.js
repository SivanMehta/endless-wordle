import React, { useState, useEffect } from 'react';
import { getWord } from './utils';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [word, setword] = useState(false);
  const [ready, setReady] = useState(false);

  const loadWords = async () => {
    const word = await getWord(5);
    setword(word);
    setReady(true);
  };

  useEffect(() => {
    if(!ready) {
      loadWords();
    }
  });

  if(!ready) {
    return <div>Loading...</div>
  }

  return (
    <div className='container'>
      <h1>{ word }</h1>
    </div>
  );
}


export default App;
