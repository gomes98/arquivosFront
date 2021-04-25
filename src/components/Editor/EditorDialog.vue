<template>
  <v-row justify="center">
    <v-dialog
      v-model="value"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Editor "{{ file }}"</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >
              Salvar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text >
            <VueEditor class="editor" v-model="data"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { VueEditor } from "vue2-editor";
  export default {
    props: ['value', 'file'],  
    components:{VueEditor},
    data () {
      return {
        dialog: false,
        data:'',
      }
    },
    methods:{
        close(){
            this.$emit('input', false)
        },
        getFile(){
            this.$http('')
        }
    }
  }
</script>

<style>
.editor{
    height: 80vh;
}
</style>