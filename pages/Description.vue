<template>
  <div>
    <div class="body-rwd banner-rwd">
      <div class="banner-img-big"></div>
      <div class="container">
        <div class="evaluation">
          <div class="content-img-first">
            <div class="title">
              <h3>隨心所欲，怎麼擺都好看。</h3>
              <p>設計大師，時尚潮流。</p>
              <button
                class="animate__animated animate__bounceIn animate__infinite"
                @click="goIndex"
              >購買</button>
            </div>
          </div>
        </div>
        <div class="bg-fixed-img-first">
          <div class="bg-fixed-img-content">
            <h3>款式最多的watch</h3>
            <button class="" @click="goIndex">立馬拜金去</button>
          </div>
        </div>
        <div class="content-img-center">
          <div class="title">
            <h3>1,000 萬首歌，免額外付費試聽 1 個月。</h3>
            <p>高音質音樂，一聽就上癮。</p>
            <button class="" @click="goIndex">
              現在試聽
            </button>
          </div>
        </div>
        <!-- swiper -->
        <!-- <div v-swiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              Render original HTML in server, render Swiper in browser (client)
            </div>
          </div>
        </div> -->
        <client-only>          
          <swiper :options="swiperOption" class="img-rwd">            
            <div class="swiper-slide swiper-list">
              <img class="img-swiper" src="@/assets/images/monitor-u3419w-pdp-responsive-03.jpg" alt />
              <div class="swiper-title">
                <h5>超大視角，看電影、工作，一次OK</h5>
                <button class="btn btn-primary" @click="goIndex">了解更多</button>
              </div>
            </div>
            <div class="swiper-slide swiper-list">
              <img
                class="img-swiper"
                src="@/assets/images/pdp-polaris-alienware-34-monitor-aw3418dw-module-05.jpg"
                alt
              />
              <div class="swiper-title">
                <h5>玩GAME必敗品，無延遲，色彩飽和</h5>
                <button class="btn btn-primary" @click="goIndex">了解更多</button>
              </div>
            </div>
            <div class="swiper-slide swiper-list">
              <img
                class="img-swiper"
                src="@/assets/images/apple_watch_series_3_tile__ckw8ykb6jhw2_large.jpg"
                alt
              />
              <div class="swiper-title">
                <h5>來電顯示，自動偵測</h5>
                <button class="btn btn-primary" @click="goIndex">了解更多</button>
              </div>
            </div>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>           
          </swiper>
        </client-only>
        
        <div class="bg-fixed-img-end">
          <div class="bg-fixed-img-content">
            <h3>最專業的3C網站</h3>
            <button class="" @click="goIndex">立馬拜金去</button>
          </div>
        </div>
        <div class="evaluation">
          <div class="content-img-end">
            <div class="title">
              <h3>薄如紙，輕如羽毛，旗艦規格。</h3>
              <p>激發你的創意，無限手套在手，想怎畫就怎畫。</p>
              <button
                class="animate__animated animate__bounceIn animate__infinite"
                @click="goIndex"
              >購買</button>              
            </div>
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
          delay: 4000,
          disableOnInteraction: false
        }
      }
    }
  },
  methods: {
    goIndex () {
      // 購物去按鈕
      this.$router.push('/').catch(err => (err))
      // this.$bus.$emit('refresh')
    }
  },
  created () {
     // 僅在client 執行
      if(process.client){
      const evaluation = [...document.querySelectorAll('.evaluation')]
      const winHeight = window.innerHeight  
      const handleScroll = () => {
      // console.log('evaluation', evaluation.offsetTop)
        evaluation.forEach((el)=>{
          // console.log('scrollY....', window.scrollY + winHeight/1.3)
          if(window.scrollY + winHeight/1.3 >= el.offsetTop){ 
            // css位移漸出
            el.classList.add('evaluation-fadeIn')
          }        
        })
      }
      window.addEventListener("scroll", handleScroll);
    }
  }
}
</script>

<style lang="scss" scoped>

.container{
  width: 80%;
  margin: 100px auto;
}
.img-rwd {
  img {
    max-width: 100%;
  }
}
button{
  margin-top: 10px;
  background-color: $primary;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  &:hover{
    cursor: pointer;
    background-color: $primaryLight;
  }
}
.content-img-center {
  background-image: url(@/assets/images/music__g13pd5xxmzmi_large.png);
  background-repeat: no-repeat;
  background-color: white;
  background-position: center;
  background-size: 100%;
  height: 420px;
  .title {
    position: relative;
    top: 100px;
    left: -200px;
    margin: 0 auto;
    max-width: 460px;
    height: 152px;
    text-align: center;
    color: #fff;
    h3 {
      padding-top: 30px;
    }
    p {
      padding-top: 30px;
      line-height: 1.5;
    }
  }
}
.evaluation {
  //位移漸出
  opacity: 0;
  transition: all 1.5s;
  transform: translateX(100px);
}
.evaluation-fadeIn {
  //位移漸出
  opacity: 1;
  transform: translateX(0);
}
.content-img-first {
  background-image: url(@/assets/images/accessories_for_mac_tile__1y124l6fa1ei_large.jpg);
  background-repeat: no-repeat;
  background-color: #fff;
  background-position: left;
  background-size: 100%;
  height: 420px;
  right: 0px;
  overflow: hidden;
  .title {
    margin: 0 auto;
    width: 260px;
    height: 152px;
    text-align: center;
    color: $dark;
    h3 {
      padding-top: 30px;
      font-weight: bold;
    }
    p {
      padding-top: 30px;
      line-height: 1.5;
    }
  }
}
.banner-img-big {
  background: url(@/assets/images/u12-plus-customised_web-banner.jpg) no-repeat 0 0/100%;
  height: 720px;
  max-height: 720px;
  width: 100%;
  // padding-top: 100px;
}
.content-img-end {
  background: url(@/assets/images/ipad_pro_hero__phf9t8u0esii_large.jpg) no-repeat left 100%;
  height: 520px;
  overflow: hidden;
  .title {
    position: relative;
    top: 100px;
    left: 350px;
    margin: 0 auto;
    width: 260px;
    height: 152px;
    text-align: center;
    // color: $primary;
    h3 {
      padding-top: 30px;
      font-weight: bold;
    }
    p {
      padding-top: 30px;
      line-height: 1.5;
    }
  }
}

.bg-fixed-img-first {
  background-image: url(@/assets/images/hero__e85lhpfa8n2i_large.jpg);
  // background-size: cover;
  overflow: hidden;
  z-index: -1;
  height: 250px;
  // 固定背景
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin-top: 50px;
  margin-bottom: 50px;
  // background-position: center;
}

.bg-fixed-img-end {
  background: url(@/assets/images/galaxy-note10_highlights_acc_b.jpg) no-repeat 0 0/100%;
  // background-size: cover;
  overflow: hidden;
  z-index: -1;
  height: 250px;
  // 固定背景
  // background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 50px auto;
  // background-position: center;
}
.bg-fixed-img-content {
  position: relative;
  top: 50px;
  margin: 0 auto;
  width: 400px;
  height: 152px;
  background: rgba(255, 255, 255, 0.3);
  text-align: center;
  padding-top: 40px;
  h3 {
    font-weight: bold;
  }
}

.swiper-list {
  position: relative;
  .swiper-title {
    width: 180px;
    position: absolute;
    top: 150px;
    right: 0px;
  }
}

@include desktop-top() {
}
@include pc-top() {
  .content-img-center {
    min-height: 420px;
    .title {
      position: relative;
      top: 100px;
      left: -200px;
      margin: 0 auto;
      width: 460px;
      height: 152px;
      text-align: center;
      color: #fff;
    }
  }
}
@include pc() {
  .content-img-end {
    background-image: url(@/assets/images/ipad_pro_hero__phf9t8u0esii_large.jpg);
    background-repeat: no-repeat;
    background-color: #fff;
    background-position: left;
    background-size: 100%;
    height: 520px;
    .title {
      position: relative;
      top: 100px;
      left: 200px;
      margin: 0 auto;
      width: 260px;
      height: 152px;
      text-align: center;
      color: $primary;
      h3 {
        padding-top: 30px;
        font-weight: bold;
      }
      p {
        padding-top: 30px;
        line-height: 1.5;
      }
    }
  }
  .content-img-center {
    .title {
      position: relative;
      top: 100px;
      left: -100px;
    }
  }
}
@include pad() {
  .content-img-center {
    height: 300px;
    min-height: 300px;
    .title {
      position: relative;
      top: 28px;
      left: -60px;
      margin: 0 auto;
      width: 460px;
      height: 152px;
      text-align: center;
      color: #fff;
      h3 {
        font-size: 20px;
        padding-top: 30px;
      }
      p {
        padding-top: 15px;
        line-height: 1.5;
      }
    }
  }
  .banner-img-big {
    max-height: 360px;
    margin-top: 58px;
  }
  .bg-fixed-img-first {
    background-size: 800px;
  }
  .bg-fixed-img-end {
    background-size: 800px;
  }
}
@include m568() {
  .content-img-center {
    height: 300px;
    min-height: 300px;
    width: 400px;
    .title {
      position: relative;
      top: 40px;
      left: 10px;
      margin: 0 auto;
      width: 400px;
      height: 152px;
      text-align: left;
      color: #fff;
      h3 {
        font-size: 20px;
        padding-top: 30px;
      }
      p {
        padding-top: 15px;
        line-height: 1.5;
      }
    }
  }
  .content-img-end {
    overflow: hidden;
    .title {
      position: relative;
      top: 100px;
      left: 100px;
      text-align: center;
      h3 {
        font-size: 20px;
        padding-top: 30px;
      }
      p {
        padding-top: 30px;
      }
    }
  }
  .content-img-first {
    overflow: hidden;
  }
  .bg-fixed-img-first {
    background-size: 600px 250px;
  }
  .bg-fixed-img-end {
    background-size: 600px 250px;
  }
}
@include m480() {
  .content-img-center {
    height: 300px;
    min-height: 300px;
    width: 350px;
    .title {
      position: relative;
      top: 50px;
      left: 10px;
      margin: 0 auto;
      width: 350px;
      height: 152px;
      text-align: left;
      color: #000;
      h3 {
        font-size: 18px;
        padding-top: 40px;
      }
      p {
        padding-top: 10px;
        line-height: 1.5;
      }
    }
  }
  .content-img-end {
    .title {
      position: relative;
      top: 100px;
      left: 0px;
      text-align: right;
      h3 {
        font-size: 18px;
        padding-top: 30px;
      }
      p {
        padding-top: 5px;
      }
    }
  }
  .banner-img-big {
    max-height: 200px;
    margin-top: 58px;
  }
}
@include iphone5() {
  .content-img-center {
    width: 300px;
    .title {
      position: relative;
      top: 60px;
      left: 10px;
      margin: 0 auto;
      width: 300px;
      height: 152px;
      text-align: left;
      color: #000;
      h3 {
        font-size: 16px;
        padding-top: 40px;
      }
      p {
        padding-top: 0px;
        line-height: 1.5;
      }
    }
  }
  .content-img-end {
    .title {
      position: relative;
      top: 100px;
      left: 0px;
      text-align: right;
      h3 {
        font-size: 18px;
        padding-top: 30px;
      }
      p {
        padding-top: 18px;
      }
    }
  }
}
</style>
