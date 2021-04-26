<template>
  <v-row justify="center">
    <v-dialog
      v-model="value"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Editor "{{ file }}"
            <small>Ctrl+S para salvar</small>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="sendData"> Salvar </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-textarea v-model="data" rows="1" auto-grow @keydown.ctrl.83.prevent="sendData"></v-textarea>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["value", "file"],
  data() {
    return {
      dialog: false,
      data: "",
    };
  },
  methods: {
    close() {
      this.$emit("input", false);
    },
    getData() {
      this.$http.get(`editor/?fileName=${this.file}`).then((resp) => {
        this.data = resp.data;
      });
    },
    sendData() {
      var data = new FormData();
      data.append("fileName", this.file);
      data.append("data", this.data);
      var config = {
        method: "put",
        url: "editor",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      this.$http(config)
        .then(() => {
          this.getData();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  watch: {
    file() {
      this.getData();
    },
  },
  mounted() {
    if (this.file) {
      this.getData();
    }
  },
};
</script>

<style>
.editor {
  height: 80vh;
}
</style>