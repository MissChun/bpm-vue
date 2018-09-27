<style scoped lang="less">


</style>
<template>
  <div>
    <import-data :import-title="'客户回款导入'" :table-list="thTableList" :back-link="'/arap/payerMeetManage/customerReceivableList'" :api-name-data="apiNameData" :post-data="postData"></import-data>
  </div>
</template>
<script>
import importData from '@/components/common/importData'
export default {
  name: 'importCustomerReturn',
  components: {
    importData: importData,
  },
  data() {
    return {
      apiNameData: {
        uploadApi: '/imports/consumer/', //上传导入数据接口url
        importApi: 'exportCustomerReturnData', //导入系统apiName
        listApi: 'getCustomerReturnImportList', //上传之后临时表apiName
        deleteDataApi: 'deleteCustomerReturnDataList' //清空临时表apiName
      },
      postData: {
        exportType: 'consumer"' //导出模板类型参数
      },
      thTableList: [{
        title: '客户简称',
        param: 'consumer_shortname',
        width: ''
      }, {
        title: '回款日期',
        param: 'payment_datetime',
        width: ''
      }, {
        title: '回款金额',
        param: 'amount',
        width: ''
      }, {
        title: '备注',
        param: 'desc',
        width: ''
      }],
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
