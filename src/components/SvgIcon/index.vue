<template>
  <svg>
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
  },
};
</script>

<style lang="scss">
svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
