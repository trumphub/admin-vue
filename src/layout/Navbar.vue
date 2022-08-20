<template>
  <div class="nav-bar">
    <div class="left">
      <div class="svg" @click="handleClick">
        <svg-icon icon-class="table" />
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="breadcrumb in breadcrumbList"
          :key="breadcrumb.path"
          :to="{ path: breadcrumb.path }"
          >{{ breadcrumb.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <el-dropdown @command="handleCommand">
      <img :src="info.avatar" alt="" class="avatar" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["info"]),
  },
  data() {
    return {
      breadcrumbList: [],
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.breadcrumbList = route.matched
          .map((matche) => {
            return {
              path: matche.path,
              title: matche.meta.title,
            };
          })
          .filter((matche) => matche.path);
      },
      immediate: true,
    },
  },
  methods: {
    async handleCommand(command) {
      if (command === "logout") {
        await this.$store.dispatch("user/logout");
        this.$router.push({
          path: "/login",
          query: {
            redirect: this.$route.fullPath,
          },
        });
      }
    },
    handleClick() {
      this.$store.dispatch("app/updateCollapse");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  .avatar {
    width: 36px;
    height: 36px;
    cursor: pointer;
  }
  .left {
    display: flex;
    align-items: center;
    .svg {
      width: 50px;
      height: 50px;
      display: flex;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
      svg {
        margin: auto;
      }
    }
  }
}
</style>
