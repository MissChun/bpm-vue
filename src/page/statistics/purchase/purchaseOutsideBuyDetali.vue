<style type="text/css"  scoped lang="less">

</style>
<template>

    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="运单详情" name="first">
          <waybill-detail :back-link="'/statistics/purchase/purchaseList'" :is-check="true"></waybill-detail>

        </el-tab-pane>

      </el-tabs>
    </div>

</template>
<script>
import waybillDetail from '@/components/consignmentCenter/waybillDetail';
export default {
  name: 'purchaseOutsideBuyDetali',
  components: {
    waybillDetail: waybillDetail
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
