<template>
  <v-app>
    <Sidebar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components

import Sidebar from "@/components/Sidebar.vue";
export default defineComponent({
  name: "AboutView",

  components: {
    Sidebar,  
},
});
</script>
