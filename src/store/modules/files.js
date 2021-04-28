import axios from 'axios'
export default {
    state: {
        files: [],
        downloads: 0,
        actDir: null,
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
            context.commit('setActDir', dir)
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
            axios.post("file", formData, {
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
            axios.post("file/create", formData, {
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
            axios.post("directory", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(() => {
                    context.dispatch('getFiles')
                });
        },
        deleteFile(context, payload) {
            var data = new FormData();
            data.append("fileName", payload);
            var config = {
                method: "delete",
                url: "file",
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
                url: "file",
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
                `${axios.defaults.baseURL}download/${payload}`
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
        }
    },
}