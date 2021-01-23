const API = 'https://raw.githubusercontent.com/kondaaakov/jsonsForHomework/main/';

const app = new Vue({
    el: '#app',

    data: {
        imgPath: './src/img/icons/products/',
    },

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },

        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error))
        },

        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error))
        },

        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error))
        },
        // handleScroll (evt) {
        //     if (window.scrollY > 100) {
        //         console.log('Ты прокрутился на 200 вниз!');
        //     } else if (window.scrollY < 100) {
        //         console.log('Ты вернлся наверх!')
        //     }
        // }
    },

    // directives: {
    //   scroll: {
    //       inserted: function (el, binding) {
    //           let f = function (evt) {
    //               if (binding.value(evt, el)) {
    //                   window.removeEventListener('scroll', f)
    //               }
    //           }
    //           window.addEventListener('scroll', f)
    //       }
    //   }
    // }
})