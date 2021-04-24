<template>
  <v-row justify="center">
    <v-dialog v-model="value" max-width="600px">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title>
          <span class="headline">Renomear Arquivo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <strong>
                {{ fileName }}
              </strong>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Novo nome"
                  v-model="newFileName"
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
          <v-btn color="blue darken-1" text @click="rename"> Alterar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ["value", "fileName"],
  watch: {
    fileName(){
        this.newFileName = this.fileName
    }
  },
  data: () => ({
    dialog: false,
    newFileName: "",
  }),
  methods: {
    close() {
    //   this.value = false;
      this.$emit("input", false);
    },
    rename() {
      this.$emit("RENAME", {
        fileName: this.fileName,
        newFileName: this.newFileName,
      });
      this.newFileName = ''
    },
  },
  mounted(){
      this.newFileName = this.fileName
  }
};
</script>