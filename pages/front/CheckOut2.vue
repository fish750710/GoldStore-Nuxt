<template>
  <div>    
    <ul class="ul-item">
      <li><p>1 購物資訊</p></li>
      <li><i class="fas fa-angle-double-right"></i></li>
      <li><p>2 訂單資訊</p></li>
      <li><i class="fas fa-angle-double-right  animate__animated animate__slideOutRight animate__infinite"></i></li>
      <li><p>3 完成訂購</p></li>
      <li><i class="fas fa-angle-double-right"></i></li>
      <li><p>4 付款完成</p></li>
    </ul>
    <!-- 購物資訊 -->
    <div class="container">
      <div class="card-box">
        <div class="card-header">
          <button class="btn btn-link" type="button" @click="orderShow=!orderShow">
            購物資訊
            <no-ssr>
              <i class="fa fa-angle-down fa-lg menu_icon-open" v-if="orderShow"></i>
              <i class="fa fa-angle-up fa-lg menu_icon-close" v-else></i>
            </no-ssr>
          </button>          
        </div>
        <!-- v-if="cart.carts.length > 0" 如果出現不正常 undefined 必須先判斷 -->
        <no-ssr>
          <div v-if="cart.carts.length > 0" v-show="orderShow">        
            <table class="table table-rwd">
              <thead>
                <th></th>
                <th style="text-align:left;">商品</th>
                <th class="text-right" width="70" >數量</th>
                <th class="text-right" width="140">價格</th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class data-th="商品圖片">
                    <img :src="item.product.imageUrl" class="p-1 border" />
                  </td>
                  <td class="" data-th="商品">
                    {{ item.product.title }}
                    <div class="coupon-text" v-if="item.coupon">
                      <i class="fas fa-ticket-alt"></i>
                      已套用優惠券
                    </div>
                  </td>
                  <td class=" text-right" data-th="數量">{{ item.qty }}</td>
                  <td class=" text-right" data-th="單價">{{ item.final_total | currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" data-th="總計" class="text-right total">
                    總計<span>{{ cart.total | currency }}</span>
                  </td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="4" data-th="折扣價" class="total text-right discount">
                    折扣價<span>{{ cart.final_total | currency}}</span>
                  </td>
                </tr>
              </tfoot>
            </table>         
          </div>
        </no-ssr>
      </div>
    </div>
    <!-- 訂單 -->
    <div class="order-info">
      <validation-observer v-slot="{ invalid }" class="form-box">
        <form class="" @submit.prevent="createOrder">
          <div class="form-group">
            <label for="useremail">*Email</label>
            <ValidationProvider rules="required|email" v-slot="{errors, classes}">
              <input id="email" type="email" name="email" v-model="form.user.email" class="form-control" :class="classes" placeholder="電子郵件">
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
            <!-- <input
              type="email"
              class="form-control"
              name="email"
              id="useremail"
              v-validate="'required|email'"
              :class="{'is-invalid': errors.has('email')}"
              v-model="form.user.email"
              placeholder="請輸入 Email"
            />
            <no-ssr>
            <span v-if="errors.has('email')">{{ errors.first('email') }}</span>
            </no-ssr> -->
          </div>
          <div class="form-group">
            <label for="username">*收件人姓名</label>
            <!-- <input
              type="text"
              class="form-control"
              name="name"
              id="username"
              :class="{'is-invalid': errors.has('name')}"
              v-model="form.user.name"
              v-validate="'required'"
              placeholder="輸入姓名"
            /> -->
            <ValidationProvider rules="required" v-slot="{errors, classes}">
              <input id="username" type="text" name="name" v-model="form.user.name" class="form-control" :class="classes" placeholder="輸入姓名">
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
            <!-- <no-ssr>
            <span v-if="errors.has('name')">姓名必須輸入</span>
            </no-ssr> -->
          </div>
          <div class="form-group">
            <label for="usertel">*收件人電話</label>
            <ValidationProvider rules="required" v-slot="{errors, classes}">
              <input id="usertel" type="tel" name="tel" v-model="form.user.tel" class="form-control" :class="classes" placeholder="請輸入電話">
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
            <!-- <input
              type="tel"
              class="form-control"
              name="tel"
              id="usertel"
              v-model="form.user.tel"
              placeholder="請輸入電話"
              :class="{'is-invalid': errors.has('tel')}"
              v-validate="'required'"
            />
            <no-ssr>
            <span v-if="errors.has('tel')">電話必須輸入</span>
            </no-ssr> -->
          </div>
          <div class="form-group">
            <label for="useraddress">*收件人地址</label>
            <ValidationProvider rules="required" v-slot="{errors, classes}">
              <input id="useraddress" type="address" name="address" v-model="form.user.address" class="form-control" :class="classes" placeholder="請輸入地址">
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
            <!-- <input
              type="address"
              class="form-control"
              name="address"
              :class="{'is-invalid': errors.has('address')}"
              id="useraddress"
              v-model="form.user.address"
              v-validate="'required'"
              placeholder="請輸入地址"
            />
            <no-ssr>
            <span v-if="errors.has('address')">地址欄位不得留空</span>
            </no-ssr> -->
          </div>
          <div class="form-group">
            <label for="usermsg">留言</label>
            <textarea
              name
              id="usermsg"
              class="form-control"
              cols="30"
              rows="3"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="btn-box">
            <button class="btn btn-left" @click.prevent="goCheckOut">
              <i class="fas fa-backspace"><span>上一步</span></i>
            </button>
            <button type="button" class="btn btn-right" @click="checkOrderState=true" :disabled="invalid">
              <i class="fas fa-arrow-alt-circle-right"><span>送出訂單</span></i>
            </button>
          </div>
          <!-- 確認視窗 -->
          <!-- Modal -->
          <div id="checkorder" v-show="checkOrderState">
            <div class="card-box">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">確認訂單</h5>
                  <button type="button" class="close" @click="checkOrderState=false">
                    <span>&times;</span>
                  </button>
                </div>
                <div class="modal-body">請再次確認商品訂單無誤，謝謝</div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-left" @click="checkOrderState=false">取消</button>
                  <button type="button" class="btn btn-right" @click="createOrder">送出訂單</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {},
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon_code: '',
      coupon_msg: '',
      checkOrderState: false,
      orderShow: true
    }
  },
  methods: {
    ...mapActions('carts', ['getCart']), // 取得購物車內容
    // 新增訂單
    createOrder () {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
      const order = vm.form
      vm.$store.dispatch('updateLoading', true)        
      vm.$axios.post(url, { data: order }).then(response => {
        // console.log('訂單已建立', response);
        this.checkOrderState = false
        vm.$nuxt.$emit('messsage:push', response.data.message, 'success')
        if (response.data.success) {
          // console.log('準備跳轉也面');
          vm.$router.push({path:'/front/checkout3', query:{ id:response.data.orderId }}) // $router 轉換頁面
        }
        this.$nuxt.$emit('refreshCart')
        vm.$store.dispatch('updateLoading', false)
      })
    },
    goCheckOut () {
      this.$router.push(`/front/checkout`)
    }
  },
  computed: {
    ...mapGetters('carts',['cart'])
  },
  created () {
    this.getCart()
  },
  // 跳離頁面前先檢查
  beforeRouteLeave (to, from, next) {
    // console.log('to', to, 'from', from, 'next', next);
    if (this.cart.carts === 0) {
      next()
    } else if (to.path.indexOf('CheckOut3')) {
      next()
    } else {
      const answer = confirm(`訂單尚未建立，\n您確定要離開！`)
      if (answer) {
        next()
      } else {
        // 取消
        next(false)
      }
    }
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
    &:nth-child(3){
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
.btn{
  background-color: #fff;
  border-radius: 0.3rem;
  border: none;
  &:hover{
    cursor: pointer;
  }
}
.text-right{
  text-align: right;
}
.container{
  display: flex;
  justify-content: center;

  .card-box{
    height: 100%;
    width: 80%;
    border: 1px solid #ddd;
    .card-header{
      background: rgb(231, 230, 230);
      height: 3rem;
      button{
        font-weight: 600;
        margin: 1rem;
        background: rgb(231, 230, 230)
      }
    }
    .table{  
      width: 100%;
      th{
        height: 2rem;
      }
      img{
        border: 1px solid $secondary;
      }
      td{
        border-top: 1px solid $secondary;
      }
      .coupon-text{
        color: $primary;
      }
      .total{
        color: red;
        font-size: 1rem;
        font-weight: 600;
        line-height: 3rem;
        span{
          font-size: 1.4rem;
        }
      }
      .discount{
        color: #28a745;
        text-align: right;    
        height: 2rem;
      }
    }
  }
}
.order-info{
  display: flex;
  justify-content: center;
  margin: 3rem auto;
  width: 50%;
  form{
    width: 100%;
    label{
      line-height: 2rem;
    }
    .form-group{
      display: grid;
      grid-template-rows: 2rem 2rem;
      textarea{
        height: 5rem;
      }
      span{
        color: red;
      }
    }
    .btn-box{
      display: flex;
      justify-content: space-between;
      height: 3rem;
      margin-top: 5rem;
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
}
#checkorder{
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  .card-box{
    max-width: 350px;
    height: 25%;
    background-color: #fff;
    border-radius: 0.2rem;
    position: relative;
    .close{
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 1.6rem;
      border: none;
      background-color: #fff;
      &:hover{
        cursor: pointer;
      }
    }
    .modal-content{
      padding: 1rem;
      .modal-title{
        font-size: 1.2rem;
        margin: 0;
      }
      .modal-body{
        color: red;
        font-size: 1.4rem;
        margin-top: 1rem;
      }
      .modal-footer{
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        font-size: 2rem;
        .btn-left{
          background-color: $secondary;
          padding: 0.5rem 1rem;
        }
        .btn-right{
          background-color: red;
          padding: 0.5rem 1rem;
          color:#fff;
        }
      }
    }
  }
}
.form-box{
  width: 100%;
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
  .order-info{
    width: 75%;
  }
}
@include iphone5() {
  .btn-rwd {
    button {
      padding: 10px 0px;
    }
  }
}
@media (max-width: 736px) {
}
// icon變化
[aria-expanded="false"] .menu_icon-open {
  display: inline;
}

[aria-expanded="false"] .menu_icon-close {
  display: none;
}

[aria-expanded="true"] .menu_icon-open {
  display: none;
}

[aria-expanded="true"] .menu_icon-close {
  display: inline;
}
</style>
