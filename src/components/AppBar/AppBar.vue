<template>
  <v-app-bar app> Gerenciador de Arquivos PNM 
    <v-spacer>
    </v-spacer>
    <BtnChat/>
  </v-app-bar>
</template>

<script>
import BtnChat from "../Chat/Chat"
export default {
  name: 'AppBar',
  components:{ BtnChat}
};
</script>

<style>
</style>