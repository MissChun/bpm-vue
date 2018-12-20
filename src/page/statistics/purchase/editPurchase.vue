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
            <p>编辑采购数据</p>
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
                  <el-form-item label="供应商:" prop="supplier">
                    <el-select v-model="editMsgForm.supplier" :loading="supplierLoading" filterable remote clearable @change="getSupplier" @blur="selectId('supplier')" :remote-method="getSupplier" placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.supplierSelect" :key="item.id" :label="item.supplier_name" :value="item.supplier_name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="供方液厂名称:" prop="fluid">
                    <el-select v-model="editMsgForm.fluid" :loading="fluidLoading" filterable remote clearable @change="getFluidList" @blur="selectId('fluid')" :remote-method="getFluidList" placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.fluidSelect" :key="item.id" :label="item.fluid_name" :value="item.fluid_name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车号:">
                    <el-input placeholder="暂无" type="text" v-model.trim="editMsgForm.plate_number" :disabled="isDisabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际到厂时间:" prop="active_time">
                    <el-date-picker v-model="editMsgForm.active_time" type="datetime" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装车完成时间:" prop="work_end_time">
                    <el-date-picker v-model="editMsgForm.work_end_time" type="datetime" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际装车吨位:" prop="active_tonnage">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.active_tonnage"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="采购单价:" prop="unit_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.unit_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="卸货站:">
                    <el-input placeholder="暂无" type="text" v-model="editMsgForm.station" :disabled="isDisabled"></el-input>
                    <!-- <el-select v-model="editMsgForm.station" :loading="stationLoading" filterable clearable multiple @blur="selectId('station')"  placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.stationSelect" :key="item.id" :label="item.station_name" :value="item.station_name"></el-option>
                    </el-select> -->
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务优惠:" prop="business_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.business_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="采购优惠:" prop="discount_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.discount_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="采购总额:">
                    <el-input placeholder="暂无" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.unit_sum_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="优惠后总额:">
                    <el-input placeholder="暂无" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.discounts_sum_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="运单状态:">
                    <el-input placeholder="暂无" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.waybill_status"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否对账:">
                    <el-input placeholder="暂无" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.is_reconciliation"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否开票:">
                    <el-input placeholder="暂无" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.is_invoice"></el-input>
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
                  <el-form-item label="开票时间:">
                    <el-input placeholder="暂无" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.invoice_time"></el-input>
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
        supplier_id: '',
        fluid: '',
        fluid_id: '',
        plate_number: '',
        active_time: '',
        active_tonnage: '',
        business_price: '',
        unit_price: '',
        discount_price: '',
        unit_sum_price: '',
        discounts_sum_price: '',
        station: '',
        // station_id:[],
        is_invoice: '',
        is_reconciliation: '',
        waybill_status: '',
        work_end_time: '',
        invoice_time: '',
        reconciliation_time: '',
        remark_adjust: '',
        adjust_time: '',
        remark: ''
      },

      rules: {
        supplier: [
          { required: true, message: '请选择供应商', trigger: 'change' },
        ],
        fluid: [
          { required: true, message: '请选择液厂名称', trigger: 'change' },
        ],
        // station:[
        //   { required: true, message: '请选择卸货站', trigger: 'change' },
        // ],
        active_tonnage: [
          { pattern: this.$store.state.common.regular.tonnage.match, message: this.$store.state.common.regular.tonnage.tips, trigger: 'blur' },
        ],
        unit_price: [
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
        discount_price: [
          { pattern: this.$store.state.common.regular.accounts.match, message: this.$store.state.common.regular.accounts.tips, trigger: 'blur' },
        ],
        // unit_sum_price: [
        //   { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        // ],
        // discounts_sum_price: [
        //   { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        // ],
        business_price: [
          { pattern: this.$store.state.common.regular.accounts.match, message: this.$store.state.common.regular.accounts.tips, trigger: 'blur' },
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
      supplierLoading: false,
      fluidLoading: false,
      stationLoading: false,
      selectData: {
        supplierSelect: [], //供应商列表
        fluidSelect: [], //液厂列表
        stationSelect: [], //站点列表
      }
    }
  },
  created() {
    this.numberReg = /^[0-9]+(.[0-9]{0,3})?$/;
    this.getSupplier();
    this.getFluidList();
    // this.getSiteList();
    if (this.id) {
      this.getDetail();
    }
  },
  methods: {
    activeTime() {

    },
    returnToPage: function() {
      // if (this.$route.query.id) {
      //   this.$router.push({ path: "/consignmentCenter/carrierManage/carrierDetail", query: { id: this.$route.query.id } });
      // } else {
      this.$router.push({ path: "/statistics/purchase/purchaseList" });
      // }
    },
    selectId(type) {
      setTimeout(() => {
        if (type === 'supplier') {
          for (let i in this.selectData.supplierSelect) {
            if (this.selectData.supplierSelect[i].supplier_name == this.editMsgForm.supplier) {
              this.editMsgForm.supplier_id = this.selectData.supplierSelect[i].id;
              break;
            }
          }
        } else if (type === 'fluid') {
          for (let i in this.selectData.fluidSelect) {
            if (this.selectData.fluidSelect[i].fluid_name == this.editMsgForm.fluid) {
              this.editMsgForm.fluid_id = this.selectData.fluidSelect[i].id;
              // console.log(this.selectData.fluidSelect[i].id,'===',this.editMsgForm.fluid_id)
              break;
            }
          }
        }
        // else if(type==='station'){
        //   this.editMsgForm.station_id = [];
        //   for(let i in this.selectData.stationSelect){
        //     for(let j in this.editMsgForm.station){
        //       if(this.selectData.stationSelect[i].station_name == this.editMsgForm.station[j]){
        //         this.editMsgForm.station_id.push(this.selectData.stationSelect[i].id);
        //         // console.log(this.selectData.stationSelect[i].id,'===',this.editMsgForm.station_id)
        //         continue;
        //       }
        //     }
        //   }
        // }
        console.log('id', this.editMsgForm.fluid_id)
      }, 200)

    },
    // 供应商列表
    getSupplier: function(query) {
      let postData = {
        page: 1,
        page_size: 100,
      }
      if (query) {
        postData.supplier_name = query;
      }
      this.supplierLoading = true;
      this.$$http('searchSupplierList', postData).then((results) => {
        this.supplierLoading = false;
        if (results.data && results.data.code == 0) {
          this.selectData.supplierSelect = results.data.data.data;
        }
      }).catch((err) => {
        this.supplierLoading = false;
      })
    },
    // 液厂名称
    getFluidList: function(query) {
      let postData = {
        page: 1,
        page_size: 100,
      };
      if (query) {
        postData.fluid_name = query;
      }
      this.fluidLoading = true;
      this.$$http('getFluidsList', postData).then((results) => {
        this.fluidLoading = false;
        if (results.data && results.data.code == 0) {
          this.selectData.fluidSelect = results.data.data.data;
        }
      }).catch((err) => {
        this.fluidLoading = false;
      })

    },
    // 站点列表
    getSiteList: function(query) {
      let postData = {};
      this.$$http('getSiteList', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.selectData.stationSelect = results.data.data;
        }
      }).catch((err) => {})

    },
    getDetail: function() {
      this.$$http('getPurchaseStatisticsDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.detail = results.data.data;
          this.editMsgForm = {
            waybill: this.detail.waybill,
            supplier: this.detail.supplier,
            supplier_id: this.detail.supplier_id,
            fluid: this.detail.fluid,
            fluid_id: this.detail.fluid_id,
            plate_number: this.detail.plate_number,
            active_time: this.detail.active_time,
            active_tonnage: this.detail.active_tonnage,
            business_price: this.detail.business_price,
            unit_price: this.detail.unit_price,
            discount_price: this.detail.discount_price,
            unit_sum_price: this.detail.unit_sum_price,
            discounts_sum_price: this.detail.discounts_sum_price,
            station: (this.detail.station).join(','),
            // station_id: this.detail.station_id,
            is_invoice: this.detail.is_invoice.verbose,
            is_reconciliation: this.detail.is_reconciliation.verbose,
            waybill_status: this.detail.waybill_status.verbose,
            work_end_time: this.detail.work_end_time,
            invoice_time: this.detail.invoice_time,
            reconciliation_time: this.detail.reconciliation_time,
            remark_adjust: this.detail.remark_adjust,
            adjust_time: this.detail.adjust_time,
            remark: this.detail.remark
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
      let keyArray = ['supplier', 'supplier_id', 'fluid', 'fluid_id', 'active_time', 'active_tonnage', 'unit_price', 'discount_price', 'business_price', 'work_end_time', 'remark'];
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray, true);
      postData.discount_price = postData.discount_price ? postData.discount_price : 0;
      if (btnType === 'out') {
        this.editAjax(postData, formName, btnObject, null, true);
      }
    },

  }
}

</script>
