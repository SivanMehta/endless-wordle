import React from 'react';
import { generateEmojis, difficulty } from './utils';
import copy from 'copy-text-to-clipboard';

async function share(content) {
  try {
    await navigator.share({
      url: location.href,
      text: content
    });
  } catch (e) {
    // expected to throw if navigator share is not supported
    copy(content);
  }
}

function Reset({ content }) {
  return (
    <>
      <button onClick={ () => location.reload() }>
        Reset
      </button>
      <button onClick={ () => share(content) }>
        Share
      </button>
    </>
  );
}

export default function Result({ word, guesses, guess }) {
  if(guesses[guesses.length - 1] === word) { // win condition
    const score = '🌮'.repeat(difficulty - guesses.length + 1);
    const emojis = generateEmojis(word, guesses);
    const content = score + '\n' + emojis;
    return (
      <div>
        <Reset content={ content }/>
        <pre>
          { content }
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
  } else {
    return <></>;
  }
}
