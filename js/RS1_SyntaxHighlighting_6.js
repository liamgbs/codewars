// https://www.codewars.com/kata/58708934a44cfccca60000c4

const parser = (inst) => {
    let buffer = [inst[0]]
    let code = [];
    for (let i = 1; i <= inst.length; i++) {
        const latest = buffer[buffer.length - 1];

        if (inst[i] === latest || (!isNaN(inst[i]) && !isNaN(latest))) {
            buffer.push(inst[i]);
            continue;
        }
        
        code = [...code, buffer.join("")]
        buffer = [inst[i]];

    }

    return code
}

const highlight = (code) => {
    code = parser(code);
    console.log(code)
    return code.map(c => {
        console.log(c[0])
        switch (c[0]) {
            case "F":
                return `<span style="color: pink">${c}</span>`
            case "L":
                return `<span style="color: red">${c}</span>`
            case "R":
                return `<span style="color: green">${c}</span>`
            case "(":
            case ")":
                return c;
            default:
                return `<span style="color: orange">${c}</span>`
        }
    }).join("");
}

console.log(highlight('RRRRR(F45L3)F2'))