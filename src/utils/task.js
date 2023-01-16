import dayjs from "dayjs";

// Функция проверки просроченности заданной даты
const isTaskExpired = (dueDate) => {
  return dueDate === null ? false : dayjs().isAfter(dueDate, `D`);
};

// Функция проверки повторов задач
const isTaskRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

// Функция приведения заданной даты к формату humanizeTaskDueDate

const formatTaskDueDate = (dueDate) => {
  if (!dueDate) {
    return ``;
  }

  return dayjs(dueDate).format(`D MMMM`);
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortTaskUp = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
};

export const sortTaskDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
};

// Функция проверки актуальности задачи на заданную дату
const isTaskExpiringToday = (dueDate) => {
  return dueDate === null ? false : dayjs(dueDate).isSame(dayjs(), `D`);
};

export {
  isTaskExpired,
  isTaskRepeating,
  formatTaskDueDate,
  isTaskExpiringToday
};
