
<style scoped lang="less">


</style>
<template>
  <div>
    <el-dialog title="批量修改" :visible="isShow" width="30%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <div class="text-center">共有{{number}}单，可批量修改<span class="text-blue fs-20"> {{ids.length}} </span>单，将批量修改以下字段</div>
        <el-form class="tms-dialog-content mt-25" label-width="110px" :rules="rules" :model="formRules" status-icon ref="formRules">
          <el-form-item label="采购优惠:" prop="discount_price">
            <el-input placeholder="请输入" v-model="formRules.discount_price" @change="isValue"></el-input>
          </el-form-item>
          <el-form-item label="业务优惠:" prop="business_price">
            <el-input placeholder="请输入" type="text"  v-model="formRules.business_price" @change="isValue"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取消</el-button>
        <el-button type="primary" @click="adjustBtn" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'batchUpdateDialog',
  props: {
    isShow:Boolean,
    closeDialogBtn: Function,
    ids: {
      type: Array,
      required: true
    },
    number:Number
  },

  data: function() {
    return {
      formRules: {
        discount_price: '', //采购优惠
        business_price: '', //业务优惠
      },
      rules: {
        discount_price: [
          { pattern: this.$store.state.common.regular.accounts.match, message: this.$store.state.common.regular.accounts.tips, trigger: 'blur' },
        ],
        business_price: [
          { pattern: this.$store.state.common.regular.accounts.match, message: this.$store.state.common.regular.accounts.tips, trigger: 'blur' },
        ],
      },
      submitBtn: {
        btnText: '确认修改',
        isDisabled: true,
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
    isValue() {
      this.submitBtn.isDisabled = true;
      for (let i in this.formRules) {
        // console.log(this.formRules[i]);
        if (this.formRules[i]) {
          this.submitBtn.isDisabled = false;
          break;
        }
      }
      // console.log(this.submitBtn.isDisabled)
    },
    adjustBtn: function() {
      this.$refs['formRules'].validate((valid) => {
        if (valid) {
          this.submitBtn = {
            btnText: '确认修改中',
            isDisabled: true,
            isLoading: true
          }
          let postData = this.formRules;
          postData.id = this.ids;
          this.$$http('batchUpdatePurchaseDiscount', postData).then((results) => {
            this.submitBtn = {
              btnText: '确认修改',
              isDisabled: false,
              isLoading: false
            }
            if (results.data && results.data.code == 0) {
              this.$message({
                message: '批量修改成功',
                type: 'success'
              });
              this.$emit('closeDialogBtn', true);
            }

          }).catch((err) => {
            this.submitBtn = {
              btnText: '确认修改',
              isDisabled: false,
              isLoading: false
            }
            this.$message.error('批量修改失败');
          })

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    },
  },
  watch: {
    isShow(curVal, oldVal) {　
      this.formRules = {
        discount_price: '', //采购优惠
        business_price: '', //业务优惠
        id:[]
      };　　
      this.submitBtn = {
        btnText: '确认修改',
        isDisabled: true,
        isLoading: false
      };
      if (this.$refs['formRules']) {
        this.$refs['formRules'].clearValidate();　　　　
      }　　

    },
  },
  created: function() {

  }
}

</script>
