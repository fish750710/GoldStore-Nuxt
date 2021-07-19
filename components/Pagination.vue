<template>
    <nav>
      <ul class="pagination" v-show="getpagin">
        <li class="page-item" :class="{'disabled': !getpagin.has_pre}">
          <a
            class=""
            href="javascript:;"
            @click="getPage(getpagin.current_page - 1)"
          >上一頁</a>
        </li>
        <li
          class="page-item"
          :class="{'active': getpagin.current_page === page}"
          v-for="(page) in getpagin.total_pages"
          :key="page"
        >
          <a class="" href="javascript:;" @click="getPage(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled': !getpagin.has_next}">
          <a class="" href="javascript:;" @click="getPage(getpagin.current_page + 1)">下一頁</a>
        </li>
      </ul>
    </nav>
</template>
<script>
export default {
  name: 'Pagin',
  // 從 Products傳來的資料 :getpagin='getProducts'，將全部資料傳進 getpagin
  props: ['getpagin'],
  data () {
    return {}
  },
  methods: {
    getPage (page = 1) {
      // console.log(this)
      // page 如未帶入數值，初始值=1
      // 防呆,避免傳入O或當前頁數大於總頁數
      // 觸發 postPage 從 Products.vue @postPage="getProducts"
      this.$emit('postPage', page)
    }
  }
}
</script>
<style lang="scss" scoped>
nav{
  display: flex;
  justify-content: center;
}
.pagination{
  list-style: none;
  display: flex;
  justify-content: center;
  border: 1px solid $bg-color;
  border-radius: 0.3rem;
  padding: 0;
  .page-item{
    padding: 0.5rem 1rem;
    a{
      padding: 0.5rem;
      text-decoration: none;
      color: #000;
    }
  }
  .active{
    background-color: $primary;
  }
  .disabled{
    color: $secondary;
    
  }
}
</style>
