//https://www.codewars.com/kata/552c028c030765286c00007d
function iqTest(numbers) {
    numbers = numbers.split(" ").map(Number)
    const oddEven = {
        odd: 0,
        even: 0
    };
    for (let i = 0; i < numbers.length; i++) {
        if (odd(numbers[i])) {
            oddEven.odd += 1;
        } else {
            oddEven.even += 1
        }
    }

    for (let i = 0; i < numbers.length; i++) {
        if (oddEven.odd > oddEven.even &&  !odd(numbers[i])) {
            return i+1
        }
        if (oddEven.odd < oddEven.even && odd(numbers[i])) {
            return i+1
        }

    }
}

const odd = (n) => !!(n % 2)