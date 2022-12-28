import {createElement} from "../utills.js";

const getTempButtonLoad = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

class TempButtonLoad {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getTempButtonLoad();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {TempButtonLoad};
