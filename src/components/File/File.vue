<template>
  <v-card class="ma-2" :id="file.fileName" @contextmenu="menu($event)">
    <v-card-text class="d-flex justify-center align-center">
      <v-icon x-large>mdi-file</v-icon>
    </v-card-text>
    <v-card-actions>
      {{ file.fileName }}
    </v-card-actions>
    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="$emit(item.event, file.fileName)">
          <v-list-item-title>
              <v-icon>
                  {{item.icon}}
              </v-icon>
              {{ item.title }}
              </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card>
</template>

<script>
export default {
  name: "File",
  props: ["file"],
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,
    items: [
      { title: "Excluir", icon: 'mdi-delete' ,event: "del" },
      { title: "Renomear", icon: 'mdi-rename-box', event: 'rename' },
      { title: "Propriedades", icon: 'mdi-format-list-bulleted' , event: 'props' },
    ],
  }),
  methods: {
    menu(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
  },
};
</script>

<style>
.file {
  margin: 20px;
  width: 100px;
  height: 100px;
  background-color: greenyellow;
}
</style>