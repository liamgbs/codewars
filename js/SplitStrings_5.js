// https://www.codewars.com/kata/515de9ae9dcfc28eb6000001
const solution = (str) => str ? str.match(/.{1,2}/g).map(c => c.padEnd(2, '_')) : []