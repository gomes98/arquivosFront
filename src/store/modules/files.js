import axios from 'axios'
export default {
    state: {
        files: [],
        downloads: 0,
        actDir: '',
        history: [],
        historyCur: 0
    },
    mutations: {
        setFiles(state, payload) {
            state.files = payload
        },
        setActDir(state, payload) {
            state.actDir = payload
        },
        setHistoryPos(state, payload) {
            state.historyCur = payload
        },
        addDownload(state) {
            state.downloads++
        },
    },
    actions: {
        getFiles(context, payload) {
            let dir = payload ? `?directory=${payload}` : ''
            if(payload != null){
                context.dispatch('setWorkdir', payload)
                context.commit('setActDir', dir)
            }
            
            axios(`file${context.getters.getActDir}`).then((resp) => {
                context.commit('setFiles', resp.data)
            });
        },
        setFiles(context, payload) {
            context.commit('setFiles', payload)
        },
        sendFile(context, file) {
            let formData = new FormData();
            formData.append("file", file);
            axios.post(`file${context.getters.getActDir}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                context.dispatch('getFiles')
                });
            },
        createFile(context, file) {
            let formData = new FormData();
            formData.append("fileName", file.fileName);
            formData.append("fileContent", file.fileContent);
            axios.post(`file/create${context.getters.getActDir}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                context.dispatch('getFiles')
            });
        },
        createDir(context, payload) {
            let formData = new FormData();
            formData.append("dirName", payload);
            
            axios.post(`directory${context.getters.getActDir}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((resp) => {
                    console.log(resp);
                    context.dispatch('getFiles')
                });
        },
        deleteFile(context, payload) {
            var data = new FormData();
            data.append("fileName", payload);
            var config = {
                method: "delete",
                url: `file${context.getters.getActDir}`,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: data,
            };
            axios(config).then(() => {
                context.dispatch('getFiles')
            });
        },
        deleteDir(context, payload) {
            var data = new FormData();
            data.append("dirName", payload);
            var config = {
                method: "delete",
                url: "directory",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: data,
            };
            axios(config).then(() => {
                context.dispatch('getFiles')
            });
        },
        renameFile(context, payload) {
            var data = new FormData();
            data.append("fileName", payload.fileName);
            data.append("newFileName", payload.newFileName);
            var config = {
                method: "put",
                url: `file${context.getters.getActDir}`,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: data,
            };
            axios(config)
                .then(() => {
                    context.dispatch('getFiles')
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        downloadFile(context, payload) {
            window.location.href = encodeURI(
                `${axios.defaults.baseURL}download/${context.getters.getActDir}${payload}`
            );
            context.dispatch('addDownload')
        }
    },
    getters: {
        getFiles(state) {
            return state.files
        },
        getActDir(state) {
            return state.actDir
        },
        getDirs(state){
            let dirs = []
            state.files.forEach(ele =>{
                if(ele.dir){
                    dirs.push(ele.fileName)
                }
            })
            return dirs
        },
        getFileName: () => (fileName) =>{
            if(!fileName){
                return ''
            }
            return fileName.substring(fileName.lastIndexOf("/") + 1);
        }
    },
}