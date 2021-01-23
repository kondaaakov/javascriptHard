Vue.component('cart', {
    data() {
        return {
            cartPath: 'cartData.json',
            isVisibleCart: false,
            cartProducts: [],
        }
    },
    methods: {
        addToCart(item) {
            let findItem = this.cartProducts.find(elem => elem.id === item.id)

            if (findItem) {
                this.$parent.putJson(`/api/cart/${findItem.id}`, {quantity: 1});
                findItem.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) this.cartProducts.push(prod);
                    })
            }
        },
        removeProduct(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id}`, {quantity: -1})
                    .then(data => {
                        if(data.result === 1) item.quantity--;
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id}`)
                    .then(data => {
                        if(data.result === 1) {
                            this.cartProducts.splice(this.cartProducts.indexOf(item), 1)
                        }
                    })
            }
        },
        getTotalPrice() {
            return this.cartProducts.reduce(function (sum, value) {
                return sum + value.price * value.quantity;
            }, 0)
        },
        deleteAll() {
            this.cartProducts.splice(0, this.cartProducts.length);
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data) {
                    this.cartProducts.push(el);
                }
            })
    },
    template: `
        <div class="cart">
            <img src="./src/img/icons/cart.svg" @click="isVisibleCart = !isVisibleCart" alt="" class="cart_img" id="cart">
            
            <div class="cart_block" v-if="isVisibleCart" id="cartBlock">
                <h2 class="cart_title">Корзина</h2>
                <p class="cart_text" v-if="!cartProducts.length">Корзина пуста</p>
                <div class="cart_products" id="cartProducts">
                    <cart-item 
                    v-for="product of cartProducts"
                    :key="product.id"
                    :cart-item="product"
                    @remove="removeProduct"></cart-item>
                </div>
                <div class="cart_block_bottom">
                    <p class="cart_block_total_price" id="totalPrice">Итого к оплате: {{getTotalPrice()}} рублей</p>
                    <button class="btn pay_btn">Оплатить</button> <button class="btn delete_all_btn" v-if="cartProducts.length" @click="deleteAll()">Удалить всё</button>
                </div>
            </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    data() {
        return {
            img: this.$root.imgPath,
        }
    },
    methods: {
        getImgSrc(item) {
            return `${this.img}${item.id}.svg`
        },
    },
    template: `
        <div class="cart_product">
            <div class="cart_product_left">
                <img :src="getImgSrc(cartItem)" alt="img" class="cart_product_img">
                <div class="cart_product_info">
                    <p class="cart_product_title">{{cartItem.title}}</p>
                    <p class="cart_product_inf">{{cartItem.price}} руб. за 1 {{cartItem.meas}}.</p>
                </div>
            </div>
            
            <div class="cart_product_right">
                <p class="cart_product_price">{{cartItem.price * cartItem.quantity}} руб. за
                {{cartItem.quantity}} {{cartItem.meas}}.</p>
                <img class='cart_product_remove' @click="$emit('remove', cartItem)" src="./src/img/icons/remove.svg" alt="">
            </div>
        </div>
    `
})