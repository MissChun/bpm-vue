<!-- tradeBusinessDetail.vue -->
<!-- clientDetail.vue -->
<style scoped lang="less">
.trans-fee {
  .table-list {
    margin-bottom: 20px;
  }
}
.detail-main{
  border-top: 0;
}
</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="业务详情" name="detail">
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
                      业务单信息
                    </el-col>
                    <el-col :span="6" class="text-right">
                      <!-- <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑该条</el-button> -->
                    </el-col>
                  </el-row>
                </div>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>业务单号:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>业务单生成时间:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>业务员:</label>
                      <div class="detail-form-item">{{detailData.contact_phone}}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>区域经理:</label>
                      <div class="detail-form-item">{{detailData.detail_address}}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>客户简称:</label>
                      <div class="detail-form-item">{{detailData.customer_type==='OWN'?'自有客户':'平台客户'}}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>客户名称:</label>
                      <div class="detail-form-item">{{detailData.license_code?detailData.license_code:detailData.license3in1_code}}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>来源液厂:</label>
                      <div class="detail-form-item">{{detailData.deficiency_standard}}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>卸车待时费:</label>
                      <div class="detail-form-item"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>销售价格:</label>
                      <div class="detail-form-item"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>销售总价:</label>
                      <div class="detail-form-item">{{detailData.deficiency_standard}}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>结算价格:</label>
                      <div class="detail-form-item"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>结算总价:</label>
                      <div class="detail-form-item"></div>
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
      detailData: {
        trans_fee: []
      },
    }
  },
  created() {
    // this.getDetail();
  },
  computed: {
    id: function() {
      return this.$route.query.id;
    }
  },
  methods: {
    getDetail: function() {
      // this.pageLoading = true;
      this.$$http('getBusinessDetail', { business_order_id: this.id }).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    handleRemove: function(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview: function(file) {
      console.log(file);
    },
    handleClick() {

    },
    goEditDetail: function(number) {
      this.$router.push({ path: "/clientManage/addClient?activeStep=" + number, query: { id: this.clientData.id, activeStep: number } });
    },

  }
}

</script>
