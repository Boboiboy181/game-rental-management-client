<template>
  <Sidebar>
  </Sidebar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import Sidebar from "../components/Sidebar.vue";
import HeadBar from "@/components/HeadBar.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    Sidebar,
  },
});
</script>
