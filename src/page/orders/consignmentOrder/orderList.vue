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
              <orderStatusComonents :status="activeName"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="匹配卸车" name="second">
          <div v-if="activeName=='second'">
            <keep-alive>
              <orderStatusComonents :status="activeName"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="卸车" name="third">
        </el-tab-pane>
        <el-tab-pane label="结算" name="fourth">
        </el-tab-pane>
        <el-tab-pane label="变更中" name="fifth">
        </el-tab-pane>
        <el-tab-pane label="历史" name="sxith">
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
        currentPage: 100,
        totalPage: 2,
        pageSize: 10,
      },
      selectData: {
        vehicle_type_Select: this.$store.state.common.selectData.truck_attributes,
        brand_Select: this.$store.state.common.selectData.semitrailer_vehicle_type,
        fieldSelect: [
          { id: 'trader_name', value: '托运商' },
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
    goAddNewOder: function() {
      this.$router.push({ path: "/orders/pickupOrders/addNewPickUpOrder" });
    },

  },

};

</script>
