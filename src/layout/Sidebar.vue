<template>
  <el-menu
    :collapse="collapse"
    :collapse-transition="false"
    router
    :default-active="$route.path"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#fff"
  >
    <MenuComponent v-for="route in routes" :key="route.path" :route="route" />
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import MenuComponent from "./menu";

export default {
  name: "SideBar",
  components: {
    MenuComponent,
  },
  computed: {
    ...mapGetters(["routes", "collapse"]),
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-color: transparent;
}
</style>
