import {TempMenu} from "./components/menu.js";
import {TempFilters} from "./components/filters.js";
import {TempCatalog} from "./components/catalog.js";
import {TempCard} from "./components/card.js";
import {TempEditCard} from "./components/edit_card.js";
import {TempButtonLoad} from "./components/button_load.js";
import {TempSort} from "./components/sort.js";
import {TempCardList} from "./components/card_list.js";
import {TempNoTask} from "./components/no_task.js";

import {generateCardData} from "./mock/card_mock.js";
import {generateFilter} from "./mock/filters.js";
import {render, RenderPosition} from "./utills.js";

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

const renderCard = (taskListElement, task) => {
  const taskComponent = new TempCard(task);
  const taskEditComponent = new TempEditCard(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

// Рендеринг меню

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new TempCatalog();
  const taskListComponent = new TempCardList();

  render(boardContainer, boardComponent.getElement(), RenderPosition.BEFOREEND);

  // По условию заглушка должна показываться,
  // когда нет задач или все задачи в архиве.
  // Мы могли бы написать:
  // tasks.length === 0 || tasks.every((task) => task.isArchive)
  // Но благодаря тому, что на пустом массиве every вернёт true,
  // мы можем опустить "tasks.length === 0".
  // p.s. А метод some на пустом массиве наборот вернет false
  if (boardTasks.every((task) => task.isArchive)) {
    render(boardComponent.getElement(), new TempNoTask().getElement(), RenderPosition.AFTERBEGIN);
    return;
  }

  render(boardComponent.getElement(), new TempSort().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);

  boardTasks
    .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
    .forEach((boardTask) => renderCard(taskListComponent.getElement(), boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new TempButtonLoad();

    render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => renderCard(taskListComponent.getElement(), boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= boardTasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
};

render(mainControl, new TempMenu().getElement(), RenderPosition.BEFOREEND);
// Рендеринг фильтров
render(main, new TempFilters(filters).getElement(), RenderPosition.BEFOREEND);

renderBoard(main, tasks);

