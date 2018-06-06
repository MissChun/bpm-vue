<style scoped lang="less">
.trans-fee {
  .table-list {
    margin-bottom: 20px;
  }
}

.detail-main {
  border-top: 0;
}

</style>
<template>

  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="贸易单详情" name="detail">
        <trade-detail></trade-detail>
      </el-tab-pane>
      <el-tab-pane label="贸易单进程" name="process">
        <trade-process :is-to-examine="true"></trade-process>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import tradeDetail from '@/components/businessManage/tradeDetail';
import tradeProcess from '@/components/businessManage/tradeProcess';
export default {
  name: 'tradeBusinessDetail',
  components: {
    tradeProcess: tradeProcess,
    tradeDetail:tradeDetail
  },
  data() {
    return {
      activeName: 'process',
    }
  },
  created() {

  },
  computed: {

  },
  methods: {
    handleRemove: function(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview: function(file) {
      console.log(file);
    },
    handleClick() {

    },
  }
}

</script>
