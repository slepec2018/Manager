import Abstract from "./abstract.js";

const createNoTaskTemplate = () => {
  return `<p class="board__no-tasks">
    Click «ADD NEW TASK» in menu to create your first task
  </p>`;
};

class TempNoTask extends Abstract {
  getTemplate() {
    return createNoTaskTemplate();
  }
}

export {TempNoTask};
