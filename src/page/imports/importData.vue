<style scoped lang="less">


</style>
<template>
  <div>
    <!-- 付款方导入 -->
    <div v-if="type==='payer'">
      <import-payer></import-payer>
    </div>
    <!-- 客户回款导入 -->
    <div v-if="type==='customerReturn'">
      <import-customer-return></import-customer-return>
    </div>
  </div>
</template>
<script>
import importPayer from '@/components/importData/importPayer'
import importCustomerReturn from '@/components/importData/importCustomerReturn'

export default {
  name: 'importData',
  components: {
    importPayer: importPayer,
    importCustomerReturn: importCustomerReturn,
  },
  data() {
    return {

    };
  },
  computed: {
    type: function() {
      return this.$route.params.type;
    },
  },
  methods: {

  },
  created() {

  }
};

</script>
