// Функция рандомного числа из заданного диапазона включая границы
const getRandomNumber = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Функция рандомного елемента из заданного массива
const getRandomItemArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция генерирования массива с заданной длинной, исключающая повторов
const getRandomTags = (arr, length) => {
  let set = new Set();

  const cycle = getRandomNumber(1, length);

  while (set.size !== cycle) {
    set.add(arr[getRandomNumber(0, arr.length - 1)]);
  }

  return Array.from(set);
};

export {getRandomNumber, getRandomItemArr, getRandomTags};
