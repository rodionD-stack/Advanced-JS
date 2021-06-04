const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";



  class GoodsItem {
    constructor(id_product, product_name, price, img = 'img/image.png') {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.img = img;
    }

    render() {
        return `<div id="${this.id_product}" class="goods-item" data-name="${this.product_name}" data-price="${this.price}" data-img="${this.img}">
            <img src="${this.img}" alt="preview">
            <h3>${this.product_name}</h3>
            <p>${this.price}</p>
            <button class="goods-item__add-to-cart">Добавить товар</button>
        </div>`;
    }
}



class GoodsList {
    constructor() {
      this.list = [];
    }

    async fetch() {
        let response = await fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json');
        let listJSON = await response.json();
        this.list = await listJSON;
    }

    render() {
        let goodsList = '';

        this.list.forEach((item) => {
            goodsList += new GoodsItem(item.id_product, item.product_name, item.price).render();
        });
        
        document.querySelector('.goods-list').innerHTML = goodsList;
    }

    costCalculation() {
        let cost = this.list.reduce( (sum, listItem) => sum + listItem.price, 0 );
        console.log(cost);
    }
}


class CartItem extends GoodsItem {
    constructor(id, name, price, img) {
        super(id, name, price, img);
        this.count = 1;
    }

    /**
     * Метод генерирует HTML-разметку товара корзины
     * @returns HTML-разметка товара корзины
     */
    render() {
        return `<div id="${this.id_product}" class="goods-item" data-name="${this.product_name}" data-price="${this.price}" data-img="${this.img}">
            <img src="${this.img}" alt="preview">
            <h3>${this.product_name}</h3>
            <p>${this.price * this.count}</p>
            <p>${this.count} шт.</p>
            <button class="cart-item__remove-from-cart"></i>Удалить товар</button>
        </div>`;
    }
}

class CartList {
    constructor() {
        this.cartList = {};
    }

    /**
     * Метод добавляет товар в корзину
     * @param {String} id Идентификатор товара
     * @param {String} product Объект с информацией о товаре
     */
    add(id, product) {
        if ( this.cartList[id] ) {
            this.cartList[id].count++;
        } else {
            this.cartList[id] = product;
        }

        this.render();
        this.showCart();
    }

    /**
     * Метод удаляет товар из корзины по значению id
     * @param {String} id id товара
     */
    remove(id) {
        if ( this.cartList[id].count == 1 ) {
            delete this.cartList[id];
        } else {
            this.cartList[id].count--;
        }

        this.render();
    }

    /**
     * Метод отрисовывает корзину
     */
    render() {
        let cart = '';

        for (let id in this.cartList) {
            cart += this.cartList[id].render();
        }
        
        document.querySelector('.cart-list').innerHTML = cart;
        this.setRemoveFromCartHandlers();
    }

    /**
     * Метод добавляет обработчики товарам в корзине
     */
    setRemoveFromCartHandlers() {
        document.querySelectorAll('.cart-item__remove-from-cart').forEach((button) => {
            button.addEventListener('click', (event) => {
                let product = event.target.closest('div');
                let productId = product.id;
                this.remove(productId);
            })
        });
    }

    /**
     * Метод добавляет обработчики товарам в каталоге
     */
    setAddToCartHandlers() {
        document.querySelectorAll('.goods-item__add-to-cart').forEach((button) => {
            button.addEventListener('click', (event) => {
                let product = event.target.closest('div');
                let productId = product.id;
                let productName = product.dataset.name;
                let productPrice = product.dataset.price;
                let productImg = product.dataset.img;

                let cartItem = new CartItem(productId, productName, productPrice, productImg);

                this.add(productId, cartItem);
            })
        });
    }

    /**
     * Метод очищает корзину
     */
    clear() {
        this.cartList = {};
    }

    showCart() {
        console.log(this.cartList);
    }

}

const cartBox = document.querySelector('.cart-box');
const showCartBox = document.querySelector('.cart-button');
showCartBox.addEventListener('click', (event) => {
    cartBox.style.display = 'block';
})


window.onload = async function() {
    let goodsList = new GoodsList();
    let cartList = new CartList();
    await goodsList.fetch();
    goodsList.render();
    cartList.setAddToCartHandlers();
    goodsList.costCalculation();

}
