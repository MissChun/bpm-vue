<style scoped lang="less">
// .listOrder {
//   margin-top: 35px;
// }

// .nav-tab {
//   background: white;
// }

</style>
<template>
  <div>
    <div class="nav-tab-setting">
      <el-tabs v-model="activeName" @tab-click="clicktabs" v-if="show">
        <el-tab-pane :label="statusName.all_driver_count" name="first">
          <div v-if="activeName=='first'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @childchangeTabs="childchangeTabs" @changeTabs="changeTabs" :countParam="allcounts['all_driver_count']"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.all_match_count" name="second">
          <div v-if="activeName=='second'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @childchangeTabs="childchangeTabs" @changeTabs="changeTabs" :countParam="allcounts['all_match_count']"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.all_unload_count" name="third">
          <div v-if="activeName=='third'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @childchangeTabs="childchangeTabs" @changeTabs="changeTabs" :countParam="allcounts['all_unload_count']"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.all_settlement_count" name="fourth">
          <div v-if="activeName=='fourth'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @childchangeTabs="childchangeTabs " @changeTabs="changeTabs" :countParam="allcounts['all_settlement_count']"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.all_change_count" name="fifth">
          <div v-if="activeName=='fifth'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @childchangeTabs="childchangeTabs" @changeTabs="changeTabs" :countParam="allcounts['all_change_count']"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.all_finish_count" name="sxith">
          <div v-if="activeName=='sxith'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @childchangeTabs="childchangeTabs" :@changeTabs="changeTabs" countParam="allcounts['all_finish_count']"></orderStatusComonents>
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
      show:false,
       statusName:{
        all_driver_count:'装车',
        all_match_count:'匹配卸车',
        all_unload_count:'卸车',
        all_settlement_count:'结算',
        all_change_count:'变更中',
        all_finish_count:'历史'
      },
       allStatusName:{
        all_driver_count:'装车',
        all_match_count:'匹配卸车',
        all_unload_count:'卸车',
        all_settlement_count:'结算',
        all_change_count:'变更中',
        all_finish_count:'历史'
      },
      allcounts:{
        'all_driver_count':{},
        'all_match_count':{},
        'all_unload_count':{},
        'all_settlement_count':{},
        'all_change_count':{},
        'all_finish_count':{},
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
  created() {
    this.pageLoading=true;
    this.reshCount();
    // this.$$http("getConCount",{}).then(results=>{
    //     var vm=this;
    //     vm.show=true;
    //     this.pageLoading=false;
    //     if(results.data.code==0){
    //       var dataBody=results.data.data;
    //       vm.allcounts=dataBody;
    //       for(var i in dataBody){
    //         var nums=0;
    //         nums=dataBody[i][i];
    //         if(nums>99){
    //           nums="99+";
    //         }
    //         vm.statusName[i]+="("+nums+")";
    //       }
    //     }
    //   }).catch(()=>{

    //   });
  },
  methods: {
    reshCount:function(){
       var renderStatus=this.pbFunc.deepcopy(this.allStatusName);
      this.$$http("getConCount",{}).then(results=>{
        var vm=this;
        vm.show=true;
        this.pageLoading=false;
        if(results.data.code==0){
          var dataBody=results.data.data;
          vm.allcounts=dataBody;
          for(var i in dataBody){
            var nums=0;
            nums=dataBody[i][i];
            if(nums>99){
              nums="99+";
            }
            renderStatus[i]+="("+nums+")";
          }
        }
        this.statusName=renderStatus;
      }).catch(()=>{

      });
    },
    clicktabs: function(targetName) {

    },
    changeTabs: function(fifterName) {
      this.activeName = fifterName;
      this.reshCount();
    },
    childchangeTabs:function(tabsObj){
      this.activeName = tabsObj.first;
      this.reshCount();
    },
    goAddNewOder: function() {
      this.$router.push({ path: "/orders/pickupOrders/addNewPickUpOrder" });
    },

  },

};

</script>
