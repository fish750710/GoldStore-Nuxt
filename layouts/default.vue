<template>
  <div>
    <RightOption />
    <FrontNavbar />
    <Nuxt />
    <FrontFooter />
  </div>
</template>
<script>
export default {
  created () {
    if (process.client) {
      const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$store.commit("SETCOOKIE", myCookie)
      this.$axios.defaults.headers.common['Authorization'] = `${myCookie}`
    }
  }
}
</script>

