<template>
  <div>
    <div class="init-content">
      <span class>搜尋結果：</span>
      <no-ssr>
        <span v-if="typeof(myfavorite) == 'object'  && products.length === 0">很抱歉，找不到您想要的商品</span>
      </no-ssr>
    </div>
    <div class="tab-content"> 
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
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' //, mapActions

export default {
  components: {},
  data () {
    return {
    }
  },
  methods: {
    // 加入購物車(新增前先判斷購物車是否有重複資料，如有先刪除後新增)
    addtoCartMerge (id, qty = 1) {
      this.$store.dispatch('carts/addtoCartMerge', { id, qty })
    },
    getCategory (page) {
      // 取商品資料
      this.$store.dispatch('products/getProducts', page)
    },
    goDetail (id) {
      this.$nuxt.$router.push({name:'ProductDetail', query:{productId:id}})
      this.$nuxt.$emit('refreshDetail')
    },
    // 加入我的最愛
    addFavorite (item) {
      this.$store.dispatch('favorite/addFavorite', item)
    },
    // 移除我的最愛
    removeFavorite (item) {
      this.$store.dispatch('favorite/removefavorite', item)
    }
  },

  computed: {
    ...mapGetters('products',['products']),
    ...mapGetters('carts',['loadingItem']),
    ...mapGetters('favorite',['myfavorite']),
  },
  mounted () {
    // 從frontNavbar傳來
    this.$nuxt.$on('search', () => {
      this.getCategory()
    })
  },
  created () {
    this.getCategory()
  }
}
</script>

<style lang="scss" scoped>
.init-content{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
  span{
    font-size: 2rem;
  }
}
  .tab-content{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
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
.item-hover > div:hover {
  box-shadow: 5px 5px 10px rgba(227, 219, 208, 0.5);
}
.cart-move {
  width: 100%;
  transition: all 0.3s;
  &:hover i {
    transform: translate(22px, 0);
    transition: transform 0.3s linear;
  }
}
</style>
