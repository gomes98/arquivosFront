import Vue from 'vue'
import axios from 'axios'
// import store from '../../store/index'

axios.defaults.baseURL = 'http://localhost:8000/api/'
// axios.defaults.baseURL = 'https://empresamaissegura.stv.com.br/api/'

const success = res => res
    const error = res => res
// const error = err => {
//     switch (err.response.status) {
//         case 400:
//             store.dispatch('resetSnack')
//             store.dispatch("showErrorSnack", `Erro ${err.response.data.error ? err.response.data.error :''}`);
//             break;
//         case 401:
//             store.dispatch('resetSnack')
//             store.dispatch("showErrorSnack", "Não Autorizado");
//             break;
//         case 307:
//             store.dispatch('resetSnack')
//             store.commit('destroyUser')
//             store.dispatch("showErrorSnack", "Sua Seção Expirou");
//             // window.location = '/'
//             break;
//         case 405:
//             store.dispatch('resetSnack')
//             store.dispatch("showErrorSnack", `Sem Permissão para usar o Recurso ${err.config.url}`);
//             break;
//         case 500:
//             store.dispatch('resetSnack')
//             store.dispatch("showErrorSnack", "Erro no Servidor");
//             break;
//         default:
//             return Promise.reject(err)
//     }
// }

axios.interceptors.response.use(success, error)

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }
})