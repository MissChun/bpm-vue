<!-- registerSuccess.vue -->
<style scoped lang="less">


</style>
<template>
  <div>
    <public-header></public-header>
    <div class="user-page">
      <div>
        <div class="user-page-title">审核中</div>
        <div class="user-register-notice">您的注册信息已提交，请耐心等待系统审核，谢谢！
          <br> 审核后会给您的注册手机号发短信通知
          <br> 审核通过后您可通过用户名/手机号登录系统
          <br> 如有疑问，请联系客服QQ：
          <span class="text-blue">1373724944</span>
        </div>
        <div class="user-page-img text-center"><img src="../assets/img/user_4.png"></div>
      </div>
    </div>
  </div>
</template>
<script>
import publicHeader from '../components/publicHeader';
export default {
  components: {
    publicHeader: publicHeader
  },
  data() {

    return {};
  },
  computed: {

  },
  methods: {

  },

  created() {

  }
};

</script>
