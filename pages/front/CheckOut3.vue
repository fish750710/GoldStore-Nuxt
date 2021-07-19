<template>
  <div>
    <ul class="ul-item">
      <li><p>1 購物資訊</p></li>
      <li><i class="fas fa-angle-double-right"></i></li>
      <li><p>2 訂單資訊</p></li>
      <li><i class="fas fa-angle-double-right"></i></li>
      <li :class="[order.is_paid ? '' : ['shop-title-rwd','active'] ]"><p>3 付款方式</p></li>
      <li>
        <no-ssr>
          <i class="fas fa-angle-double-right animate__animated animate__slideOutRight animate__infinite" v-if="!order.is_paid"></i>
          <i class="fas fa-angle-double-right mr-1" v-else ></i>
        </no-ssr>
      </li>
      <li :class="[order.is_paid ? ['shop-title-rwd','active'] : '' ]"><p>4 付款完成</p></li>
    </ul>
    <div class="container">
      <div class="order-box">
        <form @submit.prevent="payOrder">
          <table class="table">
            <thead class="bg-primary">
              <th>商品</th>
              <th width="80">數量</th>
              <th class="text-right" width="110">價格</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td >{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="text-right">{{ item.final_total | currency}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right" >總計</td>
                <td class="text-right total">{{ order.total | currency}}</td>
              </tr>
            </tfoot>
          </table>
          <table class="table">
            <tbody>
              <tr>
                <th width="95">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span class="text-primary mr-3">{{ paymethod }}</span>
                  <no-ssr>
                    <span v-if="!order.is_paid"  class="text-danger">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                  </no-ssr>
                </td>
              </tr>
              <tr>
                <th>付款方式</th>
                <td colspan="2">
                    <div :class="[ paymethod==='貨到付款' ?'text-primary' : '']" >
                      <input  type="radio" name="inlineRadioOptions" id="cash" value="貨到付款" v-model="paymethod" :disabled="order.is_paid" required>
                      <label class="form-check-label" for="cash" data-toggle="tooltip" data-placement="bottom" title="目前貨到付款只提供平日配送。">
                        貨到付款<i class="fas fa-shipping-fast ml-2 mr-3"></i></label>
                    </div>
                    <div :class="[ paymethod==='線上刷卡' ?'text-primary' : '']" >
                      <input type="radio" name="inlineRadioOptions" id="creditcard" value="線上刷卡" v-model="paymethod" :disabled="order.is_paid" required>
                      <label class="form-check-label" for="creditcard" data-toggle="tooltip" data-placement="bottom" title="歡迎使用信用卡刷卡，優惠期間免刷卡手續費。">
                        線上刷卡<i class="far fa-credit-card ml-2 mr-3"></i></label>
                    </div>
                    <div :class="[ paymethod==='超商取貨' ?'text-primary' : '']" >
                      <input type="radio" name="inlineRadioOptions" id="storepickup" value="超商取貨" disabled v-model="paymethod" required>
                      <label class="form-check-label" for="storepickup">
                        超商取貨 (尚未開放) <i class="fas fa-store ml-2 mr-3"></i></label>
                    </div>
                    <div class="btn-box">
                      <div>
                        <button class="btn btn-left" @click.prevent="goIndex"><span>再去逛逛</span></button>
                      </div>
                      <no-ssr>
                        <div v-if="order.is_paid === false">
                          <button class="btn btn-right" ><span>確認付款去</span></button>
                        </div>
                      </no-ssr>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
     <!-- 付款完成 Modal -->
    <div id="isPaid" v-show="isPaidModel">
      <div class="card-box">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title">感謝您的訂購</h5>
            <button type="button" class="close" @click="isPaidModel=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>貨品將3天內送達，敬請留意快遞，謝謝!</p>
            <i class="fas fa-shipping-fast animate__animated animate__bounceOutRight animate__infinite" style="animation-duration: 12s" ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderId: '', // 取得orderId
      order: {
        user: {}
      },
      paymethod: '',
      isPaidModel: false
    }
  },
  methods: {
  // 取得單一筆訂單資料
    getOrder () {
      console.log(this.orderId)
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`
      vm.$store.dispatch('updateLoading', true)
      vm.$axios.get(url).then((response) => {
        vm.order = response.data.order
        vm.$store.dispatch('updateLoading', false)
      })
    },
    // 結帳付款
    payOrder () {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`
      vm.$store.dispatch('updateLoading', true)
      vm.$axios.post(url).then((response) => {
        if (response.data.success) {
          setTimeout(() => {
            this.isPaidModel = true  
          }, 1000)
          setTimeout(() => {
            this.isPaidModel = false
          }, 5000)
          vm.getOrder() // 重新取得訂單資料(更新畫面)
        };
        vm.$nuxt.$emit('refreshCart')
        vm.$store.dispatch('updateLoading', false)
      })
    },
    goIndex () {
      this.$router.push('/')
    }
  },
  created () {
    this.orderId = this.$route.query.id // 取得網址上的ID
    this.getOrder()
  },
  // 跳離頁面前先檢查 (導航守衛)
  beforeRouteLeave (to, from, next) {
    // console.log('to', to, 'from', from, 'next', next)
    if (this.order.is_paid === true) {
      next()
    } else {
      const answer = confirm(`您尚未付款完成，\n您確定要離開！`)
      if (answer) {
        next()
      } else {
      // 取消
        next(false)
      };
    };
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
    
    &:nth-child(odd){
      border: 1px solid $bg-color;
      padding: 0.5rem;

    }
    &:nth-child(even){
      margin-right: 1.5rem;
    }
  }
  .active{
    background-color: $bg-color;
    color: #fff;
    font-weight: 600;
    font-size: 1.6rem;      
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
.align-middle{
  text-align: center;
}
.container{
  .order-box{
    display: flex;
    justify-content: center;
    form{
      width: 80%;
      table{
        width: 100%;
        thead{
          background-color: $primary;
        }
        .total, .text-danger{
          color: red;
          font-weight: 600;
        }
        .text-primary{
          color: $bg-color;
          font-weight: 600;
        }
        .text-success{
          color: #28a745;
        }
        tr{
          height: 2rem;
        }
        td{
          border-top: 1px solid $secondary;
        }
        .btn-box{
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1rem;
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
            margin-left: 1rem;
            i,span{
              color:#fff;
            }
          }
        }
      }
    }
  }
}

#isPaid{
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
    }
  }
}
@include desktop-top() {
  .shop-title-rwd p{
    font-size: 24px;
  }
  .table-rwd td {
    img{
      width: 100px;
    }
  }
}
@include pc-top() {
  .table-rwd td {
    img{
      width: 100px;
    }
  }
}
@include pc() {
  .table-price-rwd{
    width: 80px;
  }
  .table-num-rwd{
    width: 50px;
  }
  .shop-title-rwd p{
    font-size: 24px;
  }
  .table-rwd td {
    img{
      width: 100px;
    }
  }
}
@include pad() {
  .table-rwd{
    min-width: 100%;
  }
  /*針對tr去做隱藏*/
  tr.tr-only-hide {display: none !important;}
  /*讓tr變成區塊主要讓他有個區塊*/
  thead{
    display: none;
  }
  .qty-rwd{
    display: inline-block;
  }
  .table-rwd tr{
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
    img{
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
    color: #D20B2A;
  }
  /*當RWD縮小的時候.table-bordered 會有兩條線，所以針對.table-bordered去做修正*/
  .table-rwd.table-bordered td,.table-rwd.table-bordered th,.table-rwd.table-bordered{border:0;}
  .table-num-rwd-input{
    button{
      padding:5px;
    }
    input{
      padding:0px;
      font-size: 14px;
    }
  }
  .shop-title-rwd p{
    font-size: 18px;
  }
}
@include iphone5() {
  .btn-rwd{
    button{
      padding:10px 0px;
    }
  }
}
</style>
