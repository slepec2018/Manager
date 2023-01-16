import {TempMenu} from "./components/menu.js";
import {TempFilters} from "./components/filters.js";
import {generateCardData} from "./mock/card_mock.js";
import {generateFilter} from "./mock/filters.js";
import {render, RenderPosition} from "./utils/render.js";

import BoardPresenter from "./presenter/board.js";

// Переменные основных блоков
const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

// Переменная количество карточек в каталоге
const TASK_COUNT = 22;

// Массив сгенерированных карточек задач
const tasks = new Array(TASK_COUNT).fill().map(generateCardData);

// Генерирование статистики фильтров
const filters = generateFilter(tasks);

const boardPresenter = new BoardPresenter(main);

render(mainControl, new TempMenu(), RenderPosition.BEFOREEND);

// Рендеринг фильтров
render(main, new TempFilters(filters), RenderPosition.BEFOREEND);

// renderBoard(main, tasks);

boardPresenter.init(tasks);

