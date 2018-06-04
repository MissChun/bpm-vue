<style scoped lang="less">
.listOrder {
  margin-top: 35px;
}

.nav-tab {
  background: white;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="装车" name="first">
          <div v-if="activeName=='first'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="匹配卸车" name="second">
          <div v-if="activeName=='second'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="卸车" name="third">
          <div v-if="activeName=='third'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="结算" name="fourth">
          <div v-if="activeName=='fourth'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="变更中" name="fifth">
          <div v-if="activeName=='fifth'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史" name="sxith">
          <div v-if="activeName=='sxith'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ordersList',
  components: {
    orderStatusComonents: () =>
      import ("../../../components/order/orderStatusComonents.vue")
  },
  data() {
    return {
      pageStatus: false,
      pageLoading: false,
      fifterParam: {
        keyword: "",
        field: "",
      },

      timeParam: [],
      listFifterData: [],
      rules: {},
      activeName: 'first',
      fifterName: 'all',
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      selectData: {
        vehicle_type_Select: this.$store.state.common.selectData.truck_attributes,
        brand_Select: this.$store.state.common.selectData.semitrailer_vehicle_type,
        fieldSelect: [
          { id: 'trader_name', value: '托运方' },
          { id: 'order_number', value: '订单号' },
          { id: 'fluid_name', value: '液厂名' },
          { id: 'waybill_number', value: '运单号' },
        ]
      },
    };
  },
  computed: {

  },
  methods: {
    clicktabs: function(targetName) {

    },
    changeTabs: function(fifterName) {
      this.activeName = fifterName;
    },
    goAddNewOder: function() {
      this.$router.push({ path: "/orders/pickupOrders/addNewPickUpOrder" });
    },

  },

};

</script>
