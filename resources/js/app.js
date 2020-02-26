require('./bootstrap');

window.Vue = require('vue');

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)

Vue.component('message-component', require('./components/MessageComponent.vue').default);


const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat: {
            message: [],
            user: [],
            color: []
        },
        typing: '',
        numberOfUsers: 0
    },
    watch: {
        message() {
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                });
        }
    },
    methods: {
        send() {
            if (this.message.length !== 0)
                this.chat.message.push(this.message);
            this.chat.user.push('You');
            this.chat.color.push('success');
            axios.post('/send', {
                message: this.message
            })
                .then(response => {
                    console.log(response);
                    this.message = '';
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                this.chat.color.push('warning');
            })
            .listenForWhisper('typing', (e) => {
                if (e.name !== '') {
                    this.typing = 'typing...'
                } else {
                    this.typing = ''
                }
            });
        Echo.join(`chat`)
            .here((users) => {
                this.numberOfUsers = users.length;
            })
            .joining((user) => {
this.numberOfUsers +=1;
            })
            .leaving((user) => {
this.numberOfUsers -=1;
            });
    }
});
