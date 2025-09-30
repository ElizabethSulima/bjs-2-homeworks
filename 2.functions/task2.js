const eventFilterCallback = (el) => el % 2 === 0;
const sumCallback = (sum, val) => sum + val;

const avgCallback = (sum, curentValue, idx, array) =>
  sum + curentValue / array.length;
function getArrayParams(...arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
    avg: Number(arr.reduce(avgCallback, 0).toFixed(2)),
  };
}

function summElementsWorker(...arr) {
  return arr.reduce((sum, value) => sum + value, 0);
}

function differenceMaxMinWorker(...arr) {
  return arr.length > 0 ? Math.max(...arr) - Math.min(...arr) : 0;
}

function differenceEvenOddWorker(...arr) {
  return (
    arr.filter(eventFilterCallback).reduce(sumCallback, 0) -
    arr.filter((el) => el % 2 !== 0).reduce(sumCallback, 0)
  );
}

function averageEvenElementsWorker(...arr) {
  return arr.filter(eventFilterCallback).reduce(avgCallback, 0);
}

function makeWork(arrOfArr, func) {
  return arrOfArr.reduce((maxVal, arr) => {
    const callbackResult = func(...arr);
    return callbackResult > maxVal ? callbackResult : maxVal;
  }, -Infinity);
}
