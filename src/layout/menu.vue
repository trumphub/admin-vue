<template>
  <el-submenu :index="route.path" v-if="isSub">
    <template slot="title">
      <i class="svg">
        <svg-icon v-if="route.meta.icon" :icon-class="route.meta.icon" />
      </i>
      <span>{{ route.meta.title }}</span>
    </template>
    <MenuComponent
      v-for="children in route.children"
      :key="children.path"
      :route="children"
    />
  </el-submenu>
  <el-menu-item
    :index="route.children ? route.children[0].path : route.path"
    v-else
  >
    <template v-if="route.children">
      <i class="svg">
        <svg-icon :icon-class="route.children[0].meta.icon" />
      </i>
      <span slot="title">{{ route.children[0].meta.title }}</span>
    </template>
    <template v-else>
      <span slot="title">{{ route.meta.title }}</span>
    </template>
  </el-menu-item>
</template>

<script>
export default {
  name: "MenuComponent",
  props: ["route"],
  computed: {
    isSub() {
      const route = this.route;
      if (route.meta && route.meta.title) {
        if (route.children) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
li.el-menu-item.is-active {
  background-color: teal !important;
}
.svg {
  margin-right: 13px;
  font-size: 16px;
  position: relative;
  top: -4px;
  left: 4px;
}
</style>
