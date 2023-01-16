import Abstract from "./abstract.js";

const getTempCatalog = () => {
  return `<section class="board container">
</section>`;
};

export default class TempCatalog extends Abstract {
  getTemplate() {
    return getTempCatalog();
  }
}
