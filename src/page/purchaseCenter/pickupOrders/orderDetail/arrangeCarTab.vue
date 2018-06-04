<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="订单详情" name="first">
        </el-tab-pane>
        <el-tab-pane label="车辆指派" name="second">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="订单记录" name="third">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'arrangeCarTab',
  computed: {
    id: function() {
      return this.$route.params.id;
    },
    operationStatus: function() {
      return this.$route.params.type;
    }
  },
  data() {
    return {
      activeName: 'second',
    }
  },
  methods: {
    clicktabs: function(targetName) {
      console.log('this', this.id);
      if (targetName.name == 'first') {
        this.$router.push({ path: `/purchaseCenter/pickupOrders/orderDetail/orderDetailTab/${this.id}/${this.operationStatus}` });
      }
      if (targetName.name == 'third') {
        this.$router.push({ path: `/purchaseCenter/pickupOrders/orderDetail/orderRecordsTab/${this.id}/${this.operationStatus}` });
      }
    },
  },
  activated: function() {
    this.activeName = 'second';
  },
}

</script>
