<template>
  <div>
    <FileSystem />
    <NewFile v-model="newFile" />
    <NewDir v-model="newDir" />
    <Upload v-model="upload" />
    <Fab 
    @newFile="newFile = true"
    @newDir="newDir = true"
    @upload="upload = true"
    />
  </div>
</template>

<script>
import FileSystem from "../components/File/FileSystem";
import Fab from "../components/File/NewsFab";
import NewFile from "../components/File/NewFile";
import NewDir from "../components/File/NewDir";
import Upload from "../components/File/Upload";

export default {
  name: "Home",
  components: {
    FileSystem,
    Fab,
    NewFile,
    NewDir,
    Upload
  },
  data: () => {
    return {
      newFile: false,
      newDir: false,
      upload: false
    };
  },
  methods: {},
  created() {},
};
</script>
<style>
</style>