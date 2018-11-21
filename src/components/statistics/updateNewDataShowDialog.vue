<template>
  <div>
    <el-dialog title="提示" :visible="isShow" width="35%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <div class="tms-dialog-content">
          <el-row :gutter="10">
            <el-col :span="24" v-for="(item,key) in newData" :key="key">
              <div class="label-list">
                <label>{{item.title}}:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.value)"></div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="text-red text-center fs-13">注意：将更新以上所有条件的{{typeStr}}，更新后数据不可恢复</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取消</el-button>
        <el-button type="primary" @click="updateBtn(submitBtn)" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'updateNewDataDialog',
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    typeStr:String,
    closeDialogBtn: Function,
    // updateBtn: Function,
    newData:Array,
    postData:Object
  },

  data: function() {
    return {
      submitBtn: {
        btnText: '确认更新',
        isDisabled: false,
        isLoading: false
      },
    }
  },
  computed: {

  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', false);
    },
    updateBtn(btn){
      this.submitBtn = {
        btnText: '更新中',
        isDisabled: true,
        isLoading: true
      }
      this.$$http('updatePurchaseStatisticsList', this.postData).then((results) => {
        this.submitBtn = {
          btnText: '确认更新',
          isDisabled: false,
          isLoading: false
        }
        if (results.data && results.data.code == 0) {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          this.$emit('closeDialogBtn', true);
        }

      }).catch((err) => {
        this.submitBtn = {
          btnText: '确认更新',
          isDisabled: false,
          isLoading: false
        }
        this.$message.error('更新失败');
      })
    }

  },
}

</script>
<style scoped lang="less">


</style>
