function getArrayParams(...arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const sum = arr.reduce((acc, cur) => acc + cur, 0);
  const avg = Number((sum / arr.length).toFixed(2));

  return { min: min, max: max, avg: avg };
}

console.log(getArrayParams(3, 1, 4, 1, 5));

//

function summElementsWorker(...arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}

function differenceMaxMinWorker(...arr) {
  if (arr.length === 0) return undefined;
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  return max - min;
}

function differenceEvenOddWorker(...arr) {
  let sumEvenElement = 0;
  let sumOddElement = 0;

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (current % 2 === 0) {
      sumEvenElement += current;
    } else {
      sumOddElement += current;
    }
  }
  return sumEvenElement - sumOddElement;
}

function averageEvenElementsWorker(...arr) {
  if (arr.length === 0) {
    return 0;
  }

  let sumEvenElement = 0;
  let countEvenElement = 0;

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (current % 2 === 0) {
      sumEvenElement += current;
      countEvenElement++;
    }
  }
  return countEvenElement > 0 ? sumEvenElement / countEvenElement : 0;
}

//
function makeWork(arrOfArr, func) {
  if (arrOfArr.length === 0) {
    return -Infinity;
  }
  if (typeof func !== "function") {
    return -Infinity;
  }

  let maxWorkerResult = -Infinity;

  for (let i = 0; i < arrOfArr.length; i++) {
    const currentArgs = arrOfArr[i];

    if (currentArgs.length === 0) {
      continue;
    }

    const result = func(...currentArgs);

    if (typeof result === "number" && result > maxWorkerResult) {
      maxWorkerResult = result;
    }
  }
  return maxWorkerResult;
}

const arr = [
  [10, 10, 11, 20, 10],
  [67, 10, 2, 39, 88],
  [72, 75, 51, 87, 43],
  [30, 41, 55, 96, 62],
];
console.log(makeWork(arr, summElementsWorker));
console.log(makeWork(arr, differenceMaxMinWorker));
console.log(makeWork(arr, differenceEvenOddWorker));
console.log(makeWork(arr, averageEvenElementsWorker));
