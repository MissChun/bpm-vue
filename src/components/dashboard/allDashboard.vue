<style scoped lang="less">
.dispatchTitle{
  margin:40px 0 0 10px;
  padding:1px;
  height:40px;
  line-height:40px;
}
.dashboradContent{
  border-top:none;
  margin:0 25px 0px 25px;
  padding: 1px;
  font-weight:bold;
}
.el-col-4{
  width:190px;
}
</style>
<template>
  <div v-loading="pageLoading" style="background-color:white" class="detail-main">
    <div class="dashboradContent">
      <div class="dispatchTitle border-bottom">{{allDashboradTitle[dispatchPage]}}</div>
      <el-row v-for="(itemList,index) in renderDashboard" :key="index" :gutter="20"   style="margin:0 0 40px 0">
        <el-col v-for="(item,itemIndex) in itemList" :key="item.key"  :span="4" style="margin-top:40px;">
          <dashboradSqure :dashboradSqureData="item"></dashboradSqure>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import  dashboradSqure from '@/components/dashboard/dashboardSqure';
export default {
  name: 'allDashborad',
  components: {
    dashboradSqure: dashboradSqure
  },
  data() {
    
    return {
      pageLoading:false,
      allDashboard:{
        'purchaseDashboard':[//采购概览
          {key:'determine_count',value:'待添加车辆订单',goUrl:'/purchaseCenter/pickupOrders/ordersList?goTo=determine'},
        ],
        'serviceCentreDashboard':[
          {key:'create_department_check_count',value:'待部门审核',goUrl:'/serviceManage/businessToExamine/businessList'},
          {key:'waiting_match_count',value:'待匹配卸货单',goUrl:'/consignmentCenter/consignmentOrders/ordersList'},
          {key:'standard_mile_count',value:'待测里程数',goUrl:'/serviceManage/standardDataManage/mileageDataList'},
        ]
      },
      renderDashboard:[],
      allDashboradTitle:{
        'dispatchDashboard':"待办事项",
        'purchaseDashboard':'待办事项',
        'serviceCentreDashboard':'待办事项'
      }
    };
  },
  props:['dispatchPage'],
  computed: {

  },
  methods: {
    getDashboard:function(){
      this.pageLoading=true;
      this.$$http('getDashboard',{}).then((results)=>{
        this.pageLoading=false;
        if(results.data.code==0){
          this.filterDashboard(results.data.data);
        }
      }).catch(()=>{
        this.pageLoading=false;
      });
    },
    filterDashboard:function(allDashboardData){
      var nowDashboard=this.pbFunc.deepcopy(this.allDashboard[this.dispatchPage]);
      var renderDashboardList=[];
      var num=0;
      for(let N in nowDashboard){
        for(let D in allDashboardData){
          if(nowDashboard[N].key==D){
            num++;
            nowDashboard[N].num=allDashboardData[D];
            renderDashboardList.push(nowDashboard[N]);
            if(num==5){
              this.renderDashboard.push(renderDashboardList);
              renderDashboardList=[];
            }
          }
        }
      }
      if(renderDashboardList.length>0){
        this.renderDashboard.push(renderDashboardList);
      }
    }
  },
  created() {
    this.getDashboard();
  }
};

</script>
