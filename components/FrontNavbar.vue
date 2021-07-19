<template>
  <div>
    <alert />
    <!-- <loading :active.sync="isLoading"></loading> -->
    <!-- 選單以外區域 -->
    <div id="close-menu" ></div>
    
    <nav class="header navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <div class="logo-box">     
          <nuxt-link to="/" >
            <img src="@/assets/images/Logo-3w150.png" alt class="d-logo" />
            <img src="@/assets/images/Logo-64.png" alt class="m-logo" style="width:45px" />
          </nuxt-link>
      </div>
      <div class="menu-box ">
        <ul class="d-menu nav-box">
          <li class="nav-item menu-ul">
            <!-- <a href="#" class="menuSidebar" @click="goDescription">產品介紹</a> -->
            <nuxt-link to="/Description" class="menuSidebar">產品介紹</nuxt-link>
          </li>
          <li class="nav-item menu-ul">
            <!-- <a href="#" class="menuSidebar" @click="goSale">優惠活動</a> -->
            <nuxt-link to="/Sale" class="menuSidebar">優惠活動</nuxt-link>
          </li>
          <li class="nav-item menu-ul">
            <!-- <a href="#" class="menuSidebar" @click="goIndex">購物商城</a> -->
            <nuxt-link to="/" class="menuSidebar">購物商城</nuxt-link>
          </li>
        </ul>
        <no-ssr>
        <ul class="nav-box icon-box">
          <li class="nav-item">
            <Search class=""></Search>
          </li>
          <!-- <li class="nav-item m-search mt-1 icon-rwd-margin">
            <div class="dropdown">
              <a
                href="#"
                class="dropdown-toggle"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-search text-white p-2"></i>
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2" style="width:220px">
                <input
                  type="search"
                  class="form-control input-width d-inline"
                  placeholder="搜尋.."
                  aria-label="搜尋"
                  v-model="searchValue"
                  @keyup.enter="searchProduct"
                />
              </div>
            </div>
          </li> -->
          <li class="nav-item ">
            <!-- 未登入 -->
            <div v-if="!successStatus">
              <a href="javascript:;" class="menu-top" @click="openLogin">
                <i class="far fa-user-circle userlogo"></i>
              </a>
            </div>
            <div v-else>
              <!-- 已登入 -->
              <a href="javascript:;" class="menu-top" @click="dropdownUserMenu = !dropdownUserMenu">
                <i class="fas fa-user-circle userlogo"></i>
              </a>
              <div class="dropdown" v-show="dropdownUserMenu">
                <div class="dropdown-menu" v-if="successStatus">
                  <button class="dropdown-item" type="button" @click="goUserOrders">
                    <i class="far fa-address-book mr-1 user-list-icon-order"></i>
                    <span>查訂單</span>
                  </button>
                  <button class="dropdown-item" type="button" @click="goProducts">
                    <i class="fas fa-clipboard-list mr-1 user-list-icon-management"></i>
                    <span>管理商品</span>
                  </button>
                   <button class="dropdown-item" type="button" @click="goCoupons">
                    <i class="fas fa-ticket-alt pr-2"></i>
                    <span>優惠卷</span>
                  </button>
                  <button class="dropdown-item" type="button" @click="signout">
                    <i class="fas fa-sign-out-alt mr-1"></i>
                    <span>登出</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
           <li class="nav-item ">
            <a
              href="javascript:;"
              class="menu-top"
              @click="rightOption('favorite')"
            >
              <i class="fas fa-heart"></i>    
              <span
                class=""
                style
                v-if="typeof(myfavorite) == 'object'  && myfavorite.length !== 0"
              >{{ myfavorite.length }}</span> 
              <!-- localStorage有坑，請小心 -->
            </a>
          </li>
          <li class="nav-item ">
            <a
              href="javascript:;"
              class="menu-top"
              @click="rightOption('carts')"
            >
              <i class="fas fa-cart-arrow-down"></i>
              <span
                class="badge badge-pill badge-danger"
                style
                v-if="cart.carts.length !== 0"
              >{{ cart.carts.length }}</span>
            </a>
          </li>
        </ul>
        </no-ssr>
      </div>      
      <div class="menuButton" @click="menuBtn" >
        <a href="javascript:;">
          <span></span>
        </a>
      </div>
      <div class="menu-box-m" v-show="menuBox" @click="menuBtn">
        <ul class="menu" >
          <li class="nav-item menu-ul">
            <!-- <a href="#" class="m-3 menuSidebar" @click="goDescription">產品介紹</a> -->
            <nuxt-link to="/Description" class="menuSidebar">產品介紹</nuxt-link>
          </li>
          <li class="nav-item menu-ul">
            <!-- <a href="#" class="m-3 menuSidebar" @click="goSale">優惠活動</a> -->
            <nuxt-link to="/Sale" class="menuSidebar">優惠活動</nuxt-link>
          </li>
          <li class="nav-item menu-ul">
            <!-- <a href="#" class="m-3 menuSidebar" @click="goIndex">購物商城</a> -->
            <nuxt-link to="/" class="menuSidebar">購物商城</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="box"></div>
    <!-- Login Modal -->
    <no-ssr>
      <div class="login-model" v-show="loginModel">
        <div class="login-box">
          <button type="button" class="close" @click="closeLogin">
            <span>&times;</span>
          </button>
          
          <div class="form-group">
            <validation-observer v-slot="{ invalid }">
            <form class="form-signin" @submit.prevent="signin">
              <div class="header-box">
                <h1 class="title" v-if="!ischange">會員登入</h1>
                <h2 class="title" v-else>註冊</h2>
                <button
                  type="button"
                  class="btn text-warning"
                  @click="changeSign(true)"
                  v-if="!ischange"
                >註冊</button>
                <button
                  type="button"
                  class="btn text-warning"
                  @click="changeSign(false)"
                  v-else
                >登入</button>
              </div>
              
              <!-- <input
                type="email"
                id="inputEmail"
                name="email"
                class="form-control mb-2"
                v-model="user.username"
                placeholder="電子郵件"
                v-validate="'required|email'"
                :class="{'is-invalid': errors.has('email')}"
                autofocus
              />
              <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
              <input
                type="password"
                id="inputPassword"
                name="password"
                class="form-control"
                v-model="user.password"
                placeholder="密碼"
                v-validate="'required'"
                :class="{'is-invalid': errors.has('password')}"
              />
              <span class="text-danger" v-if="errors.has('password')">密碼必須輸入</span>
              <input
                type="password"
                id="checkPassword"
                name="doublecheck"
                class="form-control"
                v-if="ischange"
                v-model="user.dbpassword"
                placeholder="再次確認密碼"
                v-validate="'required'"
                :class="{'is-invalid': errors.has('doublecheck')}"
              /> -->
              <!-- <span class="text-danger" v-if="errors.has('doublecheck')">密碼必須輸入</span> -->
              <!-- <ValidationProvider rules="email" v-slot="{ errors }">
                <input type="text" v-model="value">
                <span>{{ errors[0] }}</span>
              </ValidationProvider> -->
              <ValidationProvider rules="required|email" v-slot="{errors, classes}">
                <input id="email" type="email" name="email" v-model="user.username" class="form-control" :class="classes" placeholder="電子郵件">
                <span class="text-danger">{{errors[0]}}</span>
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{errors, classes}">
                <input id="inputPassword" type="password" name="password" v-model="user.password" class="form-control mb-2" :class="classes" placeholder="密碼">
                <span class="text-danger">{{errors[0]}}</span>
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{errors, classes}">
                <input id="checkPassword" v-if="ischange" type="password" name="check" v-model="user.dbpassword" class="form-control mb-2" :class="classes" placeholder="再次確認密碼">
                <span class="text-danger">{{errors[0]}}</span>
              </ValidationProvider>
              <div class="checkbox">
                <label>
                  <input type="checkbox" value="remember-me" /> 記住我
                </label>
                <a href="javascript:;" class="text-decoration-none">忘記密碼</a>
              </div>
              <div v-if="!message.success" class="text-danger mb-3">{{ message.message }}</div>
              <button class="btn-submit" type="submit" @keyup.enter="signin()" v-if="!ischange" :disabled="invalid"
              >登入</button>
            </form>
            <button class="btn-submit" @click.prevent="signup(user.password,user.dbpassword)" v-if="ischange" :disabled="invalid">我要註冊</button>
            </validation-observer>
            <div v-if="ischange" class="text-danger mt-3">{{ message }}</div>
            <hr />
            <div class="footer-box">
              <button class="btn d-flex fb-btn mr-2">
                <img src="@/assets/images/20px-fb-logo.png" alt />
                <div class="fb-font">使用 Facebook 繼續</div>
              </button>
              <button class="btn d-flex line-btn">
                <img src="@/assets/images/20px-LINE_logo.png" alt />
                <div class="line-font">使用 LINE 繼續</div>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </no-ssr>  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/AlertMsg.vue'
import Search from '@/components/Search'

export default {
  // async asyncData({ $http }) {
  //   console.log('http',$http)
  //   const mountains = await $http.$post(`${process.env.APIPATH}/api/user/check`).then(res=>{console.log(res)})
  //   return { mountains }
  // },
  // asyncData() {
  //   console.log('asyncData')
  //       return { result: '報名結果是 ooxx' };
  // },
  // async asyncData({ $http }) {
  //   console.log('asyncData')
  //   const mountains = await $http.$get('https://api.nuxtjs.dev/mountains')
  //   return { mountains }
  // },
  // async fetch() {
  //   console.log('fetch', this)
  //   this.mountains = await $http.$post(`${process.env.APIPATH}/api/user/check`).then(res=>{console.log(res)})
  // },
  components: {
    // Pagin, // 分頁
    Alert,
    Search,
  },
  data () {
    return {
      ischange: false,
      successStatus: false,
      coupon_code: '',
      coupon_msg: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      user: {
        username: '',
        password: '',
        dbpassword: ''
      },
      message: '',
      // searchValue: '',
      loginModel: false,
      dropdownUserMenu: false,
      menuBox: false,
    }
  },
  methods: {
    // ...mapActions(['getCart']), // 取得購物車內容
    // ...mapActions({toggle:'getCart'}),
    ...mapActions('carts', [
      'getCart'
    ]),
    // 加入購物車
    addtoCart (id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty })
    },
    // 刪除購物車內容
    removeCartItem (id) {
      this.$store.dispatch('removeCart', id)
    },
    // 增加數量
    addQty (item) {  
      this.$store.dispatch('addQty', item)
    },
    // 減少數量
    minusQty (item) {
      this.$store.dispatch('minusQty', item)
    },
    // open 登入model
    openLogin () {
      this.message = ''
      this.user.password = ''
      this.loginModel = true;
    },
    closeLogin() {
      this.loginModel = false;
    },
    // 登入
    signin () {
      // 對應config/dev.env.js檔案的環境變數
      const api = `${process.env.APIPATH}/admin/signin`
      const vm = this
        this.$axios.post(api, vm.user).then(response => {
          vm.message = response.data
          const expired = vm.message.expired
          const token = vm.message.token
          document.cookie = `token=${token};expired=${new Date(expired)}`
          if (response.data.success) {
            vm.successStatus = true
            // 登入成功跳轉首頁
            this.loginModel = false;        
            vm.issuccess()
          } else {
            vm.successStatus = false
            vm.$nuxt.$emit('messsage:push', response.data.message, 'danger')
          }
        })
    },
    // 切換登入或註冊畫面
    changeSign (change) {
      if (change) {
        // 註冊
        this.ischange = true
        this.message = ''
      } else {
        this.ischange = false
        this.message = ''
      }
    },
    // 註冊
    signup (psw, dbpsw) {
      if (psw === dbpsw) {        
        this.message = '尚未開放註冊'        
      } else {
        this.message = '請確認密碼輸入是否一樣'
      }
    },
    // 檢查登入狀態
    issuccess () {
      const vm = this
      const url = `${process.env.APIPATH}/api/user/check`
      vm.$axios.post(url).then(res => {
         if (res.data.success) {
          // 檢查用戶是否仍持續登入狀態
          vm.successStatus = true
        } else {
          vm.successStatus = false
        }
      })
    },
    // 登出
    signout () {
      this.dropdownUserMenu = false
      const vm = this
      const url = `${process.env.APIPATH}/logout`
      vm.$axios.post(url).then(response => {
        if (response.data.success) {
          vm.successStatus = false
          vm.$nuxt.$emit('messsage:push', response.data.message, 'success')
          vm.goIndex()
        } else {
          vm.successStatus = true
        }
      })
    },
    // searchProduct () {
    //   this.$router.push(`/search/${this.searchValue}`)
    //   this.$nuxt.$emit('search')
    //   if (this.searchValue.trim() === '') {
    //     this.$nuxt.$emit('messsage:push', `請輸入商品名稱`, 'danger')
    //   }
    //   this.searchValue = ''
    // },
    getfavorite () {
      this.$store.dispatch('favorite/getfavorite')
    },
    removefavoritet (item) {
      this.$store.dispatch('removefavorite', item)
    },
    // 導頁到管理商品
    goProducts () {
      this.dropdownUserMenu = false
      this.$router.push('/back/Products')
    },
    goUserOrders () {
      this.dropdownUserMenu = false
      this.$router.push('/front/userorders')
      this.$nuxt.$emit('refreshTable')
    },
    goCoupons () {
      this.dropdownUserMenu = false
      this.$router.push('/back/Coupons')
    },
    // goCheckOuter () {
    //   this.$router.push('/checkout').catch(err => (err))
    // },
    goDetail (id) {
      this.$router.push(`/detail/${id}`)
      this.$nuxt.$emit('refreshDetail')
    },
    goIndex () {
      // 購物去按鈕
      this.$router.push('/')
      this.$nuxt.$emit('refresh')
    },    
    // goDescription () {
    //   this.$router.push(`/Description`).catch(err => (err))
    // },
    // goSale () {
    //   this.$router.push(`/Sale`).catch(err => (err))
    // },
    rightOption(val){
      // console.log(val)
      this.$store.commit('SETOPTIONSHOW', val)
    },
    menuBtn(){
      this.menuBox = !this.menuBox
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('carts',['cart', 'loadingItem']),
    ...mapGetters('favorite',['myfavorite']),
  },
  created () {
    // console.log(this)
    this.getCart()      
    if(process.client || this.$store.state.cookie){
      console.log("cookie", this.$store.state.cookie)
      this.issuccess()
    }
    this.getfavorite()
  },
  mounted () {
    // 從frontNavbar傳來
    this.$nuxt.$on('refreshCart', () => {
      this.getCart()
    })
  },  
}
</script>

<style lang="scss" scoped>

nav{
  z-index: 998;
}
.box{
  height: 50px;
}
.header{
  position: fixed;
  width: 100%;
  background-color: $bg-color;
  display: flex;
  align-items: center;
  .logo-box{
    width: 20%;
    padding-left: 10px;
  }
  .menu-box{
    width: 80%;
    display: flex;
    justify-content: flex-end;
    align-items: center;   
  }
  .nav-box{
    // width: 50%;
    display: flex;
    justify-content: center;
    align-self: center;
    list-style: none;
    li{
      text-align: center;
      padding: 0.5rem 0.8rem;
    }
    i{
      color: $white;
    }
    span{
      color: #fff;
      padding: 2px 6px;
      border-radius: 50%;
      background-color: red;
    }
  }
  .icon-box{
    width: 24rem;
    display: flex;
    justify-content: right;
    li{
      text-align: center;
      padding: 0.5rem 0rem;
      display: flex;
      align-items: center;
    }
  }
}

.fb-btn {
  background: #3b5998;
}
.line-btn {
  background: #00c300;
}
.fb-font {
  color: #fff;
  font-size: 13px;
  padding: 0 5px;
}
.line-font {
  color: #fff;
  font-size: 13px;
  padding: 0 17px;
}
.user-list-icon-order {
  padding-right: 3px;
}
.user-list-icon-management {
  margin-left: 1px;
  padding-right: 3px;
}
.menu-top {
  position: relative;
  margin: 10px 16px 5px 16px;
  padding: 0;
  font-size: 18px;
  span {
    position: absolute;
    top: -7px;
    right: -15px;
    font-size: 12px;
    z-index: 1;
  }
}
.menu-top i:hover {
  color: $primary;
}

.dropdown-text {
  &:hover {
    color: $primary;
  }
  &:active {
    color: $dark;
  }
}
.menu-ul {
  .menuSidebar {
    text-decoration: none;
    color: #fff;
    transition: all 0.7s;
    font-weight: bold;
    // width: 50px;
  }

  a:hover {
    color: $primary;
    position: relative;
  }
}

.menu-ul a:after {
  content: " ";
  position: absolute;
  z-index: 2;
  bottom: -8px;
  left: 28px;
  display: block;
  // width: 65px;
  // height: 1px;
  transform: translate(-50%);
}

.menu-ul a:hover:after {
  height: 2px;
  animation: ad_width 0.3s linear forwards;
  background: $primary;
}

.userlogo {
  font-size: 22px;
}
.login-model{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  z-index: 999;
  .text-warning{
    color: $primary;
  }
  button{
    background-color: #fff;
    border: none;
    border-radius: 0.5rem;
    &:hover{
      cursor: pointer;;
    }
  }
  .login-box{
    max-width: 500px;
    // height: 340px;
    background-color: #fff;
    margin: 2rem auto;
    border-radius: 1rem;
    position: relative;
    padding: 1rem;
    .close{
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background-color: #fff;
      border: none;
      font-size: 2rem;
      &:hover{
        cursor: pointer;
      }
    }
    .header-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 2rem;      
      .title{
        font-size: 1.4rem;
      }
    }
    .checkbox{
      display: flex;
      justify-content: space-between;
      align-items: center;
      a{
        color: $primary;
        text-decoration: none;
      }
    }
    .btn-submit{
      width: 100%;
      height: 2.4rem;
      background-color: $primary;
      font-size: 1.6rem;
      font-weight: 600;
    }
    .footer-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      button{
        padding: 0.5rem;
        display: flex;
      }
      .fb-btn{
        background-color: #3b5998;
      }
      .line-btn{
        background-color: #00c300;
      }
    }
    .form-control{
      width: 93%;
      height: 1.8rem;
      border: 1px solid #495057;
      margin-bottom: 0.3rem;
      font-size: 1rem;
      padding: 0 1rem;
      border-radius: 0.3rem;
    }
    .text-danger{
      color: red;
    }
    .is-invalid{
      border: 1px solid red;
    }
  }  
}
.nav-item{
  position: relative;
  .dropdown-menu{
    position: absolute;
    top: 3rem;
    left: 0;
    .dropdown-item{
      width: 9rem;
      height: 2rem;
      background-color: #fff;
      border: none;
      border-radius: 0.3rem;
      text-align: left;
      padding: 0.1rem 1rem;
      i{
        color: #000;
      }
      span{
        color: #000;
        background-color: #fff;
      }
      &:hover{
        cursor: pointer;
        i, span{
          color: $primary;
        }
      }
    }
  }
}
@keyframes ad_width {
  from {
    width: 0;
  }
  to {
    width: 55px;
  }
}

.dropdown-toggle::after {
  border: none;
}

@media (max-width: 320px) {
  .fb-font {
    font-size: 12px;
    padding: 0;
  }
  .line-font {
    font-size: 12px;
    padding: 0;
  }
}

@include desktop-top() {
  .m-logo {
    display: none !important;
  }
  .d-logo {
    display: block !important;
  }
  .m-search {
    display: none !important;
  }
  // .d-search {
  //   display: block !important;
  // }
  // .menu {
  //   display: none !important;
  // }
}
@include pc-top() {
  .m-logo {
    display: none !important;
  }
  .d-logo {
    display: block !important;
  }
  .m-search {
    display: none !important;
  }
  // .d-search {
  //   display: block !important;
  // }
  // .menu {
  //   display: none !important;
  // }
}
@include pc() {
  .m-logo {
    display: none !important;
  }
  .d-logo {
    display: block !important;
  }
  .m-search {
    display: block !important;
    padding: 0px;
    i {
      font-size: 18px;
    }
  }
  // .d-search {
  //   display: none !important;
  // }
  // .menu {
  //   display: none !important;
  // }
}

@include pad() {
  // .navbar{
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   overflow: scroll;
  // }
  .m-logo {
    margin-top: 5px;
    display: block !important;
  }
  .d-logo {
    display: none !important;
  }
  .m-search {
    display: block !important;
  }
  // .d-search {
  //   display: none !important;
  // }
  .d-menu {
    display: none !important;
  }
  // .menu {
  //   display: block !important;
  // }
  .header {   
    position: fixed;
    width: 100%;
    background-color: #003D79;
    display: flex;
    align-items: center;
    //漢堡選單
    .menuButton {
      display: block;
    }
    .menu-box-m{
      position: absolute;
      top: 3rem;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,0.5);
    }
    .menu {
      // display: block;
      // max-height: 0;
      min-width: 100%;
      overflow: hidden;
      position: absolute;
      top: -0.7rem;
      right: 0;     
      background: rgba(0, 0, 0, 0.75);
      list-style-type: none;
      li {
        float: none;
        border-bottom: dashed #bbc4c7 1px;
        text-align: center;
        &:hover {
          background: #999;
          transition: all 0.7s;
        }
        a {
          padding: 10px;
          text-align: center;
          letter-spacing: 12px;
          font-size: 22px;
        }
        span {
          display: block;
          transition: all 0.5s;
        }
        a:hover {
          color: $primary;
          // position: relative;
        }
        a:after {
          display: none;
        }
        a:hover:after {
          display: none;
        }
      }
    }
    .icon-box{
      margin: 0;    
      width: 14rem;
    }
  }
  
  // 顯示下拉選單
  .show-menu .menu {
    max-height: 500px;
  }
  // 選單以外區域
  .close-menu {
    position: fixed;
    background: rgba(0, 0, 0, 0);
    width: 100%;
    min-height: 1024px;
    z-index: 99;
    display: block;
  }
}
.menuButton {
  display: none;
  float: right;
  a {
    // width: 50px;
    // height: 50px;
    padding: 22.5px 5px;
    display: block;

    //漢堡線條
    span {
      //中間線條
      width: 35px;
      height: 5px;
      background-color: #fff;
      display: block;
      -webkit-transition: all 0.6s ease;
      -moz-transition: all 0.6s ease;
      -ms-transition: all 0.6s ease;
      -o-transition: all 0.6s ease;
      transition: all 0.6s ease;

      &:before,
      &:after {
        //上下線條
        content: "";
        position: absolute;
        width: 35px;
        height: 5px;
        background-color: #fff;
        display: block;
        -webkit-transition: all 0.6s ease;
        -moz-transition: all 0.6s ease;
        -ms-transition: all 0.6s ease;
        -o-transition: all 0.6s ease;
        transition: all 0.6s ease;
      }

      &:before {
        margin-top: 10px;
      }

      &:after {
        margin-top: -10px;
      }
    }
  }

  //旋轉動畫
  .change span {
    background-color: rgba(0, 0, 0, 0);

    &:before {
      margin-top: 0;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    &:after {
      margin-top: 0;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
@include iphone5() {
  .icon-rwd-margin{
    margin-right: 0px;
  }
  .header{
    .logo-box{
      width: 15%;
    }
    .menu-box{
      width: 70%;
      ul{
        padding-left: 0;
      }
    }
    .menuButton{
      width: 15%;
    }
  }
}
</style>
