const hamburger = {
    totalPrice: 0,
    totalCal: 0,

    init() {
        document.querySelectorAll('.block_info').forEach(elem => {
            elem.addEventListener('click', event => this.clickHandler(event));
        })
    },

    clickHandler(event) {
        if (event.target.nodeName === "P") {
            this.toggleClassElem(event.target.parentElement, 'active')
            this.plusTotal(event.target.parentElement)
            this.smallOrBig(event.target.parentElement)
        } else {
            this.toggleClassElem(event.target, 'active')
            this.plusTotal(event.target)
            this.smallOrBig(event.target)
        }

        this.renderPriceAndCal();
    },

    toggleClassElem(elem, classElem) {
      elem.classList.toggle(classElem);
    },

    smallOrBig(clickElem) {
        const smallEl = document.querySelector('#small');
        const bigEl = document.querySelector('#big');

        if (clickElem === bigEl && smallEl.classList.contains('active')) {
            this.toggleClassElem(smallEl, 'active');
            this.plusTotal(smallEl)
        } else if (clickElem === smallEl && bigEl.classList.contains('active')) {
            this.toggleClassElem(bigEl, 'active');
            this.plusTotal(bigEl)
        }
    },

    getPriceAndCal(elem, position) {
        return position === 'price' ? +elem.dataset.price : +elem.dataset.cal
    },

    plusTotal(elem) {
        if (elem.classList.contains('active')) {
            this.totalPrice += this.getPriceAndCal(elem, 'price');
            this.totalCal += this.getPriceAndCal(elem, 'cal');
        } else {
            this.totalPrice -= this.getPriceAndCal(elem, 'price');
            this.totalCal -= this.getPriceAndCal(elem, 'cal');
        }
    },

    renderPriceAndCal() {
        const priceEl = document.querySelector('#totalPrice');
        const calEl = document.querySelector('#totalCal');

        priceEl.innerHTML = this.totalPrice
        calEl.innerHTML = this.totalCal;
    }
}

hamburger.init();