<!-- refuseDialog.vue -->
<!-- departmentDialog -->
<template>
  <div>
    <el-dialog :title="'业务单审核拒绝'" :visible="refuseDialog.isShow" width="30%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <el-form class="tms-dialog-content" label-width="100px" :rules="rules" :model="refuseRules" status-icon ref="refuseRules">
          <el-form-item label="拒绝原因：" prop="approval_mark">
            <el-input :autofocus="true" type="textarea" :rows="3" resize="none" placeholder="请输入1~100字" v-model="refuseRules.approval_mark">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取 消</el-button>
        <el-button type="primary" @click="refuse" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'refuseDialog',
  props: {
    refuseDialog: {
      type: Object,
      required: true
    },
    closeDialogBtn: Function,
  },

  data: function() {
    return {
      refuseRules: {
        approval_mark: '',
        action:'denied'
      },
      rules: {
        approval_mark: [
          { required: true, message: '请填写拒绝原因', trigger: 'blur' },
          { min: 1, max: 100, message: '拒绝原因字数为1~100字', trigger: 'blur' }
        ],
      },
      submitBtn: {
        btnText: '确 定',
        isDisabled: false,
        isLoading: false
      }
    }
  },
  computed: {

  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', this.type);
    },
    refuse: function() {
      this.$refs['refuseRules'].validate((valid) => {
        if (valid) {
          this.submitBtn.isDisabled = true;
          this.submitBtn.btnText = '提交中';
          this.submitBtn.isLoading = true;
          let postData = this.refuseRules;
          postData.order_id = this.refuseDialog.id;
          console.log('拒绝',postData)
          this.$$http('toExamineBusiness', postData).then((results) => {

            this.submitBtn.btnText = '确 定';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            if (results.data && results.data.code == 0) {
              this.$message({
                message: '审核拒绝成功',
                type: 'success'
              });
              this.$emit('closeDialogBtn', this.type, true);
            }

          }).catch((err) => {
            this.submitBtn.btnText = '确 定';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            this.$message.error('审核拒绝失败');
          })

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    }
  },
  watch: {
    refuseDialog: {
      handler(val, oldVal) {　　　　　　
        this.refuseRules.approval_mark = '';
        if(this.$refs['refuseRules']){
          this.$refs['refuseRules'].clearValidate();　　　　
        }

      }, 　　　　deep: true

    }
  },
  created: function() {

  }
}

</script>
<style scoped lang="less">


</style>
