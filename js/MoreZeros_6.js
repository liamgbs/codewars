//https://www.codewars.com/kata/5d41e16d8bad42002208fe1a

const moreZeros = (s) => Array.from(new Set(s
    .split("")
    .map(
        s => s.charCodeAt(0).toString(2).split("") // get arrays of binary
    )
    .reduce((acc, bins) =>
        bins.filter(b => b === "0").length > 
        bins.filter(b => b === "1").length
            ? [...acc, String.fromCharCode(parseInt(bins.join(""), 2))]
            : acc
    , [])))


console.log(moreZeros("abcde"));
console.log(moreZeros("DIGEST"));
console.log(moreZeros("abcdeabcde"));