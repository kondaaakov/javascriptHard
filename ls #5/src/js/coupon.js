const coupon = {
    couponArr: [],
    couponsArr: [],
    btnCouponElement: document.querySelector('#getCoupon'),
    couponField: document.querySelector('#couponField'),

    init() {
        this.btnCouponElement.addEventListener('click', () => this.getCoupon());
    },

    getCoupon() {
        this.couponArr.length = 0;
        for (let i = 0; i < 10; i++) {
            let num = Math.floor(Math.random() * 10);
            this.couponArr.push(num);
        }
        this.couponToCoupons()
    },

    couponToCoupons() {
        let coupon = this.couponArr.join('');
        this.couponsArr.push(coupon);

        this.renderCoupon(coupon);
    },

    renderCoupon(coupon) {
        let field = this.couponField;
        field.innerHTML = coupon;

        field.classList.remove('display_none');
    },
}