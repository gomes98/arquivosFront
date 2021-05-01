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
            if(!state.workDir){
                return ''
            }
            let dirs = state.workDir.split('/')
            return dirs
        },
        getWorkDirSTR:  (state)=> (indexDir) => {
            if(!state.workDir){
                return ''
            }
            let dirs = state.workDir.split('/')
            let dirSTR =''
            for (let index = 1; index < indexDir+1; index++) {
                dirSTR += `/${dirs[index]}`
            }
            return dirSTR
        },
        getDirsPath(state){
            let rnt = [] 
            state.tree.forEach(element => {
                console.log(element);
            });
            return rnt

        }
    },
}