/**
 * Check if function has double letters
 *
 * regex is a capture group (.) and then the \1 is a refernce to the previous capture group
 *
 * @param {String} word
 * @returns {Boolean}
 */
function hasDoubleLetters(word) {
  return word.match(/(.)\1/);
}

/**
 * Get random of word of desired length.
 * Words are taken from a dictionary derived from https://en.wiktionary.org/wiki/Appendix:1000_basic_English_words
 *
 * @async
 * @param {Number} difficulty length of the desired word 
 * @returns {String} a random word of the desired length
 */
export async function getWord(difficulty) {
  const response = await fetch(window.location.href + '/dictionary.txt');
  const words = await response.text();

  const candidates =  words
    .split(", ")
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
    .replaceAll('wrong', '🟥');
}
