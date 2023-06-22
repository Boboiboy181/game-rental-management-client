<template>
  <v-toolbar flat app>
    <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-tile class="text-uppercase grey--text">
              <span class="font-weight-bold">GameRental</span>
              <span>Management</span>
          </v-toolbar-tile>
  </v-toolbar>

</template>

<script lang="ts">
export default {
  data(){
        return{
            drawer:false,
        }
    }
};
</script>

<style scoped>
/* CSS tùy chỉnh cho sidebar */
</style>
