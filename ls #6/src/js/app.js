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
                    console.log(error);
                })
        },
    },
})