import React, { useState, useEffect } from 'react';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [file, setFile] = useState(false);
  const [ready, setReady] = useState(false);

  const loadModel = async () => {
    await sleep(1000);
    setReady(true);
  };

  useEffect(() => {
    loadModel();
  });

  return (
    <div className='container'>
      { ready ? <h1>Ready</h1> : <h1>Loading...</h1> }
    </div>
  );
}


export default App;
