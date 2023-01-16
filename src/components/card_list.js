import Abstract from "./abstract.js";

const createTaskListTemplate = () => {
  return `<div class="board__tasks"></div>`;
};

export default class TempCardList extends Abstract {
  getTemplate() {
    return createTaskListTemplate();
  }
}
