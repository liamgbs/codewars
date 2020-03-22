const perimeter = (n) => {
    fibs = [0, 1];
    for (let i = 1; i <= n; i++) fibs.push(
        fibs[fibs.length -1] + fibs[fibs.length - 2] 
    ) 
    
    return 4 * fibs.reduce((a,b) => a + b, 0);
}

console.log(
    perimeter(7)
)