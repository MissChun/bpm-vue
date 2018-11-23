<!-- salesAdjustmentDialog.vue -->
<style scoped lang="less">
</style>
<template>
  <div>
    <el-dialog title="调账" :visible="accountAdjustIsShow" width="50%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="adjustment-dialog-form">
        <el-form class="adjustment-dialog-content" label-width="120px" :rules="rules" :model="formRules" status-icon ref="formRules">
          <el-form-item label="客户简称:">
            <el-row>
              <el-col :span="8">
                <div class="dialog-row-font">{{adjustRow.short_name}}</div>
              </el-col>
              <el-col :span="11">
                <el-select v-model="formRules.short_name_adjust" :loading="customerLoading" filterable remote clearable @change="searchCustomer" :remote-method="getCustomer" placeholder="请输入选择">
                  <el-option v-for="(item,key) in customerSelect" :key="key" :label="item.short_name" :value="item.short_name"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="付款方:">
            <el-row>
              <el-col :span="8">
                <div class="dialog-row-font">{{adjustRow.payer_name}}</div>
              </el-col>
              <el-col :span="11">
                <el-select v-model="formRules.payer_id_adjust" :loading="payerLoading" filterable remote clearable @change="searchPayer" :remote-method="getPayer" placeholder="请输入选择">
                  <el-option v-for="(item,key) in payerSelect" :key="key" :label="item.payer" :value="item.id"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="核算吨位:" prop="check_quantity_adjust">
            <el-row>
              <el-col :span="8">
                <div class="dialog-row-font">{{adjustRow.check_quantity}} 吨</div>
              </el-col>
              <el-col :span="11">
                <el-input placeholder="请输入" v-model="formRules.check_quantity_adjust" @change="isValue('checkQuantity')"></el-input>
              </el-col>
              <el-col :span="5">差值：{{differenceValue.check_quantity}}</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="结算价格:" prop="unit_price_adjust">
            <el-row>
              <el-col :span="8">
                <div class="dialog-row-font">{{adjustRow.unit_price}} 元</div>
              </el-col>
              <el-col :span="11">
                <el-input placeholder="请输入" v-model="formRules.unit_price_adjust" @change="isValue('unitPrice')"></el-input>
              </el-col>
              <el-col :span="5">差值：{{differenceValue.unit_price}}</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="卸车数:" prop="unload_nums_adjust">
            <el-row>
              <el-col :span="8">
                <div class="dialog-row-font">{{adjustRow.unload_nums}} 车</div>
              </el-col>
              <el-col :span="11">
                <el-input placeholder="请输入" v-model="formRules.unload_nums_adjust" @change="isValue('unloadNums')"></el-input>
              </el-col>
              <el-col :span="5">差值：{{differenceValue.unload_nums}}</el-col>
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
  name: 'salesAdjustmentDialog',
  props: {
    accountAdjustIsShow: {
      type: Boolean,
      required: true
    },
    closeDialogBtn: Function,
    adjustRow: {
      type: Object,
      required: true
    },
  },

  data: function() {
    return {
      formRules: {
        short_name_adjust: '', //客户简称
        payer_name_adjust: '', //付款方
        payer_id_adjust: '',
        check_quantity_adjust: '', //核算吨位
        unit_price_adjust: '', //结算价格
        unload_nums_adjust: '', //卸车数
        adjust_time: '', //调账时间
        remark_adjust: '', //调账备注
        // is_adjust: 'yes'
      },
      rules: {
        check_quantity_adjust: [
          { pattern: this.$store.state.common.regular.tonnage.match, message: this.$store.state.common.regular.tonnage.tips, trigger: 'blur' },
        ],
        unit_price_adjust: [
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
        unload_nums_adjust: [
          { pattern: this.$store.state.common.regular.vehicle.match, message: this.$store.state.common.regular.vehicle.tips, trigger: 'blur' },
          // { min: 0, max: 1, message: '备注不超过50字', trigger: 'blur' }
        ],
      },
      submitBtn: {
        btnText: '确认调账',
        isDisabled: true,
        isLoading: false
      },
      customerSelect: [], //客户列表
      payerSelect: [], //付款方列表
      customerLoading: false,
      payerLoading: false,
      differenceValue: { //差价
        check_quantity: '', //核算吨位
        unit_price: '', //结算单价
        unload_nums: '' //卸车数
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
    searchCustomer(value) {
      this.isValue();
      this.getCustomer(value);
    },
    getCustomer: function(customer) {
      let postData = {
        page: 1,
        page_size: 50
      }
      if (customer) {
        postData.short_name = customer;
      }
      this.customerLoading = true;
      this.$$http('searchCustomerList', postData).then((results) => {
        this.customerLoading = false;
        if (results.data && results.data.code == 0) {
          this.customerSelect = results.data.data.data;
        }
      }).catch((err) => {
        this.customerLoading = false;
      })
    },
    searchPayer(value) {
      if (value) {
        for (let i in this.payerSelect) {
          if (value === this.payerSelect[i].id) {
            this.formRules.payer_name_adjust = this.payerSelect[i].payer;
            break;
          }
        }
      } else {
        this.formRules.payer_name_adjust = '';
      }
      this.isValue();
      this.getPayer(this.formRules.payer_name_adjust);
    },
    getPayer: function(payer) {
      let postData = {
        page: 1,
        page_size: 50
      }
      if (payer) {
        postData.payer = payer;
      }
      this.payerLoading = true;
      this.$$http('searchCustomerPayList', postData).then((results) => {
        this.payerLoading = false;
        if (results.data && results.data.code == 0) {
          this.payerSelect = results.data.data.data;
        }
      }).catch((err) => {
        this.payerLoading = false;
      })
    },
    isValue(type) {
      this.submitBtn.isDisabled = true;
      for (let i in this.formRules) {
        if (this.formRules[i]) {
          this.submitBtn.isDisabled = false;
          break;
        }
      }
      if (type === 'checkQuantity') {
        if (isNaN(this.formRules.check_quantity_adjust) || !this.$store.state.common.regular.tonnage.match.test(this.formRules.check_quantity_adjust) || !this.formRules.check_quantity_adjust) {
          this.differenceValue.check_quantity = '';
        } else {
          this.differenceValue.check_quantity = (parseFloat(this.formRules.check_quantity_adjust) * 1000 - parseFloat(this.adjustRow.check_quantity) * 1000) / 1000;
          this.differenceValue.check_quantity = (this.differenceValue.check_quantity).toFixed(3);
        }
      } else if (type === 'unitPrice') {
        if (isNaN(this.formRules.unit_price_adjust) || !this.$store.state.common.regular.price.match.test(this.formRules.unit_price_adjust) || !this.formRules.unit_price_adjust) {
          this.differenceValue.unit_price = '';
        } else {
          this.differenceValue.unit_price = (parseFloat(this.formRules.unit_price_adjust) * 100 - parseFloat(this.adjustRow.unit_price) * 100) / 100;
          this.differenceValue.unit_price = (this.differenceValue.unit_price).toFixed(2);
        }
      } else if (type === 'unloadNums') { //
        if (isNaN(this.formRules.unload_nums_adjust) || !this.$store.state.common.regular.vehicle.match.test(this.formRules.unload_nums_adjust) || !this.formRules.unload_nums_adjust) {
          this.differenceValue.unload_nums = '';
        } else {
          this.differenceValue.unload_nums = (parseFloat(this.formRules.unload_nums_adjust) * 1000 - parseFloat(this.adjustRow.unload_nums) * 1000) / 1000;
          this.differenceValue.unload_nums = (this.differenceValue.unload_nums).toFixed(3);
        }
      }
    },
    adjustBtn: function() {
      this.$refs['formRules'].validate((valid) => {
        if (valid) {
          this.submitBtn = {
            btnText: '调账中',
            isDisabled: true,
            isLoading: true
          }

          let postData = this.formRules;
          postData.id = this.adjustRow.id;
          let times = new Date();
          postData.adjust_time = times.Format("yyyy-MM-dd hh:mm:ss");
          postData.is_adjust = 'yes';
          postData.check_quantity_differ = this.differenceValue.check_quantity;
          postData.unit_price_differ = this.differenceValue.unit_price;
          postData.unload_nums_differ = this.differenceValue.unload_nums;


          postData = this.pbFunc.fifterObjIsNull(postData);
          this.$$http('updateSalesStatistics', postData).then((results) => {
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
        short_name_adjust: '', //客户简称
        payer_name: '', //付款方
        payer_id_adjust: '',
        check_quantity_adjust: '', //核算吨位
        unit_price_adjust: '', //结算价格
        unload_nums_adjust: '', //卸车数
        adjust_time: '', //调账时间
        remark_adjust: '', //调账备注
      };
      this.differenceValue = { //差价
        check_quantity: '', //核算吨位
        unit_price: '', //结算单价
        unload_nums: '' //卸车数
      }
      if (curVal) {
        this.getCustomer();
        this.getPayer();
      }
      this.submitBtn.isDisabled = true;
      if (this.$refs['formRules']) {
        this.$refs['formRules'].clearValidate();
      }

    },
  },
  created: function() {
    this.pbFunc.format();
    // this.getCustomer();
    // this.getPayer();
  }
}

</script>
