<template>
  <div class="container">
    <!-- 輪播 -->
    <client-only> 
      <swiper :options="swiperOption" class="img-rwd">            
        <div class="swiper-slide swiper-list benner-img1"  @click="goDetail('-LuQFEYmntflhE3g3af6')">      
          <div class="swiper-title">
            <h1>全新macbook air</h1>
            <p>絢麗多彩的 Retina 顯示器採用「原彩」顯示技術， 帶來更真實自然的觀看體驗。 • 功能多元的觸控列，提供你更多高效的工作方式</p>
          </div>
        </div>
        <div class="swiper-slide swiper-list benner-img2" @click="goDetail('-LuQ9Z8JhBgR4O1L2Gb5')">
          <div class="swiper-title">
            <h1>新上市 iphone11 PRO</h1>
            <p>• 5.8 吋超 Retina XDR OLED 顯示器</p>
            <p>• 防潑抗水與防塵功能 (在最深達 4 公尺水中最長可達 30 分鐘，IP68)</p>
            <p>• 三相機系統，具備 1200 萬像素超廣角、廣角與望遠相機；夜間模式、人像模式與 4K 影片拍攝功能 (最高可達 60 fps)</p>
          </div>
        </div>
        <div class="swiper-slide swiper-list benner-img3" @click="goDetail('-LuQIo2AsSzBCxvJKok_')">
          <div class="swiper-title">   
            <h1>HTC u19e</h1>           
            <p>6吋 18:9 全屏大螢幕</p>
            <p>雙主鏡頭相機1600+500萬畫素</p>
            <p>1300萬華素前鏡頭</p>
          </div>
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>           
      </swiper>     
    </client-only>

    <div class="main-content">      
      <div class="dropdown">
        <button class="btn" type="button" id="dropdownMenuButton" @click="dropdownMenu=!dropdownMenu">排列順序</button>
        <div class="dropdown-menu" v-show="dropdownMenu">
          <a class="dropdown-item" href="#" @click.prevent="arrayLtoH('lowPrice')">價格:低到高</a>
          <a class="dropdown-item" href="#" @click.prevent="arrayLtoH('upPrice')">價格:高到低</a>
          <a class="dropdown-item disabled" href="#">銷量:低到高</a>
          <a class="dropdown-item disabled" href="#">銷量:高到低</a>
        </div>
      </div>
      <div class="tab-content"> 
        <FrontSidebar class="sticky-top"></FrontSidebar> 
        <div class="content-box">
          <div class="row">
            <div v-for="item in products" :key="item.id">
              <no-ssr>
                <div class="card" v-if="item.is_enabled != 0">
                  <a href="#" class="card-img" @click.prevent="goDetail(item.id)">
                    <img :src="item.imageUrl" alt="">
                  </a>
                  <div class="icon-favorite">    
                    <a href="#" v-if="item.is_favorite">
                      <i class="fas fa-heart" @click.prevent="removeFavorite(item)"></i>
                    </a>
                    <a href="#" v-else>
                      <i class="far fa-heart" @click.prevent="addFavorite(item)"></i>
                    </a>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">
                      <a href="#" @click.prevent="goDetail(item.id)">{{ item.title }}</a>
                    </h5>
                    <div class="" style="height:35px">
                      <p class="card-text text-info font-weight-bold">{{ item.content }}</p>
                    </div>
                    <div class="card-price">
                      <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                      <del class="h7" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                      <div class="h5" v-if="item.price">特價 {{ item.price }} 元</div>
                    </div>
                  </div>
                  <button type="button" class="btn cart-move" @click="addtoCartMerge(item.id)" :disabled="item.id === loadingItem">
                    <i class="fas fa-spinner fa-pulse" v-if="item.id === loadingItem"></i>
                    <i class="fas fa-cart-plus" v-else></i>
                    <span class="">加到購物車</span>
                  </button>
                </div>
              </no-ssr>
            </div>
          </div>
          <Pagin @postPage="getProducts" :getpagin="pagination" class="d-flex justify-content-center"></Pagin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' //, mapActions
import FrontSidebar from '@/components/FrontSidebar.vue'
import Pagin from '@/components/Pagination.vue' // 分頁
export default {
  components: {
    Pagin, // 分頁
    FrontSidebar
  },
  data(){
    return{
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 2000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 4000000,
          disableOnInteraction: false
        }
      },
      dropdownMenu: false
    }
  },
  methods: {    
    getProducts (page = 1) {
      this.$store.dispatch('products/getProducts', page)
    },
    // 加入購物車(新增前先判斷購物車是否有重複資料，如有先刪除後新增)
    addtoCartMerge (id, qty = 1) {
      this.$store.dispatch('carts/addtoCartMerge', { id, qty })
      this.$store.commit('SETOPTIONSHOW', '')
    },
    goDetail (id) {
      this.$nuxt.$router.push({name:'ProductDetail', query:{productId:id}})
      this.$nuxt.$emit('refreshDetail')
    },
    // 篩選
    getCategory (page = 1) {
      this.$store.dispatch('products/getProducts', page)
    },
    // 加入我的最愛
    addFavorite (item) {
      this.$store.dispatch('favorite/addFavorite', item)
    },
    // 移除我的最愛
    removeFavorite (item) {
      this.$store.dispatch('favorite/removefavorite', item)
    },
    // badgeSearch (str) {
    //   // this.$router.push(`/${str}`)
    //   this.$nuxt.$router.push({name:'ProductsSearch', query:{sch:'',Str:str}})
    //   this.getCategory()
    // },
    // 排列價格低到高
    arrayLtoH (item) {
      this.$store.dispatch('arrayLtoH', item)
    }
  },
  computed: {
    // vuex getters
    ...mapGetters(['isLoading']),
    ...mapGetters('carts',['cart', 'loadingItem']),
    ...mapGetters('favorite',['myfavorite']),
    ...mapGetters('products',['products','pagination', 'activeitem']),
  },
  mounted () {
    this.$nuxt.$on('refresh', () => {
      this.getProducts()
    }) 
    // if (this.$nuxt.$route.params.str === undefined) {
    //   this.getProducts()
    // }else{
    //   this.getCategory()
    // }
    this.$nuxt.$emit('change')
  },
  created () {
    // const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // console.log(document)
    // this.$http.defaults.headers.common['Authorization'] = `${myCookie}`

    // console.log(this)
    // if (this.$route.params.Str === undefined) {
    //   this.getProducts()
    // } else {
    //   this.getCategory()
    // }
    // this.$bus.$emit('change')
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
    width: 100%;
    margin: 20px auto;
    min-height: 60vh;
}
.banner-rwd img {
  max-height: 500px;  
}
.benner-img1 {
  background-image: url(../assets/images/macbook_air__csdfieli984m_large.jpg);
  background-repeat: no-repeat;
  background-color: #fff;
  background-position: center;
  background-size: 0 0/100%;
  width: 100vw;
  height: 500px;
  right: 0px;
  overflow: hidden;
  position: relative;
  .swiper-title {
    width: 70%;
    position: absolute;
    left: calc(50% - 37.5%);
    bottom: 80px;
    color: #fff;
    background-color: rgba(0,0,0,0.5);
    text-align: center;
    padding: 0 2rem;
  }
}
.benner-img2 {
  background-image: url(../assets/images/hero_iphone11_pro__je9i781j99u2_large.jpg);
  background-repeat: no-repeat;
  background-color: #000;
  background-position: bottom;
  background-size: 100%;
  width: 100vw;
  height: 500px;
  right: 0px;
  overflow: hidden;
  position: relative;
  .swiper-title {
    width: 70%;
    position: absolute;
    left: calc(50% - 37.5%);
    bottom: 50px;
    color: #fff;
    background-color: rgba(0,0,0,0.5);
    text-align: center;
    padding: 0 2rem;
  }
}
.benner-img3 {
  background-image: url(../assets/images/u19e_home_banner_desktop_bg_2000x683.jpg);
  background-repeat: no-repeat;
  background-color: #000;
  background-position: left;
  background-size: cover;
  width: 100vw;
  height: 500px;
  right: 0px;
  overflow: hidden;
  position: relative;
  .swiper-title {
    width: 70%;
    position: absolute;
    left: calc(50% - 37.5%);
    bottom: 80px;
    color: #fff;
    background-color: rgba(0,0,0,0.5);
    text-align: center;
    padding: 0 2rem;
  }
}
.sidebar-set{
  border: 1px solid black;
  max-width:15%;
}

.img-rwd {
  cursor: pointer;
  margin-bottom: 3rem;
  img {
    max-width: 100vw;
  }
}
.main-content{
  width: 73vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 auto;
  .dropdown{
    position: relative;
    margin-right: 2.5rem;
    button{
      background-color: $white;
      border: 1px solid $bg-color;
      border-radius: 0.3rem;
      padding-right: 2rem;
      font-size:1.4rem;
      &:hover{
        cursor: pointer;
        background-color: $bg-color;
        color: $white;
        &:before{
          border-color: $primary transparent transparent transparent;
        }
      }
      &:before{
        content: "";
        position: absolute;
        top: 0.7rem;
        right: 0.5rem;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0.6rem 0.4rem 0 0.4rem;
        border-color: $bg-color transparent transparent transparent;
      }
    }
    .dropdown-menu{
      position: absolute;
      bottom: -7rem;
      right: -0.8rem;
      width: 8rem;
      height: 6.5rem;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-size: 1.2rem;
      border-radius: 0.3rem;
      border: 1px solid $bg-color;
      z-index: 12;
      a{
        text-decoration: none;
        color: #000;
        font-size: 1rem;
        padding: 0.15rem 0;
        &:hover{
          background-color: $primary;
        }
      }
      .disabled{
        color: $secondary;
        &:hover{
          background-color: #fff;
        }
      }
    }
  }
  .tab-content{
    width: 100%;
    display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-wrap: wrap;
    .row{
      display: flex;
      justify-content: left;
      align-items: center;
      flex-wrap: wrap;        
      .card{
        position: relative;
        width: 15rem;
        height: 25rem;
        border: 1px solid $info;
        border-radius: 1rem;
        margin: 1rem;
        box-shadow: 0.2rem 0.2rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
        .card-img{
          display: flex;
          justify-content: center;
          img{      
            height: 13rem;
            // background: no-repeat center 0/100%;
            // margin: 0 auto;
          }
        }        
        .card-body{
          min-height: 8.2rem;
          padding: 0.5rem;    
          .card-title{
            margin: 0;
            min-height: 3rem;
            font-size: 1rem;
            a{
            color: $dark;
            text-decoration: none;
            }
          }
          .card-text{
            margin: 0;
            color: $info;
          }
          .card-price{
            display: flex;
            // justify-self: unset;
            justify-content: space-between;
            .h5{
              font-size: 1.3rem;
              font-weight: 600;
              color: red;
            }
            .h7{
              font-size: 0.8rem;
            }
          }
        }
        .icon-favorite{
          position: absolute;
          right: 1.2rem;
          top: 1.2rem;
          a{
            color: red;
            text-decoration: none;
            i{
              font-size: 1.2rem;
            }
          }
        }
        .btn{
          width: 100%;
          height: 2.8rem;
          background-color: $primary;
          border: none;
          border-bottom-right-radius: 1rem;
          border-bottom-left-radius: 1rem;
          box-shadow: 0px -0.2rem 1.5rem 0.2rem rgba(0, 0, 0, 0.2);
          font-size: 1.2rem;
          font-weight: 600;
          span{
            padding-left: 2rem;          
          }
          &:hover{
            cursor: pointer;
          }
        }
      }
      .cart-move {
        width: 100%;
        transition: all 0.3s;        
        &:hover i {
          transform: translate(22px, 0);
          transition: transform 0.3s linear;
        }
      }
    }
  }
  .sticky-top {
    position: sticky;
    top: 7rem;
    z-index: 999;
    width: 20rem;
    height: 100%;
  }
}
@keyframes ad_width {
  from {
    width: 0;
  }
  to {
    width: 60px;
  }
}

@include desktop-top() {
  .m-menu-Sidebar {
    display: none;
  }
}
@include pc-top() {
  .m-menu-Sidebar {
    display: none;
  }
}
@include pc() {
  .menu-ul {
    list-style-type: none;
    .menuSidebar {
      text-decoration: none;
      color: $dark;
      font-weight: bold;
    }

    a:hover {
      color: $primary;
      position: relative;
    }
  }
}
@include pad() {
  .menu-ul {
    list-style-type: none;
    .menuSidebar {
      text-decoration: none;
      color: $dark;
      font-weight: bold;
      width: 80px;
    }
    a:hover {
      color: $primary;
      position: relative;
    }
  }
  .benner-img1 {
    width: 100vw;
    height: 15rem;
    background-size: contain;
    .swiper-title{
      left: calc(50% - 42.5%);
      bottom: 0;
    }
  }
  .benner-img2 {
    width: 100vw;
    height: 15rem;
    background-size: contain;
    .swiper-title{
      left: calc(50% - 42.5%);
      bottom: 0;
    }
  }
  .benner-img3 {
    width: 100vw;
    height: 15rem;
    // background-size: contain;
    .swiper-title{
      left: calc(50% - 42.5%);
      bottom: 0;
    }
  }
}
@include m568() {
  .m-banner-rwd {
    display: none;
  }
  .sidebar-set{
    max-width:25%;
  }
}
@include m480() {
  .sidebar-set{
    max-width:30%;
  }
}
@include iphone5() {
  .sidebar-set{
    max-width:35%;
  }
}
</style>
