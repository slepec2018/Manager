// Функция формирования шаблонов кнопок фильтров
const getTempFilterItem = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}
    />
    <label for="filter__${name}" class="filter__label">
    ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
};

const getTempFilters = (filterItems) => {
  const filterTempItem = filterItems
    .map((filter, index) => getTempFilterItem(filter, index === 0))
    .join(``);

  return `<section class="main__filter filter container">
    ${filterTempItem}
  </section>`;
};

export {getTempFilters};
