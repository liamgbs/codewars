// https://www.codewars.com/kata/58738d518ec3b4bf95000192

const parser = (inst, pos, functions) => {
    let buffer = [];
    let numbers = [];

    for (let i = pos; i <= inst.length; i++) {
        if (!isNaN(inst[i])) {
            numbers.push(inst[i]);
            continue;
        }

        if (numbers.length) {
            const parsedNumber = Number(numbers.join(""));
            const lastInst = buffer.pop();

            if (lastInst === "P") {

                // inf recursion
                if (
                    inst[pos -1 - numbers.length] === 'p' &&
                    inst.substring(pos-1, pos+numbers.length-1) === parsedNumber.toString()
                ) {
                    throw new Error("infinite recusion detected")    
                }


                if (!functions[parsedNumber])
                    functions[parsedNumber] = null;

                buffer.push(lastInst + parsedNumber);
            } else if (lastInst === "p") {
                const [parsedFn, _i] = parser(inst, i, functions);
                i = _i + 1;

                if (functions[parsedNumber]) throw new Error("Function exists");

                functions[parsedNumber] = parsedFn;
                
            } else {
                buffer.push(lastInst.repeat(parsedNumber));
            }

            numbers = [];

        }

        if (inst[i] === 'q') {
            return [buffer.join(""), i]
        }


        if (["L", "R", "F", "P", "p"].includes(inst[i])) {
            buffer.push(inst[i]);
            continue;
        }

        if (inst[i] === ')') {
            return [buffer.join(""), i];
        }

        if (inst[i] === ('(')) {
            const [parsed, _i] = parser(inst, i + 1, functions);
            i = _i;
            buffer.push(parsed);
        }
    }

    buffer = buffer.join("")

    callStack = 0;
    while (buffer.includes("P")) {
        callStack+=1;
        if (callStack > 100) throw Error("call stack exceeded");
        
        Object.entries(functions).forEach(([id, fn]) => {
            if (fn === null) throw new Error("undefined function")
            const regex = new RegExp(`P(${id})+`,'g')
            buffer = buffer.replace(regex, fn)
        })

    }

    return buffer


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
    code = parser(code, 0, {});
    console.log(code)
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