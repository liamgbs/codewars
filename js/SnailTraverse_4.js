
// https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1

const position = (arrIn) => {
    const arr = arrIn.reduce((acc, val) => acc.concat(val), []); // arr.flat 

    let [x, y] = [-1, 0];

    const getPos = () => arr[
        y * arrIn.length + x
    ];

    const down = () => {
        y += 1;
        return getPos();
    }

    const up = () => {
        y -= 1;
        return getPos();
    }

    const right = () => {
        x += 1;
        return getPos();
    }

    const left = () => {
        x -= 1;
        return getPos();
    }

    return [up, down, left, right]
}

const snail = (arr) => {
    const snailed = [];        

    if (!arr[0].length)
        return snailed;

    const [up, down, left, right] = position(arr);

    let [verticalPad, horizontalPad] = [0, 0]

    while (snailed.length < arr.length * arr.length) {

        for (let i = 0; i < arr.length - horizontalPad; i++) snailed.push(right());
        verticalPad += 1;

        for (let i = 0; i < arr.length - verticalPad; i++) snailed.push(down());
        horizontalPad += 1;

        for (let i = 0; i < arr.length - horizontalPad; i++) snailed.push(left());
        verticalPad += 1;

        for (let i = 0; i < arr.length - verticalPad; i++) snailed.push(up())
        horizontalPad += 1;

    }

    return snailed;
}