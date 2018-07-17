<style type="text/css" scoped lang="less">
@import '../../assets/css/error.less';

</style>
<template>
  <div class="error">
    <common-header :type="'error'"></common-header>
    <div class="error-content">
      <div class="error-left">
        <div class="font">{{errorObj.title}}</div>
        <div class="prompt">{{errorObj.desc}}</div>
        <div>
          <el-button @click.native="$router.go(-1)" type="primary">返回上一步</el-button>
          <el-button @click.native="$router.push({ path: '/' })" type="success">返回首页</el-button>
        </div>
      </div>
      <div class="error-right">
        <img src="../../assets/img/error.png" alt="">
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import commonHeader from '@/components/common/commonHeader'
export default {
  components: {
    commonHeader: commonHeader,
  },
  props: ['errorObj'],
  data: function() {

    return {

    }
  },
  computed: {

  },
  methods: {

  }
}

</script>
