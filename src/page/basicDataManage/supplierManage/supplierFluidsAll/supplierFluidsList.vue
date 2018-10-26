<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="供应商管理" name="supplierManage">
        </el-tab-pane>
        <el-tab-pane label="供应商液厂" name="supplierFluids">
          <div class="tab-screen">
            <div class="nav-tab">
              <el-tabs v-model="childActiveName" type="card" @tab-click="clickChildtabs">
                <el-tab-pane label="列表" name="fluidsList">
                  <fluids-list></fluids-list>
                </el-tab-pane>
                <el-tab-pane label="地图" name="fluidsMap">
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import fluidsList from '@/components/purchaseCenter/fluidsList';
export default {
  name: 'supplierFluidsList',
  components: {
    fluidsList: fluidsList
  },
  data() {
    return {
      pageLoading: false,
      activeName: "supplierFluids",
      childActiveName: 'fluidsList',

    };
  },
  computed: {

  },
  methods: {
    clickChildtabs(targetName) {
      if (targetName.name == 'fluidsMap') {
        this.$router.push({ path: "/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsMap" });
      }
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'supplierManage') {
        this.$router.push({ path: "/basicDataManage/supplierManage/supplierManageAll/supplierManageList" });
      }
    },
  },
  created() {

  },
  activated: function() {
    this.activeName = 'supplierFluids';
  },
};

</script>
