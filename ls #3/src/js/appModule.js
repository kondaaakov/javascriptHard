const API = 'https://raw.githubusercontent.com/kondaaakov/jsonsForHomework/main/';

let getRequest = url => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                xhr.status !== 200 ? reject('error'): resolve(xhr.responseText);
            }
        }
    })
}

class ProductsList {
    #productsArr;
    #catalogData;
    #container;
    
    constructor(container, count) {
        this.#container = document.querySelector(container);
        this.#productsArr = [];
        this.#catalogData = 'catalogData.json';
        this.maxCountItems = count;
        this.ICON_PATH = './src/img/icons/products/';

        this.getProducts(this.#catalogData)
            .then(data => {
                this.#productsArr = [...data];
                this.#renderProducts();
            })
    }

    getProducts(goodsData) {
        return fetch(`${API}${goodsData}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    #renderProducts() {
        const goodsArr = this.#productsArr;
        if (this.maxCountItems !== 0) {
            goodsArr.length = this.maxCountItems;
        }

        for (let product of goodsArr) {
            const productItem = new Product(product, this.ICON_PATH);
            this.#container.insertAdjacentHTML('beforeend', productItem.render())
        }
    }
}

class Product {
    constructor(product, imgPath) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.meas = product.meas;
        this.img = `${imgPath}${product.id}.svg`;
    }

    render() {
        return `<div class="product">
                    <img src="${this.img}" alt="" class="product_img">
                        <p class="product_title">${this.title}</p>
                        <p class="product_price">${this.price} руб. за 1 ${this.meas}.</p>
                        <button class="btn btn_add_to_cart"
                                data-id="${this.id}"
                                data-title="${this.title}"
                                data-price="${this.price}"
                                data-meas="${this.meas}">Добавить
                        </button>
                </div>`
    }
}

class Cart {
    #container;
    #cartArr;
    #catalogData;

    constructor(container) {
        this.#container = document.querySelector(container)
        this.#cartArr = [];
        this.#catalogData = 'cartData.json';
        this.ICON_PATH = './src/img/icons/products/';

        this.getProducts(this.#catalogData)
            .then(data => {
                this.#cartArr = [...data];
                this.#init();

            });
        this.#visibleCartBlock();
    }

    getProducts(goodsData) {
        return fetch(`${API}${goodsData}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    #init() {
        this.renderCart();
        this.renderTotalPrice();
        this.clickListeners();
    }

    renderCart() {
        this.#container.innerHTML = '';
        this.#cartArr.forEach(elem => this.#container.insertAdjacentHTML('beforeend', this.#renderItem(elem)))
    }

    #renderItem(productCart) {
        return `
        <div class="cart_product" data-id="${productCart.id}">
            <div class="cart_product_left">
                <img src="${this.ICON_PATH}${productCart.id}.svg" alt="" class="cart_product_img">
                <div class="cart_product_info">
                    <p class="cart_product_title">${productCart.title}</p>
                    <p class="cart_product_inf">${productCart.price} руб. за 1 ${productCart.meas}.</p>
                </div>
            </div>
            <div class="cart_product_right">
                <p class="cart_product_price">${+productCart.price * +productCart.quantity} руб. за ${productCart.quantity} ${productCart.meas}.</p>
                <img class='cart_product_remove' data-id="${productCart.id}" src="./src/img/icons/remove.svg" alt="">
            </div>
        </div>
        `
    }

    renderTotalPrice() {
        let totalPrice = this.#cartArr.reduce(function (sum, value) {
            return sum + value.price * value.quantity;
        }, 0);
        let totalPriceEl = document.querySelector('#totalPrice');

        totalPriceEl.innerHTML = `Итого к оплате: ${totalPrice} рублей`;
    }

    #visibleCartBlock() {
        let cartEl = document.querySelector('#cart');
        let cartBlockEl = document.querySelector('#cartBlock');

        cartEl.addEventListener('click', () => cartBlockEl.classList.toggle('display_none'));
    }

    #removeFromCart(id) {
        let findItem = this.#cartArr.find(elem => elem.id === id);

        if (findItem) {
            if (findItem.quantity > 1) {
                findItem.quantity--;
                this._updateCart(findItem)
            } else {
                this.#cartArr.splice(this.#cartArr.indexOf(findItem), 1)
                document.querySelector(`.cart_product[data-id="${findItem.id}"]`).remove()
            }
        }
        this.renderTotalPrice();
    };

    addToCart(dataOfElem) {
        let findItem = this.#cartArr.find(elem => elem.id === +dataOfElem.id)

        if (findItem) {
            findItem.quantity++;
            this._updateCart(findItem)
        } else {
            this.#cartArr.push(this.createNewCartItem(dataOfElem));
            this.#container.insertAdjacentHTML('beforeend', this.#renderItem(this.createNewCartItem(dataOfElem)));
        }
        this.renderTotalPrice();
    }

    createNewCartItem(product) {
        return {"id": +product.id, "title": product.title, "price": +product.price, "meas": product.meas, "quantity": 1};
    }

    _updateCart(item) {
        let productEl = document.querySelector(`.cart_product[data-id="${item.id}"]`)
        productEl.querySelector('.cart_product_price').textContent = `${item.price * item.quantity} руб. за ${item.quantity} ${item.meas}.`;
    }

    clickListeners() {
        document.body.addEventListener('click', event => {
            if (event.target.classList.contains('btn_add_to_cart')) {
                this.addToCart(event.target.dataset)
            } else if (event.target.classList.contains('cart_product_remove')) {
                this.#removeFromCart(+event.target.dataset.id)
            }
        })
    };
}

const cartList = new Cart('#cartProducts');