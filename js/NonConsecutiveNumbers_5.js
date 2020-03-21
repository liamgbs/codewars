//https://www.codewars.com/kata/58f8b35fda19c0c79400020f

const allNonConsecutive = (arr) => arr.reduce(
    (nc, n, i) => i > 0 && arr[i - 1] !== n - 1 ? [...nc, { i, n }] : nc, []
)

console.log(allNonConsecutive([1,2,3,4,6,7,8,10]))