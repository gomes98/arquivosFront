<template>
  <v-row justify="center">
    <v-dialog v-model="value" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Propriedades do Arquivo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <strong>
                Nome :
              </strong>
                {{ file.fileName }}
            </v-row>
            <v-row>
              <strong>
                Tamanho:
              </strong>
                {{ tamanho(file.info.size) }}
            </v-row>
            <v-row>
              <strong>
                Modificado em:
              </strong>
                {{ dataFormatada(file.info.mtime) }}
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ["value", "file"],
  data: () => ({
    dialog: false,
  }),
  methods: {
    close() {
      this.$emit("input", false);
    },
    tamanho(bytes){
      let mb = bytes / (1024 * 1024)
      let kb = bytes / 1024
      if(mb > 1){
        return `${mb.toFixed(2)} Mb`
      }else{
        return `${kb.toFixed(2)} Kb`
      }
    },
    dataFormatada(data){
      return new Date(data).toLocaleString()
    }
  },
};
</script>