Vue.component('catalog', {
    props: ['length'],
    data() {
        return {
            catalogPath: 'catalogData.json',
            products: [],
            filterProducts: [],
        }
    },

    methods: {
        filtered(value) {
            let regexp = new RegExp(value, 'i');
            this.filterProducts = this.products.filter(elem => regexp.test(elem.title))
        }
    },

    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filterProducts.push(el);
                }

                if (this.length !== 0) {
                    this.filterProducts.length = +this.length;
                }
            })
    },

    template: `
        <div class="products_list" id="home_products_list">
            <product ref="refref" v-for="product of filterProducts" :key="product.id" :product="product"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
            img: this.$root.imgPath,
        }
    },
    methods: {
        getImgSrc(item) {
            return `${this.img}${item.id}.svg`
        },
    },
    template: `
        <div class="product">
            <img :src="getImgSrc(product)" class="product_img" alt="img">
            <p class="product_title">{{product.title}}</p>
            <p class="product_price">{{product.price}} руб. за 1 {{product.meas}}.</p>
            <button class="btn btn_add_to_cart" @click="cartAPI.addToCart(product)">Добавить</button>
        </div>
    `
})