import axios from 'axios'
export default {
    state: {
        tree: [],
        workDir :''
    },
    mutations: {
        setTree(state, payload) {
            state.tree = payload
        },
        setWorkdir(state, payload) {
            state.workDir = payload
        },
    },
    actions: {
        getDirTree(context) {
            axios(`file/tree`).then((resp) => {
                context.commit('setTree', resp.data)
            });
        },
        setTree(context, payload) {
            context.commit('setTree', payload)
        },
        setWorkdir(context, payload) {
            context.commit('setWorkdir', payload)
        },
    },
    getters: {
        getTree(state) {
            return state.tree
        },
        getWorkDir(state) {
            return state.workDir
        },
    },
}