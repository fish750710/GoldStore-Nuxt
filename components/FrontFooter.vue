<template>
  <div>
    <footer class="bg-color">
      <div class="footer">
        <div class="info-box">
          <div class="">
            <ul class="footer-list">
              <li class="">
                <a href="#">付款方式</a>
              </li>
              <li class="">
                <a href="#">運送方式</a>
              </li>
              <li class="">
                <a href="#">退貨退款</a>
              </li>
              <li class="">
                <a href="#">聯絡客服</a>
              </li>
            </ul>
          </div>
          <div class="">
            <ul class="footer-list">
              <li class="">
                <a href="#">關於拜金</a>
              </li>
              <li class="">
                <a href="#">加入我們</a>
              </li>
              <li class="">
                <a href="#">拜金條款</a>
              </li>
              <li class="">
                <a href="#">隱私權政策</a>
              </li>
            </ul>
          </div>
          <div class="">
            <ul class="footer-icon">
              <li class="github">
                <a href="#" title="github">
                  <i class="fab fa-github-square"></i>
                </a>
              </li>
              <li class="twitter">
                <a href="#" title="twitter">
                  <i class="fab fa-twitter-square"></i>
                </a>
              </li>
              <li class="google">
                <a href="#" title="google">
                  <i class="fab fa-google-plus-square"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="text-white info-box" style="line-height: 30px">
          <span class>© Copyright 2019</span>
          <br />
          <span class
            >圖片與素材取自網路，僅供練習作品使用，非商業與營利用途</span
          >
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>

.bg-color {
  background-color: $bg-color;
}
.footer {
  max-width: 100%;
  .text-white {
    color: $white;
  }
  .info-box{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
}
.footer-list {
  list-style: none;
  a {
    text-decoration: none;
    color: #fff;
  }
}
.footer-icon {
  font-size: 36px;
  padding: 0px;
  list-style: none;
  li {
    float: right;
    padding: 0px 10px;
  }
  .github i {
    color: #fff;
  }
  .twitter i {
    color: #41abe1;
  }
  .google i {
    color: #db4437;
  }
}

@include m568() {
  .footer-icon {
    display: none;
  }
}
</style>
