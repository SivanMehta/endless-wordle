/**
 * Get random of word of desired length
 *
 * @async
 * @param {Number} difficulty length of the desired word 
 * @returns {String} a random word of the desired length
 */
export async function getWord(difficulty) {
  const response = await fetch('/dictionary.txt');
  const words = await response.text();

  const candidates =  words
    .split(", ")
    .filter(word => word.length === difficulty);

  // pick random element of array
  const word = candidates[Math.floor(Math.random() * candidates.length)];
  return { word, dictionary: new Set(candidates) };
}

const correct = '##6aaa64';
const incorrect = '#787c7e';
const misplaced = '#c9b458';

/**
 * Generate a map of colors
 *
 * @export
 * @param {*} word correct answer
 * @param {*} guess user's guess
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
      colors.push('incorrect');
    }
  }

  return colors;
}
