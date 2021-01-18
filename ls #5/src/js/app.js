const API = 'https://raw.githubusercontent.com/kondaaakov/jsonsForHomework/main/';

const app = new Vue({
    el: '#app',

    data: {
        catalogPath: 'catalogData.json',
        cartPath: 'cartData.json',
        imgPath: './src/img/icons/products/',
        products: [],
        isVisibleCart: false,
        cartProducts: [],
    },

    methods: {

        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        getImgSrc(item) {
            return `${this.imgPath}${item.id}.svg`
        },

        addProduct(item) {
            let findItem = this.cartProducts.find(elem => elem.id === item.id)

            if (findItem) {
                findItem.quantity++;
            } else {
                this.cartProducts.push(this.createNewCartItem(item));
            }
        },

        createNewCartItem(product) {
            return {"id": +product.id, "title": product.title, "price": +product.price, "meas": product.meas, "quantity": 1}
        },

        removeProduct(item) {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                this.cartProducts.splice(this.cartProducts.indexOf(item), 1)
            }
            console.log('Метод сработал!')
        },

        getTotalPrice() {
            return this.cartProducts.reduce(function (sum, value) {
                return sum + value.price * value.quantity;
            }, 0)
        }
    },

    created() {
        this.getJson(`${API + this.catalogPath}`)
            .then(data => {
                for(let el of data) {
                    this.products.push(el);
                }
            })
        this.getJson(`${API + this.cartPath}`)
            .then(data => {
                for(let el of data) {
                    this.cartProducts.push(el);
                }
            })
    }
})