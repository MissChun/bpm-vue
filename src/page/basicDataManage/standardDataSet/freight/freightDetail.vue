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
            <el-header>
              <el-row>
                <el-col :span="3">
                  <router-link :to="{path: '/basicDataManage/standardDataSet/freight/freightList'}">
                    <div class="go-return icon-back"></div>
                  </router-link>
                </el-col>
                <el-col :span="18">
                  <p>运费约定</p>
                </el-col>
              </el-row>
            </el-header>
            <el-main v-loading="pageLoading">
              <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      运费规则
                    </el-col>
                    <el-col :span="6" class="text-right">
                      <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑该条</el-button>
                    </el-col>
                  </el-row>
                </div>
                <div class="trans-fee">
                  <div class="table-list">
                    <el-table :data="detailData.records" stripe style="width: 100%" size="mini">
                      <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                        <template slot-scope="scope">
                          <div class="fee-list" v-if="item.param==='start_mileage'||item.param==='end_mileage'">
                            {{scope.row[item.param]}}<span v-if="item.param==='start_mileage'">（不含）</span><span v-if="item.param==='end_mileage'">（含）</span>
                          </div>
                          <div v-else>{{scope.row[item.param]}}</div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <el-row :gutter="10" v-if="detailData.agreements">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>生效液厂:</label>
                        <!-- v-html="pbFunc.dealNullData(detailData.agreements.length?detailData.agreements[0].fluid_name:'')" -->
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.fluidListStr)">
                          <!-- <span v-for="(row,index) in detailData.agreements">{{row.fluid_name}}<span v-if="index!=detailData.agreements.length-1">，</span></span> -->
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>生效时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.agreements.length?detailData.agreements[0].effective_time:'')"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>失效时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.agreements.length?detailData.agreements[0].dead_time:'')"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" v-if="detailData.agreements">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>生效承运商:</label>
                        <!-- v-html="pbFunc.dealNullData(detailData.agreements.length?detailData.agreements[0].carrier_name:'')" -->
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.carrierListStr)">
                          <!-- <span v-for="(row,index) in detailData.agreements" v-if="index<5">{{row.carrier_name}}<span v-if="index!=4&&index!=detailData.agreements.length-1">，</span></span> -->
                        </div>
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
      }, {
        title: '变动值',
        param: 'change_number',
        width: ''
      }],
    }
  },
  created() {
    this.getDetail();
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    },

  },
  methods: {
    getDetail: function() {
      this.pageLoading = true;
      this.$$http('getFreightDetail', {
        id: this.id
      }).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;

          this.detailData.carrierListStr = '';
          this.detailData.fluidListStr = '';
          this.detailData.carriers = [];
          this.detailData.fluids = [];
          for (let j in this.detailData.agreements) {
            this.detailData.carriers.push(this.detailData.agreements[j].carrier_name);
            this.detailData.fluids.push(this.detailData.agreements[j].fluid_name);
          }
          this.detailData.carriers = [...new Set(this.detailData.carriers)];
          this.detailData.fluids = [...new Set(this.detailData.fluids)];
          for (let z in this.detailData.carriers) {
            this.detailData.carrierListStr += this.detailData.carriers[z] + (z < this.detailData.carriers.length - 1 ? '，' : '');
          }
          for (let x in this.detailData.fluids) {
            this.detailData.fluidListStr += this.detailData.fluids[x] + (x < this.detailData.fluids.length - 1 ? '，' : '');
          }
          console.log('运费详情', this.detailData)
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
      this.$router.push({ path: "/basicDataManage/standardDataSet/freight/editFreight?activeStep=" + number, query: { id: this.detailData.id, activeStep: number } });
    },

  }
}

</script>
