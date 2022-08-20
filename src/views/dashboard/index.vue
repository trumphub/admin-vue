<template>
  <div>
    <p>DashboardView</p>
    <p v-permission="'admin'">admin</p>
    <p v-permission="'editor'">editor</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DashboardView",
  computed: {
    ...mapGetters(["info"]),
  },
  directives: {
    permission: {
      inserted(el, { value }, { context }) {
        if (!context.hasPermission(context, value)) {
          el.remove();
        }
      },
    },
  },
  methods: {
    hasPermission(context, role) {
      return context.info.role === role;
    },
  },
};
</script>

<style lang="scss" scoped></style>
