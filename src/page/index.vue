<style scoped lang="less">
@import '../assets/css/themeStyle.less';
@import '../assets/css/reset.less';
.el-container {
  background: #fff;
}

.el-container,
div,
span,
a {
  font-family: PingFangSC-Light!important;
}



.el-main {
  padding: 0;
  .banner {
    width: 100%;
    height: 705px;
    background: url('../assets/img/banner.png')no-repeat 50%;
    .banner-content {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .banner-op {
        position: absolute;
        top: 295px;
        .banner-font {
          font-size: 32px;
          font-family: PingFangSC-Light;
          color: #fff;
          line-height: 45px;
        }
        .banner-btn {
          margin-top: 70px;
          button {
            width: 300px;
            height: 60px;
            font-size: 22px;
          }
        }
      }
    }
  }
  .advantage {
    width: 1000px;
    margin: 0 auto;
    height: 700px;
    padding-bottom: 90px;
    .advantage-content {
      height: 525px;
    }
    .advantage-list {
      height: 525px;
      width: 100%;
      transition: linear 0.2s;
      -moz-transition: linear 0.2s;
      /* Firefox 4 */
      -webkit-transition: linear 0.2s;
      /* Safari and Chrome */
      -o-transition: linear 0.2s;
      /* Opera */
      &:hover {
        width: 102%;
        height: 550px;
        position: relative;
        box-shadow: 0 0 10px #ccc;
        z-index: 9;
        padding: 15px;
        background: #fff;
        margin-top: -15px;
        margin-left: -5%;
        -moz-transform: scale(1, 1);
        -webkit-transform: scale(1, 1);
        -o-transform: scale(1, 1);

        .advantage-list-msg {
          background: #fff;
        }
        .advantage-list-img {
          margin-top: -10px;
          -moz-transform: scale(1, 1);
          -webkit-transform: scale(1, 1);
          -o-transform: scale(1, 1);
          /* Opera */
          img {
            width: 100%;
            -moz-transform: scale(1, 1);
            -webkit-transform: scale(1, 1);
            -o-transform: scale(1, 1);
          }
        }
      }
      .advantage-list-msg {
        height: 255px;
        margin-bottom: 15px;
        background: #F7F8FA;
        text-align: center;
        padding: 0 22px;
        transition: background linear 0.3s;
        -moz-transition: background linear 0.3s;
        /* Firefox 4 */
        -webkit-transition: background linear 0.3s;
        /* Safari and Chrome */
        -o-transition: background linear 0.3s;
        img {
          margin: 26px 0 22px;
        }
        span {
          display: block;
          font-size: 24px;
          color: #555555;
          margin-bottom: 20px;
        }
        div {
          font-size: 16px;
          color: #50565C;
          line-height: 22px;
          width: 279px;
          margin: 0 auto;
          text-align: center;
        }
      }
      .advantage-list-img {
        transition: linear 0.2s;
        -moz-transition: linear 0.2s;
        /* Firefox 4 */
        -webkit-transition: linear 0.2s;
        /* Safari and Chrome */
        -o-transition: linear 0.2s;
        img {
          width: 100%;
          transition: linear 0.2s;
          -moz-transition: linear 0.2s;
          /* Firefox 4 */
          -webkit-transition: linear 0.2s;
          /* Safari and Chrome */
          -o-transition: linear 0.2s;
        }
      }
    }
  }
  .product {
    width: 100%;
    height: 670px;
    background: url('../assets/img/product.png')no-repeat 50%;
    display: inline-block;

    .product-content {
      width: 1120px; // height: 220px;
      margin: 0 auto;
      .is-animating {
        // width: 920px;
        // background: #fff;
      }
      /deep/ .el-carousel__container {
        height: 220px;
        .el-carousel__arrow {
          background: none;
          i {
            font-size: 24px;
            color: #c6c6c6;
          }
        }
        .el-carousel__arrow--left {
          left: 35px;
        }
        .el-carousel__arrow--right {
          right: 35px;
        }
      }
      .product-list-content {
        width: 920px;
        margin: 0 auto;
        height: 220px;
        position: relative;
        .product-list-bg {
          width: 100%;
          height: 220px;
          position: absolute;
          left: 0;
          top: 0;
          background: #fff;
          z-index: 2;
        }
      }
      .product-list {
        width: 820px;
        padding: 0 50px;
        color: #333;
        height: 220px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        >span {
          font-size: 24px;

          margin: 48px 0 10px 0;
          display: inline-block;
        }
        >div {
          width: 512px;
          line-height: 28px;
          font-size: 14px;
        }
      }
      .app-one {
        background: url('../assets/img/app1.png')no-repeat 680px 30px;
      }
      .app-two {
        background: url('../assets/img/app2.png')no-repeat 680px 30px;
      }
      .app-three {
        background: url('../assets/img/app3.png')no-repeat 680px 30px;
      }
      .app-code {
        ul {
          list-style-type: none;
          text-align: center;
          margin-top: 74px;
          li {
            width: 132px;
            height: 50px;
            border-radius: 25px;
            border: 1px solid #333;

            text-align: center;
            display: inline-block;
            margin: 0 5px;
            font-size: 14px;
            cursor: pointer;
            position: relative;
            >span {
              line-height: 50px;
            }
            &:hover {
              .code {
                display: block;
              }
            }
            .code {
              display: none;
              position: absolute;
              z-index: 9;
              left: -1px;
              bottom: -55px;
              width: 134px;
              height: 160px;
              background: #fff;
              >span {
                line-height: 22px;
                letter-spacing: 3px;
              }
            }
          }
        }
      }
    }
  }

  .list-title {
    font-size: 42px;
    color: #333;
    text-align: center;
    letter-spacing: 3px;
    margin-top: 90px;
    margin-bottom: 56px;
    position: relative;
    &:before {
      position: absolute;
      left: 50%;
      top: 60px;
      content: " ";
      margin-left: -40px;
      display: block;
      height: 3px;
      border-radius: 3px;
      width: 80px;
      background: #26C6DA;
    }
  }
}

.bpm-footer {
  width: 100%;
  height: 92px;
  background: #232F36;
  text-align: center;
  display: inline-block;

  >div {
    margin-top: 20px;
    font-size: 14px;
    color: #E8E8E8;
    line-height: 26px;
  }
}

</style>
<template>
  <div>
    <el-container>
      <common-header :type="'index'" :app-url="appUrl" :login-link="isLogin"></common-header>
      <el-main>
        <div class="banner">
          <div class="banner-content">
            <div class="banner-op">
              <div class="banner-font">清洁 / 高效 / 协同 / 智能</div>
              <div class="banner-btn">
                <el-button type="primary" v-on:click="isLogin">开始使用</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="advantage">
          <div class="list-title">
            我们的优势
          </div>
          <div class="advantage-content">
            <el-row :gutter="15">
              <el-col :span="8">
                <div class="advantage-list">
                  <div class="advantage-list-msg">
                    <img src="@/assets/img/cooperation.png">
                    <span>全业务场景协作</span>
                    <div>通过数据同步与多平台协作，支持需要跨部门、 跨角色、跨权限的各类业务协作场景。</div>
                  </div>
                  <div class="advantage-list-img">
                    <img src="@/assets/img/cooperationImg.png">
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="advantage-list">
                  <div class="advantage-list-msg">
                    <img src="@/assets/img/data.png">
                    <span>全流程数据分析</span>
                    <div>业务流程中各类指标、数据、操作记录完整沉 淀，通过大数据处理以BI形式提供商业决策支持。</div>
                  </div>
                  <div class="advantage-list-img">
                    <img src="@/assets/img/dataImg.png">
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="advantage-list">
                  <div class="advantage-list-msg">
                    <img src="@/assets/img/Process.png">
                    <span>全业务流程覆盖</span>
                    <div>针对LNG贸易业务实际场景，对贸易流程整个 生命周期进行建模，从而进行自动化处理、监 控管理和持续调优。</div>
                  </div>
                  <div class="advantage-list-img">
                    <img src="@/assets/img/ProcessImg.png">
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="product">
          <div class="list-title">
            我们的产品
          </div>
          <div class="product-content">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item>
                <div class="product-list-content">
                  <div class="product-list-bg"></div>
                  <div class="product-list app-one">
                    <span>业务端 APP</span>
                    <div>与91LNG-BPM业务管理系统无缝衔接，业务员可随时随地通过手机下单、跟进装卸车信息、 进行销售单结算，并可查看每日业务汇总数据，贸易业务全流程一手掌控。</div>
                  </div>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="product-list-content">
                  <div class="product-list-bg"></div>
                  <div class="product-list app-two">
                    <span>司机端 APP</span>
                    <div>与91LNG-TMS运输管理系统无缝衔接，装/卸车信息同步下发至司机、磅单/铅封 及时上传审核、合理规划装卸车路径，协助打造运输环节全透明，运输数据全纪录 的承运体系。</div>
                  </div>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="product-list-content">
                  <div class="product-list-bg"></div>
                  <div class="product-list app-two">
                    <span>客户端 APP</span>
                    <div>与91LNG-BPM业务管理系统衔接，终端买家可进行询价/下单、查看磅单/车辆位 置、管理站点等操作，线上化交易与结算，交易数据可供追溯及分析，让买家更省 心。</div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
            <div class="app-code">
              <ul>
                <li>
                  <span>业务端APP</span>
                  <div class="code">
                    <img width="100%" :src="businessCodeImg" alt="">
                    <span>扫码下载</span>
                  </div>
                </li>
                <li>
                  <span>司机端APP</span>
                  <div class="code">
                    <img width="100%" :src="driverCodeImg" alt="">
                    <span>扫码下载</span>
                  </div>
                </li>
                <li>
                  <span>客户端APP</span>
                  <div class="code">
                    <img width="100%" :src="consumerCodeImg" alt="">
                    <span>扫码下载</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div class="bpm-footer">
          <div>Copyright © {{newYear}} 成都浩海通达科技有限公司 - 蜀ICP备17041791号-1
            <br> QQ：963819358(联系客服) - 邮箱：fangyuan@hhtdlng.com(合作洽谈)</div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import commonHeader from '@/components/common/commonHeader'
export default {
  name: 'index',
  components: {
    commonHeader: commonHeader
  },
  data() {
    return {
      businessCodeImg: '', //业务端下载二维码
      driverCodeImg: '', //司机端下载二维码
      consumerCodeImg: '', //客户端下载二维码
      appUrl: {
        businessAppUrl: '', //业务端下载链接
        driverAppUrl: '', //司机端下载链接
        consumerAppUrl: '', //客户端下载链接
      },
      user: this.pbFunc.getLocalData('user', true),
      newYear: ''
    };
  },
  computed: {

  },
  methods: {
    isLogin() {
      if (this.user && this.user.profile) {
        //this.$router.push({ path: '/dashboard/purchaseDashboard' });
        this.$emit('login');
      } else {
        this.$router.push({ path: '/login' });
      }
    },
    getData() {
      let myDate = new Date();
      return myDate.getFullYear();
    }
  },
  created() {
    let currentUrl = document.location.href.toString();
    this.newYear = this.getData();
    if (currentUrl.match('pbpm.91lng.cn')) {
      this.businessCodeImg = 'http://www.pgyer.com/app/qrcode/newBusinessPrepare';
      this.driverCodeImg = 'http://www.pgyer.com/app/qrcode/newDriverPrepare';
      this.consumerCodeImg = 'https://www.pgyer.com/app/qrcode/newConsumerPrepare';
      this.appUrl.consumerAppUrl = 'https://www.pgyer.com/newConsumerPrepare';
      this.appUrl.businessAppUrl = 'https://www.pgyer.com/newBusinessPrepare';
      this.appUrl.driverAppUrl = 'https://www.pgyer.com/newDriverPrepare';
    } else if (currentUrl.match('bpm.hhtdlng.com')) {
      this.businessCodeImg = 'http://www.pgyer.com/app/qrcode/newBusinessTest';
      this.driverCodeImg = 'http://www.pgyer.com/app/qrcode/newDriverTest';
      this.consumerCodeImg = 'https://www.pgyer.com/app/qrcode/newConsumerTest';
      this.appUrl.consumerAppUrl = 'https://www.pgyer.com/newConsumerTest';
      this.appUrl.businessAppUrl = 'https://www.pgyer.com/newBusinessTest';
      this.appUrl.driverAppUrl = 'https://www.pgyer.com/newDriverTest';
    } else if (currentUrl.match('bpm.91lng.cn')) {
      this.businessCodeImg = 'http://www.pgyer.com/app/qrcode/newBusinessPro';
      this.driverCodeImg = 'http://www.pgyer.com/app/qrcode/newDriverPro';
      this.consumerCodeImg = 'https://www.pgyer.com/app/qrcode/newConsumerPro';
      this.appUrl.consumerAppUrl = 'https://www.pgyer.com/newConsumerPro';
      this.appUrl.businessAppUrl = 'https://www.pgyer.com/newBusinessPro';
      this.appUrl.driverAppUrl = 'https://www.pgyer.com/newDriverPro';
    } else {
      this.businessCodeImg = 'http://www.pgyer.com/app/qrcode/newBusinessDev';
      this.driverCodeImg = 'http://www.pgyer.com/app/qrcode/newDriverDev';
      this.consumerCodeImg = 'https://www.pgyer.com/app/qrcode/newConsumerDev';
      this.appUrl.consumerAppUrl = 'https://www.pgyer.com/newConsumerDev';
      this.appUrl.businessAppUrl = 'https://www.pgyer.com/newBusinessDev';
      this.appUrl.driverAppUrl = 'https://www.pgyer.com/newDriverDev';
    }
  }
};

</script>
