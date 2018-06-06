<style scoped lang="less">
.trans-fee {
  .table-list {
    margin-bottom: 20px;
  }
}

.detail-main {
  border-top: 0;
}

</style>
<template>
  <div class="detail-main process">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>贸易单进程</p>
      </el-header>
      <el-main v-loading="pageLoading">
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="24" class="text-center">
                <div>生成业务单</div>
              </el-col>
            </el-row>
          </div>
          <div class="process-content">
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="label-list">
                  <label>业务单号:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.order.order_number)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>业务单生成时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.order.created_at)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>操作人:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.order.operator_name)"></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                <div>新增审核</div>
              </el-col>
              <el-col :span="6" class="text-right">
                <div class="fs-14">
                  <span v-if="processData.order.order_status ==='create_manager_check'">新增经理审批中</span>
                  <span v-if="processData.order.order_status ==='create_department_check'">新增部门审批中</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="process-content">
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="label-list">
                  <label>新增-经理审核时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.create_manager_check.operate_time)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>新增-经理审核结果:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.create_manager_check.operate_cn)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>操作人:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.create_manager_check.operator_name)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="processData.create_manager_check.operate==='denied'">
              <el-col :span="24">
                <div class="label-list">
                  <label>拒绝理由:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.create_manager_check.refuse_note)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="processData.create_manager_check.operate!=='denied'">
              <el-col :span="8">
                <div class="label-list">
                  <label>新增-部门审核时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.create_department_check.operate_time)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>新增-部门审核结果:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.create_department_check.operate_cn)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>操作人:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.create_department_check.operator_name)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="processData.create_department_check.operate==='denied'">
              <el-col :span="24">
                <div class="label-list">
                  <label>拒绝理由:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.create_department_check.refuse_note)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="isToExamine&&processData.create_manager_check.operate==='pass'&&!processData.create_department_check.operate">
              <el-col :span="24">
                <div class="label-list text-right">
                  <el-button type="primary" plain size="medium" @click="refuseDialog.isShow = true">审核拒绝</el-button>
                  <el-button type="primary" size="medium" @click="adopt">审核通过</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="detail-list detail-form" v-if="processData.order.order_status ==='waiting_related'||processData.order.order_status ==='waiting_confirm'&&processData.waiting_related.commit_time">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                <div>关联</div>
              </el-col>
              <el-col :span="6" class="text-right">
                <div class="fs-14">
                  <span v-if="processData.order.order_status ==='waiting_related'">待关联</span>
                  <span v-if="processData.order.order_status ==='waiting_confirm'">已关联待确认</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="process-content">
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="label-list">
                  <label>关联时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.waiting_related.commit_time)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>关联运单号:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.waiting_related.order_number)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>操作人:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.waiting_related.commit_name)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="label-list">
                  <label>关联确认时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.waiting_related.operator_time)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>操作人:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.waiting_related.operator_name)"></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      <div>卸货</div>
                    </el-col>
                    <el-col :span="6" class="text-right">前往卸货地</el-col>
                  </el-row>
                </div>
                <div class="process-content">
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>卸货时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作人:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div> -->
        <!-- <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      <div>结算</div>
                    </el-col>
                    <el-col :span="6" class="text-right">待结算</el-col>
                  </el-row>
                </div>
                <div class="process-content">
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>结算时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作人:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="process-content">
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>修改前:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>修改后:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作人:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>修改-经理审核时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>修改-经理审核结果:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作人:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div> -->
        <div class="detail-list detail-form" v-if="false">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                <div>取消审核</div>
              </el-col>
              <el-col :span="6" class="text-right">
                <div class="fs-14">
                  <span v-if="processData.order.operate_status ==='cancel_check'">部门审批中</span>
                  <span v-if="processData.order.operate_status ==='canceled'">已完成</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="process-content">
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="label-list">
                  <label>取消时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.order.order_number)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>操作人:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.order.order_number)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="label-list">
                  <label>取消-部门审核时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.order.order_number)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>取消-部门审核结果:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.order.order_number)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>操作人:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.order.order_number)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <div class="label-list">
                  <label>拒绝理由:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(processData.order.order_number)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="isToExamine">
              <el-col :span="24">
                <div class="label-list text-right">
                  <el-button type="primary" plain size="medium" @click="refuseDialog.isShow = true">审核拒绝</el-button>
                  <el-button type="primary" size="medium" @click="adopt">审核通过</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      <div>修改审核</div>
                    </el-col>
                    <el-col :span="6" class="text-right">经理审批</el-col>
                  </el-row>
                </div>
                <div class="process-content">
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>修改前:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>修改后:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作人:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>修改-经理审核时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>修改-经理审核结果:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作人:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      <div>修改审核</div>
                    </el-col>
                    <el-col :span="6" class="text-right">部门审批</el-col>
                  </el-row>
                </div>
                <div class="process-content">
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>修改前:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>修改后:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作人:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>修改-经理审核时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>修改-经理审核结果:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作人:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="24">
                      <div class="label-list text-right">
                        <el-button type="primary" plain>审核拒绝</el-button>
                        <el-button type="primary">审核通过</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      <div>修改审核</div>
                    </el-col>
                    <el-col :span="6" class="text-right">部门审批</el-col>
                  </el-row>
                </div>
                <div class="process-content">
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>取消时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作人:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>取消-部门审核时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>取消-部门审核结果:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>操作人:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">

                    <el-col :span="24">
                      <div class="label-list">
                        <label>拒绝理由:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div> -->
      </el-main>
      <refuse-dialog :refuse-dialog="refuseDialog" v-on:closeDialogBtn="closeDialog"></refuse-dialog>
    </el-container>
  </div>
</template>
<script>
import refuseDialog from '@/components/businessManage/refuseDialog';
export default {
  name: 'tradeProcess',
  props: ['isToExamine'],
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
      processData: {
        order: { //生成业务单
          order_number: '',
          operator_name: '',
          created_at: ''
        },
        create_manager_check: { //新增经理审核
          operate_cn: '',
          operator_name: '',
          operate_time: ''
        },
        create_department_check: { //新增部门审核
          operate_cn: '',
          operator_name: '',
          operate_time: ''
        },
        waiting_related:{ //关联
          commit_name:'',
          commit_time:'',
          operate_cn: '',
          operator_name: '',
          operate_time: ''
        },
        waiting_confirm: { //关联
          operate_cn: '',
          operator_name: '',
          operate_time: ''
        },
        unloading: { //卸货
          operate_cn: '',
          operator_name: '',
          operate_time: ''
        },
        finished: { //结算
          operate_cn: '',
          operator_name: '',
          operate_time: ''
        },
        in_settlement: { //修改结算  待结算
          operate_cn: '',
          operator_name: '',
          operate_time: ''
        }
      },
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
          // this.processData = results.data.data;
          for (let i in results.data.data) {
            results.data.data[i].operate_cn = results.data.data[i].operate && results.data.data[i].operate === 'pass' ? '通过' : '拒绝';
            if (results.data.data[i].operate_status) {
              this.processData[results.data.data[i].operate_status] = results.data.data[i];
            } else if (results.data.data[i].order_number) {
              this.processData.order = results.data.data[i];
            }
          }
          console.log('this.processData', this.processData)
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    adopt() {
      this.$confirm("请确认业务单信息无误，审核通过后将等待匹配车辆", "业务单审核通过", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.$$http('toExamineBusiness', {
            order_id: this.id,
            action: 'pass'
          }).then((results) => {
            if (results.data && results.data.code == 0) {
              this.$message({
                message: '通过审核成功',
                type: 'success'
              });
              this.getProcess();
            }

          }).catch((err) => {
            this.$message.error('通过审核失败');
          })

        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消通过审核'
          });
        });
    },
  }
}

</script>
