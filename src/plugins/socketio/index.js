import Vue from 'vue'
import { io } from "socket.io-client";

let socket;
socket = io();
// socket = io('http://localhost:8000');

Vue.use({
    install(Vue) {
        Vue.prototype.$socket = socket
    }
})