<template>
  <v-row justify="center">
    <v-dialog v-model="value" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Novo Diretorio</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome"
                  v-model="dirName"
                  required
                ></v-text-field>
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
    dirName: "",
  }),
  methods: {
    close() {
      this.$emit("input", false);
    },
    newFile() {
        this.$store.dispatch('createDir', this.dirName)
      this.dirName = ''
      this.close();
    },
  },
};
</script>