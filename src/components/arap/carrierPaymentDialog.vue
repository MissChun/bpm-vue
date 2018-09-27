<style scoped lang="less">


</style>
<template>
  <div>
    <el-dialog :title="title" :visible="arapDialog.isShow" width="30%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <el-form class="tms-dialog-content" label-width="110px" :rules="rules" :model="formRules" status-icon ref="formRules">
          <el-form-item label="承运商:" prop="carrier">
            <el-select v-model="formRules.carrier" :loading="carrierLoading" filterable clearable placeholder="请输入选择">
              <el-option v-for="(item,key) in carrierSelect" :key="key" :label="item.carrier_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款日期:" prop="payment_datetime">
            <el-date-picker v-model="formRules.payment_datetime" type="date" placeholder="选择日期" :picker-options="pickerOptionsDate" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item label="付款金额:" prop="amount">
            <el-input placeholder="请输入" v-model="formRules.amount"></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="desc">
            <el-input placeholder="请输入" type="textarea" resize="none" :rows="3" v-model="formRules.desc"></el-input>
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
  name: 'carrierPaymentDialog',
  props: {
    arapDialog: {
      type: Object,
      required: true
    },
    closeDialogBtn: Function,
    arapRow: {
      type: Object,
      required: true
    },
  },

  data: function() {
    return {
      formRules: {
        carrier: '', //承运商
        payment_datetime: '', //付款日期
        amount: '', //付款金额
        desc: '', //调账备注
      },
      pickerOptionsDate: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      rules: {
        carrier: [
          { required: true, message: '请选择承运商', trigger: 'blur' },
        ],
        payment_datetime: [
          { required: true, message: '请选择日期', trigger: 'blur' },
        ],
        amount: [
          { required: true, message: '请输入付款金额', trigger: 'blur' },
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
        desc: [
          { min: 0, max: 50, message: '备注不超过50字', trigger: 'blur' }
        ]
      },
      submitBtn: {
        btnText: '保存',
        isDisabled: false,
        isLoading: false
      },
      carrierSelect: [], //承运商列表
      carrierLoading: false,
      title: '新增打款事项'
    }
  },
  computed: {

  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', false);
    },
    getCarrier: function(carrier) {
      let postData = {
        need_all: true
      }
      this.carrierLoading = true;
      this.$$http('getCarrierList', postData).then((results) => {
        this.carrierLoading = false;
        if (results.data && results.data.code == 0) {
          this.carrierSelect = results.data.data;
        }
      }).catch((err) => {
        this.carrierLoading = false;
      })
    },
    adjustBtn: function() {
      this.$refs['formRules'].validate((valid) => {
        if (valid) {
          this.submitBtn = {
            btnText: '保存中',
            isDisabled: true,
            isLoading: true
          }
          let postData = this.formRules;
          let apiName = 'addCarrierPayment';
          if (this.arapDialog.type === 'update') {
            postData.id = this.arapRow.id;
            apiName = 'updateCarrierPayment';
          } else {
            apiName = 'addCarrierPayment';
          }

          // let times = new Date();
          // postData.adjust_time = times.Format("yyyy-MM-dd hh:mm:ss");
          // postData = this.pbFunc.fifterObjIsNull(postData);
          this.$$http(apiName, postData).then((results) => {
            this.submitBtn = {
              btnText: '保存',
              isDisabled: false,
              isLoading: false
            }
            if (results.data && results.data.code == 0) {
              this.$message({
                message: this.arapDialog.type === 'add' ? '新增成功' : '修改成功',
                type: 'success'
              });
              this.$emit('closeDialogBtn', true);
            }

          }).catch((err) => {
            this.submitBtn = {
              btnText: '保存',
              isDisabled: false,
              isLoading: false
            }
            this.$message.error(this.arapDialog.type === 'add' ? '新增失败' : '修改失败');
          })

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    },
  },
  watch: {
    arapDialog(curVal, oldVal) {　
      this.formRules = {
        carrier: '', //承运商
        payment_datetime: '', //付款日期
        amount: '', //付款金额
        desc: '', //调账备注
      };　　
      if (curVal.type === 'update') {
        this.formRules = {
          carrier: this.arapRow.carrier, //供应商
          payment_datetime: this.arapRow.payment_datetime, //付款日期
          amount: this.arapRow.amount, //付款金额
          desc: this.arapRow.desc, //调账备注
        };
        this.title = '修改打款事项';
      } else {
        this.title = '新增打款事项';
      }　　　　　　　　
      if (this.$refs['formRules']) {
        this.$refs['formRules'].clearValidate();　　　　
      }　　

    },
  },
  created: function() {
    this.pbFunc.format();
    this.getCarrier();
  }
}

</script>
