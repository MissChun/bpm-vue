<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="客户管理" name="customerManage">
        </el-tab-pane>
        <el-tab-pane label="客户站点" name="stationManage">
          <div class="tab-screen">
            <div class="nav-tab-setting">
              <el-tabs v-model="childActiveName" type="card" @tab-click="clicktabs">
                <el-tab-pane label="列表" name="statationList">
                  列表
                </el-tab-pane>
                <el-tab-pane label="地图" name="statationMap">
                  地图
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
export default {
  name: 'stationManageList',
  data() {

    return {
      activeName: 'stationManage',
      childActiveName: 'statationList',
    };
  },
  computed: {

  },
  methods: {
    clicktabs: function() {

    }
  },
  created() {

  }
};

</script>
<style scoped lang="less">


</style>
