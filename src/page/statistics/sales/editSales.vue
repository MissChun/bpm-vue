<style scoped lang="less">
/deep/ .code {
  input {
    border-color: #dcdfe6!important;
  }
  i {
    display: none;
  }
}

</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container v-loading="pageLoading">
      <el-header>
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="returnToPage"></div>
          </el-col>
          <el-col :span="20">
            <p>编辑销售数据</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading" class="mt-30">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">数据信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addFormSetpOne" :rules="rules" :model="editMsgForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="运单号:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.waybill"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务单号:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.business_order"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户简称:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.short_name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="客户名称:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.consumer_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="液厂:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.fluid"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="卸货站:" prop="fluid">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.station"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="车号:">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.plate_number" :disabled="isDisabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="离站时间:">
                    <el-date-picker v-model="editMsgForm.leave_time" type="datetime" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装车吨位:" prop="plan_tonnage">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.plan_tonnage"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="实收吨位:" prop="actual_quantity">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.actual_quantity"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="亏吨:" prop="deficiency">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.deficiency"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="核算吨位:" prop="check_quantity">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.check_quantity"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="销售单价:" prop="unit_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.unit_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="卸车数:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.unload_nums"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="卸车待时金额:" prop="waiting_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.waiting_price"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="销售总额:" prop="sell_rental">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.sell_rental"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="待时后总额:" prop="waiting_charges">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.waiting_charges"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务员:" prop="sale_man">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.sale_man"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="备注:" prop="remark">
                    <el-input placeholder="请输入" type="textarea" resize="none" :rows="3" v-model.trim="editMsgForm.remark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <!-- <el-button type="success" @click="editBasics(nextStepBtn,'next')" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button> -->
                  <el-button type="primary" @click="editBasics(saveBasicAndReviewBtn,'out')" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'editSales',
  computed: {
    activeStep: function() {
      return this.$route.query.activeStep || 0;
    },
    id: function() {
      return this.$route.query.id || '';
    },
  },
  data() {
    return {
      pageLoading: false,
      isDisabled: true,
      editMsgForm: {
        waybill: '', //运单
        business_order: '', //业务单号
        fluid: '', //液厂
        plate_number: '', //车牌号
        short_name: '', //客户简称
        consumer_name: '', //客户名称
        station: '', //站点
        plate_number: '', //车牌号
        leave_time: '', //l离站时间
        plan_arrive_time: '', //计划到站时间
        deficiency: '', //亏吨
        deficiency_standar: '', //亏吨标准
        plan_tonnage: '', //装车吨位
        actual_quantity: '', //实收吨位
        check_quantity: '', //核算吨位
        unit_price: '', //销售单价
        business_price: '', //业务优惠
        discount_price: '', //优惠单价
        unload_num: '', //卸车数
        waiting_price: '', //卸车待时金额
        sell_rental: '', //销售总额
        waiting_charges: '', //待时总额
        sale_man: '', //业务员
        remark: '' //备注
      },

      rules: {
        actual_quantity: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        plan_tonnage: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        check_quantity: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        discount_price: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        unit_price: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        waiting_price: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        sell_rental: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        waiting_charges: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],

      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      },
      nextStepBtn: {
        isLoading: false,
        btnText: '保存并下一步',
        isDisabled: false,
      },
      detail: {},
      customerList: []
    }
  },
  created() {
    this.numberReg = /^[0-9]+(.[0-9]{0,3})?$/;
    if (this.id) {
      this.getDetail();
    }
  },
  methods: {
    returnToPage: function() {
      // if (this.$route.query.id) {
      //   this.$router.push({ path: "/consignmentCenter/carrierManage/carrierDetail", query: { id: this.$route.query.id } });
      // } else {
      this.$router.push({ path: "/statistics/sales/salesList" });
      // }
    },
    getDetail: function() {
      this.$$http('getSalesStatisticsDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.detail = results.data.data;
          console.log('form555', this.detail);

          this.editMsgForm = {
            waybill: this.detail.waybill, //运单
            business_order: this.detail.business_order, //业务单号
            fluid: this.detail.fluid, //液厂
            plate_number: this.detail.plate_number, //车牌号
            short_name: this.detail.short_name, //客户简称
            consumer_name: this.detail.consumer_name, //客户名称
            station: this.detail.station, //站点
            plate_number: this.detail.plate_number, //车牌号
            leave_time: this.detail.leave_time, //l离站时间
            plan_arrive_time: this.detail.plan_arrive_time, //计划到站时间
            deficiency: this.detail.deficiency, //亏吨
            deficiency_standar: this.detail.deficiency_standar, //亏吨标准
            plan_tonnage: this.detail.plan_tonnage, //装车吨位
            actual_quantity: this.detail.actual_quantity, //实收吨位
            check_quantity: this.detail.check_quantity, //核算吨位
            unit_price: this.detail.unit_price, //销售单价
            business_price: this.detail.business_price, //业务优惠
            discount_price: this.detail.discount_price, //优惠单价
            unload_nums: this.detail.unload_nums, //卸车数
            waiting_price: this.detail.waiting_price, //卸车待时金额
            sell_rental: this.detail.sell_rental, //销售总额
            waiting_charges: this.detail.waiting_charges, //待时总额
            sale_man: this.detail.sale_man, //业务员
            remark: ''
          }
          console.log('this.editMsgForm', this.detail, this.editMsgForm)
        }
      })

    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      let apiName = 'updateSalesStatistics';
      btnObject.isDisabled = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          btnObject.btnText = '正在提交';
          btnObject.isLoading = true;
          postData.id = this.id;
          this.$$http(apiName, postData).then((results) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;
            if (results.data && results.data.code == 0 && results.data.data) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$router.push({ path: "/statistics/sales/salesList" });
            }
          }).catch((err) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;
          })
        } else {
          btnObject.isDisabled = false;
        }
      });
    },
    editBasics(btn, btnType) {
      let formName = 'addFormSetpOne';
      let btnObject = btn;
      let keyArray = ['leave_time','plan_tonnage', 'actual_quantity', 'check_quantity', 'unit_price', 'waiting_price', 'sell_rental', 'waiting_charges', 'remark'];
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray);
      console.log('postDataNew', postData);
      if (btnType === 'out') {
        this.editAjax(postData, formName, btnObject, null, true);
      }
    },

  }
}

</script>
