// https://www.codewars.com/kata/5870fa11aa0428da750000da

function direction() {
    const dirs = ["l", "u", "r", "d"]
    let cur = 2;

    const left = () => {
        cur = !cur ? 3 : cur - 1
        return dirs[cur];
    }

    const right = () => {
        cur = cur === 3 ? 0 : cur + 1;
        return dirs[cur];
    }

    return [left, right, dirs[cur]]
}

const makeGrid = () => {
    let grid = [
        { x: 0, y: 0 }
    ];

    forwLeft = () => {
        const last = grid[grid.length - 1]
        return grid = [...grid, { x: last.x - 1, y: last.y }];
    }

    forwRight = () => {
        const last = grid[grid.length - 1]
        return grid = [...grid, { x: last.x + 1, y: last.y }];
    }

    forwUp = () => {
        const last = grid[grid.length - 1]
        return grid = [...grid, { x: last.x, y: last.y + 1 }];
    }

    forwDown = () => {
        const last = grid[grid.length - 1]
        return grid = [...grid, { x: last.x, y: last.y - 1 }];
    }

    return [forwLeft, forwRight, forwUp, forwDown, grid];
}

const parser = (inst) => {
    let numbers = [];
    let code = [];

    const checkNumbers = () => {
        if (numbers.length) {
            const latest = code.pop();
            const number = Number(numbers.join(""));
            
            numbers = []
            code = [...code, ...new Array(number).fill(latest)]
        }
    }

    for (let i = 0; i < inst.length; i++) {
        if (!["L", "R", "F"].includes(inst[i])) {
            numbers.push(inst[i]);
            continue;
        }

        checkNumbers();

        code = [...code, inst[i]]

    }
    
    checkNumbers();

    return code
}

function execute(code) {
    code = parser(code);

    console.log('code', code)

    let [turnL, turnR, dir] = direction();
    let [forwLeft, forwRight, forwUp, forwDown, grid] = makeGrid();

    for (let i = 0; i < code.length; i++) {

        if (code[i] === "L") {
            dir = turnL()
            continue;
        }
        else if (code[i] === "R") {
            dir = turnR();
            continue;
        }

        switch (dir) {
            case "l":
                grid = forwLeft();
                break;
            case "r":
                grid = forwRight();
                break;
            case "u":
                grid = forwUp();
                break;
            case "d":
                grid = forwDown();
                break;
            default:
                throw new Error("");
        }
    }

    const xHi = grid.reduce((h, i) => i.x > h ? i.x : h, 0);
    const xLo = grid.reduce((l, i) => i.x < l ? i.x : l, 0);
    const yHi = grid.reduce((h, i) => i.y > h ? i.y : h, 0);
    const yLo = grid.reduce((l, i) => i.y < l ? i.y : l, 0);

    let rendered = ''

    for (let y = yHi; y >= yLo; y--) {
        let line = "";
        for (let x = xLo; x <= xHi; x++) {

            if (!!grid.find(c => c.x === x && c.y === y))
                line += '*';
            else
                line += ' ';
        }

        if (y !== yLo) {
            line += '\r\n'
        }

        rendered += line;

    }
    return rendered;
}