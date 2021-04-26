<template>
  <v-card
    class="ma-2"
    :id="file.fileName"
    @contextmenu="menu($event)"
    @dblclick="dblclick(file.fileName)"
    @click="$emit('selected', file)"
  >
    <v-card-text class="d-flex justify-center align-center">
      <v-icon x-large>{{ icon() }}</v-icon>
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
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="$emit(item.event, file.fileName)"
        >
          <v-list-item-title>
            <v-icon>
              {{ item.icon }}
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
    showProps: false,
    showMenu: false,
    x: 0,
    y: 0,
    items: [
      { title: "Download", icon: "mdi-cloud-download", event: "down" },
      { title: "Excluir", icon: "mdi-delete", event: "del" },
      { title: "Editar", icon: "mdi-lead-pencil", event: "edit" },
      { title: "Renomear", icon: "mdi-rename-box", event: "rename" },
      {
        title: "Propriedades",
        icon: "mdi-format-list-bulleted",
        event: "props",
      },
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
    dblclick(event) {
      window.location.href = encodeURI(
        `${this.$http.defaults.baseURL}download/${event}`
      );
    },
    icon() {
      let arq = this.file.fileName;
      let ext = arq.substring(arq.lastIndexOf(".") + 1).toLowerCase();
      switch (ext) {
        case "pdf":
          return "mdi-file-pdf";
        case "docx":
        case "doc":
          return "mdi-file-word";
        case "xlsx":
        case "xls":
          return "mdi-file-excel";
        case "pptx":
        case "ppt":
          return "mdi-file-powerpoint";
        case "jpg":
        case "jpeg":
        case "png":
          return "mdi-file-image";
        case "txt":
          return "mdi-file-document";
        default:
          return "mdi-file";
      }
    },
  },
};
</script>

<style>
</style>