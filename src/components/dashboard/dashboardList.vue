<style scoped lang="less">


</style>
<template>
  <div>
    <div class="table-list">
      <el-table :data="searchListData" stripe style="width: 100%" size="mini" >
        <el-table-column v-for="(item,key) in searchTableList[sendObj.type]" :key="key" :prop="item.param" align="center" :label="item.title">
          <template slot-scope="scope">
              {{scope.row[item.param]}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dashboardList',
  props:['searchListData','sendObj'],
  data() {
    return {
      searchTableList:{
        'associated_not_unload':[
          {title: '运单号',param: 'waybill_number',width: ''},
          {title: '车号',param: 'plate_number',width: ''},
          {title: '实际液厂',param: 'fluid_name',width: ''},
          {title: '装车完成时间',param: 'work_end_time',width: ''},
          {title: '承运类型',param: 'consignment_type',width: ''},
        ]
      }
    };
  },
  computed: {

  },
  methods: {

  },
  created() {

  }
};

</script>
