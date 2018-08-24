<!-- personDetail.vue -->
<style scoped lang="less">


</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>人员信息</p>
      </el-header>
      <el-main>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                基础人员
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑该条</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label><span class="text-red">* </span>姓名:</label>
                <div class="detail-form-item">{{userData.name}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label><span class="text-red">* </span>从业类型:</label>
                <div class="detail-form-item">{{userData.work_type.verbose}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label><span class="text-red">* </span>手机号码:</label>
                <div class="detail-form-item">{{userData.mobile_phone}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label><span class="text-red">* </span>人员所属:</label>
                <div class="detail-form-item">{{userData.staff_type.verbose}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label><span class="text-red">* </span>身份证号:</label>
                <div class="detail-form-item">{{userData.id_number}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label><span class="text-red">* </span>在职状态:</label>
                <div class="detail-form-item">{{userData.on_job_status.verbose}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>性别:</label>
                <div class="detail-form-item">{{userData.gender.verbose}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>出生日期:</label>
                <div class="detail-form-item">{{userData.birthday}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>年龄:</label>
                <div class="detail-form-item">{{userData.age}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>家属姓名:</label>
                <div class="detail-form-item">{{userData.family_member_name}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label><span class="text-red">* </span>家属联系方式:</label>
                <div class="detail-form-item">{{userData.family_member_phone}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>准驾类型:</label>
                <div class="detail-form-item">{{userData.drive_license_allow_type}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>所在地区:</label>
                <div class="detail-form-item">{{userData.address.province}}{{userData.address.city}}{{userData.address.area}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label><span class="text-red">* </span>详细地址:</label>
                <div class="detail-form-item">{{userData.detail_address}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>身份证:</label>
                <div class="detail-form-item">{{userData.drive_license_photo}}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="detail-list detail-form" v-show="userData.work_type.key === 'DRIVER' || userData.work_type.key === 'DRIVER_ESCORT'">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                驾驶证件信息
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(1)">编辑该条</el-button>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>驾驶证档案编号:</label>
                <div class="detail-form-item">{{userData.drive_license_number}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>初次发证时间:</label>
                <div class="detail-form-item">{{userData.drive_license_issue_date}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>到期时间:</label>
                <div class="detail-form-item">{{userData.drive_license_due_date}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>发证机关:</label>
                <div class="detail-form-item">{{userData.drive_license_issue_organ}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>驾驶证:</label>
                <div class="detail-form-item">{{userData.drive_license_photo}}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="detail-list detail-form" v-show="userData.work_type.key === 'DRIVER' || userData.work_type.key === 'DRIVER_ESCORT'">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                从业资格证信息
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(2)">编辑该条</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>从业资格证号:</label>
                <div class="detail-form-item"><span class="text-red">* </span>{{userData.qualification_certificate_number}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>初次发证时间:</label>
                <div class="detail-form-item">{{userData.qualification_certificate_issue_date}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>到期时间:</label>
                <div class="detail-form-item">{{userData.qualification_certificate_due_date}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>发证机关:</label>
                <div class="detail-form-item">{{userData.qualification_certificate_issue_organ}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>从业资格证:</label>
                <div class="detail-form-item">{{userData.qualification_certificate_photo}}</div>
              </div>
            </el-col>
          </el-row>
          <!-- </el-form> -->
        </div>
        <div class="detail-list detail-form" v-show="userData.work_type.key === 'ESCORT' || userData.work_type.key === 'DRIVER_ESCORT'">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                押运证信息
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(3)">编辑该条</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>押运证号:</label>
                <div class="detail-form-item">{{userData.escort_license_number}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>初次发证时间:</label>
                <div class="detail-form-item">{{userData.escort_license_issue_date}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>到期时间:</label>
                <div class="detail-form-item">{{userData.escort_license_due_date}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>发证机关:</label>
                <div class="detail-form-item">{{userData.escort_license_issue_organ}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>从业资格证:</label>
                <div class="detail-form-item">{{userData.escort_license_photo}}</div>
              </div>
            </el-col>
          </el-row>
          <!-- </el-form> -->
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                劳务信息
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(4)">编辑该条</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>录用日期:</label>
                <div class="detail-form-item">{{userData.labour_employ_date}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>上岗日期:</label>
                <div class="detail-form-item">{{userData.labour_on_work_date}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>下岗日期:</label>
                <div class="detail-form-item">{{userData.labour_off_work_date}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>合同起始日期:</label>
                <div class="detail-form-item">{{userData.contract_start_date}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>合同截止日期:</label>
                <div class="detail-form-item">{{userData.contract_due_date}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>转正日期:</label>
                <div class="detail-form-item">{{userData.contract_correct_date}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>体检日期:</label>
                <div class="detail-form-item">{{userData.heath_examination_date}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <div class="label-list">
                <label>体检备注:</label>
                <div class="detail-form-item">{{userData.heath_examination_remark}}</div>
              </div>
            </el-col>
          </el-row>
          <!-- </el-form> -->
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title ">
            <el-row :gutter="10">
              <el-col :span="12" :offset="6" class="text-center">
                培训信息
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(5)">新增一条</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :model="userData" status-icon> -->
          <div v-for="(item,key) in userData.carrier_driver_trainings">
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="label-list">
                  <label>培训时间:</label>
                  <div class="detail-form-item">{{item.entry_training_date}}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>培训内容:</label>
                  <div class="detail-form-item">{{item.entry_training_content}}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>培训考核:</label>
                  <div class="detail-form-item">{{item.entry_training_exam}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="label-list">
                  <label>考核结果:</label>
                  <div class="detail-form-item">{{item.entry_training_exam_result}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="label-list">
                  <label>备注:</label>
                  <div class="detail-form-item">{{item.entry_training_remark}}</div>
                </div>
              </el-col>
            </el-row>
            <!-- </el-form> -->
          </div>
          <div v-show="!userData.carrier_driver_trainings.length" class="text-center">无数据</div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'addPerson',
  data() {
    return {
      activeStep: 0,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      userData: {
        work_type: {},
        staff_type: {},
        on_job_status: {},
        gender: {},
        carrier_driver_trainings: [],
        address: {
          province: '',
          city: '',
          area: '',
        }
      },
      nextStepBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      }
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
      this.$$http('getDriversDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.userData = results.data.data;
          this.userData.address = {
            province: '',
            city: '',
            area: '',
          }

          this.userData.address.province = (this.userData.area && this.userData.area.area_name) ? this.userData.area.area_name : '';

          this.userData.address.city = (this.userData.area && this.userData.area.city && this.userData.area.city.area_name) ? this.userData.area.city.area_name : '';
          this.userData.address.area = (this.userData.area && this.userData.area.city && this.userData.area.city.county) ? this.userData.area.city.county.area_name : '';


        }
      })

    },
    handleRemove: function(file, fileList) {

    },
    handlePreview: function(file) {

    },
    goEditDetail: function(number) {
      this.$router.push({ path: "/transportPowerManage/personManage/addPerson?activeStep=" + number, query: { id: this.userData.id, activeStep: number } });
    },

  }
}

</script>
