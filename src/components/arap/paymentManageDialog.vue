<style scoped lang="less">


</style>
<template>
  <div>
    <el-dialog title="调账" :visible="arapDialog.isShow" width="30%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <el-form class="tms-dialog-content" label-width="110px" :rules="rules" :model="formRules" status-icon ref="formRules">
          <el-form-item label="供应商:" prop="supplier_id">
            <el-select v-model="formRules.supplier_id" :loading="supplierLoading" filterable clearable placeholder="请输入选择">
              <el-option v-for="(item,key) in supplierSelect" :key="key" :label="item.supplier_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款日期:" prop="payment_datetime">
            <el-date-picker v-model="formRules.payment_datetime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
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
  name: 'paymentManageDialog',
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
        supplier_id: '', //供应商
        payment_datetime: '', //付款日期
        amount: '', //付款金额
        desc: '', //调账备注
      },
      rules: {
        supplier_id: [
          { required: true, message: '请选择供应商', trigger: 'blur' },
        ],
        payment_datetime: [
          { required: true, message: '请选择日期', trigger: 'blur' },
        ],
        amount: [
          { required: true, message: '请输入付款金额', trigger: 'blur' },
          { pattern: /^([0-9])+(.[0-9]{0,2})?$/, message: '请输入最多两位小数的数值', trigger: 'blur' },
        ],
        desc: [
          { min: 0, max: 50, message: '备注不超过50字', trigger: 'blur' }
        ]
      },
      submitBtn: {
        btnText: '保存',
        isDisabled: true,
        isLoading: false
      },
      supplierSelect: [], //供应商列表
      supplierLoading: false,
      differenceValue: { //差价
        active_tonnage: '', //实际装车吨位
        unit_price: '' //单价
      }

    }
  },
  computed: {
    waybillId() {
      return this.$route.params.waybillId;
    }
  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', false);
    },
    getSupplier: function() {
      let postData = {
        need_all: true,
      }
      this.supplierLoading = true;
      this.$$http('searchSupplierList', postData).then((results) => {
        this.supplierLoading = false;
        if (results.data && results.data.code == 0) {
          this.supplierSelect = results.data.data;
        }
      }).catch((err) => {
        this.supplierLoading = false;
      })
    },

    adjustBtn: function() {

      // console.log('调账', this.formRules)
      this.$refs['formRules'].validate((valid) => {
        if (valid) {
          this.submitBtn = {
            btnText: '调账中',
            isDisabled: true,
            isLoading: true
          }
          let postData = this.formRules;
          postData.id = this.purchaseRow.id;
          let times = new Date();
          postData.adjust_time = times.Format("yyyy-MM-dd hh:mm:ss");
          // for (let i in this.formRules) {
          //   if (this.formRules[i]) {
          //     postData.is_adjust = 'yes';
          //     break;
          //   }
          // }
          postData.is_adjust = 'yes';
          postData = this.pbFunc.fifterObjIsNull(postData);
          this.$$http('updatePurchaseStatistics', postData).then((results) => {
            this.submitBtn = {
              btnText: '确认调账',
              isDisabled: false,
              isLoading: false
            }
            if (results.data && results.data.code == 0) {
              this.$message({
                message: '调账成功',
                type: 'success'
              });
              this.$emit('closeDialogBtn', true);
            }

          }).catch((err) => {
            this.submitBtn = {
              btnText: '确认调账',
              isDisabled: false,
              isLoading: false
            }
            this.$message.error('调账失败');
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
        supplier_adjust: '', //供应商
        active_tonnage_adjust: '', //实际装车吨位
        unit_price_adjust: '', //采购价格
        adjust_time: '', //调账时间
        remark_adjust: '', //调账备注
      };　　　　　　　　
      if (this.$refs['formRules']) {
        this.$refs['formRules'].clearValidate();　　　　
      }　　

    },
  },
  created: function() {
    this.pbFunc.format();
    this.getSupplier();
  }
}

</script>
