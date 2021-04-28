<template>
  <v-treeview
    v-model="tree"
    :items="fileTree"
    activatable
    return-object
    @update:active="teste"
    
    @input="testeA"
  >
  <template v-slot:prepend="{ item, open }" @click="teste(item)">
      <v-icon v-if="!item.file">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else>
        {{ files[item.file] }}
      </v-icon>
    </template>
  </v-treeview>
</template>
<script>
  export default {
    data: () => ({
      tree: [],  
      testeA: []    
    }),
    computed:{
        fileTree:{
            get(){
                return this.$store.getters.getTree
            },
            set(value){
                this.$store.commit('setFilesTree', value)
            }
        }
    },
    watch:{
        tree(){
            console.log(this.tree);
        }
    },
    methods:{
        teste(e){
            console.log(this.tree, e);
            console.log(this.testeA);
        }
    },
    created(){
        this.$store.dispatch('getDirTree')
    }
  }
</script>
