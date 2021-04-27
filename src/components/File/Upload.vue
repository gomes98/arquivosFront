<template>
  <v-row justify="center">
    <v-dialog v-model="value" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Upload</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="files"
                  chips
                  multiple
                  show-size
                  counter
                  label="Selecione os Arquivos"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
          <v-btn color="blue darken-1" text @click="newFile"> Enviar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ["value"],
  data: () => ({
    dialog: false,
    files: [],
  }),
  methods: {
    close() {
      this.$emit("input", false);
    },
    newFile() {
      let lista = this.files;
      if (lista.length) {
        lista.forEach((element) => {
          this.$store.dispatch("sendFile", element);
        });
      }
      this.files = [];
      this.close();
    },
  },
};
</script>