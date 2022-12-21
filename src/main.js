import {getTempMenu} from "./components/menu.js";
import {getTempFilters} from "./components/filters.js";
import {getTempCatalog} from "./components/catalog.js";
import {getTempCard} from "./components/card.js";
import {getTempEditCard} from "./components/edit_card.js";
import {getTempButtonLoad} from "./components/button_load.js";

import {generateCardData} from "./mock/card_mock.js";
import {generateFilter} from "./mock/filters.js";

// Переменные основных блоков
const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

// Переменная количество карточек в каталоге
const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

// Массив сгенерированных карточек задач
const tasks = new Array(TASK_COUNT).fill().map(generateCardData);

// Генерирование статистики фильтров
const filters = generateFilter(tasks);

// Функция рендеринга кода html в основные блоки
const renderTemp = (container, temp, place) => {
  container.insertAdjacentHTML(place, temp);
};

// Рендеринг меню
renderTemp(mainControl, getTempMenu(), `beforeend`);
// Рендеринг фильтров
renderTemp(mainControl, getTempFilters(filters), `afterend`);
// Рендеринг каталога карточек обьявлений
renderTemp(main, getTempCatalog(), `beforeend`);

// Основные переменные каталога
const catalog = main.querySelector(`.board`);
const catalogList = catalog.querySelector(`.board__tasks`);

// Рендеринг редактирования карточки задачи
renderTemp(catalogList, getTempEditCard(tasks[0]), `afterbegin`);

// Рендеринг карточек задач
for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderTemp(catalogList, getTempCard(tasks[i]), `beforeend`);
}

// Проверка длинны карточек в каталоге и приминения кнопки еще
if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  renderTemp(catalog, getTempButtonLoad(), `beforeend`);

  const loadMoreButton = catalog.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderTemp(catalogList, getTempCard(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
