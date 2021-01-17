const app = {
    coupon,
    products,
    cart,
    init() {
       this.coupon.init();
       this.products.init();
       this.cart.init();
    },
}

app.init()