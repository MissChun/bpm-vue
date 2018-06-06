<!-- freightDetail.vue -->
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
      <el-tab-pane label="运费约定" name="detail">
        <div class="detail-main">
          <el-container>
            <el-header style="margin-top:15px;">
              <p>运费约定</p>
            </el-header>
            <el-main v-loading="pageLoading">
              <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      运费规则
                    </el-col>
                  </el-row>
                </div>
                <div class="trans-fee" v-for="(fee,index) in detailData">
                  <div class="table-list">
                    <el-table :data="fee.records" stripe style="width: 100%" size="mini">
                      <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                      </el-table-column>
                    </el-table>
                  </div>
                  <el-row :gutter="10" v-if="fee.agreements">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>对应液厂:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(fee.agreements.length?fee.agreements[0].fluid_name:'')"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>生效时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(fee.agreements.length?fee.agreements[0].effective_time:'')"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>失效时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(fee.agreements.length?fee.agreements[0].dead_time:'')"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" v-if="fee.agreements">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>生效承运商:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(fee.agreements.length?fee.agreements[0].carrier_name:'')"></div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
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
        records: []
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
        param: 'initial_price',
        width: ''
      }, {
        title: '变动费率（元/吨/公里）',
        param: 'change_rate',
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
    },
    carrier: function() {
      return this.$route.query.carrier;
    },
    fluid: function() {
      return this.$route.query.fluid;
    }
  },
  methods: {
    getDetail: function() {
      this.pageLoading = true;
      this.$$http('getFreightDetail', {
        id: this.id,
        agreements__carrier: this.carrier,
        agreements__fluid: this.fluid
      }).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data.data;
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
      this.$router.push({ path: "/clientManage/addClient?activeStep=" + number, query: { id: this.detailData.id, activeStep: number } });
    },

  }
}

</script>
