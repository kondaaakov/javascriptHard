class Transformtext {
    constructor() {
        this.str = '';
        this.textarea = document.querySelector('#text_area');
        this.btn = document.querySelector('#btn_textarea');
    }

    clickListener() {
        this.btn.addEventListener('click', () => this.strToStr())
    }

    strToStr() {
        this.str = this.textarea.value;
        this.textarea.value = this.str.replace(/\B'|'\B/g, `"`);
    }
}

const newTransform = new Transformtext();
newTransform.clickListener();