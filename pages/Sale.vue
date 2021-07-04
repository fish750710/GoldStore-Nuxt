<template>
  <div>
    <div class="container-fluid">
      <div class="context-box">
        <div class="box">
          <img src="@/assets/images/banner_1000x350_1111.jpg" alt />
          <h2 class="sale-title">慶祝雙11優惠</h2>
          <br />
          <h3 class="context">
            輸入優惠碼         
            <p class="badge animate__animated animate__bounce animate__infinite">1111</p>
            即刻享有限時
            <span class="badge">88</span>
            折優惠
            <button
              class="badge goshop animate__animated animate__flipInY animate__infinite animate__repeat-3 "
              @click="goIndex"  
            >
              <i class="fas fa-running">
                <span class="">拜金去</span>
              </i>
            </button>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    goIndex () {
      // 購物去按鈕
      this.$router.push('/').catch(err => (err))
      this.$bus.$emit('refresh')
    }
  }
}
</script>

<style lang="scss" scoped>

.container-fluid {
  min-height: 600px;
  .context-box{
    // padding-top: 50px;
    .box{
      margin-top: 50px;
      text-align: center;
      .sale-title{
        margin-top: 20px;
      }
      .context{
        padding-bottom: 50px;
        p{
          width: 70px;
          display: inline-block;
        }
        margin-top: 30px;
        .badge{
          background-color: $primary;
          border: 1px solid $primary;
          border-radius: 5px;
          padding: 5px 10px;
        }
      }
    }
  }
}
.goshop{
  font-weight: 500;
  &:hover{
    cursor: pointer;
  }
}
.sale-rwd {
  img {
    max-width: 100%;
  }
}
</style>
