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
  </v-container>
</template>

<script>
import File from "../components/File/File";
import Rename from "../components/File/DialogRename";
export default {
  name: "Home",
  components: {
    File,
    Rename,
  },
  data: () => {
    return {
      arquivos: [],
      renameD: false,
      renameFileName: "",
    };
  },
  methods: {
    get() {
      this.$http(`file`).then((resp) => {
        this.arquivos = resp.data;
        console.log(resp.data);
      });
    },
    drop(event) {
      let lista = event.dataTransfer.files;
      console.log(lista);
      if (lista.length) {
        lista.forEach((element) => {
          this.send(element);
        });
      }
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
        .catch(function (error) {
          console.log(error);
        });
    },
    rename(event) {
      console.log(event);
      this.renameD = true;
      this.renameFileName = event;
    },
    edit(event) {
      console.log(event);
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
    editar(event) {
      console.log(event);
      let obj = this.usuarios.filter((ele) => ele.id == event.id);
      this.usuario = { ...obj[0] };
      this.edicao = true;
      this.$router.push({
        name: "changePass",
        params: { editar: { ...this.usuario } },
      });
    },
    delet(id) {
      this.$http.delete(`/usuario/${id.id}`).then(() => {
        this.get();
        this.$store.dispatch("resetSnack");
        this.$store.dispatch(
          "showSuccessSnack",
          "Usuário deletado com Sucesso!"
        );
        this.get();
      });
    },
  },
  created() {
    this.get();
  },
};
</script>
<style>
#fileSystem {
  background-color: gray;
}
</style>