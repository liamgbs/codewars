// https://www.codewars.com/kata/555624b601231dc7a400017a

const findOdd = (nums) => Number(Object.keys(
    nums.reduce((acc, n) => {
        acc[n] ? delete acc[n] : acc[n] = 1;
        return acc;
    }, {})
)[0])
