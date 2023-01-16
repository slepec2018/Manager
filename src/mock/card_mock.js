import {getRandomItemArr, getRandomNumber, getRandomTags} from "../utils/common.js";
import dayjs from "dayjs";
import {COLORS} from '../const.js';

// Date.now() и Math.random() - плохие решения для генерации id
// в "продуктовом" коде, а для моков самое то.
// Для "продуктового" кода используйте что-то понадежнее,
// вроде nanoid - https://github.com/ai/nanoid
const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

// Основные данные для мока
const descriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];
const tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

// Функция рандомного генерирования даты
const generateDate = () => {
  const isDate = Boolean(getRandomNumber(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomNumber(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, `day`).toDate();
};

// Функция рандамного генерирования расписания повторов задачи
const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomNumber(0, 1)),
    th: false,
    fr: Boolean(getRandomNumber(0, 1)),
    sa: false,
    su: false
  };
};

// Переменная даты
const dueDate = generateDate();
// Переменная расписания повторов задачи
const repeating = dueDate === null
  ? generateRepeating()
  : {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false
  };

// Функция создания мока карточки задачи
const generateCardData = () => {
  return {
    id: generateId(),
    description: getRandomItemArr(descriptions),
    dueDate,
    repeating,
    tags: getRandomTags(tags, 3),
    color: getRandomItemArr(COLORS),
    isFavorite: getRandomNumber(0, 1),
    isArchive: getRandomNumber(0, 1),
  };
};

export {generateCardData};
