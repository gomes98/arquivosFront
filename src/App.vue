<template>
  <!-- App.vue -->

  <v-app>
    <!-- <v-navigation-drawer app> -->
    <!-- -->
    <!-- </v-navigation-drawer> -->

    <!-- <v-app-bar app>
      Gerenciador de Arquivos PNM
    </v-app-bar> -->

    <AppBar />
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
        <v-snackbar v-model="snackbar" :color="color" :timeout="timeout">
          {{ text }}
        </v-snackbar>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar/AppBar";
export default {
  name: "App",
  components: {
    AppBar,
  },
  data: () => ({
    snackbar: false,
    timeout: 2000,
    text: "",
    color: "",
  }),
  created() {
    this.$socket.on("fileChange", (message) => {
      this.snackbar = false;
      switch (message.op) {
        case "add":
        case "created":
          this.color = "green";
          this.text = `Arquivo ${message.file} adicionado`;
          this.snackbar = true;
          break;
        case "delete":
          this.color = "red";
          this.text = `Arquivo ${message.file} Removido`;
          this.snackbar = true;
          break;
        case "rename":
          this.color = "orange";
          this.text = `Arquivo ${message.fileName} Renomeado para ${message.newFileName}`;
          this.snackbar = true;
          break;
        case "edt":
          this.color = "yellow";
          this.text = `Arquivo ${message.file} Editado`;
          this.snackbar = true;
          break;
      }
    });
  },
};
</script>
