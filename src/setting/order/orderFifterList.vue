<style scoped lang="less">
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-table /deep/ .el-table__body .el-table__row {
  background-color: rgb(250, 250, 250);
}

</style>
<template>
  <el-table :data="ListData" style="width: 100%" :span-method="SpanMethod" claas="listTableAll" default-expand-all="true">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="装卸地" prop="orderid" min-width="15%">
    </el-table-column>
    <el-table-column label="标准里程" prop="TYcompany" min-width="10%">
    </el-table-column>
    <el-table-column label="计划时间" prop="CYcompany" min-width="15%">
    </el-table-column>
    <el-table-column label="实际时间" prop="JHweight" min-width="15%">
    </el-table-column>
    <el-table-column label="计划吨位" prop="desc" min-width="10%">
    </el-table-column>
    <el-table-column label="实际吨位" prop="" min-width="10%">
    </el-table-column>
    <el-table-column label="车辆信息" prop="" min-width="10%">
    </el-table-column>
    <el-table-column label="操作" prop="" min-width="15%">
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'orderFifterList',
  data() {
    return {

    };
  },
  props: ['ListData'],
  computed: {

  },
  methods: {
    SpanMethod: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return [1, 2];
      } else if (columnIndex === 4) {
        return [1, 2];
      } else if (columnIndex === 5) {
        return [1, 2];
      }
    }
  },
  created() {

  }
};

</script>
