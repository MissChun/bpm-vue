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
              <orderStatusComonents :status="activeName" @childchangeTabs="childchangeTabs" @changeTabs="changeTabs" :countParam="allcounts['all_driver_count']" :secondActiveName="secondActiveName"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.all_match_count" name="second">
          <div v-if="activeName=='second'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @childchangeTabs="childchangeTabs" @changeTabs="changeTabs" :countParam="allcounts['all_match_count']" :secondActiveName="secondActiveName"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.all_unload_count" name="third">
          <div v-if="activeName=='third'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @childchangeTabs="childchangeTabs" @changeTabs="changeTabs" :countParam="allcounts['all_unload_count']" :secondActiveName="secondActiveName"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.all_settlement_count" name="fourth">
          <div v-if="activeName=='fourth'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @childchangeTabs="childchangeTabs " @changeTabs="changeTabs" :countParam="allcounts['all_settlement_count']" :secondActiveName="secondActiveName"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.all_change_count" name="fifth">
          <div v-if="activeName=='fifth'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @childchangeTabs="childchangeTabs" @changeTabs="changeTabs" :countParam="allcounts['all_change_count']" :secondActiveName="secondActiveName"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.all_finish_count" name="sxith">
          <div v-if="activeName=='sxith'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @childchangeTabs="childchangeTabs" @changeTabs="changeTabs" :countParam="allcounts['all_finish_count']" :secondActiveName="secondActiveName"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.all_count" name="seven">
          <div v-if="activeName=='seven'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs" @childchangeTabs="childchangeTabs" :countParam="allcounts['all_count']" @reshCount="reshCount" :secondActiveName="secondActiveName"></orderStatusComonents>
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
        all_finish_count:'历史',
        all_count:'全部'
      },
       allStatusName:{
        all_driver_count:'装车',
        all_match_count:'匹配卸车',
        all_unload_count:'卸车',
        all_settlement_count:'结算',
        all_change_count:'变更中',
        all_finish_count:'历史',
        all_count:'全部'
      },
      allcounts:{
        'all_driver_count':{},
        'all_match_count':{},
        'all_unload_count':{},
        'all_settlement_count':{},
        'all_change_count':{},
        'all_finish_count':{},
        'all_count':{}
      },
      defaultSecond:{
        first:'all',
        second:'waiting_match',
        third:'all',
        fourth:'all',
        fifth:'all',
        sxith:'all',
        seven:'all'
      },
      timeParam: [],
      listFifterData: [],
      rules: {},
      activeName: '',
      fifterName: 'all',
      secondActiveName:"",
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
    this.activeName=this.$route.query.goTo||"second";
    this.secondActiveName=this.$route.query.secondActiveName||"waiting_match"
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
      var defaultTabls=this.defaultSecond[targetName.name];
      this.$router.push({ path: "/logisticsManage/platformWaybill/ordersList?goTo="+targetName.name+"&secondActiveName="+defaultTabls });
      this.reshCount();
    },
    changeTabs: function(fifterName) {
      //this.activeName = fifterName;
      this.$router.push({ path: "/logisticsManage/platformWaybill/ordersList?goTo="+fifterName+"&secondActiveName=all" });
      this.reshCount();
    },
    childchangeTabs:function(tabsObj){
      //this.activeName = tabsObj.first;
      this.$router.push({ path: "/logisticsManage/platformWaybill/ordersList?goTo="+tabsObj.first+"&secondActiveName="+tabsObj.second });
      this.reshCount();
    },
    goAddNewOder: function() {
      this.$router.push({ path: "/orders/pickupOrders/addNewPickUpOrder" });
    },

  },
  watch: {
    '$route' (to, from) {
      //刷新参数放到这里里面去触发就可以刷新相同界面了
      this.activeName=this.$route.query.goTo||"first";
      this.secondActiveName=this.$route.query.secondActiveName||"all"
      //this.searchList();
    }
  }
};

</script>
