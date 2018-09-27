<style scoped lang="less">


</style>
<template>
  <div>
    <import-data :import-title="'付款方导入'" :table-list="thTableList" :back-link="'/arap/payerMeetManage/payerReceivableList'" :api-name-data="apiNameData" :post-data="postData"></import-data>
  </div>
</template>
<script>
import importData from '@/components/common/importData'
export default {
  name: 'importPayer',
  components: {
    importData: importData,
  },
  data() {
    return {
      apiNameData: {
        uploadApi: '/imports/payer/', //上传导入数据接口url
        importApi: 'exportPayerData', //导入系统apiName
        listApi: 'getPayerImportList', //上传之后临时表apiName
        deleteDataApi: 'deletePayerDataList' //清空临时表apiName
      },
      postData: {
        exportType: 'payer' //导出模板类型参数
      },
      thTableList: [{
        title: '付款方',
        param: 'payer',
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
