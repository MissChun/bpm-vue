<style scoped lang="less">
.label-list {
  margin-bottom: 0px;
}

.el-collapse-item {
  /deep/ .el-collapse-item__header {
    padding-left: 20px;

    background-color: #fafafa;
  }
  /deep/ .el-collapse-item__content {
    padding-top: 25px;
  }
}

.orderPossing {
  border: 1px solid #ebeef5;
  border-top: none;
  overflow-y: auto;
  max-height: 600px;
  overflow-x: hidden;
}

.el-button {
  margin-left: 0;
}

.process-btn {
  button {
    width: 100%;
    margin-bottom: 15px;
  }
}

</style>
<template>
  <div class="detail-main">
    <el-container v-show="!pageLoading">
      <el-header>
        <el-row>
          <el-col :span="3">
            <router-link :to="{path: backLink}">
              <div class="go-return icon-back"></div>
            </router-link>
          </el-col>
          <el-col :span="18">
            <p>贸易单进程</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row style="">
          <el-col :span="20" class="orderPossing mt-30">
            <el-collapse v-model="processData.length-1">
              <el-collapse-item :title="'业务单生成'">
                <div class="detail-list detail-form" v-if="processData.length">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>业务单号:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(processData[0].order_number)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>业务单生成时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(processData[0].operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(processData[0].operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item :title="item.type_cn" :name="key" v-for="(item,key) in processData" v-if="key" :key="key">
                <div class="detail-list detail-form" v-if="item.type === 'create_manager_check'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>新增-经理审核时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>新增-经理审核结果:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operation_cn)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" v-if="item.operation==='denied'">
                      <el-col :span="24">
                        <div class="label-list">
                          <label>拒绝理由:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.refuse_note)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'create_department_check'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>新增-部门审核时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>新增-部门审核结果:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operation_cn)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" v-if="item.operation==='denied'">
                      <el-col :span="24">
                        <div class="label-list">
                          <label>拒绝理由:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.refuse_note)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'waiting_confirm'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>关联时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.related_time)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>关联运单号:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.waybill_number)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'related_canceling'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>取消时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.related_time)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'to_site'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>关联卸货地确认时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'unloading'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>卸货时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'in_settlement'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>提交结算时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'settlement_check'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>修改前:</label>
                          <div class="detail-form-item" v-if="item.to_be_modify">
                            <span v-for="(data,index) in item.to_be_modify" v-if="data!=-1&&data!==''">
                              <span v-html="updateCn(index)+' - '"></span>{{item.before_opt[index]}}
                            <br>
                            </span>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>修改后:</label>
                          <div class="detail-form-item" v-if="item.to_be_modify">
                            <span v-for="(data,index) in item.to_be_modify" v-if="data!=-1&&data!==''">
                              <span v-html="updateCn(index)+' - '"></span>{{data}}
                            <br>
                            </span>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'settlement_check_end'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>修改-经理审核时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>修改-经理审核结果:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operation_cn)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" v-if="item.operation==='denied'">
                      <el-col :span="24">
                        <div class="label-list">
                          <label>拒绝理由:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.refuse_note)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'finished'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>结算完成时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'cancel_check'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>取消时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'cancel_check_end'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>取消-部门审核时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>取消-部门审核结果:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operation_cn)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" v-if="item.operation==='denied'">
                      <el-col :span="24">
                        <div class="label-list">
                          <label>拒绝理由:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.refuse_note)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'modify_department_check'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>修改前:</label>
                          <div class="detail-form-item" v-if="item.to_be_modify">
                            <span v-for="(data,index) in item.to_be_modify" v-if="data!=-1&&data!==''">
                              <span v-html="updateCn(index)+' - '"></span>{{item.before_opt[index]}}
                            <br>
                            </span>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>修改后:</label>
                          <div class="detail-form-item" v-if="item.to_be_modify">
                            <span v-for="(data,index) in item.to_be_modify" v-if="data!=-1&&data!==''">
                              <span v-html="updateCn(index)+' - '"></span>{{data}}
                            <br>
                            </span>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'modify_department_check_end'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>修改-部门审核时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>修改-部门审核结果:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operation_cn)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" v-if="item.operation==='denied'">
                      <el-col :span="24">
                        <div class="label-list">
                          <label>拒绝理由:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.refuse_note)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'canceled'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>取消时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="item.type === 'canceled_end'">
                  <div class="process-content">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>取消-部门审核时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>取消-部门审核结果:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operation_cn)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :span="3" :offset="1">
            <div v-if="isToExamine&&processData.length>1&&isShowBtn(processData)" class="process-btn">
              <el-button type="danger" @click="refuse(processData[0].type)" :disabled="refuseBtn.isDisabled" :loading="refuseBtn.isLoading">{{refuseBtn.text}}</el-button>
              <el-button type="primary" @click="adopt(processData[0].type)" :disabled="adoptBtn.isDisabled" :loading="adoptBtn.isLoading">{{adoptBtn.text}}</el-button>
            </div>
            <!-- <div v-else>{{isShowBtn(processData[0].type)}}</div> -->
          </el-col>
        </el-row>
      </el-main>
      <refuse-dialog :refuse-dialog="refuseDialog" v-on:closeDialogBtn="closeDialog" :title="refuseTitle"></refuse-dialog>
    </el-container>
  </div>
</template>
<script>
import refuseDialog from '@/components/businessManage/refuseDialog';
export default {
  name: 'tradeProcess',
  props: ['isToExamine', 'backLink'],
  components: {
    refuseDialog: refuseDialog
  },
  data() {
    return {
      pageLoading: false,
      activeName: 'process',
      refuseDialog: {
        isShow: false,
        id: this.$route.query.id
      },
      statusType: {
        create_manager_check: '新增经理审核',
        create_department_check: '新增部门审核',
        waiting_related: '待关联',
        related_canceling: '关联取消中',
        waiting_confirm: '关联后待确认',
        to_site: '前往卸货地',
        unloading: '已卸货',
        in_settlement: '待结算',
        finished: '已完成',
        canceled: '已取消',
        // canceled_end: '已取消',
        modify_manager_check: '修改审核——经理审核中',
        modify_manager_check_end: '修改审核——经理审核完成',
        modify_department_check: '修改审核——部门审核中',
        modify_department_check_end: '修改审核——部门审核完成',
        settlement_check: '结算审核',
        settlement_check_end: '结算审核完成',
        cancel_check: '取消审核——部门审核中',
        cancel_check_end: '取消审核——部门审核完成',
      },
      processData: {},
      refuseTitle: '',
      adoptBtn: {
        isDisabled: false,
        isLoading: false,
        text: '审核通过'
      },
      refuseBtn: {
        isDisabled: false,
        isLoading: false,
        text: '审核拒绝'
      }
    }
  },
  created() {
    this.getProcess()
  },

  computed: {
    id: function() {
      return this.$route.query.id;
    }
  },
  methods: {
    isShowBtn(data) {
      let status = '';
      if (data.length) status = data[0].type;
      switch (status) {
        case 'modify_department_check': //部门修改
          return true;
          break;
        case 'create_department_check': //部门审核
          return true;
          break;
        case 'cancel_check': //取消审核
          return true;
          break;
          // case 'plan_arrive_time':
          //   return '到站时间';
          //   break;
      }
    },
    updateCn(field) {
      switch (field) {
        case 'check_quantity':
          return '核算吨位';
          break;
        case 'settlement_price':
          return '结算价格';
          break;
        case 'plan_tonnage':
          return '计划吨位';
          break;
        case 'total_price':
          return '销售总价';
          break;
        case 'plan_arrive_time':
          return '到站时间';
          break;
        case 'settlement_total_price':
          return '结算总价';
          break;
      }
    },
    closeDialog: function(isSave) {
      this.refuseDialog.isShow = false;
      if (isSave) {
        this.getProcess();
      }

    },
    getProcess: function() {
      // this.pageLoading = true;
      this.$$http('getProcessDetail', { id: this.id }).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.processData = results.data.data;
          for (let i in this.processData) {
            this.processData[i].operation_cn = this.processData[i].operation && this.processData[i].operation === 'pass' ? '通过' : '拒绝';
            if (i > 0 && this.processData[i].type === 'modify_department_check') {
              if (typeof this.processData[i].to_be_modify != "object") {
                this.processData[i].type = 'modify_department_check_end'
              }
            }
            if (i > 0 && this.processData[i].type === 'cancel_check') {
              if (typeof this.processData[i].to_be_modify != "object") {
                this.processData[i].type = 'cancel_check_end'
              }
            }
            if (i > 0 && this.processData[i].type === 'settlement_check') {
              if (typeof this.processData[i].to_be_modify != "object") {
                this.processData[i].type = 'settlement_check_end'
              }
            }
            for (let j in this.statusType) {
              if (this.processData[i].type === j) {
                this.processData[i].type_cn = this.statusType[j];
              }

            }
          }
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    refuse(status) {
      this.refuseDialog.isShow = true;
      if (status == 'create_department_check') {
        this.refuseTitle = '业务单审核拒绝'
      } else if (status == 'modify_department_check') {
        this.refuseTitle = '业务单修改审核拒绝'
      } else if (status == 'cancel_check') {
        this.refuseTitle = '业务单取消审核拒绝'
      }

    },
    adopt(status) {
      let title = '';
      let desc = '';
      if (status === 'create_department_check') {
        title = '业务单审核通过';
        desc = '请确认业务单信息无误，审核通过后将等待匹配车辆';
      } else if (status === 'modify_department_check') {
        title = '业务单修改审核通过';
        desc = '请确认，修改被拒绝后，业务单将回置为修改前状态';
      } else if (status === 'cancel_check') {
        title = '业务单取消审核通过';
        desc = '通过后，业务单将被取消，卸货计划将被自动取消';
      }
      this.$msgbox({
        title: title,
        message: desc,
        confirmButtonText: "确定通过",
        cancelButtonText: "取消",
        showCancelButton: true,
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '提交中...';
            this.$$http('toExamineBusiness', {
              order_id: this.id,
              action: 'pass'
            }).then((results) => {
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
              if (results.data && results.data.code == 0) {
                this.$message({
                  message: '通过审核成功',
                  type: 'success'
                });
                done();
                this.getProcess();
              }

            }).catch((err) => {
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
              this.$message.error('通过审核失败');
            })

          } else {
            done();
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消通过审核'
        });
      });
      // this.$confirm(desc, title, {
      //     confirmButtonText: "确定通过",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //   .then(() => {
      //     this.$$http('toExamineBusiness', {
      //       order_id: this.id,
      //       action: 'pass'
      //     }).then((results) => {
      //       if (results.data && results.data.code == 0) {
      //         this.$message({
      //           message: '通过审核成功',
      //           type: 'success'
      //         });
      //         this.getProcess();
      //       }

      //     }).catch((err) => {
      //       this.$message.error('通过审核失败');
      //     })

      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '取消通过审核'
      //     });
      //   });
    },
  }
}

</script>
