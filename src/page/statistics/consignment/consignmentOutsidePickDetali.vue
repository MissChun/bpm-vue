<style type="text/css"  scoped lang="less">

</style>
<template>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="外销单详情" name="first">
          <outside-pick-detali :back-link="'/statistics/consignment/consignmentList'"></outside-pick-detali>
        </el-tab-pane>

      </el-tabs>
    </div>

</template>
<script>
import outsidePickDetali from '@/components/purchaseCenter/outsidePickDetali';
export default {
  name: 'consignmentOutsidePickDetali',
  components: {
    outsidePickDetali: outsidePickDetali
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
