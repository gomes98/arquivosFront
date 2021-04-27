<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
    v-model="menu"
    :nudge-width="400"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn :color="color" dark v-bind="attrs" v-on="on"> Chat </v-btn>
    </template>
    <v-card>
      <v-card-title> Chat PNM </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <!-- <v-textarea v-model="recebido" reverse rows="10" outlined label="Histórico" ></v-textarea> -->

          <v-card style="width: 100%" outlined label="Historico">
            <textarea
              id="recebido"
              v-model="recebido"
              rows="10"
              style="width: 100%"
            ></textarea>
          </v-card>
        </v-row>
        <v-row>
          <v-text-field
            v-model="enviar"
            outlined
            label="Texto para Enviar"
            hint="Tecle enter para enviar"
            @keydown.enter="send"
          ></v-text-field>
          <v-btn elevation="2" color="success" fab @click="send">
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    menu: false,
    recebido: "",
    enviar: "",
    color: "primary",
  }),
  watch: {
    menu() {
      this.color = "primary";
    },
  },
  methods: {
    send() {
      this.$socket.emit("chatSend", this.enviar);
      this.enviar = "";
    },
  },
  created() {
    this.$socket.on("chatReceive", (message) => {
      this.recebido += `${message}\n`;
      this.color = "warning";
    });
  },
};
</script>

<style>
</style>