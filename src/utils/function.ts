/**
 * Truncates a string if its length exceeds a specified maximum.
 *
 * @param {string} txt - The input string to be sliced.
 * @param {number} [max=100] - The maximum length of the string before it's truncated.
 * @returns {string} The truncated string or the original string if its length is within the limit.
 */


export function txtSlicer(txt: string, max: number = 100){
    if(txt.length >= max) return txt.slice(0, max);
    return txt;
}