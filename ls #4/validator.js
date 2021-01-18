class Validator {
    constructor () {
        this.form = document.querySelector('#form');
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            tel: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            mail: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = {
            name: 'Имя должно содержать только буквы',
            tel: 'Телефон подчиняется по шаблону +7(000)000-0000',
            mail: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.valid = false;
        this.errorClass = 'form_error_msg'
        this._validateForm();
    }
    _validateForm() {
        let errors = [...this.form.querySelectorAll(`.${this.errorClass}`)]
        for (let error of errors) {
            error.remove();
        }

        let formFields = [...this.form.querySelectorAll('.form_input')]
        for (let field of formFields) {
            this._validate(field);
        }

        if (![...this.form.querySelectorAll('.form_input_invalid')].length) {
            this.valid = true;
        }
    }

    _validate(field) {
        if (this.patterns[field.name]) {
            if (!this.patterns[field.name].test(field.value)) {
                field.classList.add('form_input_invalid');
                this._addErrorMsg(field);
                this._watchField(field);
            }
        }
    }

    _addErrorMsg(field) {
        let error = `<p class="${this.errorClass}">${this.errors[field.name]}</p>`;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }

    _watchField(field) {
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);

            if (this.patterns[field.name].test(field.value)) {
                field.classList.remove('form_input_invalid');
                field.classList.add('form_input_valid');

                if (error) {
                    error.remove();
                }
            } else {
                field.classList.remove('form_input_valid');
                field.classList.add('form_input_invalid');

                if (!error) {
                    this._addErrorMsg(field);
                }
            }
        })
    }
}