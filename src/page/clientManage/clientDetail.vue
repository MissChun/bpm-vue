<!-- clientDetail.vue -->
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
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="客户详情" name="detail">
        <div class="detail-main">
          <el-container>
            <el-header style="margin-top:15px;">
              <p>客户信息</p>
            </el-header>
            <el-main v-loading="pageLoading">
              <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      基础信息
                    </el-col>
                    <el-col :span="6" class="text-right">
                      <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑该条</el-button>
                    </el-col>
                  </el-row>
                </div>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label><span class="text-red">* </span>姓名:</label>
                      <div class="detail-form-item">{{clientData.name}}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label><span class="text-red">* </span>联系人:</label>
                      <div class="detail-form-item">{{clientData.contact_name}}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label><span class="text-red">* </span>联系电话:</label>
                      <div class="detail-form-item">{{clientData.contact_phone}}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label><span class="text-red">* </span>地址:</label>
                      <div class="detail-form-item">{{clientData.detail_address}}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label><span class="text-red">* </span>客户类型:</label>
                      <div class="detail-form-item">{{clientData.customer_type==='OWN'?'自有客户':'平台客户'}}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label><span class="text-red">* </span>社会机构代码:</label>
                      <div class="detail-form-item">{{clientData.license_code?clientData.license_code:clientData.license3in1_code}}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label><span class="text-red">* </span>亏吨标准:</label>
                      <div class="detail-form-item">{{clientData.deficiency_standard}}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label><span class="text-red">* </span>营业执照:</label>
                      <div class="detail-form-item"></div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      运费规则
                    </el-col>
                  </el-row>
                </div>
                <div class="trans-fee" v-for="fee in clientData.trans_fee">
                  <div class="table-list">
                    <el-table :data="fee.fee_detail" stripe style="width: 100%" size="mini">
                      <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                      </el-table-column>
                    </el-table>
                  </div>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label><span class="text-red">* </span>对应液厂:</label>
                        <div class="detail-form-item"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label><span class="text-red">* </span>生效时间:</label>
                        <div class="detail-form-item">{{clientData.fee.valid_start_datetime}}</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label><span class="text-red">* </span>失效时间:</label>
                        <div class="detail-form-item">{{clientData.fee.valid_end_datetime}}</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="text-center" v-if="!clientData.trans_fee.length">暂无数据</div>
              </div>
              <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      基础信息
                    </el-col>
                    <el-col :span="6" class="text-right">
                      <el-button type="primary" size="mini" @click="goEditDetail(1)">编辑该条</el-button>
                    </el-col>
                  </el-row>
                </div>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label><span class="text-red">* </span>到站免费等待时长:</label>
                      <div class="detail-form-item">{{clientData.free_hour}}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label><span class="text-red">* </span>超时计算单价:</label>
                      <div class="detail-form-item">{{clientData.overtime_price}}元/小时</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-main>
          </el-container>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'addPerson',
  data() {
    return {
      pageLoading: false,
      activeStep: 0,
      activeName: 'detail',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      clientData: {
        trans_fee: []
      },
      thTableList: [{
        title: '起点里程（公里）',
        param: 'start_mileage',
        width: ''
      }, {
        title: '终点里程（公里）',
        param: 'end_mileage',
        width: ''
      }, {
        title: '起步价（元/吨）',
        param: 'initiate_price',
        width: ''
      }, {
        title: '运输单价（元/吨/公里）',
        param: 'standard_fee',
        width: ''
      }],
    }
  },
  created() {
    this.getDetail();
  },
  computed: {
    id: function() {
      return this.$route.query.id;
    }
  },
  methods: {
    getDetail: function() {
      this.pageLoading = true;
      this.$$http('getCustomerDetail', { customer_id: this.id }).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.clientData = results.data.data;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    handleRemove: function(file, fileList) {

    },
    handlePreview: function(file) {

    },
    handleClick() {

    },
    goEditDetail: function(number) {
      this.$router.push({ path: "/clientManage/addClient?activeStep=" + number, query: { id: this.clientData.id, activeStep: number } });
    },

  }
}

</script>
