<style scoped lang="less">


</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="标准里程详情" name="first">
        <div class="tab-screen">
          <el-container v-loading="pageLoading">
            <el-main>
              <div class="detail-form-title">
                <el-row>
                  <el-col :span="12" :offset="6">
                    &nbsp;
                  </el-col>
                  <el-col :span="6" class="text-right">
                    <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑</el-button>
                  </el-col>
                </el-row>
              </div>
              <div class="detail-list detail-form">
                <el-row :gutter="10">
                  <el-col :span="2">
                    &nbsp;
                  </el-col>
                  <el-col :span="10">
                    <div class="label-list">
                      <label>液厂名称:</label>
                      <div class="detail-form-item">{{detailData.fluid_factory.fluid_name}}</div>
                    </div>
                  </el-col>
                  <el-col :span="10">
                    <div class="label-list">
                      <label>液厂详细地址:</label>
                      <div class="detail-form-item">{{detailData.fluid_factory.address}}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="2">
                    &nbsp;
                  </el-col>
                  <el-col :span="10">
                    <div class="label-list">
                      <label>站点名称:</label>
                      <div class="detail-form-item">{{detailData.fluid_site.position_name}}</div>
                    </div>
                  </el-col>
                  <el-col :span="10">
                    <div class="label-list">
                      <label>站点详细地址:</label>
                      <div class="detail-form-item">{{detailData.fluid_site.address}}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="2">
                    &nbsp;
                  </el-col>
                  <el-col :span="10">
                    <div class="label-list">
                      <label>标准里程:</label>
                      <div class="detail-form-item">{{detailData.standard_mileage}}</div>
                    </div>
                  </el-col>
                  <el-col :span="10">
                    <div class="label-list">
                      <label>启用状态:</label>
                      <div class="detail-form-item">
                        <el-switch disabled v-model="detailData.is_active"></el-switch>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-main>
          </el-container>
        </div>
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="second">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'standardMileDetail',
  computed: {
    id: function() {
      return this.$route.params.id
    }
  },
  data() {
    return {
      pageLoading: true,
      activeName: 'first',
      detailData: {
        fluid_site: {},
        fluid_factory: {},
      },

    }
  },
  methods: {
    getDetail: function() {
      let postData = {
        id: this.id,
      };
      //postData[this.searchFilters.field] = this.searchFilters.keyword;
      this.pageLoading = true;
      this.$$http('getStandardMileDetail', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    goEditDetail: function() {
      this.$router.push({
        path: '/mapManage/standardMile/editStandardMile',
        query: {
          id: this.id
        }
      })
    },
  },
  created() {
    this.getDetail();
  }
}

</script>
