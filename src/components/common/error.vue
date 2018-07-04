<style type="text/css" scoped lang="less">
@import '../../assets/css/error.less';

</style>
<template>
  <div class="error">
    <public-header :is-find="true"></public-header>
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
import publicHeader from '../publicHeader'

export default {
  components: {
    publicHeader: publicHeader,
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
