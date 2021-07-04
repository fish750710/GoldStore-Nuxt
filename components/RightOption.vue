<template>
  <div class="box" v-show="show">
    <div class="option">
      <div class="header">
        <h2 class="title">{{title}}</h2>
        <i class="fa fa-times" @click="close"></i>
      </div>
      <div id="model-box">
        <div class="modal-body">
          <no-ssr>
            <div id="favoritetModel" v-if="title=='我的收藏'">
              <!-- favoritetModel --> 
              <table class="table" v-if="typeof(myfavorite) == 'object'  && myfavorite.length !== 0"> <!-- localStorage有坑，請小心 -->
                <thead>
                  <th></th>
                  <th>商品</th>
                  <th>收藏</th>
                </thead>
                <tbody>
                  <tr v-for="item in myfavorite" :key="item.id">
                    <td width="100">
                      <a href="#" @click="goDetail(item.id)">
                        <img :src="item.imageUrl" class="" />
                      </a>
                    </td>
                    <td class="">
                      <thead>
                        <th class="">
                          <a href="#" class="" @click="goDetail(item.id)">{{ item.title }}</a>
                        </th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{ item.content}} / {{ item.spec }}</td>
                        </tr>
                      </tbody>
                    </td>
                    <td>
                      <button type="button" class="" @click="removefavoritet(item)">
                        <i class="fas fa-heart"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="context-init" v-else>
                <h3>空無一物</h3>            
                <div>
                  <button type="button" class="" data-dismiss="modal" @click="goIndex">搶購去</button>
                </div>
              </div>
            </div>
            <div id="cartModel" v-else>
              <!-- cartModel -->
              <table class="table" v-if="typeof(myfavorite) == 'object' && cart.carts.length > 0">
                <thead>
                  <th width="100"></th>
                  <th>商品</th>
                  <th width="110">價格 / 數量</th>
                </thead>
                <tbody>
                  <tr v-for="item in cart.carts" :key="item.id">
                    <td class width="100">
                      <a href="#" @click="goDetail(item.product.id)">
                        <img :src="item.product.imageUrl" class="" />
                      </a>
                    </td>
                    <td class="">
                      <thead>
                        <th class="">
                          <a href="#" class="" @click="goDetail(item.product.id)">{{ item.product.title }}</a>
                        </th>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="" width="235">{{ item.product.content}} / {{ item.product.spec }}</td>
                        </tr>
                      </tbody>
                    </td>
                    <td>
                      <button @click="minusQty(item)" :disabled="item.id ===loadingItem">
                        <i class="fas fa-minus" v-if="item.id != loadingItem"></i>
                        <i class="fas fa-spinner fa-pulse" v-else></i>
                      </button>
                      {{ item.qty }}
                      <button @click="addQty( item )" :disabled="item.id ===loadingItem">
                        <i class="fas fa-plus" v-if="item.id != loadingItem"></i>
                        <i class="fas fa-spinner fa-pulse" v-else></i>
                      </button>
                      <div class="price">{{ item.product.price | currency }} x {{ item.qty }}</div>
                      <button type="button" class="" @click="removeCartItem(item.id)" :disabled="item.id ===loadingItem">
                        <i class="fas fa-spinner fa-pulse" v-if="item.id === loadingItem"></i>
                        <i class="far fa-trash-alt" v-else></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="total"  v-if="typeof(myfavorite) == 'object' && cart.carts.length > 0">
                <div style="margin-top: 0.5rem;">
                  <span>
                    <i class="fas fa-coins"></i>總金額 {{ cart.total | currency }}
                  </span>
                </div>
                <div>
                  <button @click="goCheckOuter">
                    <i class="fa fa-cart-plus"></i> 結帳去
                  </button>
                </div>
              </div>
              <div class="context-init" v-else>
                <h3>空無一物</h3>            
                <div>
                  <button type="button" class="" data-dismiss="modal" @click="goIndex">搶購去</button>
                </div>
              </div>
            </div>
          </no-ssr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data(){
    return{
      title: '我的收藏'
    }    
  },
  methods: {
    close(){
      this.$store.commit('SETOPTIONSHOW', '')
    },
    goDetail (id) {
      this.$store.commit('SETOPTIONSHOW', '')
      this.$router.push(`/detail/${id}`)
      this.$nuxt.$emit('refreshDetail')
    },
    goIndex () {
      // 購物去按鈕
      this.$router.push('/')
      this.$store.commit('SETOPTIONSHOW', '')
      this.$nuxt.$emit('refresh')
    }, 
    removefavoritet (item) {
      this.$store.dispatch('favorite/removefavorite', item)
    },
    goCheckOuter () {
      this.$store.commit('SETOPTIONSHOW', '')
      this.$router.push('/front/checkout')
    },
    // 刪除購物車內容
    removeCartItem (id) {
      this.$store.dispatch('carts/removeCart', id)
    },
    // 增加數量
    addQty (item) {
      this.$store.dispatch('carts/addQty', item)
    },
    // 減少數量
    minusQty (item) {
      this.$store.dispatch('carts/minusQty', item)
    },
  },
  computed:{
    show(){
      this.title = this.$store.state.optionShow=='favorite'?'我的收藏':'我的購物車'
      return this.$store.state.optionShow
    },
    ...mapGetters('favorite',['myfavorite']),
    ...mapGetters('carts',['cart','loadingItem']),
  },
};
</script>

<style lang="scss" scoped>

.box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  min-height: 100vh;
  min-width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  .option {
    position: absolute;
    right: 0;
    top: 0;
    width: 30%;
    height: 100%;
    background-color: #fff;
    box-shadow: -5px 0 10px 5px rgba(0, 0, 0, 0.3);
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 7%;
      background-color: $primary;
      h2 {
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      i {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        // margin-left: 20px;
        font-size: 30px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .context-init{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100vh;
    }
    #model-box, #cartModel{   
      padding: 0 0.5rem;
      table{
        width: 100%;
        img{
          width: 100%;
          border: 1px solid $secondary;
        }
        a{
          text-decoration: none;
          color: #000;
        }
        i{
          color: red;
        }
        button{
          background-color: #fff;
        }
        tr{
          text-align: left;
        }
        .price{
          margin-top: 0.5rem;
        }
      }      
      .total{
        // width: 100%;
        // display: flex;
        // justify-content: space-around;
        // align-items: center;
        // border-top: 1px solid #000;
        position: absolute;
        bottom: 1rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        align-content: center;
        align-self: center;
        width: 90%;
        height: 2rem;
        border-top: 1px solid #000;
        span{     
          color: red;
        }
      }
    }
  }
}
button {
  margin-top: 10px;
  background-color: $primary;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  &:hover {
    cursor: pointer;
    background-color: $primaryLight;
  }
}
</style>