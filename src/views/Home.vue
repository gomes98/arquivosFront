<template>
  <v-container fluid @dragover.prevent @drop.prevent="drop">
    <v-col cols="12">
      <v-card>
        <v-card-title> Arquivos no Sistema </v-card-title>
        <v-card-text v-show="arquivos.length > 0">
          <v-container id="fileSystem" class="d-flex flex-wrap">
            <File
              v-for="(arq, index) in arquivos"
              :key="index"
              :file="arq"
              @del="del"
              @rename="rename"
              @down="download"
              @edit="openEditor"
              @props="propri"
            />
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
    <Rename
      v-model="renameD"
      :fileName="renameFileName"
      @RENAME="edit($event)"
    />
    <Editor v-model="editor" :file="editorFileName" />
    <Propriedades v-model="propriedades" :file="selectedFile" />
  </v-container>
</template>

<script>
import File from "../components/File/File";
import Rename from "../components/File/DialogRename";
import Propriedades from "../components/File/DialogProps";
import Editor from "../components/Editor/EditorDialog";

export default {
  name: "Home",
  components: {
    File,
    Rename,
    Editor,
    Propriedades
  },
  data: () => {
    return {
      propriedades: false,
      selectedFile:{
        fileName: '',
        info:{
          size: 0,
          mtime: ''
        }
      },
      editor: false,
      editorFileName: '',
      arquivos: [],
      renameD: false,
      renameFileName: "",
    };
  },
  methods: {
    get() {
      this.$http(`file`).then((resp) => {
        this.arquivos = resp.data;
      });
    },
    drop(event) {
      let lista = event.dataTransfer.files;
      if (lista.length) {
        lista.forEach((element) => {
          this.send(element);
        });
      }
    },
    download(event){
      window.location.href = encodeURI(`${this.$http.defaults.baseURL}download/${event}`)
    },
    send(file) {
      let formData = new FormData();
      formData.append("file", file);
      this.$http
        .post("file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.get();
        });
    },
    del(event) {
      var data = new FormData();
      data.append("fileName", event);
      var config = {
        method: "delete",
        url: "file",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      this.$http(config)
        .then(() => {
          this.get();
        })
    },
    rename(event) {
      this.renameD = true;
      this.renameFileName = event;
    },
    edit(event) {
      this.renameD = false;
      var data = new FormData();
      data.append("fileName", event.fileName);
      data.append("newFileName", event.newFileName);
      var config = {
        method: "put",
        url: "file",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      this.$http(config)
        .then(() => {
          this.get();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    openEditor(event){
      this.editor = true
      this.editorFileName= event
    },
    propri(event){
      this.propriedades = true
      this.selectedFile= this.arquivos.find(ele =>{
        return ele.fileName == event
      })
    }
  },
  created() {
    this.get();
     this.$socket.on('fileChange', () => {
       this.get();
     })
  },
};
</script>
<style>
#fileSystem {
  background-color: gray;
}
</style>