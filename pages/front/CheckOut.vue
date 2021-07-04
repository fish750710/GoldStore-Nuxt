<template>
  <div>
    <ul class="ul-item">
      <li><p>1 購物資訊</p></li>
      <li><i class="fas fa-angle-double-right animate__animated animate__slideOutRight animate__infinite"></i></li>
      <li><p>2 訂單資訊</p></li>
      <li><i class="fas fa-angle-double-right"></i></li>
      <li><p>3 完成訂購</p></li>
      <li><i class="fas fa-angle-double-right"></i></li>
      <li><p>4 付款完成</p></li>
    </ul>
    <!-- 購物車內容 -->
    <div class="container">
      <no-ssr>
        <div class="content-box" v-if="cart.carts.length > 0">
          <div class="box">
            <h3 class="header">購物清單</h3>
            <table class="table table-rwd">
              <thead>
                <th></th>
                <th style="text-align:left;">商品</th>
                <th width="150">數量/價格</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cart.carts" :key="item.id">
                  <td data-th="商品圖片">
                    <a href="#" @click="goDetail(item.product.id)">
                      <img :src="item.product.imageUrl"/>
                    </a>
                  </td>
                  <td data-th="商品">
                    <a href="#" @click="goDetail(item.product.id)">{{ item.product.title }}</a>
                    <div class="coupon-text" v-if="item.coupon">
                      <i class="fas fa-ticket-alt"></i>已套用優惠券
                    </div>
                  </td>
                  <td class="qty-box" data-th="數量">
                    <div class="d-flex">
                      <button class="btn pt-0" @click.prevent="minusQty( item )" >
                        <i class="fas fa-minus"></i>
                      </button>
                      <input type="tel" name="qty" class="qty" ref="qty"  @blur="inputQty(item, index)" :value="item.qty"/>
                      <button class="btn pt-0" @click.prevent="addQty( item )">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td class="subtotal-box" data-th="單價">
                    {{ item.product.price | currency }} x {{ item.qty }}
                    <button type="button" class="btn btn-del" @click="removeCartItem(item.id)">
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot class="text-right">
                <tr>
                  <td colspan="3" data-th="總計" class="total">總計
                    <span class="font-weight-bold h5">{{ cart.total | currency }}</span>
                  </td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="3" data-th="折扣價" class="discount">
                    折扣價
                    <span class="h5">{{ cart.final_total | currency}}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div class="coupon-box">
              <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入" />
              <button class="btn btn-coupon" type="button" @click="addCouponCode">套用優惠碼</button>
              <span class="coupon-info">{{ coupon_msg }}</span>
            </div>
            <div class="btn-box">
              <button type="button" class="btn btn-left">
                <router-link to="/">
                  <i class="fas fa-backspace pl-3 text-dark"><span>繼續購物</span></i>
                </router-link>
              </button>
              <button type="button" class="btn btn-right">
                <router-link to="/front/checkout2">
                  <i class="fas fa-arrow-alt-circle-right"><span>確認訂單</span></i>
                </router-link>
              </button>
            </div>
          </div>
        </div>
        <div class="content2-box" v-else>空無一物
            <button type="button" class="btn" @click="goIndex">購物去</button>
        </div>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {},
  data () {
    return {
      coupon_code: '',
      coupon_msg: ''
    }
  },
  methods: {
     ...mapActions('carts', ['getCart']), // 取得購物車內容
    // 刪除購物車內容
    removeCartItem (id) {
      this.$store.dispatch('carts/removeCart', id)
    },
    // 增加優惠卷
    addCouponCode () {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('updateLoading', true)
      this.$axios.post(url, { data: coupon }).then(response => {
        vm.coupon_msg = response.data.message
        vm.getCart()
        vm.$store.dispatch('updateLoading', false)
      })
    },
    // 增加數量
    addQty (item) {
      this.$store.dispatch('carts/addQty', item)
    },
    // 減少數量
    minusQty (item) {
      this.$store.dispatch('carts/minusQty', item)
    },
    // 改變數量
    inputQty (item, index) {
      let qty = this.$refs.qty[index].value
      this.$store.dispatch('carts/inputQty', { item, qty })
    },
    goDetail (id) {
      this.$nuxt.$router.push({name:'ProductDetail', query:{productId:id}})
      this.$nuxt.$emit('refreshDetail')
    },
    goIndex () {
      this.$router.push('/')
    }
  },
  mounted () {
    this.$nuxt.$on('refreshCheckOut', () => {
      this.getCart()
    })
  },
  computed: {    
    ...mapGetters('carts',['cart'])
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>

.ul-item{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
  li{
    list-style: none;
    border-radius: 0.3rem;
    p{
      margin: 0 auto;
    }
    &:nth-child(1){
      background-color: $bg-color;
      color: #fff;
      font-weight: 600;
      font-size: 1.6rem;      
    }
    &:nth-child(odd){
      border: 1px solid $bg-color;
      padding: 0.5rem;

    }
    &:nth-child(even){
      margin-right: 1.5rem;
    }
  }
}
.container{
  .btn{
    background-color: #fff;
    border-radius: 0.3rem;
    border: none;
    &:hover{
      cursor: pointer;
    }
  }
  .content-box{
    display: flex;
    justify-content: center;
    align-items: center;
    .box{
      width: 80%;
    }
    .header{
      font-size: 1.6rem;
      border-bottom: 1px solid $bg-color;
      padding-bottom: 0.5rem;
    }
    .table{
      width: 100%;
      img{
        border: 1px solid $secondary;
      }
      a{
        text-decoration: none;
        color: #000;
      }
      input{
        width: 3rem;
        height: 1.5rem;
        text-align: center;
      }
      td{
        border-top: 1px solid $secondary;
      }
      .coupon-text{
        color: $primary;
      }
      .qty-box, .subtotal-box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3rem;
      }
      .subtotal-box {
        text-align: right;
      }
      .total{
        text-align: right;
        color: red;
        font-weight: 600;
        padding-right: 2rem;
        height: 2rem;
      }
      .discount{
        color: #28a745;
        text-align: right;
        padding-right: 2rem;
        height: 2rem;
      }
      .coupon-box{
        display: flex;
        justify-content: start;
      }
    }
    .btn-del{
      color: red;
      border: 1px solid red;
      margin-left: 0.5rem;
    }
    .btn-coupon{
      background-color: $primary;
    }
    .btn-box{
      display: flex;
      justify-content: space-between;
      height: 3rem;
      margin-top: 1rem;
      margin-bottom: 3rem;
      i,span{
        color:#000;
        padding-left: 0.2rem;
        font-weight: 600;
        font-size: 1rem;
      }
      .btn-left{
        background-color: $secondary;
        padding: 0.5rem 1rem;
      }
      .btn-right{
        background-color: red;
        padding: 0.5rem 1rem;
        i,span{
          color:#fff;
        }
      }
    }
  }
  .content2-box{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 50vh;
    font-weight: 600;
    .btn{
      margin-top: 3rem;  
      background-color: $primary;
      border: none;
      box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 20%);
      padding: 5px 10px;
    }
  }
}
@include desktop-top() {
  .shop-title-rwd p {
    font-size: 24px;
  }
  .table-rwd td {
    img {
      width: 100px;
    }
  }
}
@include pc-top() {
  .table-rwd td {
    img {
      width: 100px;
    }
  }
}
@include pc() {
  .table-price-rwd {
    width: 80px;
  }
  .table-num-rwd {
    width: 50px;
  }
  .shop-title-rwd p {
    font-size: 24px;
  }
  .table-rwd td {
    img {
      width: 100px;
    }
  }
}
@include pad() {
  .table-rwd {
    min-width: 100%;
  }
  /*針對tr去做隱藏*/
  tr.tr-only-hide {
    display: none !important;
  }
  /*讓tr變成區塊主要讓他有個區塊*/
  thead {
    display: none;
  }
  .qty-rwd {
    display: inline-block;
  }
  .table-rwd tr {
    display: block;
    border: 1px solid #ddd;
    margin-top: 5px;
  }
  .table-rwd td {
    text-align: left;
    font-size: 15px;
    overflow: hidden;
    width: 100%;
    display: block;
    img {
      width: 100px;
    }
  }
  .table-rwd td:before {
    /*最重要的就是這串*/
    content: attr(data-th) " : ";
    /*最重要的就是這串*/
    display: inline-block;
    text-transform: uppercase;
    font-weight: bold;
    margin-right: 10px;
    color: #d20b2a;
  }
  /*當RWD縮小的時候.table-bordered 會有兩條線，所以針對.table-bordered去做修正*/
  .table-rwd.table-bordered td,
  .table-rwd.table-bordered th,
  .table-rwd.table-bordered {
    border: 0;
  }
  .table-num-rwd-input {
    button {
      padding: 5px;
    }
    input {
      padding: 0px;
      font-size: 14px;
    }
  }
  .shop-title-rwd p {
    font-size: 18px;
  }
}
@include iphone5() {
  .btn-rwd {
    button {
      padding: 10px 0px;
    }
  }
}
</style>
