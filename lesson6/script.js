Vue.component('goods-list', {
    template: `
        <div class="goods-list">
            <goods-item v-for="good in goods" :good="good" :handler="handler"></goods-item>
        </div>
    `,
    props: ['goods', 'handler'],
});

Vue.component('cart-list', {
    template: `
        <div class="cart-list">
            <cart-item v-for="good in goods" :good="good" :handler="handler"></cart-item>
        </div>
    `,
    props: ['goods', 'handler'],
});

Vue.component('goods-item', {
    template: `
        <div class="goods-item">
            <img src="img/image.png" alt="image">
            <h3>{{ good.product_name }}</h3>
            <p>{{ good.price }}</p>
            <button class="goods-item__add-to-cart" @click="handler(good)">
                 Добавить товар
            </button>
        </div>
    `,
    props: ['good', 'handler'],
});

Vue.component('cart-item', {
    template: `
        <div class="cart-item">
            <img src="img/image.png" alt="image">
            <h3>{{ good.product_name }}</h3>
            <p>{{ good.totalPrice }}</p>
            <p>{{ good.count }} шт.</p>
            <button class="cart-item__remove-from-cart" @click="handler(good)">
                 Удалить товар
            </button>
        </div>
    `,
    props: ['good', 'handler'],
});

Vue.component('search', {
    template: `
            <button class="search-button" type="button" @click="handler()"><svg width="27" height="28"
            viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.0589 17.6251C20.6705 15.865 21.6275 13.6039 21.769 11.2216C21.9106 8.83932 21.2281 6.48088 19.8362 4.54232C18.4443 2.60377 16.4278 1.20318 14.1252 0.575765C11.8227 -0.0516554 9.37437 0.132305 7.19143 1.09675C5.0085 2.0612 3.22389 3.74739 2.1373 5.87217C1.05071 7.99695 0.728322 10.4309 1.22426 12.7653C1.72021 15.0997 3.00428 17.1923 4.86085 18.6919C6.71741 20.1914 9.0334 21.0064 11.4199 21.0001C13.6723 21.0031 15.8638 20.2691 17.6599 18.9101L25.4079 26.7171C25.4934 26.8061 25.5958 26.8772 25.7091 26.9261C25.8225 26.9751 25.9444 27.0009 26.0679 27.0021C26.1916 27.0024 26.314 26.9773 26.4276 26.9283C26.5411 26.8793 26.6434 26.8074 26.7279 26.7171C26.9018 26.5362 26.999 26.295 26.999 26.0441C26.999 25.7931 26.9018 25.5519 26.7279 25.371L19.0589 17.6251ZM2.88589 10.5001C2.89873 8.81477 3.41021 7.17101 4.35586 5.776C5.30151 4.38098 6.63899 3.29715 8.1997 2.66114C9.76042 2.02513 11.4745 1.86542 13.1258 2.20213C14.7772 2.53884 16.2919 3.3569 17.479 4.55319C18.6661 5.74948 19.4725 7.27044 19.7965 8.92433C20.1204 10.5782 19.9475 12.291 19.2995 13.8468C18.6515 15.4026 17.5574 16.7316 16.1551 17.6665C14.7529 18.6014 13.1052 19.1002 11.4199 19.1C9.14843 19.0892 6.97409 18.1775 5.3741 16.5652C3.77412 14.9528 2.87924 12.7715 2.88589 10.5001Z"
                fill="#E8E8E8" />
        </svg></button>
    `,
    props: ['handler'],
});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        isVisibleCart: false,
        shopCart: [],
        searchLine: '',
    },
    methods: {
        async fetch() {
            let response = await fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json');
            let listJSON = await response.json();
            this.goods = await listJSON;
            this.filteredGoods = await listJSON;
        },

        filterGoods() {
            console.log(this.goods)
            console.log(this.searchLine)
            this.filteredGoods = this.goods.filter((value) => {
                return value.product_name.includes(this.searchLine);
            });
        },

        addToCart(good) {
            this.isVisibleCart = true;
            if ( this.shopCart.includes(good) ) {
                id = this.shopCart.indexOf(good);
                this.shopCart = this.shopCart.map((good, index) => {
                    if ( index == id ) {
                        good.count++;
                        good.totalPrice = good.price * good.count;
                        return good;
                    } else {
                        return good;
                    }
                });
            } else {
                good.count = 1;
                good.totalPrice = good.price * good.count;
                this.shopCart.push(good);
            }
        },

        removeFromCart(good) {
            id = this.shopCart.indexOf(good);
            if ( this.shopCart[id].count == 1 ) {
                this.shopCart = this.shopCart.filter((good, index) => {
                    if ( index == id ) {
                        good.count--;
                        good.totalPrice = good.price * good.count;
                        return false;
                    } else {
                        return true;
                    }
                });
            } else {
                this.shopCart = this.shopCart.map((good, index) => {
                    if ( index == id ) {
                        good.count--;
                        good.totalPrice = good.price * good.count;
                        return good;
                    } else {
                        return good;
                    }
                });
            }
            if ( this.shopCart.length == 0 ) {
                this.isVisibleCart = false;
            }
        },

        /*showCartBox() {
            const cartBox = document.querySelector('.cart-box');
            const showCartBox = document.querySelector('.cart-button');
            showCartBox.addEventListener('click', (event) => {
                cartBox.style.display = 'block';
            
        });
        },*/
    },
    async mounted() {
        await this.fetch();
    }
});