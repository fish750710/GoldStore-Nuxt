<template>
    <div>
      <div class="m-sidebar-none">
        <div class="">
          <ul class="menu-ul">
            <li class="my-2 "><a href="#" class="menuSidebar" :class="[ activeitem ==='APPLE' ? ['text-white','bg-dark'] :'' ]" @click.prevent="badgeSearch('APPLE')" >
              <span >APPLE</span></a></li>
            <li class="my-2 "><a href="#" class="menuSidebar" :class="[ activeitem ==='ASUS' ? ['text-white','bg-dark'] :'' ]" @click.prevent="badgeSearch('ASUS')" >
              <span >ASUS</span></a></li>
            <li class="my-2 "><a href="#" class="menuSidebar" :class="[ activeitem ==='HTC' ? ['text-white','bg-dark'] :'' ]" @click.prevent="badgeSearch('HTC')" >
              <span >HTC</span></a></li>
            <li class="my-2 "><a href="#" class="menuSidebar" :class="[ activeitem ==='小米' ? ['text-white','bg-dark'] :'' ]" @click.prevent="badgeSearch('小米')" >
              <span >小米</span></a></li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    badgeSearch (str) {
      this.$nuxt.$router.push({path:'/', query:{sch:'category',category:str}})
      this.$store.dispatch('products/getProducts')
    },
  },
  computed: {
    // vuex getters
    ...mapGetters('products',['activeitem']),
  }
}
</script>

<style lang="scss" scoped>

.textcolor{
  color: $primary;
}
.menu-ul{
  padding: 0 2.5rem 0 0;
  list-style-type:none;
  li{
    padding: 0.5rem;
  }
  .menuSidebar{
    text-decoration: none;
    color: $dark;
    font-weight: bold;
    font-size:1.4rem;
    width: 9rem;
    padding: 0.2rem 1rem;
  }
  a{
    border:1px $info solid;
    border-radius:0.5rem;
    transition: all 0.3s;
    box-shadow: 0.5rem 0.5rem 0.5rem rgba(227, 219, 208, 0.5);
    &:hover{
      color: $primary;
      position: relative;
      border:1px $primary solid;
      transition: all 0.3s;
      transform: translate(5px, 0);
    }
  }
}
@include pc() {
  .m-sidebar-none{
    display: none;
  }
}
@include pad() {
  .m-sidebar-none{
    display: none;
  }
}
.sticky-top{
  position:sticky;
  top:0;
  z-index: 999;
}
@keyframes ad_width {
  from {
    width: 0
  }
  to {
    width: 55px
  }
}
</style>
