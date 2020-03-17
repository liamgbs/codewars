// https://www.codewars.com/kata/52efefcbcdf57161d4000091

const count = (s) => s.split("").reduce((acc, s) => {
    if (!acc[s]) acc[s] = 1;
    else acc[s] += 1; 

    return acc;
}, {})