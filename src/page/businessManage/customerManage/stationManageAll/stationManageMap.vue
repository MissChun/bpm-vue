<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="客户管理" name="customerManage">
        </el-tab-pane>
        <el-tab-pane label="客户站点" name="stationManage">
          <div class="tab-screen">
            <div class="nav-tab-setting">
              <el-tabs v-model="childActiveName" type="card" @tab-click="clickChildtabs">
                <el-tab-pane label="列表" name="statationList">
                </el-tab-pane>
                <el-tab-pane label="地图" name="statationMap">
                  <station-list-map></station-list-map>
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
import stationListMap from '@/components/businessManage/stationListMap';
export default {
  name: 'stationManageMap',
  components: {
    stationListMap: stationListMap,
  },
  data() {

    return {
      activeName: 'stationManage',
      childActiveName: 'statationMap',
    };
  },
  computed: {

  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'customerManage') {
        this.$router.push({ path: "/businessManage/customerManage/customerManageAll/customerManageList" });
      }
    },
    clickChildtabs: function(targetName) {
      if (targetName.name == 'statationList') {
        this.$router.push({ path: "/businessManage/customerManage/stationManageAll/stationManageList" });
      }
    },
  },
  created() {

  }
};

</script>
<style scoped lang="less">


</style>
