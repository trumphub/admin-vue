<template>
  <el-container>
    <el-aside :width="width">
      <h1>YISA</h1>
      <div class="menus">
        <el-scrollbar style="height: 100%">
          <SideBar />
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header height="50px">
        <NavBar />
      </el-header>
      <el-main>
        <el-scrollbar style="height: 100%">
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import SideBar from "./Sidebar";
import NavBar from "./Navbar";
export default {
  name: "LayoutView",
  components: {
    SideBar,
    NavBar,
  },
  computed: {
    ...mapGetters(["collapse"]),
    width() {
      return this.collapse ? "64px" : "300px";
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-aside {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #545c64;
    transition: width 0.3s;
    h1 {
      height: 50px;
      font-size: 20px;
      text-align: center;
      line-height: 50px;
      color: #fff;
    }
    .menus {
      flex: 1;
      overflow: hidden;
      ::v-deep .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
  .el-header {
    border-bottom: 1px solid #ccc;
  }
  .el-main {
    overflow: hidden;
    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
