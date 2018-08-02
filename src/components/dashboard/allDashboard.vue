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
.isheight{
  height:0px;
  margin:0 0 0 10px;
}
.marginNone{
  margin:0 0 0 10px;
}
</style>
<template>
  <div v-loading="pageLoading" style="background-color:white" class="detail-main">
    <div v-for="(itemList,index) in renderDashboard" :key="index">
      <div class="dashboradContent">
        <div class="dispatchTitle border-bottom" v-bind:class="{isheight:itemList.title=='',marginNone:index>=1}">{{itemList.title}}</div>
        <el-form class="search-filters-form" label-width="80px" status-icon ref="seachHeadCarListFrom" v-if="itemList.searchShow" style="margin-top:30px;">
          <el-row >
            <el-col :span="8">
              <el-form-item align="right" label="时间搜索:" >
                  <el-date-picker  style="width:100%" :editable="editable"  :clearable="clearable" v-model="itemList.searchData" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="margin-left:20px;">
              <el-button @click="getDashboard(itemList)">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-row  v-for="(Ritem,Rindex) in itemList.renderDashboard" :gutter="20"  style="margin:10px 0 40px 0" :key="Rindex">
          <el-col  v-for="(item,itemIndex) in Ritem"  :span="4" style="margin-top:15px;" :key="item.key">
            <dashboradSqure   :dashboradSqureData="item" @clickExtendTable="clickExtendTable" v-loading="item.vLoading" :activeData="extendgetData"></dashboradSqure>
          </el-col>
          <el-collapse-transition>
          <el-col :span="24" :id="'extendTab-'+extendgetData.key" v-if="Rindex==extendgetData.index&&extendgetData.extendTableType==itemList.type&&tableShowSatus"><dashboardTable :dashboardTableData="extendData[extendgetData.key]" :tableType="extendgetData.key" :sendTime="itemList.searchData"></dashboardTable></el-col>
        </el-collapse-transition>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import  dashboradSqure from '@/components/dashboard/dashboardSqure';
import  dashboardTable from '@/components/dashboard/dashboardTable';
export default {
  name: 'allDashborad',
  components: {
    dashboradSqure: dashboradSqure,
    dashboardTable: dashboardTable
  },
  data() {
    return {
      pageLoading:false,
      editable:false,
      clearable:false,
      extendData:{},
      extendgetData:{},
      tableShowSatus:false,
      defaultStart:'',//new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()-1) + " 16:00:00",
      defaultEnd:new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + " 16:00:00",
      allDashboard:{
        'purchaseDashboard':[
          {//采购概览
          'dashboardSqureData':[
              {key:'determine_count',value:'待确认计划数',goUrl:'/purchaseCenter/pickupOrders/ordersList?goTo=determine',dimension:"单"},
            ],
            'searchShow':false,
            'type':'procurement_centre_scedule',
            'title':'待办事项'
          },
          {
          'dashboardSqureData':[
              {key:'car_plan_count',value:'用车计划',extendTable:true,dimension:"车",vLoading:false},
              {key:'unwork_end_time_count',value:'未装车',extendTable:true,dimension:"车",vLoading:false},
              {key:'work_end_time_count',value:'已装车',extendTable:true,dimension:"车",vLoading:false},
            ],
            'searchShow':true,
            'type':'procurement_centre_dashborad',
            'searchData':[],
            'title':'数据概览'
          }
        ],
        'serviceCentreDashboard':[//服务中心概览
          {
            'dashboardSqureData':[
              {key:'create_department_check_count',value:'待部门审核',goUrl:'/serviceManage/businessToExamine/businessList',dimension:"单"},
              {key:'section_waiting_match_count',value:'待匹配卸货单',goUrl:'/consignmentCenter/consignmentOrders/ordersList?goTo=second&secondActiveName=waiting_match',dimension:"单"},
              {key:'standard_mile_count',value:'待测里程数',goUrl:'/serviceManage/standardDataManage/mileageDataList?mile=0',dimension:"条"}
            ],
            'searchShow':false,
            'type':'service_centre_schedule',
            'title':'待办事项'
          },
          {
            'dashboardSqureData':[
              {key:'car_plan_count',value:'用车计划',extendTable:true,dimension:"车",vLoading:false},
              {key:'work_end_time_count',value:'已装车',extendTable:true,dimension:"车",vLoading:false},
              {key:'waiting_match_count',value:'已装车未关联',extendTable:true,dimension:"车",vLoading:false},
              {key:'waiting_settlement_count',value:'当日卸车数',extendTable:false,dimension:"单",vLoading:false},
              {key:'truck_count',value:'当日计划数',extendTable:true,dimension:"车",vLoading:false}
            ],
            'searchShow':true,
            'searchData':[],
            'type':'service_centre_dashborad',
            'title':'数据概览'
          }
        ],

        'puchaseStatisticsDashboard':[//采购统计概览
          {
            'dashboardSqureData':[
              {key:'is_reconciliation_count',value:'未对账',goUrl:'/statistics/purchase/purchaseList?is_reconciliation=unfinished',dimension:"车"},
              {key:'is_invoice_count',value:'未开票',goUrl:'/statistics/purchase/purchaseList?is_invoice=no',dimension:"车"},
            ],
            'searchShow':false,
            'type':'procurement_statistics_dashborad',
            'title':'数据概览'
          }
        ],
        'salesStatisticsDashboard':[//销售概览
          {
            'dashboardSqureData':[
              {key:'is_reconciliation_count',value:'未对账',goUrl:'/statistics/sales/salesList?is_reconciliation=unfinished',dimension:"车",vLoading:false},
              {key:'is_invoice_count',value:'未开票',goUrl:'/statistics/sales/salesList?is_invoice=no',dimension:"车",vLoading:false},
            ],
            'searchShow':false,
            'type':'sale_statistics_dashborad',
            'title':'数据概览'
          },
          {
            'dashboardSqureData':[
              {key:'waiting_settlement_count',value:'已卸车',extendTable:true,dimension:"车",vLoading:false,vLoading:false},
            ],
            'searchShow':true,
            'searchData':[],
            'type':'sale_statistics_weightnote',
            'title':''
          }
        ],
      },
      renderDashboard:[],
    };
  },
  props:['dispatchPage'],
  computed: {
    yesterday(){
      let today = new Date();
      return new Date(today.getTime() - 24*60*60*1000);
    }
  },
  methods: {
    clickExtendTable:function(backItem,isOnlySearch){
      var vm=this;
      if(this.extendgetData&&(this.extendgetData.key==backItem.key)&&!isOnlySearch){
        vm.$set(this,'tableShowSatus',!this.tableShowSatus);
        vm.extendgetData={};
      }else{
        if(backItem.extendTable){
          this.allDashboard[this.dispatchPage].forEach(item=>{
            item.dashboardSqureData.forEach((Iitem)=>{
              if(Iitem.key==backItem.key){
                Iitem.extendTableType=item.type;
                var sendData={};
                sendData.filter_type=Iitem.key;
                sendData.start_time=item.searchData[0];
                sendData.end_time=item.searchData[1];
                backItem.vLoading=true;
                vm.$$http('getDetalisDashboard',sendData).then((results)=>{
                  backItem.vLoading=false;
                  if(results.data.code==0){
                    vm.$set(vm.extendData,Iitem.key,results.data.data);
                    vm.$set(vm,'extendgetData',Iitem);
                    vm.tableShowSatus=true;
                    setTimeout(()=>{
                      var anchor = document.getElementById('extendTab-'+vm.extendgetData.key);
                      //document.body.scrollTop = anchor.offsetTop;
                      document.documentElement.scrollTop = 110;
                    },200);
                  }
                });
              }
            });
          });
        }
      }
    },
    getDashboard:function(dashboardSearch){
      this.pageLoading=true;
      var vm=this;
      var searchArr=[]
      if(dashboardSearch){
        searchArr=[dashboardSearch]
      }else{
        searchArr=this.allDashboard[vm.dispatchPage];
      }

      const promises = searchArr.map(function (item) {
        return new Promise((resolve, reject) => {
          var sendData={};
          if(item['searchData']){
            if(item['searchData'].length==0){
              sendData.start_time=vm.defaultStart;
              sendData.end_time=vm.defaultEnd;
              item.searchData=[vm.defaultStart,vm.defaultEnd];
            }else{
              sendData.start_time=item['searchData'][0];
              sendData.end_time=item['searchData'][1];

            }
          }
          sendData.filter_type=item['type'];
          vm.$$http('getDashboard',sendData).then((results)=>{
            if(results.data.code==0){
              vm.filterDashboard(results.data.data,item);
              resolve(results);
            }else{
              vm.pageLoading=false;
              reject(results);
            }
          }).catch((err) => {
            vm.pageLoading=false;
            reject(err);
          })
        })
      });
      // this.$$http('getDashboard',{}).then((results)=>{
      //   this.pageLoading=false;
      //   if(results.data.code==0){
      //     this.filterDashboard(results.data.data);
      //   }
      // }).catch(()=>{
      //   this.pageLoading=false;
      // });
      if(this.extendgetData&&this.tableShowSatus){
        this.clickExtendTable(this.extendgetData,true);
      }
      Promise.all(promises).then(result => {
        if(result.length==searchArr.length){
          vm.pageLoading=false;
        }
      })
      .catch(e => console.log(e));
    },
    filterDashboard:function(allDashboardData,Dashboard){
      var renderDashboardList=[];
      var nowDashboard=Dashboard.dashboardSqureData;
      var num=0;
      var index=0;
      Dashboard.renderDashboard=[];
      for(let N in nowDashboard){
        for(let D in allDashboardData){
          if(nowDashboard[N].key==D){
            num++;
            nowDashboard[N].index=index;
            this.$set(nowDashboard[N],'num',allDashboardData[D]);
            renderDashboardList.push(nowDashboard[N]);
            if(num==4){
              if(!Dashboard.renderDashboard){
                Dashboard.renderDashboard=[];
              }
              Dashboard.renderDashboard.push(renderDashboardList);
              renderDashboardList=[];
              index++;
            }
          }
        }
      }
      if(renderDashboardList.length>0){
        if(!Dashboard.renderDashboard){
          Dashboard.renderDashboard=[];
        }
        Dashboard.renderDashboard.push(renderDashboardList);
      }
      this.$set(this,'renderDashboard',this.allDashboard[this.dispatchPage]);
      //this.renderDashboard=;
    }
  },
  created() {
    this.defaultStart = this.yesterday.getFullYear() + '-' + (this.yesterday.getMonth() + 1) + '-' + this.yesterday.getDate() + " 16:00:00";
    this.getDashboard();
  },
  watch: {
    renderDashboard: {
      handler(val, oldVal) {

      },
      deep: true
    }
  }
};

</script>
