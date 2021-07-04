<template>
  <div>
    <div class="search-box">
      <input
        type="search"
        class=""
        placeholder="搜尋.."
        aria-label="搜尋"
        v-model="searchValue"
        @keyup.enter="searchProduct"
      />
      <div class="btn-box">
        <button
          type="button"
          class="btn"
          style="width: 36px;"
          @click="searchProduct"
        >
          <i class="fas fa-search fa-lg"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    searchProduct () {
      const str = this.searchValue
      this.$nuxt.$router.push({name:'ProductsSearch', query:{sch:'Search',Str:str}})
      this.$nuxt.$emit('search')
      if (str.trim() === '') {
        this.$nuxt.$emit('messsage:push', `請輸入商品名稱`, 'danger')
      }
      this.searchValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>

.search-box{
  display: flex;
  height: 1.8rem;
  margin-right: 0.5rem;
  input{
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
  }
  button{
    border: 0.01rem solid $white;
    height: 1.7rem;
    background-color: $white;
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    &:hover{
      cursor: pointer;
      background-color: $bg-color;
      color: $primary;
    }
  }
}
</style>
