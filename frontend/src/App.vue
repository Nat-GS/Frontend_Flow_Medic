<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
header{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

</style>
