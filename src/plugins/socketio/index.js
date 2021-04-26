import Vue from 'vue'
import { io } from "socket.io-client";

let socket;
if (process.env.NODE_ENV === 'production') {
    socket = io();
} else {
    socket = io('http://localhost:8000');
}

Vue.use({
    install(Vue) {
        Vue.prototype.$socket = socket
    }
})