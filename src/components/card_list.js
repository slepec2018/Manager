import Abstract from "./abstract.js";

const createTaskListTemplate = () => {
  return `<div class="board__tasks"></div>`;
};

class TempCardList extends Abstract {
  getTemplate() {
    return createTaskListTemplate();
  }
}

export {TempCardList};
