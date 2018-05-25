<style scoped lang="less">


</style>
<template>
  <div id="addPerson" class="detail-mian">
    <el-container>
      <el-header style="margin-top:15px;">
        <el-row>
          <el-col :span="2" class="left-arrow-d"><span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回{{returnPage}}</span></span>
          </el-col>
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <transition name="el-fade-in-linear">
          <div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="editForm" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="液厂名称:" prop="fluid_factory_id">
                    <el-select :loading="searchFluidLoading" v-model="userForm.fluid_factory_id" placeholder="请输入搜索" @change="chooseFluid">
                      <el-option v-for="(item,key) in fluidFactorySelect" :key="key" :label="item.fluid_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="液厂详细地址:">
                    {{fluidAddress}}
                  </el-form-item>
                </el-col>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="站点名称:" prop="fluid_site">
                    <el-select filterable remote :loading="searchSiteLoading" :remote-method="searchSite" v-model="userForm.fluid_site" placeholder="请选择" @change="chooseSite">
                      <el-option v-for="(item,key) in fluidSiteSelect" :key="key" :label="item.position_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="站点详细地址:">
                    {{siteAddress}}
                  </el-form-item>
                </el-col>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="标准里程:" prop="standard_mileage">
                    <el-input placeholder="请输入" type="text" v-model="userForm.standard_mileage"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="启用状态:">
                    <el-switch v-model="userForm.is_active"></el-switch>
                  </el-form-item>
                </el-col>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="primary" @click="saveAndReview()" :loading="saveAndReviewBtn.isLoading" :disabled="saveAndReviewBtn.isDisabled">{{saveAndReviewBtn.btnText}}</el-button>
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
  },
  data() {
    return {
      fluidAddress: '',
      siteAddress: '',
      searchFluidLoading: false,
      searchSiteLoading: false,
      saveAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      },
      userForm: {
        fluid_factory_id: '',
        fluid_site: '',
        standard_mileage: '',
        is_active: true,
      },
      rules: {
        fluid_factory_id: [ //姓名
          { required: true, message: '请选择液厂', trigger: 'blur' },
        ],
        fluid_site: [
          { required: true, message: '请选择站点', trigger: 'blur' },
        ],
        standard_mileage: [ //从业类型
          { required: true, message: '请输入标准里程', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' },
        ],
      },
      fluidFactorySelect: [],
      fluidSiteSelect: [],
    }
  },
  methods: {
    returnToPage: function() {
      if (this.id) {
        this.$router.push({ path: `/mapManage/standardMile/standardMileDetail/${this.id}` })
      } else {
        this.$router.push({ path: '/mapManage/standardMile/standardMilelist' })
      }
    },
    getfuildList: function() {
      let postData = {
        page: 1,
        page_size: 100,
      }
      this.searchFluidLoading = true;
      this.$$http('getFulid', postData).then((results) => {
        this.searchFluidLoading = false;
        if (results.data && results.data.code == 0) {
          this.fluidFactorySelect = results.data.data;
        }
      }).catch((err) => {
        this.searchFluidLoading = false;
      })
    },
    getSiteList: function(query) {
      let postData = {
        page: 1,
        page_size: 100,
      }
      if (query) {
        postData.position_name = query;
      }
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
    searchSite: function(query) {
      this.getSiteList(query);
    },
    chooseFluid: function() {
      console.log('this.userForm.fluid_factory_id', this.userForm.fluid_factory_id);
      for (let i in this.fluidFactorySelect) {
        if (this.userForm.fluid_factory_id === this.fluidFactorySelect[i].id) {
          this.fluidAddress = this.fluidFactorySelect[i].address;
          break;
        }
      }
    },
    chooseSite: function() {
      for (let i in this.fluidSiteSelect) {
        if (this.userForm.fluid_site === this.fluidSiteSelect[i].id) {
          this.siteAddress = this.fluidSiteSelect[i].address;
          break;
        }
      }
    },
    saveAndReview: function() {
      let apiName = 'addStandardMileList';
      let postData = this.userForm;

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
              this.$router.push({ path: `/mapManage/standardMile/standardMileDetail/${results.data.data.id}` })
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
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {

          this.userForm.fluid_factory_id = results.data.data.fluid_factory.id;
          this.fluidAddress = results.data.data.fluid_factory.address;
          this.userForm.fluid_site = results.data.data.fluid_site.id;
          this.siteAddress = results.data.data.fluid_site.address;
          this.userForm.standard_mileage = results.data.data.standard_mileage;
          this.userForm.is_active = results.data.data.is_active;

        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
  },
  created: function() {
    this.getfuildList();
    this.getSiteList();
    if (this.id) {
      this.getDetail();
    }
  }

}

</script>
