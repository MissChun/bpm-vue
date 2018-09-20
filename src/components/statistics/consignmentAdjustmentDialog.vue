<style scoped lang="less">


</style>
<template>
  <div>
    <el-dialog title="调账" :visible="accountAdjustIsShow" width="50%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="adjustment-dialog-form">
        <el-form class="adjustment-dialog-content" label-width="120px" :rules="rules" :model="formRules" status-icon ref="formRules">
          <el-form-item label="承运商:">
            <el-row>
              <el-col :span="8">
                <div class="dialog-row-font">{{adjustRow.carrier}}</div>
              </el-col>
              <el-col :span="11">
                <el-select v-model="formRules.carrier_adjust" :loading="carrierLoading" filterable clearable @change="isValue" placeholder="请输入选择">
                  <el-option v-for="(item,key) in carrierSelect" :key="key" :label="item.carrier_name" :value="item.carrier_name"></el-option>
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
          <el-form-item label="标准里程:" prop="stand_mile_adjust">
            <el-row>
              <el-col :span="8">
                <div class="dialog-row-font">{{adjustRow.stand_mile}} 公里</div>
              </el-col>
              <el-col :span="11">
                <el-input placeholder="请输入" v-model="formRules.stand_mile_adjust" @change="isValue('standMile')"></el-input>
              </el-col>
              <el-col :span="5">差值：{{differenceValue.stand_mile}}</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="运费合计:" prop="waiting_charges_adjust">
            <el-row>
              <el-col :span="8">
                <div class="dialog-row-font">{{adjustRow.waiting_charges}} 元</div>
              </el-col>
              <el-col :span="11">
                <el-input placeholder="请输入" v-model="formRules.waiting_charges_adjust" @change="isValue('waitingCharges')"></el-input>
              </el-col>
              <el-col :span="5">差值：{{differenceValue.waiting_charges}}</el-col>
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
  name: 'consignmentAdjustmentDialog',
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
        carrier_adjust: '', //承运商
        check_quantity_adjust: '', //核算吨位
        stand_mile_adjust: '', //标准里程
        waiting_charges_adjust: '', //运费合计
        adjust_time: '', //调账时间
        remark_adjust: '', //调账备注
      },
      rules: {
        check_quantity_adjust: [
          { pattern: this.$store.state.common.regular.tonnage.match, message: this.$store.state.common.regular.tonnage.tips, trigger: 'blur' },
        ],
        stand_mile_adjust: [
          { pattern: this.$store.state.common.regular.mile.match, message: this.$store.state.common.regular.mile.tips, trigger: 'blur' },
        ],
        waiting_charges_adjust: [
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
      },
      submitBtn: {
        btnText: '确认调账',
        isDisabled: true,
        isLoading: false
      },
      carrierSelect: [], //客户列表
      carrierLoading: false,
      differenceValue: { //差价
        check_quantity: '', //核算吨位
        stand_mile: '', //标准里程
        waiting_charges: '', //运费合计
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
    getCarrier: function(carrier) {
      let postData = {
        need_all: true
      }
      // if (carrier) {
      //   postData.short_name = carrier;
      // }
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
        }
      } else if (type === 'standMile') {
        if (isNaN(this.formRules.stand_mile_adjust) || !this.$store.state.common.regular.mile.match.test(this.formRules.stand_mile_adjust) || !this.formRules.stand_mile_adjust) {
          this.differenceValue.stand_mile = '';
        } else {
          this.differenceValue.stand_mile = (parseFloat(this.formRules.stand_mile_adjust) * 10 - parseFloat(this.adjustRow.stand_mile) * 10) / 10;
        }
      } else if (type === 'waitingCharges') {
        if (isNaN(this.formRules.waiting_charges_adjust) || !this.$store.state.common.regular.price.match.test(this.formRules.waiting_charges_adjust) || !this.formRules.waiting_charges_adjust) {
          this.differenceValue.waiting_charges = '';
        } else {
          this.differenceValue.waiting_charges = (parseFloat(this.formRules.waiting_charges_adjust) * 100 - parseFloat(this.adjustRow.waiting_charges) * 100) / 100;
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
          postData = this.pbFunc.fifterObjIsNull(postData);
          this.$$http('updateConsignmentStatistics', postData).then((results) => {
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
        payer_name_id: '',
        check_quantity_adjust: '', //核算吨位
        unit_price_adjust: '', //结算价格
        unload_nums_adjust: '', //卸车数
        adjust_time: '', //调账时间
        remark_adjust: '', //调账备注
      };
      this.differenceValue = { //差价
        check_quantity: '', //核算吨位
        stand_mile: '', //标准里程
        waiting_charges: '', //运费合计
      };　　
      this.submitBtn.isDisabled = true;　　　　　　
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
