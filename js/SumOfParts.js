// https://www.codewars.com/kata/5ce399e0047a45001c853c2b

const partsSums = (ls) => {
    const [sums, list] = [[0], [...ls]];

    for (let i = 0; i < ls.length; i++) (sums.push(
        list.pop() + sums[sums.length - 1]
    ))


    return sums.reverse();
}


