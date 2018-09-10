<!-- purchaseAdjustmentDialog.vue -->
<style scoped lang="less">


</style>
<template>
  <div>
    <el-dialog title="调账" :visible="accountAdjustIsShow" width="50%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="adjustment-dialog-form">
        <el-form class="adjustment-dialog-content" label-width="120px" :rules="rules" :model="formRules" status-icon ref="formRules">
          <el-form-item label="供应商:">
            <el-row>
              <el-col :span="8">
                <div class="dialog-row-font">{{purchaseRow.supplier}}</div>
              </el-col>
              <el-col :span="11">
                <el-select v-model="formRules.supplier_adjust" :loading="supplierLoading" filterable clearable @change="isValue" placeholder="请输入选择">
                  <el-option v-for="(item,key) in supplierSelect" :key="key" :label="item.supplier_name" :value="item.supplier_name"></el-option>
                </el-select>
                <!-- <el-input placeholder="请输入" v-model="formRules.supplier_adjust"></el-input> -->
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="实际装车吨位:" prop="active_tonnage_adjust">
            <el-row>
              <el-col :span="8">
                <div class="dialog-row-font">{{purchaseRow.active_tonnage}} 吨</div>
              </el-col>
              <el-col :span="11">
                <el-input placeholder="请输入" v-model="formRules.active_tonnage_adjust" @change="isValue('activeTonnage')"></el-input>
              </el-col>
              <el-col :span="5">差值：{{differenceValue.active_tonnage}}</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="采购单价:" prop="unit_price_adjust">
            <el-row>
              <el-col :span="8">
                <div class="dialog-row-font">{{purchaseRow.unit_price}} 元</div>
              </el-col>
              <el-col :span="11">
                <el-input placeholder="请输入" v-model="formRules.unit_price_adjust" @change="isValue('unitPrice')"></el-input>
              </el-col>
              <el-col :span="5">差值：{{differenceValue.unit_price}}</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="备注:">
            <el-row>
              <el-col :span="11" :offset="8">
                <el-input placeholder="请输入" type="textarea" resize="none" :rows="3" v-model="formRules.remark_adjust"></el-input>
              </el-col>
            </el-row>
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
  name: 'purchaseAdjustmentDialog',
  props: {
    accountAdjustIsShow: {
      type: Boolean,
      required: true
    },
    closeDialogBtn: Function,
    purchaseRow: {
      type: Object,
      required: true
    },
  },

  data: function() {
    return {
      formRules: {
        supplier_adjust: '', //供应商
        active_tonnage_adjust: '', //实际装车吨位
        unit_price_adjust: '', //采购价格
        adjust_time: '', //调账时间
        remark_adjust: '', //调账备注
      },
      rules: {
        active_tonnage_adjust: [
          { pattern: this.$store.state.common.regular.tonnage.match, message: this.$store.state.common.regular.tonnage.tips, trigger: 'blur' },
        ],
        unit_price_adjust: [
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
      },
      submitBtn: {
        btnText: '确认调账',
        isDisabled: true,
        isLoading: false
      },
      supplierSelect: [], //供应商列表
      supplierLoading: false,
      differenceValue: { //差价
        active_tonnage: '', //实际装车吨位
        unit_price: '' //单价
      },
      priceReg: /^\d+(\.\d{1,2})?$/,
      changeForm: {

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
    isValue(type, error) {
      console.log('error', type);

      this.submitBtn.isDisabled = true;
      for (let i in this.formRules) {
        if (this.formRules[i]) {
          this.submitBtn.isDisabled = false;
          break;
        }
      }
      if (type === 'activeTonnage') {
        if (isNaN(this.formRules.active_tonnage_adjust) || !this.$store.state.common.regular.tonnage.match.test(this.formRules.active_tonnage_adjust) || !this.formRules.active_tonnage_adjust) {
          this.differenceValue.active_tonnage = '';
        } else {
          this.differenceValue.active_tonnage = (parseFloat(this.formRules.active_tonnage_adjust) * 1000 - parseFloat(this.purchaseRow.active_tonnage) * 1000) / 1000;
        }
      } else if (type === 'unitPrice') {
        if (isNaN(this.formRules.unit_price_adjust)|| !this.$store.state.common.regular.price.match.test(this.formRules.unit_price_adjust) || !this.formRules.unit_price_adjust) {
          this.differenceValue.unit_price = '';
        } else {
          this.differenceValue.unit_price = (parseFloat(this.formRules.unit_price_adjust) * 100 - parseFloat(this.purchaseRow.unit_price) * 100) / 100;
        }
      }
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
    accountAdjustIsShow(curVal, oldVal) {　
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
      this.differenceValue = { //差价
        active_tonnage: '', //实际装车吨位
        unit_price: '' //单价
      }
    },
  },
  created: function() {
    this.pbFunc.format();
    this.getSupplier();
  }
}

</script>
