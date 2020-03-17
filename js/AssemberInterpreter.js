//https://www.codewars.com/kata/58e24788e24ddee28e000053
const simple_assembler = (instructions) => {
    const registers = {};
    let pointer = 0;

    while (pointer < instructions.length) {
        const i = instructions[pointer];
        const [operand, op1, op2] = i.trim().split(" ");
        
        switch (operand) {
            case "mov":
                // move [reg] [data]
                registers[op1] = isNaN(parseInt(op2)) ? registers[op2] : parseInt(op2);
                pointer += 1;
                break;
            case "inc":
                // increment [reg]
                registers[op1] += 1;
                pointer += 1;
                break;
            case "dec":
                // decrement [reg]
                registers[op1] -= 1;
                pointer += 1;
                break;
            case "jnz":
                //jump if register is not zero [reg] [move pointer]
                registers[op1] !== 0
                    ? pointer += isNaN(parseInt(op2)) ? registers[op2] : parseInt(op2)
                    : pointer += 1
                break;
            default:
                //invalid
                throw new Error("Invalid instruction")
        }
    }

    return registers;

}