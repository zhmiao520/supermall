<template>
  <div :class="{checked: isChecked}" class="check-button">
    <img alt="" src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .checked {
    background-color: red;
    border-color: red;
  }
</style>
