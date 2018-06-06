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
      <el-tab-pane label="标准里程详情" name="detail">
        <div class="detail-main">
          <el-container>
            <el-header style="margin-top:15px;">
              <p>标准里程信息</p>
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
                      <label>实际液厂:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.actual_fluid_name)"></div>
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div class="label-list">
                      <label>液厂地址:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.actual_fluid_address)"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>站点:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.station_name)"></div>
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div class="label-list">
                      <label>站点地址:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.station_address)"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>标准里程:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.mile)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>启用状态:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.is_active==='effective'?'是':'否')"></div>
                    </div>
                  </el-col>

                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>生效承运商:</label>
                      <div class="detail-form-item">
                        <span v-for="(item,index) in detailData.carriers">{{item.carrier_name}}<span v-if="index!=detailData.carriers.length-1"> ，</span></span>
                      </div>
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
  name: 'mileageDetail',
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
      detailData: {},
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
      let postData = {
        id: this.id,
      };
      this.pageLoading = true;
      this.$$http('getStandardMileDetail', postData).then((results) => {
        console.log('results', results.data.data.results);
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
      this.$router.push({ path: "/serviceManage/standardDataManage/editMileage?activeStep=" + number, query: { id: this.detailData.id, activeStep: number } });
    },

  }
}

</script>
