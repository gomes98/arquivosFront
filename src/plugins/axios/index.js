import Vue from 'vue'
import axios from 'axios'

if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = `${window.location.href}api/`
} else {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
}
// axios.defaults.baseURL = 'https://empresamaissegura.stv.com.br/api/'

// const success = res => res
// const error = res => res
// axios.interceptors.response.use(success, error)

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }
})