<!-- editMileage.vue -->
<style scoped lang="less">


</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container v-loading="pageLoading">
      <el-header style="margin-top:15px;">
        <el-row>
          <el-col :span="2" class="left-arrow-d"><span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回{{returnPage}}</span></span>
          </el-col>
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">标准里程信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="editForm" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="液厂名称:" prop="fluid">
                    <el-select :loading="searchFluidLoading" v-model="userForm.fluid" placeholder="请输入搜索" @change="chooseFluid">
                      <el-option v-for="(item,key) in fluidFactorySelect" :key="key" :label="item.actual_fluid_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="液厂详细地址:">
                    {{fluidAddress}}
                  </el-form-item>
                </el-col>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="站点名称:" prop="station">
                    <el-select filterable :loading="searchSiteLoading" v-model="userForm.station" placeholder="请选择" @change="chooseSite">
                      <el-option v-for="(item,key) in fluidSiteSelect" :key="key" :label="item.station_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="站点详细地址:">
                    {{siteAddress}}
                  </el-form-item>
                </el-col>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="标准里程:" prop="mile">
                    <el-input placeholder="请输入" type="text" v-model="userForm.mile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="生效承运商:" prop="carriers">
                    <el-select filterable :loading="carrierLoading" multiple v-model="userForm.carriers" placeholder="请选择">
                      <el-option v-for="(item,key) in carrierSelect" :key="key" :label="item.carrier_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="启用状态:">
                    <el-switch v-model="userForm.isActiveName"></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <!-- <el-button type="success" @click="editBasics(nextStepBtn,'next')" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button> -->
                  <el-button type="primary" @click="saveAndReview" :loading="saveAndReviewBtn.isLoading" :disabled="saveAndReviewBtn.isDisabled">{{saveAndReviewBtn.btnText}}</el-button>
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
  name: 'editStandardMile',
  computed: {
    returnPage: function() {
      return this.$route.query.id ? '详情页' : '列表页';
    },
    id: function() {
      return this.$route.query.id || '';
    },
    titleType: function() {
      return this.$route.query.id ? '编辑标准里程' : '新增标准里程';
    },
    activeStep: function() {
      return this.$route.query.activeStep || 0;
    },
  },
  data() {
    return {
      pageLoading: '',
      fluidAddress: '',
      siteAddress: '',
      searchFluidLoading: false,
      searchSiteLoading: false,
      carrierLoading: false,
      saveAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      },
      userForm: {
        fluid: '',
        station: '',
        mile: '',
        carriers: [],
        isActiveName: true,
      },
      rules: {
        fluid: [ //姓名
          { required: true, message: '请选择液厂', trigger: 'blur' },
        ],
        station: [
          { required: true, message: '请选择站点', trigger: 'blur' },
        ],
        mile: [ //从业类型
          { required: true, message: '请输入标准里程', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' },
        ],
        carriers: [
          { required: true, message: '请选择承运商', trigger: 'blur' },
        ],
      },
      fluidFactorySelect: [],
      fluidSiteSelect: [],
      carrierSelect: [],
      detailData: {}
    }
  },
  methods: {
    returnToPage: function() {
      if (this.id) {
        this.$router.push({ path: '/serviceManage/standardDataManage/mileageDetail', query: { id: this.id } })
      } else {
        this.$router.push({ path: '/serviceManage/standardDataManage/mileageDataList' })
      }
    },
    getFluidList: function() {
      let postData = {
        need_all: true
      };
      this.searchFluidLoading = true;
      this.$$http('getFluidList', postData).then((results) => {
        this.searchFluidLoading = false;
        if (results.data && results.data.code == 0) {
          this.fluidFactorySelect = results.data.data;
        }
      }).catch((err) => {
        this.searchFluidLoading = false;
      })

    },
    getSiteList: function() {
      let postData = {
        need_all: true
      };
      this.searchSiteLoading = true;
      this.$$http('getSiteList', postData).then((results) => {
        this.searchSiteLoading = false;
        if (results.data && results.data.code == 0) {
          this.fluidSiteSelect = results.data.data;
        }
      }).catch((err) => {
        this.searchSiteLoading = false;
      })

    },
    getCarrierList: function() {
      let postData = {
        need_all: true
      };
      this.carrierLoading = true;
      this.$$http('getCarrierList', postData).then((results) => {
        this.carrierLoading = false;
        if (results.data && results.data.code == 0) {
          this.carrierSelect = results.data.data;
        }
      }).catch((err) => {
        this.carrierLoading = false;
      })

    },

    chooseFluid: function() {
      console.log('this.userForm.fluid', this.userForm.fluid);
      for (let i in this.fluidFactorySelect) {
        if (this.userForm.fluid === this.fluidFactorySelect[i].id) {
          this.fluidAddress = this.fluidFactorySelect[i].actual_fluid_address;
          break;
        }
      }
    },
    chooseSite: function() {
      for (let i in this.fluidSiteSelect) {
        if (this.userForm.station === this.fluidSiteSelect[i].id) {
          this.siteAddress = this.fluidSiteSelect[i].address;
          break;
        }
      }
    },
    saveAndReview: function() {
      let apiName = 'addStandardMileList';
      let postData = this.userForm;
      if (postData.isActiveName) {
        postData.is_active = 'effective';
      } else {
        postData.is_active = 'ineffective';
      }
      // postData.carriers = this.userForm.carriersList.join(',');
      if (this.id) {
        apiName = 'patchStandardMileDetail';
        postData.id = this.id;
      }
      console.log('postData', postData)
      this.saveAndReviewBtn.isDisabled = true;
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          this.saveAndReviewBtn.btnText = '提交中';
          this.saveAndReviewBtn.isLoading = true;
          this.$$http(apiName, postData).then((results) => {
            console.log('results', results);
            this.saveAndReviewBtn.btnText = '保存并退出';
            this.saveAndReviewBtn.isLoading = false;
            this.saveAndReviewBtn.isDisabled = false;
            if (results.data && results.data.code === 0) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$router.push({ path: '/serviceManage/standardDataManage/mileageDetail', query: { id: results.data.data.id } })
            }
          }).catch((err) => {
            this.saveAndReviewBtn.btnText = '保存并退出';
            this.saveAndReviewBtn.isLoading = false;
            this.saveAndReviewBtn.isDisabled = false;
          })
        } else {
          this.saveAndReviewBtn.isDisabled = false;
        }
      });
    },
    getDetail: function() {
      let postData = {
        id: this.id,
      };
      //postData[this.searchFilters.field] = this.searchFilters.keyword;
      this.pageLoading = true;
      this.$$http('getStandardMileDetail', postData).then((results) => {
        console.log('results', results.data.data);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;
          this.userForm = {
            fluid: this.detailData.fluid,
            station: this.detailData.station,
            mile: this.detailData.mile,
            carriers: [],
            isActiveName: this.detailData.is_active.key === 'effective' ? true : false,
          }
          console.log('编辑',this.userForm);
          for(let i in this.detailData.carriers){
            this.userForm.carriers.push(this.detailData.carriers[i].id);
          }


        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
  },
  created: function() {
    this.getFluidList();
    this.getSiteList();
    this.getCarrierList();
    if (this.id) {
      this.getDetail();
    }
  }

}

</script>
