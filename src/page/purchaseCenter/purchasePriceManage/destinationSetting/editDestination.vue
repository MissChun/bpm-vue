<!-- editDestination.vue -->
<style scoped lang="less">
.el-table {
  // /deep/ td {
  //   padding: 0;
  //   font-size: 14px;
  // }
  // /deep/ .cell {
  //   padding: 0!important;
  // }
  /deep/ th {
    text-align: center!important;
  }
  td {
    .el-checkbox {
      margin-right: 20px;
      margin-left: 0;
    }
  }
}

.unit {
  right: -40px!important;
}

</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="returnToPage"></div>
            <!-- <span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回{{returnPage}}</span></span> -->
          </el-col>
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="mt-30">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">约定目的地</div>
            <div class="table-list border-clear">
              <el-form class="addheaduserform detail-form" label-width="120px" ref="addFormSetpOne" :rules="rules" :model="editMsgForm" status-icon>
                <el-table :data="tableData" stripe style="width: 100%" size="mini" border v-loading="pageLoading">
                  <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" :align="item.param==='first_area'?'center':'left'" :label="item.title" :width="item.width?item.width:''">
                    <template slot-scope="scope">
                      <div v-if="item.param === 'first_area'">{{scope.row[item.param].area_name}}</div>
                      <div v-if="item.param === 'second_areas'">
                        <el-checkbox-group v-model="selectMenus">
                          <el-checkbox v-for="(area,index) in scope.row[item.param]" :label="area.id" :disabled="area.area_name==='中国'?true:false">{{area.area_name}}</el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </div>
            </el-form>
            <div class="page-list text-center">
              <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>pageData.pageSize">
              </el-pagination>
            </div>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <!-- <el-button type="success" @click="editBasics(nextStepBtn,'next')" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button> -->
                  <el-button type="primary" @click="editBasics(saveBasicAndReviewBtn,'out')" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==1">
            <div class="detail-form-title text-center">液厂价格生效时间</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addFormSetpTwo" :rules="rules" :model="editMsgForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="生效价格时间:" prop="effect_time">
                    <el-time-picker v-model="editMsgForm.effect_time" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="请选择">
                    </el-time-picker>
                    <!-- <el-time-picker v-model="test" arrow-control format="HH:MM" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="请选择"> -->
                    </el-time-picker>
                    <span class="unit">以后</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="primary" @click="editUnload(saveBasicAndReviewBtn)" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
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
  name: 'editDestination',
  computed: {
    // titleType: function() {
    //   return this.$route.query.id ? '编辑承运商' : '新增承运商';
    // },
    activeStep: function() {
      return this.$route.query.activeStep || 0;
    },
    id: function() {
      return this.$route.query.id || '';
    },
    returnPage: function() {
      return this.$route.query.id ? '详情页' : '列表页';
    },
  },
  data() {
    return {
      test: new Date(2016, 9, 10, 18, 40),
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      pageLoading: false,
      titleType: '',
      addType: '默认新增',
      selectCustomer: '',
      editMsgForm: {
        effect_time: ''
      },
      selectData: {

      },
      rules: {

      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      },
      nextStepBtn: {
        isLoading: false,
        btnText: '保存并下一步',
        isDisabled: false,
      },
      detail: {},
      customerList: [],
      isDisabled: false,
      tableData: [],
      selectMenus: [], //所选地区
      thTableList: [{
        title: '所属地区',
        param: 'first_area',
        width: '140'
      }, {
        title: '目的地',
        param: 'second_areas',
        width: ''
      }],
    }
  },
  created() {
    if (this.id) {
      this.pbFunc.format();
      this.getBusinessList();
      this.getDetail();
    }
  },
  methods: {
    pageChange() {
      setTimeout(() => {
        this.getBusinessList();
      })
    },
    returnToPage: function() {
      this.$router.push({ path: "/purchaseCenter/purchasePriceManage/destinationSetting/destinationSettingList" });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    getBusinessList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize
      }
      this.pageLoading = true;
      this.$$http('getBusinessAreasList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.data;
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    getDetail: function() {
      let newDate = new Date();
      let dateArr = newDate.toLocaleDateString().split('/');
      this.$$http('getDestinationDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.detail = results.data.data;
          console.log('form555', this.detail);
          this.titleType = this.detail.fluid_name;
          for (let i in this.detail.areas) {
            this.selectMenus.push(this.detail.areas[i].area_id);
          }
          let timeArr = this.detail.areas.length ? (this.detail.areas[0].effect_time).split(':') : [];
          if (timeArr.length) {
            this.editMsgForm.effect_time = new Date(dateArr[0], dateArr[1], dateArr[2], timeArr[0], timeArr[1]);
          }


          console.log('有效时间', this.detail.areas,this.selectMenus)

        }
      })

    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      let apiName = '';
      btnObject.isDisabled = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* 如果id存在则为编辑 */

          if (stepNum === 0) {
            apiName = 'updateDestinationAreas';
            // postData.id = this.id;
          } else {
            apiName = 'updateDestinationTime';
          }
          btnObject.btnText = '正在提交';
          btnObject.isLoading = true;

          //postData = this.pbFunc.fifterObjIsNull(postData);
          console.log('参数', postData, formName, btnObject, stepNum, isReview)
          this.$$http(apiName, postData).then((results) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;
            console.log('results', results);
            if (results.data && results.data.code == 0) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              // if (isReview) {
                this.$router.push({ path: "/purchaseCenter/purchasePriceManage/destinationSetting/destinationSettingList" });
              // }
            }
          }).catch((err) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;
          })
        } else {
          btnObject.isDisabled = false;
        }
      });
    },
    editBasics(btn, btnType) {
      let formName = 'addFormSetpOne';
      let btnObject = btn;

      // let keyArray = ['carrier_name', 'contact', 'contact_phone', 'address', 'is_valid', 'carrier_type'];
      // let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray);
      let postData = {
        fluid_id: this.id,
        area_ids: this.selectMenus
      }
      console.log('postDataNew', postData);
      if (btnType === 'out') {
        this.editAjax(postData, formName, btnObject, 0, true);
      }
    },
    editUnload(btn) {
      console.log('this.userForm', this.editMsgForm);

      let formName = 'addFormSetpTwo';
      let btnObject = btn;
      // let keyArray = ['effect_time'];
      let postData = {
        relations: this.selectMenus
      };
      let timeArr = this.editMsgForm.effect_time.Format("hh:mm:ss").split(':');
      postData.effect_time = timeArr.length ? timeArr[0] + ':' + timeArr[1] : '';
      console.log('postDataNew', postData, this.editMsgForm.effect_time.Format("hh:mm:ss").split(':'));
      this.editAjax(postData, formName, btnObject, 1, true);
    },
    // saveBasicAndReview() {
    //   let formName = 'addClientFormSetpOne';
    //   let btnObject = this.saveBasicAndReviewBtn;
    //   let keyArray = ['name', 'work_type', 'mobile_phone', 'staff_type', 'id_number', 'on_job_status', 'gender', 'birthday', 'age', 'family_member_name', 'family_member_phone', 'drive_license_allow_type', 'detail_address'];
    //   let postData = this.pbFunc.fifterbyArr(this.userForm, keyArray);
    //   postData.area = this.userForm.address.area || this.userForm.address.city || '';
    //   this.editAjax(postData, formName, btnObject, null, true);
    // },
  },
  watch: {
    // selectMenus: {
    //   handler(val, oldVal) {　　
    //     // for (let i = 0; i < val.length; i++) {　　　　　　　　
    //     //   if (oldVal[i] != val[i]) {　　　　　　　　　　
    //     console.log('更新检测', val)　　　　　　　　
    //     //   }　　　　　　
    //     // }
    //   },
    //   　　　　deep: true
    // }
  }
}

</script>
