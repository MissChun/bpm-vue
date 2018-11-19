<template>
  <div>
    <el-dialog title="提示" :visible="isShow" width="40%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <div class="tms-dialog-content">
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>实际液厂:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData('')"></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取消</el-button>
        <el-button type="primary" @click="closeBtn" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
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
    updateBtn: Function
  },

  data: function() {
    return {
      submitBtn: {
        btnText: '确认并匹配',
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

  },
}

</script>
<style scoped lang="less">
.tms-dialog-form {
  width: 460px;
}

</style>
