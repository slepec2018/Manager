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
