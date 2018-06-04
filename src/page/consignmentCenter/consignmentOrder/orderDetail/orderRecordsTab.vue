<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="订单详情" name="first">
        </el-tab-pane>
        <el-tab-pane label="车辆指派" name="second">
        </el-tab-pane>
        <el-tab-pane label="订单记录" name="third">
          订单记录
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'orderRecordsTab',
  computed: {
    id: function() {
      console.log('params', this.$route.params)
    }
  },
  data() {
    return {
      activeName: 'third',
      pageLoading: true,
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: "/consignmentCenter/consignmentOrders/orderDetail/orderDetailTab" });
      }
      if (targetName.name == 'second') {
        this.$router.push({ path: "/consignmentCenter/consignmentOrders/orderDetail/arrangeCarTab" });
      }
    },
  },
  activated: function() {
    this.activeName = 'third';
  },
  created: function() {

  }
}

</script>
