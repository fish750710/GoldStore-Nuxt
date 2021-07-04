<template>
  <div class="container">
      <h1 v-if="error.statusCode == 404">找不到拉!!</h1>
      <h1 v-else>錯誤異常</h1>
      <nuxt-link to="/">首頁</nuxt-link>
  </div>
</template>

<script>
export default {
    props:['error']
}
</script>

<style>

</style>