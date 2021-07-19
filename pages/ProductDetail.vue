<template>
  <div>
    <div class="container mt-5">
      <no-ssr>
      <div class="row">
        <div class="img-box my-5 text-center">
          <!-- <pic-zoom :previewImg="product.imageUrl" :zoomImg="product.imageUrl"></pic-zoom> -->
          <img :src="product.imageUrl" alt="">
        </div>    
        <div class="product-box">
          <h4>{{ product.title }}</h4>
          <div class="box1">
            <h5 class="text-dark">{{ product.spec }} {{ product.content }}</h5>
          
              <a href="#" class>
                <i
                  class="fas fa-heart text-danger"
                  v-if="favoriteId"
                  @click.prevent="removeFavorite(product)"
                  style="font-size:20px"
                ></i>
                <i
                  class="far fa-heart text-danger"
                  v-else
                  @click.prevent="addFavorite(product)"
                  style="font-size:20px"
                ></i>
              </a>
         
          </div>
          <a href="#" class="badge badge-warning ml-2" @click="badgeSearch" v-show="product.brand ">{{ product.brand }}</a>
          <a href="#" class="badge badge-info ml-2" @click="badgeSearch" v-show="product.category">{{ product.category }}</a>
          <a href="#" class="badge badge-secondary ml-2" @click="badgeSearch" v-show="product.content">{{ product.content }}</a>
          <a href="#" class="badge badge-success ml-2" @click="badgeSearch" v-show="product.spec">{{ product.spec }}</a>
          

          
          <div class="text-right" v-if="product.origin_price ">
            <del>{{ product.origin_price * quantity | currency }} 元</del>
          </div>
          <div
            class="price text-right"
            v-if="product.price"
          >{{ product.price * quantity | currency}} 元</div>
          <hr />
          <div class="text-left text-l">購買數量</div>
          <div class="h6 text-right" v-if="product.stock > 5">庫存：{{ product.stock }} 件</div>
          <div class="h6 text-right text-danger" v-if="product.stock < 5">只剩最後 {{ product.stock }} 件</div>
          <div class="h6 text-right text-danger" v-if="product.stock === 0">補貨中</div>
          <select name class="form-control" v-model="quantity" v-if="product.stock != 0">
            <option
              :value="num"
              v-for="num in Number(product.stock)"
              :key="num"
            >選購 {{num}} {{product.unit}}</option>
          </select>
          <hr />
          <div class="btn-box">
            <button
              type="button"

              @click="addtoCartMerge(product.id, quantity)"
            >
              <i class="fas fa-spinner fa-pulse" v-if="product.id === loadingItem"></i>
              <i class="fas fa-cart-plus" v-else></i>
              加到購物車
            </button>
            <button
              type="button"
              class="box-red"
              @click="goCheckOuter(product.id, quantity)"
            >
              <i class="fas fa-spinner fa-pulse" v-if="product.id === loadingItem"></i>
              <i class="fas fa-shopping-bag" v-else></i>
              立即結帳
            </button>
          </div>
          <hr class="mt-5" />
          <div>
            <!-- 商品說明 -->
            <li>{{ product.description }}</li>
          </div>
        </div>
      </div>
      </no-ssr>
      <!-- swiper -->
      <!-- <div class="h5 text-center swiper-like-rwd ">
        <i class="fas fa-heart text-danger mr-2"></i>猜你喜歡
      </div>
      <div class="swiper-bg">
        <div class="swiper-container swiper-like-rwd " v-if="filterdata.length > 0">
          <div class="swiper-wrapper py-5">
            <div class="swiper-slide" v-for="item in filterdata" :key="item.id">
              <div class="card border-0 bg-transparent card-shadow ml-2" v-if="item.is_enabled" >
                <a href="#" @click.prevent="goDetail(item.id)" class="text-center card-bg">
                  <img class="card-img-top" alt="..." :src="item.imageUrl" style="max-width:200px;height: 200px;" />
                </a>
                <div class="card-body px-0 card-bg-bottom pb-1">
                  <div class="m-0 p-1" style="height:60px">
                    <a
                      href="#"
                      class="h6 text-black text-decoration-none"
                      @click.prevent="goDetail(item.id)"
                    >{{ item.title }}</a>
                  </div>
                  <div class="d-flex justify-content-between mt-2 p-1">
                    <del
                      class="h7 text-muted"
                      v-if="item.origin_price > 0"
                    >原價 {{ item.origin_price | currency }} 元</del>
                    <div v-if="!item.price">
                      <span class="h5 text-danger">{{ item.origin_price | currency }}元</span>
                    </div>
                    <div v-if="item.price">
                      <span class="h5 text-danger">{{ item.price | currency }}元</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
// import PicZoom from '@/components/PicZoom.vue' // 放大鏡
// import Swiper from 'swiper'
// import $ from 'jquery'

export default {
  components: {
    // PicZoom
  },
  data () {
    return {
      product: {
        stock: ''
      },
      productId: '',
      productIdS: '',
      quantity: 1,
      smallImg: '', // 小圖
      bigImg: '', // 大圖
      products: []
    }
  },
  methods: {
    getProduct (id) {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`
      vm.$store.dispatch('updateLoading', true)
      vm.$axios.get(url).then(response => {
        vm.product = response.data.product
      })
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      vm.$axios.get(api).then(response => {
        // 猜你喜歡
        vm.products = response.data.products
        // vm.getswiper()
        vm.$store.dispatch('updateLoading', false)
      })
    },
    // 加入購物車(新增前先判斷購物車是否有重複資料，如有先刪除後新增)
    addtoCartMerge (id, qty = 1) {
      this.$store.dispatch('carts/addtoCartMerge', { id, qty })
    },

    // 加入我的最愛
    addFavorite (item) {
      this.$store.dispatch('favorite/addFavorite', item)
    },
    // 移除我的最愛
    removeFavorite (item) {
      this.$store.dispatch('favorite/removefavorite', item)
    },
    // 有商品於我的最愛時，icon更換
    // getFilteredFavorite (item) {
    //   this.$store.dispatch('favorite/getFilteredFavorite', item)
    // },
    getfavorite () {
      this.$store.dispatch('favorite/getfavorite')
    },
    badgeSearch (e) {
      let str = e.target.firstChild.nodeValue
      this.$nuxt.$router.push({name:'ProductsSearch', query:{sch:'Search',Str:str}})
      this.$nuxt.$emit('search')
    },
    goCheckOuter (id, quantity) {
      this.addtoCartMerge(id, quantity)
      this.$router.push('/front/checkout')
      this.$nuxt.$emit('refreshCheckOut')
    },
    // goDetail (id) {
    //   this.$router.push(`/detail/${id}`)
    //   this.$nuxt.$emit('refreshDetail', id)
    // },
    // getswiper () {
    //   this.$nextTick(() => {
    //     setTimeout(() => {
    //       eslint-disable-next-line no-unused-vars
    //       var swiper = new Swiper('.swiper-container', {
    //         slidesPerView: 4,
    //         spaceBetween: 40,
    //         loop: false, // true 會有重複渲染問題
    //         speed: 2000,
    //         breakpoints: {
    //           // when window width is <= 320px
    //           320: {
    //             slidesPerView: 2,
    //             spaceBetween: 10
    //           },
    //           // when window width is <= 480px
    //           480: {
    //             slidesPerView: 2,
    //             spaceBetween: 20
    //           },
    //           // when window width is <= 640px
    //           767: {
    //             slidesPerView: 2,
    //             spaceBetween: 20
    //           },
    //           1000: {
    //             slidesPerView: 3,
    //             spaceBetween: 30
    //           }
    //         },
    //         autoplay: {
    //           delay: 4000,
    //           disableOnInteraction: false
    //         }
    //       })
    //     }, 800)
    //   })
    // }
  },
  computed: {
    filterdata () {
      const vm = this
      return vm.products.filter((item, i) => {
        if (item.category === vm.product.category) {
          return vm.product.id !== item.id
        }
      })
    },
    loadingItem () {
      return this.$store.state.loadingItem
    },
    favoriteId () {
      let id = this.$route.query.productId
      let obj = this.$store.state.favorite.myfavorite //arr ? 變obj
      for (const key in obj) {
        if(obj[key].id === id){
          return true
        }
      }
    }
  },
  mounted () {
  },
  created () {
    const vm = this
    vm.productId = vm.$route.query.productId
    vm.getProduct(vm.productId)
    // // 購物車和收藏更新畫面
    vm.$nuxt.$on('refreshDetail', (id) => {
      vm.getProduct(id)
    })
    vm.getfavorite()
  }
}
</script>

<style lang="scss" scoped>
.swiper-bg > div{
  background: rgba(0,0,0,.01);
  border: 1px $info solid;
}
.card-shadow{
  border-radius:10px;
  box-shadow: 5px 5px 5px rgba(227, 219, 208, 0.7);
  .card-bg{
    border-radius:10px 10px 0 0;
    background: #fff;
  }
  .card-bg-bottom{
    border-radius:0 0 10px 10px;
    background: #fff;
  }
}
.container{
  margin: 3rem auto 10rem;
  .row{
    margin: 0 auto;
    display: flex;
    max-width: 880px;
    justify-content: center;
    .img-box{
      width: 20rem;
      height: 20rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .product-box{
      width: 40vw;
      h4{
        font-size: 24px;
      }
      .badge{
        padding: 3px 5px;
        border-radius: 5px;
        text-decoration: none;
        color: #000;
      }
      .badge-warning{
        background: #ffc107;
      }
      .badge-info{
        background: #aaa;
      }
      .badge-secondary{
        background: #ced3d3;
      }
      .badge-success{
        color: #fff;
        background-color: #28a745;
      }
      .text-right{
        text-align: right;
      }
      .price{
        font-size: 30px;
        color: red;
        font-weight: 600;
      }
      .box1{
        display: flex;
        justify-content: space-between;
        i{
          color: red;
        }
      }
      .btn-box{
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
select{
  width: 100%;
  height: 30px;
  font-size: 16px;
  margin-top: 5px;
  border: 1px solid #ced4da;
  border-radius: 5px;

}
button {
  margin-top: 10px;
  background-color: $primary;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  padding: 5px 15px;
  &:hover {
    cursor: pointer;
  }
}
.box-red{
  color: #fff;
  background-color: #dc3545;
}
@include m568() {
  .swiper-like-rwd {
    display: none;
  }
  .container{
    .row{
      flex-direction: column;
      align-items: center;
      .product-box{
        width: 95vw;
      }
    }
  }
}
</style>
