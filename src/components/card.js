import {isTaskExpired, isTaskRepeating, formatTaskDueDate} from "../utils/task.js";
import Abstract from "./abstract.js";

const getTempCard = (data) => {
  const {color, description, dueDate, repeating, isArchive, isFavorite} = data;

  const date = formatTaskDueDate(dueDate);

  const deadlineClassName = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatClassName = isTaskRepeating(repeating)
    ? `card--repeat`
    : ``;

  const archiveClassName = isArchive
    ? `card__btn--archive card__btn--disabled`
    : `card__btn--archive`;

  const favoriteClassName = isFavorite
    ? `card__btn--favorites card__btn--disabled`
    : `card__btn--favorites`;

  return `<article class="card card--${color} ${deadlineClassName} ${repeatClassName}">
  <div class="card__form">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn ${archiveClassName}">
          archive
        </button>
        <button
          type="button"
          class="card__btn ${favoriteClassName}"
        >
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <p class="card__text">${description}</p>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <div class="card__date-deadline">
              <p class="card__input-deadline-wrap">
                <span class="card__date">${date}</span>
                <span class="card__time">11:15 PM</span>
              </p>
            </div>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
              <span class="card__hashtag-inner">
                <span class="card__hashtag-name">
                  #todo
                </span>
              </span>

              <span class="card__hashtag-inner">
                <span class="card__hashtag-name">
                  #personal
                </span>
              </span>

              <span class="card__hashtag-inner">
                <span class="card__hashtag-name">
                  #important
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</article>`;
};

export default class TempCard extends Abstract {
  constructor(task) {
    super();
    this._task = task;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._archiveClickHandler = this._archiveClickHandler.bind(this);
  }

  getTemplate() {
    return getTempCard(this._task);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _archiveClickHandler(evt) {
    evt.preventDefault();
    this._callback.archiveClick();
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setArchiveClickHandler(callback) {
    this._callback.archiveClick = callback;
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, this._archiveClickHandler);
  }
}

