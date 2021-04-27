<template>
  <v-row justify="center">
    <v-dialog v-model="value" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Novo Arquivo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome"
                  v-model="fileName"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  label="Conteudo"
                  v-model="fileContent"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="newFile"> Criar </v-btn>
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
    fileName: "",
    fileContent: ''
  }),
  methods: {
    close() {
    //   this.value = false;
      this.$emit("input", false);
    },
    newFile() {
        this.$store.dispatch('createFile', {
        fileName: this.fileName,
        fileContent: this.fileContent,
      })
      this.fileName = ''
      this.fileContent = ''
      this.close();
    },
  },
};
</script>