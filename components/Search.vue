<template>
  <div>
    <div class="search-box">
      <input type="search" placeholder="搜尋.." aria-label="搜尋" v-model="searchValue" @keyup.enter="searchProduct"/>
      <div class="btn-box">
        <button type="button" class="btn" style="width: 36px;" @click="searchProduct">
          <i class="fas fa-search fa-lg"></i>
        </button>
      </div>
    </div>
     <div class="search-box-m">
      <div class="btn-box">
        <button type="button" class="btn" style="width: 36px;" @click="btnSearch">
          <i class="fas fa-search fa-lg"></i>
        </button>
      </div>
      <div class="input-box-m" v-show="searchBtn" @click.stop="btnSearch">
        <input type="search" placeholder="搜尋.." aria-label="搜尋" v-model="searchValue" @keyup.enter="searchProduct" v-on:click.stop/>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      searchValue: '',
      searchBtn: false
    }
  },
  methods: {
    searchProduct () {
      const str = this.searchValue
      this.searchBtn = false
      this.$nuxt.$router.push({name:'ProductsSearch', query:{sch:'Search',Str:str}})
      this.$nuxt.$emit('search')
      if (str.trim() === '') {
        this.$nuxt.$emit('messsage:push', `請輸入商品名稱`, 'danger')
      }
      this.searchValue = ''
    },
    btnSearch (){
      this.searchBtn = !this.searchBtn
    },
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
.search-box-m{
  display: none;
}
@include pad{
  .search-box{
    display: none;
  }
  .search-box-m{
    display: block;
    position: relative;
    .input-box-m{
      width: 100vw;
      height: 100vh;
      // background: red;
      position: absolute;
      top: 40px;
      right: -647%;
      z-index: 1200;
    }
    input{
      font-size: 22px;
      z-index: 1201;
    }
    button{
      padding: 5px;
    }
  }
}
@include iphone5{
  .search-box-m{
    input{
      font-size: 18px;
    }
  }
}
</style>
