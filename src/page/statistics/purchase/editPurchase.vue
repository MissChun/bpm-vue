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
      <el-header style="margin-top:15px;">
        <el-row>
          <el-col :span="2" class="left-arrow-d"><span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回列表页</span></span>
          </el-col>
          <el-col :span="20">
            <p>编辑采购数据</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading">
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
                  <el-form-item label="供应商:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.supplier"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="液厂:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.fluid"></el-input>
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
                  <el-form-item label="实际装车时间:" prop="active_time">
                    <el-date-picker v-model="editMsgForm.active_time" @change="activeTime" type="datetime" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际装车吨位:" prop="active_tonnage">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.active_tonnage"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="采购单价:" prop="unit_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.unit_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务优惠:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.business_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="优惠单价:" prop="discount_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.discount_price"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="采购总额:" prop="unit_sum_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.unit_sum_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="优惠后总额:" prop="discounts_sum_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.discounts_sum_price"></el-input>
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
  name: 'editPurchase',
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
        waybill: '',
        supplier: '',
        fluid: '',
        plate_number: '',
        active_time: '',
        active_tonnage: '',
        business_price: '',
        unit_price: '',
        discount_price: '',
        unit_sum_price: '',
        discounts_sum_price: '',
        remark:''
      },

      rules: {
        active_tonnage: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        unit_price: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        discount_price: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        unit_sum_price: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        discounts_sum_price: [
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
    activeTime() {
      console.log('装车时间',this.editMsgForm.active_time);
    },
    returnToPage: function() {
      // if (this.$route.query.id) {
      //   this.$router.push({ path: "/consignmentCenter/carrierManage/carrierDetail", query: { id: this.$route.query.id } });
      // } else {
        this.$router.push({ path: "/statistics/purchase/purchaseList" });
      // }
    },
    getDetail: function() {
      this.$$http('getPurchaseStatisticsDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.detail = results.data.data;
          console.log('form555', this.detail);

          this.editMsgForm = {
            waybill: this.detail.waybill,
            supplier: this.detail.supplier,
            fluid: this.detail.fluid,
            plate_number: this.detail.plate_number,
            active_time: this.detail.active_time,
            active_tonnage: this.detail.active_tonnage,
            business_price: this.detail.business_price,
            unit_price: this.detail.unit_price,
            discount_price: this.detail.discount_price,
            unit_sum_price: this.detail.unit_sum_price,
            discounts_sum_price: this.detail.discounts_sum_price,
            remark:''
          }
        }
      })

    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      let apiName = 'updatePurchaseStatistics';
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
              this.$router.push({ path: "/statistics/purchase/purchaseList" });
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
      let keyArray = ['active_time', 'active_tonnage', 'unit_price', 'discount_price', 'unit_sum_price', 'discounts_sum_price','remark'];
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray);
      console.log('postDataNew', postData);
      if (btnType === 'out') {
        this.editAjax(postData, formName, btnObject, null, true);
      }
    },

  }
}

</script>
