import Abstract from "./abstract.js";

const getTempCatalog = () => {
  return `<section class="board container">
</section>`;
};

class TempCatalog extends Abstract {
  getTemplate() {
    return getTempCatalog();
  }
}

export {TempCatalog};
