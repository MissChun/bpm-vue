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
            <p>编辑托运数据</p>
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
                    <el-input placeholder="暂无" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.waybill"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务单号:">
                    <el-input placeholder="暂无" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.business_order"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="承运商:" prop="carrier">
                    <!-- <el-input placeholder="暂无" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.carrier"></el-input> -->
                    <el-select v-model="editMsgForm.carrier" :loading="carrierLoading" filterable remote clearable @change="getCarrier" :remote-method="getCarrier" placeholder="请输入选择">
                      <el-option v-for="(item,key) in carriers" :key="item.id" :label="item.carrier_name" :value="item.carrier_name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车号:">
                    <el-input placeholder="暂无" type="text" v-model.trim="editMsgForm.plate_number" :disabled="isDisabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="液厂:">
                    <el-input placeholder="暂无" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.fluid"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="卸货站:">
                    <el-input placeholder="暂无" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.station"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="计划装车时间:" prop="plan_loading_time">
                    <el-date-picker v-model="editMsgForm.plan_loading_time" :disabled="isDisabled" type="datetime" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际到厂时间:">
                    <el-date-picker v-model="editMsgForm.active_time" :disabled="isDisabled" type="datetime" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" placeholder="暂无"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装车完成时间:">
                    <el-date-picker v-model="editMsgForm.work_end_time" type="datetime" :disabled="isDisabled" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际离站时间:">
                    <el-date-picker v-model="editMsgForm.leave_time" :disabled="isDisabled" type="datetime" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" placeholder="暂无"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装车吨位:">
                    <el-input placeholder="暂无" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.plan_tonnage"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实收吨位:">
                    <el-input placeholder="暂无" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.actual_quantity"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="亏吨:">
                    <el-input placeholder="暂无" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.deficiency"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="核算吨位:" prop="check_quantity">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.check_quantity"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="标准里程:" prop="stand_mile">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.stand_mile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际里程:" prop="actual_mile">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.actual_mile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="起步价:" prop="initial_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.initial_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="运输费率:" prop="change_rate">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.change_rate"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="标准运价:" prop="stand_freight">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.stand_freight"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="标准运费:" prop="freight_value">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.freight_value"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="气差金额:" prop="difference_value">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.difference_value"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="分卸费:" prop="lcl_cost">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.lcl_cost"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="卸车待时金额:" prop="waiting_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.waiting_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="运费合计:">
                    <el-input placeholder="暂无" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.waiting_charges"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否对账:" prop="is_reconciliation">
                    <el-input placeholder="暂无" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.is_reconciliation.verbose"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="对账时间:">
                    <el-input placeholder="暂无" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.reconciliation_time"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="调账时间:">
                    <el-input placeholder="暂无" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.adjust_time"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="调账备注:">
                    <el-input placeholder="暂无" type="textarea" resize="none" :rows="3" :disabled="isDisabled" v-model.trim="editMsgForm.remark_adjust"></el-input>
                  </el-form-item>
                </el-col>
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
  name: 'editConsignment',
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
        fluid: '', //实际液厂
        business_order: '',
        carrier: '', //承运商
        carrier_id: '',
        waybill: '', //运单号
        plan_loading_time: '', //计划装车时间
        active_time: '', //实际装车时间
        leave_time: '', //离站时间
        deficiency: '', //亏吨
        deficiency_standard: '', //亏吨标准
        plan_tonnage: '', //装车吨位
        actual_quantity: '', //实收吨位
        check_quantity: '', //核算吨位
        stand_mile: '', //标准里程
        actual_mile: '', //实际里程
        initial_price: '', //起步价
        change_rate: '', //运输费率
        difference_value: '', //气差金额
        freight_value: '', //标准运费
        change_rate: '', //运输费率
        lcl_cost: '', //分卸费
        waiting_price: '', //卸车待时金额
        waiting_charges: '', //运费合计
        unit_price: '', //采购单价
        plan_arrive_time: '', //计划到站时间
        free_hour: '', //免费等待时长
        overtime_price: '', //超时计算单价
        plate_number: '', //车牌号
        is_reconciliation: '', //是否对账
        station: '', //站点
        work_end_time: '',
        remark: '', //备注
        reconciliation_time: '',
        remark_adjust: '',
        adjust_time: '',
        stand_freight: ''
      },

      rules: {
        carrier: [
          { required: true, message: '请选择承运商', trigger: 'change' },
        ],
        check_quantity: [
          { pattern: this.$store.state.common.regular.tonnage.match, message: this.$store.state.common.regular.tonnage.tips, trigger: 'blur' },
        ],
        stand_mile: [
          { pattern: this.$store.state.common.regular.mile.match, message: this.$store.state.common.regular.mile.tips, trigger: 'blur' },
        ],
        actual_mile: [
          { pattern: this.$store.state.common.regular.mile.match, message: this.$store.state.common.regular.mile.tips, trigger: 'blur' },
        ],
        initial_price: [
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
        change_rate: [
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
        difference_value: [
          { pattern: this.$store.state.common.regular.accounts.match, message: this.$store.state.common.regular.accounts.tips, trigger: 'blur' },
        ],
        freight_value: [
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
        waiting_price: [
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
        lcl_cost: [
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
        change_rate: [
          { pattern: this.$store.state.common.regular.tonnage.match, message: this.$store.state.common.regular.tonnage.tips, trigger: 'blur' },
        ],
        stand_freight: [
          { pattern: this.$store.state.common.regular.tonnage.match, message: this.$store.state.common.regular.tonnage.tips, trigger: 'blur' },
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
      customerList: [],
      carriers: [],
      carrierLoading: false
    }
  },
  created() {
    this.numberReg = /^[0-9]+(.[0-9]{0,3})?$/;
    this.getCarrier();
    if (this.id) {
      this.getDetail();
    }
  },
  methods: {
    returnToPage: function() {
      // if (this.$route.query.id) {
      //   this.$router.push({ path: "/consignmentCenter/carrierManage/carrierDetail", query: { id: this.$route.query.id } });
      // } else {
      this.$router.push({ path: "/statistics/consignment/consignmentList" });
      // }
    },
    selectId(type) {
      setTimeout(() => {
        if (type === 'carrier') {
          for (let i in this.carriers) {
            if (this.editMsgForm.carrier === this.carriers[i].carrier_name) {
              this.editMsgForm.carrier_id = this.carriers[i].id;
            }
          }
        }
        // console.log('consumer_id', this.editMsgForm.carrier_id)
      }, 200)
    },
    getCarrier(query) {
      let postData = {
        page: 1,
        page_size: 100,
      };
      if (query) {
        postData.carrier_name = query;
      }
      this.carrierLoading = true;
      this.$$http('getCarrierList', postData).then((results) => {

        this.carrierLoading = false;
        if (results.data && results.data.code == 0) {
          this.carriers = results.data.data.data;
          this.selectId('carrier');
        }
      }).catch((err) => {
        this.carrierLoading = false;
      })

    },
    getDetail: function() {
      this.$$http('getConsignmentStatisticsDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.detail = results.data.data;
          this.editMsgForm = {
            fluid: this.detail.fluid, //实际液厂
            business_order: this.detail.business_order,
            carrier: this.detail.carrier, //承运商
            carrier_id: this.detail.carrier_id,
            waybill: this.detail.waybill, //运单号
            active_time: this.detail.active_time, //实际装车时间
            leave_time: this.detail.leave_time, //离站时间
            deficiency: this.detail.deficiency, //亏吨
            deficiency_standard: this.detail.deficiency_standard, //亏吨标准
            plan_tonnage: this.detail.plan_tonnage, //装车吨位
            actual_quantity: this.detail.actual_quantity, //实收吨位
            check_quantity: this.detail.check_quantity, //核算吨位
            stand_mile: this.detail.stand_mile, //标准里程
            actual_mile: this.detail.actual_mile, //实际里程
            initial_price: this.detail.initial_price, //起步价
            change_rate: this.detail.change_rate, //运输费率
            difference_value: this.detail.difference_value, //气差金额
            freight_value: this.detail.freight_value, //标准运费
            change_rate: this.detail.change_rate, //运输费率
            lcl_cost: this.detail.lcl_cost, //分卸费
            waiting_price: this.detail.waiting_price, //卸车待时金额
            waiting_charges: this.detail.waiting_charges, //运费合计
            unit_price: this.detail.unit_price, //采购单价
            plan_arrive_time: this.detail.plan_arrive_time, //计划到站时间
            free_hour: this.detail.free_hour, //免费等待时长
            overtime_price: this.detail.overtime_price, //超时计算单价
            plate_number: this.detail.plate_number, //车牌号
            is_reconciliation: this.detail.is_reconciliation, //是否对账
            station: this.detail.station, //站点
            work_end_time: this.detail.work_end_time,
            remark: this.detail.remark, //备注
            reconciliation_time: this.detail.reconciliation_time,
            remark_adjust: this.detail.remark_adjust,
            adjust_time: this.detail.adjust_time,
            stand_freight: this.detail.stand_freight,
            plan_loading_time: this.detail.plan_loading_time
          }
        }
      })

    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      let apiName = 'updateConsignmentStatistics';
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
              this.$router.push({ path: "/statistics/consignment/consignmentList" });
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
      let keyArray = ['carrier', 'carrier_id', 'check_quantity', 'stand_freight', 'stand_mile', 'actual_mile', 'initial_price', 'change_rate', 'difference_value', 'freight_value', 'freight_value', 'waiting_price', 'lcl_cost', 'remark'];
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray, true);
      if (btnType === 'out') {
        this.editAjax(postData, formName, btnObject, null, true);
      }
    },

  }
}

</script>
