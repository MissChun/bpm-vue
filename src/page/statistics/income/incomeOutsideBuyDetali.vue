<style type="text/css"  scoped lang="less">

</style>
<template>

    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="外采单详情" name="first">
          <outside-buy-detali :back-link="'/statistics/income/incomeList'"></outside-buy-detali>
        </el-tab-pane>

      </el-tabs>
    </div>

</template>
<script>
import outsideBuyDetali from '@/components/purchaseCenter/outsideBuyDetali';
export default {
  name: 'incomeOutsideBuyDetali',
  components: {
    outsideBuyDetali: outsideBuyDetali
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
