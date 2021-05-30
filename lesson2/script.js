class GoodsItem {
  constructor(title, price, src) {
    this.title = title;
    this.price = price;
    this.src = src;
  }

  /**
   * Метод возвращет разметку для элемента товаров.
   * @returns Метод возвращет разметку для элемента товаров.
   */
  render() {
    return `<div class="goods-item"><img src=${this.src}><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { title: "Shirt", price: 150, src: "img/shirt.png" },
      { title: "Socks", price: 50, src: "img/socks.png" },
      { title: "Jacket", price: 350, src: "img/jacket.png" },
      { title: "Shoes", price: 250, src: "img/shoes.png" },
    ];
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.title, good.price, good.src);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }

  /**
   * Метод возвращает суммарную стоимость всех товаров.
   * @returns суммарная стоимость всех товаров.
   */
  getSumGoods() {
    let sum = 0;
    this.goods.forEach((good) => {
      sum += good.price
    });
    return `Суммарная стоимость всех товаров ${sum}`;
  }
}

//Создаем класс корзины товаров Cart
class Cart extends GoodsList {
  constructor() {
    
  }
}

//Создаем класс элемента корзины CartItem
class CartItem extends GoodsItem {
  constructor() {

  }
}


const list = new GoodsList();
list.fetchGoods();
list.render();
list.getSumGoods();



