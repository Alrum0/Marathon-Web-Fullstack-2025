const { Product } = require('./product');
const { EatException } = require('./eat-exception');

class Ingestion {
  constructor(meal_type, id) {
    this.id = id;
    this.meal_type = meal_type;
    this.products = [];
    this.day_of_diet = 0;
  }

  setProduct(product) {
    this.products.push(product);
  }

  getFromFridge(productName) {
    const product = this.products.find((p) => p.name === productName);
    if (!product) {
      throw new Error(`Product ${productName} not found`);
    }

    if (product.isJunkFood()) {
      throw new EatException(
        `Too many calories in ${product.name} for ${this.meal_type}!`
      );
    }
  }

  getProductInfo(productName) {
    const product = this.products.find((p) => p.name === productName);
    if (!product) {
      throw new Error(`Product ${productName} not found`);
    }
    return { kcal: product.kcal_per_portion };
  }
}

module.exports = { Ingestion };
