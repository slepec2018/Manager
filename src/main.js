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
// import {render, RenderPosition} from "./utills.js";
import {render, RenderPosition, replace, remove} from "./utils/render.js";

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
    // taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
    replace(taskEditComponent, taskComponent);
  };

  const replaceFormToCard = () => {
    // taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  // render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

// Рендеринг меню

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new TempCatalog();
  const taskListComponent = new TempCardList();

  // render(boardContainer, boardComponent.getElement(), RenderPosition.BEFOREEND);
  render(boardContainer, boardComponent, RenderPosition.BEFOREEND);

  // По условию заглушка должна показываться,
  // когда нет задач или все задачи в архиве.
  // Мы могли бы написать:
  // tasks.length === 0 || tasks.every((task) => task.isArchive)
  // Но благодаря тому, что на пустом массиве every вернёт true,
  // мы можем опустить "tasks.length === 0".
  // p.s. А метод some на пустом массиве наборот вернет false
  if (boardTasks.every((task) => task.isArchive)) {
    // render(boardComponent.getElement(), new TempNoTask().getElement(), RenderPosition.AFTERBEGIN);
    render(boardComponent, new TempNoTask(), RenderPosition.AFTERBEGIN);
    return;
  }

  // render(boardComponent.getElement(), new TempSort().getElement(), RenderPosition.BEFOREEND);
  // render(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);
  render(boardComponent, new TempSort(), RenderPosition.AFTERBEGIN);
  render(boardComponent, taskListComponent, RenderPosition.BEFOREEND);


  boardTasks
    .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
    .forEach((boardTask) => renderCard(taskListComponent.getElement(), boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new TempButtonLoad();

    // render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
    render(boardComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => renderCard(taskListComponent.getElement(), boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= boardTasks.length) {
        // loadMoreButtonComponent.getElement().remove();
        // loadMoreButtonComponent.removeElement();
        remove(loadMoreButtonComponent);
      }
    });
  }
};

// render(mainControl, new TempMenu().getElement(), RenderPosition.BEFOREEND);
render(mainControl, new TempMenu(), RenderPosition.BEFOREEND);
// Рендеринг фильтров
// render(main, new TempFilters(filters).getElement(), RenderPosition.BEFOREEND);
render(main, new TempFilters(filters), RenderPosition.BEFOREEND);

renderBoard(main, tasks);

