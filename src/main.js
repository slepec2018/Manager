import {getTempMenu} from "./components/menu.js";
import {getTempFilters} from "./components/filters.js";
import {getTempCatalog} from "./components/catalog.js";
import {getTempCard} from "./components/card.js";
import {getTempCreateCard} from "./components/create_card.js";
import {getTempButtonLoad} from "./components/button_load.js";

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

const renderTemp = (container, temp, place) => {
  container.insertAdjacentHTML(place, temp);
};

renderTemp(mainControl, getTempMenu(), `beforeend`);
renderTemp(mainControl, getTempFilters(), `afterend`);
renderTemp(main, getTempCatalog(), `beforeend`);

const catalog = main.querySelector(`.board`);
const catalogList = catalog.querySelector(`.board__tasks`);

renderTemp(catalogList, getTempCreateCard(), `afterbegin`);

for (let i = 0; i < 3; i++) {
  renderTemp(catalogList, getTempCard(), `beforeend`);
}

renderTemp(catalog, getTempButtonLoad(), `beforeend`);
