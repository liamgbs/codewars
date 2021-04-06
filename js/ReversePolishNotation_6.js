//https://www.codewars.com/kata/52f78966747862fc9a0009ae

const calc = (expr) => {
    expr = expr + ' ';
    const stack = [];
    const numbers = [];

    for (let i = 0; i < expr.length; i++) {
        let left, right;
        switch (expr[i]) {
            case " ":
                !!numbers.length && stack.push(Number(numbers.pop()));
                break;
            case "*":
                right = stack.pop(); left = stack.pop();
                stack.push(left * right);
                break;
            case "-":
                right = stack.pop(); left = stack.pop();
                stack.push(left - right);
                break;
            case "/":
                right = stack.pop(); left = stack.pop();
                stack.push(left / right);
                break
            case "+":
                right = stack.pop(); left = stack.pop();
                stack.push(left + right); 
                break;
            default: numbers.push( (numbers.pop() || "") + expr[i])
        }
    }


    return stack.pop() || 0;
}

console.log(
    calc("3.5")
)