<!-- waybillDetail.vue -->
<style type="text/css"  scoped lang="less">
  .detail-main{
    border-top: 0;
  }
</style>
<template>

    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="运单详情" name="first">
          <!-- <waybill-detail></waybill-detail> -->
          <waybill-detail :back-link="'/statistics/consignment/consignmentList'" :is-check="true"></waybill-detail>
        </el-tab-pane>

      </el-tabs>
    </div>

</template>
<script>
import waybillDetail from '@/components/consignmentCenter/waybillDetail';
export default {
  name: 'consignmentWaybillDetail',
  components: {
    waybillDetail: waybillDetail
  },
  computed: {
    // setpId: function() {
    //   return this.$route.params.setpId;
    // },
    // willId: function() {
    //   return this.$route.params.willId;
    // },
  },
  data() {
    return {
      activeName: 'first',
    }
  },
  methods: {
    clicktabs: function(targetName) {
      // if (targetName.name == 'second') {
      //   this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderProcess/${this.setpId}/${this.willId}` });
      // }
      // if (targetName.name == 'third') {
      //   this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/consignmentRouteplay/${this.setpId}/${this.willId}` });
      // }
    },

  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {

  }
}

</script>
<style scoped lang="less">
.detail-main {
  min-height: 500px;
}
