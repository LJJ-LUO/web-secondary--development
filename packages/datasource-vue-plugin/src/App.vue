<template>
  <component :is="componentType" v-bind="customConfig" />
</template>

<script>
import Add from "./addDatasource";

export default {
  name: "App",
  props: {
    scene: String,
    customConfig: Object,
  },
  components: {
    Add,
  },
  computed: {
    componentType: function () {
      if (this.scene === "add"||this.scene === "edit") {
        return "Add";
      }
    },
  },
};
</script>
