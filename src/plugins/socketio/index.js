import Vue from 'vue'
import { io } from "socket.io-client";

// modo dev
const socket = io('http://localhost:8000');
// modo prod
// const socket = io();

Vue.use({
    install(Vue) {
        Vue.prototype.$socket = socket
    }
})