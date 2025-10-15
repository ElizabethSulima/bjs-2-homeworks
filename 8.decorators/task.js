const md5 = require("js-md5");

//Задача № 1
function cachingDecoratorNew(func) {
  const cache = [];

  return function (...args) {
    const hash = md5(args);
    const objectInCache = cache.find((item) => item.hash === hash);

    if (objectInCache) {
      console.log("Из кеша: " + objectInCache.value);
      return "Из кеша: " + objectInCache.value;
    }

    const result = func.apply(this, args);
    cache.push({ hash: hash, value: result });

    if (cache.length > 5) {
      cache.shift();
    }

    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  };
}

const addAndMultiply = (a, b, c) => (a + b) * c;
const upgraded = cachingDecoratorNew(addAndMultiply);
upgraded(1, 2, 3); // вычисляем: 9
upgraded(1, 2, 3); // из кеша: 9
upgraded(2, 2, 3); // вычисляем: 12
upgraded(3, 2, 3); // вычисляем: 15
upgraded(4, 2, 3); // вычисляем: 18
upgraded(5, 2, 3); // вычисляем: 21
upgraded(6, 2, 3); // вычисляем: 24 (при этом кеш для 1, 2, 3 уничтожается)
upgraded(1, 2, 3); // вычисляем: 9  (снова вычисляем, кеша нет)

//Задача № 2

const showCoords = (x, y) => console.log(`Клик:(${x},${y})`);

function debounceDecoratorNew(func, delay) {
  let timeoutId = null;

  function wrapper(...args) {
    wrapper.allCount += 1;
    const context = this;

    if (timeoutId === null) {
      func(...args);
      wrapper.count += 1;
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.call(this, ...args);
      wrapper.count += 1;
    }, delay);
  }

  wrapper.count = 0;
  wrapper.allCount = 0;

  return wrapper;
}

const newShow = debounceDecoratorNew(showCoords, 1000);
newShow(3, 5);
setTimeout(() => newShow(1, 5), 1500);
newShow(6, 8);
newShow(2, 9);
newShow(60, 18);
newShow(12, 38);
setTimeout(() => {
  console.log(newShow.count);
  console.log(newShow.allCount);
}, 5000);
