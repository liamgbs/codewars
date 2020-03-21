// https://www.codewars.com/kata/58738d518ec3b4bf95000192

const parser = (inst, pos) => {
    let buffer = [];
    let numbers = [];

    for (let i = pos; i <= inst.length; i++) {
        if (!isNaN(inst[i])) {
            numbers.push(inst[i]);
            continue;
        }

        if (numbers.length) {
            const repeatBy = Number(numbers.join(""));
            const toRepeat = buffer.pop();
            buffer.push(toRepeat.repeat(repeatBy));
            numbers = [];

        }

        if (["L", "R", "F"].includes(inst[i])) {
            buffer.push(inst[i]);
            continue;
        }

        if (inst[i] === ')') {
            return [buffer.join(""), i];
        }

        if (inst[i] === ('(')) {
            const [parsed, _i] = parser(inst, i + 1);
            i = _i;
            buffer.push(parsed);
        }
    }

    return buffer.join("");

}

// from RS2 kata
function direction() {
    const dirs = ["l", "u", "r", "d"];
    let cur = 2;

    const left = () => {
        cur = !cur ? 3 : cur - 1;
        return dirs[cur];
    }

    const right = () => {
        cur = cur === 3 ? 0 : cur + 1;
        return dirs[cur];
    }

    return [left, right, dirs[cur]];
}

// from RS2 kata
const makeGrid = () => {
    let grid = [
        { x: 0, y: 0 }
    ];

    const forwLeft = () => {
        const last = grid[grid.length - 1];
        return grid = [...grid, { x: last.x - 1, y: last.y }];
    }

    const forwRight = () => {
        const last = grid[grid.length - 1];
        return grid = [...grid, { x: last.x + 1, y: last.y }];
    }

    const forwUp = () => {
        const last = grid[grid.length - 1];
        return grid = [...grid, { x: last.x, y: last.y + 1 }];
    }

    const forwDown = () => {
        const last = grid[grid.length - 1];
        return grid = [...grid, { x: last.x, y: last.y - 1 }];
    }

    return [forwLeft, forwRight, forwUp, forwDown, grid];
}

// from RS2 kata
function execute(code) {
    code = parser(code, 0);

    let [turnL, turnR, dir] = direction();
    let [forwLeft, forwRight, forwUp, forwDown, grid] = makeGrid();
    for (let i = 0; i < code.length; i++) {

        if (code[i] === "L") {
            dir = turnL();
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

    let rendered = '';

    grid.sort((a, b) => {
        return a.y === b.y ? a.x - b.x : b.y - a.y;
    })
    

    grid = grid.map((cell) => cell.x + ',' + cell.y);

    for (let y = yHi; y >= yLo; y--) {
        let line = "";
        for (let x = xLo; x <= xHi; x++) {

            if (grid.includes(x + ',' + y)) {
                line += '*';
                grid.shift();
            }
            else
                line += ' ';
        }

        if (y !== yLo) {
            line += '\r\n';
        }

        rendered += line;

    }

    return rendered;
}
