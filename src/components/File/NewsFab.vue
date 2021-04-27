<template>
  <v-speed-dial
      v-model="fab"
      bottom
      right
      absolute
      direction="top"      
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="success"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="$emit('newDir')"
      >
        <v-icon>mdi-folder</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        @click="$emit('newFile')"
      >
        <v-icon>mdi-file</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        @click="$emit('upload')"
      >
        <v-icon>mdi-upload</v-icon>
      </v-btn>
    </v-speed-dial>
</template>

<script>
export default {
data:()=>{
    return{
        fab: false,
    }
}
}
</script>

<style>

</style>