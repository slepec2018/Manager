import dayjs from "dayjs";

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

// Функция проверки просроченности заданной даты
const isTaskExpired = (dueDate) => {
  return dueDate === null ? false : dayjs().isAfter(dueDate, `D`);
};

// Функция проверки повторов задач
const isTaskRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

// Функция приведения заданной даты к формату
const humanizeTaskDueDate = (dueDate) => {
  return dayjs(dueDate).format(`D MMMM`);
};

// Функция проверки актуальности задачи на заданную дату
const isTaskExpiringToday = (dueDate) => {
  return dueDate === null ? false : dayjs(dueDate).isSame(dayjs(), `D`);
};

// Функция генерирования массива с заданной длинной, исключающая повторов
const getRandomTags = (arr, length) => {
  let set = new Set();

  const cycle = getRandomNumber(0, length);

  while (set.length === cycle) {
    set.add(arr[getRandomNumber(0, arr.length)]);
  }

  return set;
};

export {
  getRandomItemArr,
  getRandomNumber,
  isTaskExpired,
  isTaskRepeating,
  humanizeTaskDueDate,
  isTaskExpiringToday,
  getRandomTags
};
