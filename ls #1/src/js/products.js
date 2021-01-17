const products = {
    /**
     * Массив объектов-продуктов, который является ключевым источником информации о продуктах.
     */
    productsArr: [
        {id: '001', title: 'Йогурт', price: 65, meas: 'шт'},
        {id: '002', title: 'Арбуз', price: 48 , meas: 'кг'},
        {id: '003', title: 'Бутылка воды', price: 75 , meas: 'шт'},
        {id: '004', title: 'Помидор', price: 30 , meas: 'кг'},
        {id: '005', title: 'Чай', price: 145 , meas: 'уп'},
        {id: '006', title: 'Лемонад', price: 45 , meas: 'шт'},
        {id: '007', title: 'Спагетти', price: 100 , meas: 'уп'},
        {id: '008', title: 'Соус', price: 58 , meas: 'шт'},
        {id: '009', title: 'Снэки', price: 34 , meas: 'уп'},
        {id: '010', title: 'Креветки', price: 375 , meas: 'кг'},
    ],
    /**
     * Путь до иконок продуктов.
     */
    ICON_PATH: './src/img/icons/products/',

    /**
     * Инициализируем объект продуктов.
     */
    init() {
        this.renderProductsList(10,'#home_products_list');
        document.querySelectorAll('.product').forEach(elem => {
            elem.addEventListener('click', event => this.clickListener(event));
        })
    },

    /**
     * Метод рендера одной карточки продукта
     * @param id {number} - идентификатор
     * @param title {string} - наименование
     * @param price {number} - цена
     * @param meas {string} - мера измерения
     * @returns {string} возвращаем строчное значение HTML разметки
     */
    renderProduct(id, title, price, meas) {
        return `
        <div class="product" id="${id}">
            <img src="${this.ICON_PATH}${id}.svg" alt="" class="product_img">
            <p class="product_title">${title}</p>
            <p class="product_price">${price} руб. за 1 ${meas}.</p>
            <button class="btn btn_add_to_cart">Добавить</button>
        </div>
        `
    },

    /**
     * Метод рендера списка товаров при переданном ограниченном количестве элементов для списка товаров
     * @param renderingArrLength {number} - длина новогенерируемого массива, которая будет влиять на количество товаров
     * в листе.
     * @param tagOfList {string} - в HTML разметке ID элемента листа, где должны располагаться товары
     */
    renderProductsList(renderingArrLength, tagOfList) {
        let renderArr = this.productsArr;
        /**
         * Поверяем, если переданная длина равна нулю, то длина массива продуктов будет равна длине нового массива.
         */
        if (renderingArrLength !== 0) {
            renderArr.length = renderingArrLength;
        }

        let listEl = document.querySelector(tagOfList);
        renderArr.forEach(elem => {
            listEl.insertAdjacentHTML('beforeend', this.renderProduct(elem.id, elem.title, elem.price, elem.meas));
        })
    },

    clickListener(event) {
        if (event.target.classList.contains('btn_add_to_cart')) {
            console.log('Произошёл клик по кнопочке товара с id ' + event.target.parentElement.id);
        }
    }
}