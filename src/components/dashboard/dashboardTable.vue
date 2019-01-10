<style scoped lang="less">
.canClick {
  color: #4a9bf8;
  cursor: pointer;
}

</style>
<template>
  <div class="table-list" style="margin-top:20px;width: 700px">
    <el-table style="font-weight:normal;" :data="dashboardTableData" max-height="250" size="mini" stripe>
      <el-table-column v-for="(item,key) in renderTableData" :key="key" align="center" :label="item.title">
        <template slot-scope="scope">
          <span @click="operation(item,scope.row)" v-bind:class="{canClick:item.goTopage||item.showDetalis}">{{scope.row[item.param]}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'dashboardTable',
  data() {
    return {
      renderTableData: [],
      tableData: {
        //服务中心
        'car_plan_count': [
          { title: "液厂", width: '', param: 'actual_fluid_name' },
          { title: "用车计划车数", width: '', param: 'require_car_number', showDetalis: true },
        ],
        'work_end_time_count': [
          { title: "液厂", width: '', param: 'actual_fluid_name' },
          { title: "已装车数（自有承运)", width: '', param: 'own', showDetalis: true },
          { title: "已装车数（外部承运）", width: '', param: 'external', showDetalis: true },
        ],
        'waiting_match_count': [
          { title: "液厂", width: '', param: 'actual_fluid_name' },
          { title: "已装未关联车数（自有承运）", width: '', param: 'own', showDetalis: true },
          { title: "已装未关联车数（外部承运）", width: '', param: 'external', showDetalis: true },
        ],
        'truck_count': [
          { title: "地区", width: '', param: 'area' },
          { title: "卸车计划数", width: '', param: 'plan_no', showDetalis: true },
          { title: "未安排计划数", width: '', param: 'unplan_no', goTopage: "/businessManage/tradeBusiness/?tabClassifyStatus=all_match&businessStatus=waiting_related", timeParam: "planArriveTime" },
        ],
        'associated_not_unload_count': [
          { title: "液厂", width: '', param: 'actual_fluid_name' },
          { title: "库存车数（自有承运）", width: '', param: 'own', showDetalis: true, sendObj: { type: "associated_not_unload", searchParam: { 'fluid_id': "needAssignment", 'consignment_type': 'own', 'work_end_time': 'serchTime' }, backUrl: "salesStatisticsDashboard" } },
          {
            title: "库存车数（外部承运）",
            width: '',
            param: 'external',
            showDetalis: true,
            sendObj: {
              type: "associated_not_unload",
              searchParam: {
                'fluid_id': "needAssignment",
                'consignment_type': 'external',
                'work_end_time': 'serchTime'
              },
              backUrl: "salesStatisticsDashboard"
            }
          },
        ],
        //采购中心
        'work_end_time_count': [
          { title: "液厂", width: '', param: 'actual_fluid_name' },
          { title: "已装车数（自有承运）", width: '', param: 'own', showDetalis: true },
          { title: "已装车数（外部承运）", width: '', param: 'external', showDetalis: true },
        ],

        'unwork_end_time_count': [
          { title: "液厂", width: '', param: 'actual_fluid_name' },
          { title: "未装车数（自有承运）", width: '', param: 'own', showDetalis: true },
          { title: "未装车数（外部承运）", width: '', param: 'external', showDetalis: true },
        ],
        //销售统计概览
        'waiting_settlement_count': [
          { title: "地区", width: '', param: 'area_name' },
          { title: "车数", width: '', param: 'car_no', showDetalis: true },
        ],
        'is_reconciliation_noinvoice_count': [
          { title: "客户名称", width: '', param: 'consumer_name' },
          { title: "已对账未开票数量", width: '', param: 'pkcount', goTopage: "/statistics/sales/salesList?is_reconciliation=finished&is_invoice=no", timeParam: "leaveTime", needSendTable: 'consumer_name' },
        ],
        'is_reconciliation_invoice_count': [
          { title: "客户名称", width: '', param: 'consumer_name' },
          { title: "已对账已开票数量", width: '', param: 'pkcount', goTopage: "/statistics/sales/salesList?is_reconciliation=finished&is_invoice=yes", timeParam: "leaveTime", needSendTable: 'consumer_name' },
        ],
        'humanize_is_invoice_not_back': [
          { title: "客户名称", width: '', param: 'consumer_name' },
          { title: "已开票数量", width: '', param: 'is_invoice_count' },
          { title: "已开票金额", width: '', param: 'is_invoice_price' },
          { title: "已回款金额", width: '', param: 'is_back_price' },
          { title: "未回款金额", width: '', param: 'not_back_price' },
        ]
      }
    };
  },
  computed: {

  },
  methods: {
    fifterData: function() {
      for (var i in this.tableData) {
        if (i == this.tableType) {
          this.$set(this, 'renderTableData', this.tableData[i]);
        }
      }
    },
    operation: function(item, rowData) {
      if (item.showDetalis) {
        let searchParam = item.sendObj.searchParam;
        for (let item in searchParam) {
          if (searchParam[item] == 'needAssignment') {
            searchParam[item] = rowData[item];
          } else if (searchParam[item] == 'serchTime') {
            searchParam[item] = this.sendTime;
          }
        }
        this.$router.push({ path: "/dashboard/dashboardDetalis?sendObj=" + JSON.stringify(item.sendObj) });
      } else if (item.goTopage) {
        var pathParam = "";
        if (item.timeParam) {
          pathParam += `&${item.timeParam}=${this.sendTime[0]},${this.sendTime[1]}`
        }
        if (item.statusType) {
          pathParam += `&${time.statusType}=${this.sendStatusType}`
        }
        if (item.needSendTable) {
          pathParam += `&${item.needSendTable}=${rowData[item.needSendTable]}`
        }
        this.$router.push({ path: `${item.goTopage}` + pathParam });
      }
    }
  },
  created() {
    this.fifterData();
  },
  props: ['dashboardTableData', 'tableType', 'sendStatusType', 'sendTime'],
  watch: {
    dashboardTableData: {
      handler(val, oldVal) {
        this.fifterData();
      },
      deep: true
    }
  }
};

</script>
