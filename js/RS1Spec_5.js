// https://www.codewars.com/kata/5870fa11aa0428da750000da

function execute(code) {
    // Implement your RS1 interpreter here
    return parser(code);
}

const parser = (inst) => inst
    .split("")
    .reduce((chars, c) => ["R", "L", "F"].includes(c)
        ? [...chars, c]
        : [...chars, ...Array(Number(c - 1)).fill(chars.pop())]
        , [])



console.log(execute("F5RRF5"))