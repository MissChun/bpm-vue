<!-- carrierDetail.vue -->
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
      <el-tab-pane label="承运商详情" name="detail">
        <div class="detail-main">
          <el-container>
            <el-header>
              <el-row>
                <el-col :span="3">
                  <router-link :to="{path: '/basicDataManage/carrierManage/carrierList'}">
                    <div class="go-return icon-back"></div>
                  </router-link>
                </el-col>
                <el-col :span="18">
                  <p>承运商信息</p>
                </el-col>
              </el-row>
            </el-header>
            <el-main v-loading="pageLoading">
              <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      基础信息
                    </el-col>
                    <el-col :span="6" class="text-right">
                      <el-button type="primary" size="mini" @click="goEditDetail()">编辑该条</el-button>
                    </el-col>
                  </el-row>
                </div>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>承运商名称:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.carrier_name)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>联系人:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.contact)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>联系电话:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.contact_phone)"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>地址:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.address)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>承运类型:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.carrier_type.verbose)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>是否启用:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.is_valid.verbose)"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>社会机构代码:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.credit_code?detailData.credit_code:detailData.organization_code)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>营业执照:</label>
                      <div class="detail-form-item"></div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      卸车待时约定
                    </el-col>
                    <el-col :span="6" class="text-right">
                      <el-button type="primary" size="mini" @click="goEditDetail()">编辑该条</el-button>
                    </el-col>
                  </el-row>
                </div>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>待时计算标准:</label>
                      <div class="detail-form-item" v-if="detailData.free_hour" v-html="pbFunc.dealNullData(detailData.free_hour+'小时')"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>待时计费标准:</label>
                      <div class="detail-form-item" v-if="detailData.overtime_price" v-html="pbFunc.dealNullData(detailData.overtime_price+'元/小时')"></div>
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
  name: 'carrierDetail',
  data() {
    return {
      pageLoading: false,
      activeStep: 0,
      activeName: 'detail',
      detailData: {
        carrier_type: {
          verbose: ''
        },
        is_valid: {
          verbose: ''
        },
      },
    }
  },
  created() {
    this.getDetail();
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    }
  },
  methods: {
    getDetail: function() {
      this.pageLoading = true;
      this.$$http('getCarrierDetail', { id: this.id }).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;
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
    goEditDetail: function() {
      this.$router.push({ path: "/basicDataManage/carrierManage/editCarrier", query: { id: this.detailData.id } });
    },

  }
}

</script>
