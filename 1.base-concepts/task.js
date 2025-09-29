"use strict";
function solveEquation(a, b, c) {
  let arr = [];
  const D = Math.pow(b, 2) - 4 * a * c;

  if (D < 0) {
    arr;
  } else if (D === 0) {
    const root = (-b / 2) * a;
    arr.push(root);
  } else if (D > 0) {
    const sqrtD = Math.sqrt(D);
    const root1 = (-b + sqrtD) / (2 * a);
    const root2 = (-b - sqrtD) / (2 * a);
    arr.push(root1, root2);
  }

  return arr;
}

console.log(solveEquation(1, -5, 4));
console.log(solveEquation(1, 6, 9));
console.log(solveEquation(1, -1, 30));

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  const monthlyRate = Number(percent) / 100 / 12;
  const contCredit = Number(contribution);
  const sumCredit = Number(amount);
  const monthCredit = Number(countMonths);

  const bodyCredit = sumCredit - contCredit;

  if (bodyCredit <= 0 || monthCredit <= 0) {
    return 0;
  }

  let payment = null;
  if (monthlyRate === 0) {
    payment = bodyCredit / monthCredit;
  } else {
    const pow = Math.pow(1 + monthlyRate, monthCredit);
    payment = bodyCredit * (monthlyRate + monthlyRate / (pow - 1));
  }

  const totalSum = payment * monthCredit;
  const roundedSum = Math.round(totalSum * 100) / 100;

  return roundedSum;
}

console.log(calculateTotalMortgage(10, 0, 50000, 12));
console.log(calculateTotalMortgage(15, 0, 10000, 36));
