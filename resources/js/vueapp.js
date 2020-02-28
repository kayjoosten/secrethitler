require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './components/App'
import Welcome from './components/Welcome'
import InfoPage from './components/InfoPage'
import GameRoom from "./components/GameRoom";
import ModePicker from './components/ModePicker'
import JoinLobby from './components/JoinLobby'


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: Welcome,
        },
        {
            path: '/info',
            name: 'info',
            component: InfoPage,
        },
        {
            path: '/room',
            name: 'gameroom',
            component: GameRoom,
        },
        {
            path: '/modepicker',
            name: 'modepicker',
            component: ModePicker,
            props: {
                title: "Game mode picker"
            }
        },
        {
            path: '/join',
            name: 'joinlobby',
            component: JoinLobby,
            props: {
                title: "Join a lobby"
            }
        }
    ],
});
const app = new Vue({
    el: '#app',
    components: { App },
    router,
});
