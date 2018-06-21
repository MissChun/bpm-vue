<style type="text/css"  scoped lang="less">
  .detail-main{
    border-top: 0;
  }
</style>
<template>

    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="业务单详情" name="first">
          <trade-detail :back-link="'/statistics/consignment/consignmentList'"></trade-detail>

        </el-tab-pane>

      </el-tabs>
    </div>

</template>
<script>
import tradeDetail from '@/components/businessManage/tradeDetail';
export default {
  name: 'consignmentBusinessDetail',
  components: {
    tradeDetail: tradeDetail
  },
  computed: {

  },
  data() {
    return {
      activeName: 'first',
    }
  },
  methods: {
    clicktabs: function(targetName) {

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
