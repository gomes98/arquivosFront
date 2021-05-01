<template>
  <v-container fluid @dragover.prevent @drop.prevent="drop">
    <v-col cols="12">
      <v-card>
        <v-card-title> Arquivos no Sistema </v-card-title>
        <v-card-subtitle>
          <a @click="$store.dispatch('getFiles', '')"><v-icon>mdi-home</v-icon></a>
          <a
            v-for="(dir, index) in $store.getters.getWorkDir"
            :key="index"
            @click="
              $store.dispatch('getFiles', $store.getters.getWorkDirSTR(index))
            "
            v-show="index"
          >
            >{{ ` ${dir}` }}
          </a>
        </v-card-subtitle>
        <v-card-text>
          <v-container
            id="fileSystem"
            class="d-flex flex-wrap"
            v-show="arquivos.length > 0"
          >
            <File
              v-for="(arq, index) in arquivos"
              :key="index"
              :file="arq"
              @del="del"
              @delDir="$store.dispatch('deleteDir', $event)"
              @rename="rename"
              @down="download"
              @edit="openEditor"
              @props="propri"
              @selected="selectedFile = $event"
            />
          </v-container>
        </v-card-text>
        <v-card-actions v-show="selectedFile">
          <strong v-show="selectedFile.fileName">Nome: </strong
          >{{ fileName(selectedFile.fileName) }}
          <v-spacer></v-spacer>
          <span v-show="selectedFile.info.size">
            <strong> Tamanho: </strong>{{ tamanho(selectedFile.info.size) }}
          </span>
        </v-card-actions>
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
import File from "@/components/File/File";
import Rename from "@/components/File/DialogRename";
import Propriedades from "@/components/File/DialogProps";
import Editor from "@/components/Editor/EditorDialog";
export default {
  name: "FileSystem",
  components: {
    File,
    Rename,
    Editor,
    Propriedades,
  },
  data: () => {
    return {
      propriedades: false,
      selectedFile: {
        fileName: "",
        info: {
          size: 0,
          mtime: "",
        },
      },
      editor: false,
      editorFileName: "",
      renameD: false,
      renameFileName: "",
      newFile: false,
      newDir: false,
    };
  },
  computed: {
    arquivos: {
      get() {
        return this.$store.getters.getFiles;
      },
      set(value) {
        this.$store.dispatch("setFiles", value);
      },
    },
  },
  methods: {
    tamanho(bytes) {
      let mb = bytes / (1024 * 1024);
      let kb = bytes / 1024;
      if (mb > 1) {
        return `${mb.toFixed(2)} MB`;
      } else if (kb > 1) {
        return `${kb.toFixed(2)} KB`;
      } else {
        return `${bytes} B`;
      }
    },
    get() {
      this.$store.dispatch("getFiles");
    },
    drop(event) {
      let lista = event.dataTransfer.files;
      if (lista.length) {
        lista.forEach((element) => {
          this.send(element);
        });
      }
    },
    download(event) {
      this.$store.dispatch("downloadFile", event);
    },
    send(file) {
      this.$store.dispatch("sendFile", file);
    },
    del(event) {
      this.$store.dispatch("deleteFile", event);
    },
    rename(event) {
      this.renameD = true;
      this.renameFileName = event;
    },
    edit(event) {
      this.renameD = false;
      this.$store.dispatch("renameFile", event);
    },
    openEditor(event) {
      this.editor = true;
      this.editorFileName = event;
    },
    propri(event) {
      this.propriedades = true;
      this.selectedFile = this.arquivos.find((ele) => {
        return ele.fileName == event;
      });
    },
    fileName(file) {
      return file.substring(file.lastIndexOf("/") + 1);
    },
  },
  created() {
    this.get();
    this.$socket.on("fileChange", () => {
      this.get();
    });
  },
};
</script>

<style>
#fileSystem {
  background-color: gray;
}
</style>