const cart = {
    cartEl: document.querySelector('#cart'),
    cartBlockEl: document.querySelector('#cartBlock'),
    cartListEl: document.querySelector('#cartProducts'),
    cartArr: [
        {id: '001', title: 'Йогурт', price: 65, meas: 'шт', quantity: 6},
        {id: '002', title: 'Арбуз', price: 48, meas: 'кг', quantity: 5},
    ],

    /**
     * Инициализируем корзину
     */
    init() {
        this.cartEl.addEventListener('click', () => this.clickListener());
        this.renderCart(this.cartArr);
    },

    clickListener() {
        this.visibleCartBlock('display_none');
    },

    /**
     * Метод переключения видимости элемента блока корзины
     * @param className {string} - класс, который отключается / включается
     */
    visibleCartBlock (className) {
        this.cartBlockEl.classList.toggle(className);
    },

    /**
     * Метод рендера листа добавленных в корзину продуктов.
     * @param arr {object} - массив, по которому будет проходить forEach.
     */
    renderCart(arr) {
        arr.forEach(elem => {
            this.cartListEl.insertAdjacentHTML('beforeend', this.renderCartProduct(elem.id, elem.title, elem.price, elem.meas, elem.quantity));
        })

        this.renderTotalPrice();
    },

    /**
     * Метод рендера карточки одного товара
     * @param id {number} - идентификатор товара
     * @param title {string} - наименование
     * @param price {number} - цена
     * @param meas {string} - мера измерения
     * @param quantity {number} - количество
     * @returns {string} - возвращение HTML-разметки
     */
    renderCartProduct(id, title, price, meas, quantity) {
        return `
        <div class="cart_product">
            <div class="cart_product_left">
                <img src="./src/img/icons/products/${id}.svg" alt="" class="cart_product_img">
                <div class="cart_product_info">
                    <p class="cart_product_title">${title}</p>
                    <p class="cart_product_inf">${price} руб. за 1 ${meas}.</p>
                </div>
            </div>
            <div class="cart_product_right">
                <p class="cart_product_price">${price * quantity} руб. за ${quantity} ${meas}.</p>
                <img class='cart_product_remove' src="./src/img/icons/remove.svg" alt="">
            </div>
        </div>
        `;
    },

    /**
     * Рендер итоговой цены
     */
    renderTotalPrice() {
        let totalPrice = this.getTotalPrice(this.cartArr);
        let totalPriceEl = document.querySelector('#totalPrice');

        totalPriceEl.innerHTML = `Итого к оплате: ${totalPrice} рублей`;
    },

    /**
     * Метод получения итоговой цены. Геттер.
     * @param arr {object} - массив, по которому цены и количества.
     * @returns {number} - возвращение итоговой суммы
     */
    getTotalPrice(arr) {
        let sum = 0;
        arr.forEach(elem => {
            sum += +elem.price * +elem.quantity;
        })
        return sum;
    }
}