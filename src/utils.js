import React from 'react';

/**
 * Check if function has double letters
 *
 * regex is a capture group (.) and then the \1 is a refernce to the previous capture group
 *
 * @param {String} word
 * @returns {Boolean}
 */
function hasDoubleLetters(word) {
  return new Set(word.split("")).size !== word.length;
}

export const difficultyMap = {
  easy: 4,
  normal: 5,
  hard: 7,
  impossible: 9
};

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
export const difficulty = difficultyMap[params.difficulty] || difficultyMap.normal;

/**
 * Get random of word of desired length.
 * Words are taken from a dictionary derived from https://en.wiktionary.org/wiki/Appendix:1000_basic_English_words
 *
 * @async
 * @param {Number} difficulty length of the desired word 
 * @returns {String} a random word of the desired length
 */
export async function getWord() {
  const url = window.location.origin + window.location.pathname;
  const response = await fetch(url + '/dictionary.txt');
  const words = await response.text();

  const candidates =  words
    .split("\n")
    .filter(word => word.length === difficulty && !hasDoubleLetters(word));

  return candidates[Math.floor(Math.random() * candidates.length)].toUpperCase();
}

/**
 * Generate an array of colors for a guess based on the word
 *
 * @param {String} word correct answer
 * @param {String} guess user's guess
 * @returns {Array[String]} array of colors for each letter of the word
 */
export function generateColors(word, guess) {
  const wordLetters = word.split('');
  const guessLetters = guess.split('');
  let letters = new Set(wordLetters);
  const colors = [];

  for (let i = 0; i < guess.length; i++) {
    if(wordLetters[i] === guessLetters[i]) {
      colors.push('correct');
    } else if(letters.has(guessLetters[i])) {
      colors.push('misplaced');
    } else {
      colors.push('wrong');
    }
  }

  return colors;
}

function collapse(arr) {
  return arr.reduce((acc, curr) => acc.concat(curr), []);
}

export function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => 
    setState(prevState => Object.assign({}, prevState, newState)
  );
  return [state, setMergedState];
}

export function generateEmojis(word, guesses) {
  return guesses
    .map(guess => generateColors(word, guess))
    .join('\n')
    .replaceAll(',', '')
    .replaceAll('correct', '🟩')
    .replaceAll('misplaced', '🟨')
    .replaceAll('wrong', '⬛');
}

/**
 * Resolve bucket letters by precedence:
 * 1. remove correct and misplaced from wrong
 * 2. remove correct from misplaced
 */
function resolveBuckets(buckets) {
  let { wrong, misplaced, correct } = buckets;

  wrong = Array.from(wrong).filter(letter => !correct.has(letter) && !misplaced.has(letter));
  misplaced = Array.from(misplaced).filter(letter => !correct.has(letter));
  correct = Array.from(correct);

  return [
    { class: "correct", buttons: ' ' +  correct.join(' ') },
    { class: "misplaced", buttons: ' ' +  misplaced.join(' ') },
    { class: "wrong", buttons: ' ' +  wrong.join(' ') },
  ]
}

/**
 * From a list of guesses, generate the letters that are in the word
 *
 * @export
 * @param {*} word
 * @param {*} guesses
 * @returns
 */
export function generateButtonTheme(word, guesses) {
  const colors = guesses
    .map(guess => generateColors(word, guess));

  const buckets = {
    correct: new Set(),
    misplaced: new Set(),
    wrong: new Set()
  };

  for (let i = 0; i < guesses.length; i++) {
    for(let j = 0; j < word.length; j++) {
      const letter = guesses[i].substr(j, 1);
      buckets[colors[i][j]].add(letter);
    }
  }

  return resolveBuckets(buckets);
}

export function Link({ children, href }) {
  function onClick() {
    location.href = href;
  }

  return (
    <button onClick={ onClick }>
      {children}
    </button>
  );
}
