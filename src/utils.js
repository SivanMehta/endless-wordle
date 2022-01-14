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
    .split("\n")
    .filter(word => word.length === difficulty);

  // pick random element of array
  return candidates[Math.floor(Math.random() * candidates.length)];
}
