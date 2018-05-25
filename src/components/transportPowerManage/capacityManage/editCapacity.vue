<style scoped lang="less">
.el-header p {
  font-size: 25px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  margin: 0 0;
}

.el-main {
  text-align: center;
  .el-form {
    margin: 0 auto;
    width: 340px;
    .el-input, .el-autocomplete, .el-select {
      width: 100%;
    }
  }
}

#addeditHeadCarPage {
  border: 1px solid rgb(222, 222, 222);
}

.alone-insurance-form {
  border: 1px solid rgb(222, 222, 222);
  border-top: none;
  padding: 30px 30px 0 20px;
}

.insurance-form-head {
  background-color: #f1f1f1;
  height: 41px;
  line-height: 41px;
}

#addeditHeadCarPage {
  background-color: white;
}

.icon-arrow-lift {
  font-size: 35px;
  color: rgb(222, 222, 222);
  vertical-align: middle;
}

.right-arrow-d {
  height: 80px;
  line-height: 80px;
  text-align: center;
  pointer: cursor;
}

.icon-down-arrow {
  font-size: 35px;
  color: rgb(222, 222, 222);
  vertical-align: middle;
  transform: rotate(90deg);
  display: inline-block;
}

.left-arrow-d {
  height: 80px;
  line-height: 80px;
  text-align: center;
  cursor: pointer;
}

.stepTitle {
  background-color: rgb(235, 238, 245);
  height: 40px;
  text-align: center;
  font-size: 18px;
  line-height: 40px;
}

</style>
<template>
  <div id="addeditHeadCarPage">
    <el-container>
      <el-header style="margin-top:15px;height:80px">
        <el-row>
          <el-col :span="1" class="left-arrow-d"><i class="icon-down-arrow" v-on:click="goDetail"></i></el-col>
          <el-col :span="22">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-loading="pageLoading">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <el-form label-width="80px" :model="truckForm" ref="truckForm" :rules="truckRules">
              <el-row :gutter="80">
                <el-form-item label="挂车号">
                  <el-select v-model="truckForm.semitrailer" filterable placeholder="请选择">
                    <el-option
                      v-for="item in semiList"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row :gutter="80">
                <el-form-item label="随车电话">
                  <el-input v-model="truckForm.car_belong_phone" auto-complete="off"></el-input>
                </el-form-item>
              </el-row>
              <el-row :gutter="80">
                <el-form-item label="分组">
                  <el-select v-model="truckForm.group" placeholder="请选择">
                    <el-option
                      v-for="item in selectData.groupOptions"
                      :key="item.id"
                      :label="item.group_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-row>
            </el-form>
            <el-button type="primary" @click="submitTruckForm">保存</el-button>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==1">
            <el-form :model="staffForm" ref="staffForm" label-width="70px" :rules="staffRules">
              <el-form-item label="主驾驶" prop="master_driver">
                <el-select v-model="staffForm.master_driver" filterable placeholder="请选择">
                  <el-option
                    v-for="item in driverList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="副驾驶">
                <el-select v-model="staffForm.vice_driver" filterable placeholder="请选择">
                  <el-option
                    v-for="item in driverList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="押运员">
                <el-select v-model="staffForm.escort_staff" filterable placeholder="请选择">
                  <el-option
                    v-for="item in escortList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-dialog custom-class="capacity-list-dialog" title="绑定挂车" :visible.sync="forceTruckFormVisible" append-to-body center>
              <div class="notice-msg">
                <i class="el-icon-warning"></i>
                <div class="notice-msg">{{truckDialog.noticeMsg}}</div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="forceTruckFormVisible=false">取消</el-button>
                <el-button type="primary" @click="forceSubmitTruckForm">确定</el-button>
              </div>
            </el-dialog>
            <el-dialog custom-class="capacity-list-dialog" title="绑定人员" :visible.sync="forceStaffFormVisible" append-to-body center>
              <div class="notice-msg">
                <i class="el-icon-warning"></i>
                <div class="notice-msg">{{staffDialog.noticeMsg}}</div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="forceStaffFormVisible=false">取消</el-button>
                <el-button type="primary" @click="forceSubmitStaffForm">确定</el-button>
              </div>
            </el-dialog>
            <el-button type="primary" @click="submitStaffForm">保存</el-button>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'editCapacity',
  data() {
    return {
      pageLoading: true,
      truckForm: {},
      staffForm: {},
      forceTruckFormVisible: false,
      forceStaffFormVisible: false,
      truckRules: {
        semitrailer: [
          { required: true, message: '请输入挂车号', trigger: 'change' }
        ]
      },
      staffRules: {
        master_driver: [
          { required: true, message: '请输入主驾驶名称', trigger: 'change' }
        ]
      },
      selectData: {
        groupOptions: []
      },
      semiList: [],
      driverList: [],
      escortList: [],
    }
  },
  computed: {
    capacityInfo: function () {
      return this.$route.params.capacityInfo;
    },
    capacityId: function() {
      return this.$route.params.capacityInfo.id;
    },
    titleType: function () {
      return parseInt(this.$route.params.activeStep) === 0 ? '编辑绑定挂车' : '编辑绑定人员';
    },
    activeStep: function () {
      return parseInt(this.$route.params.activeStep);
    }
  },
  activated() {
    if (this.activeStep === 0) {
      this.truckForm = {
        capacityId: this.capacityId,
        truckNum: this.capacityInfo.tractor.plate_number,
        semitrailer: this.capacityInfo.semitrailer.id,
        car_belong_phone: this.capacityInfo.car_belong_phone || '',
        group: this.capacityInfo.group && this.capacityInfo.group.id
      }
    } else if (this.activeStep === 1) {
      this.staffForm = {
        capacityId: this.capacityId,
        truckNum: this.capacityInfo.tractor.plate_number,
        semiNum: this.capacityInfo.semitrailer.plate_number,
        master_driver: this.capacityInfo.master_driver.id,
        vice_driver: this.capacityInfo.vice_driver && this.capacityInfo.vice_driver.id,
        escort_staff: this.capacityInfo.escort_staff && this.capacityInfo.escort_staff.id
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function () {
      this.setSelectData();
    },
    setSelectData: function () {
      let p1 = this.getGroups();
      let p2 = this.getSemiList();
      let p3 = this.getDriverList();
      let p4 = this.getEscortList();
      Promise.all([p1, p2, p3, p4]).then(results => {
        // 分组数据
        if (results[0].data.code === 0) {
          this.groupList = results[0].data.data.results;
          results[0].data.data.results.map((n, i) => {
            this.selectData.groupOptions.push(n);
          });
        }
        // 挂车数据
        if (results[1].data.code == 0) {
          results[1].data.data.map(((n, i) => {
            this.semiList.push({
              id: n.id,
              value: n.plate_number
            })
          }));
        }
        // 驾驶员数据
        if (results[2][0].data.code === 0 && results[2][1].data.code === 0) {
          results[2].map((res, i) => {
            res.data.data.map((n, i) => {
              this.driverList.push({
                id: n.id,
                value: n.name
              });
            });
          });
        }
        // 押运员数据
        if (results[3].data.code === 0) {
          results[3].data.data.map((n, i) => {
            this.escortList.push({
              id: n.id,
              value: n.name
            });
          });
        }
        this.pageLoading = false;
      }).catch(err => {
        console.log(err);
      });
    },
    getGroups: function() {
      return this.$$http('getGroups')
    },
    getSemiList: function () {
      return this.$$http('searchTailCarList', {pagination: false})
    },
    getDriverList: function () {
      let param1 = {
        work_type: 'DRIVER',
        pagination: false
      };
      let param2 = {
        work_type: 'DRIVER_ESCORT',
        pagination: false
      };
      let req1 = this.$$http('getDriversList', param1);
      let req2 = this.$$http('getDriversList', param2);
      return Promise.all([req1, req2])
    },
    getEscortList: function() {
      return this.$$http('getDriversList', {work_type: 'ESCORT', pagination: false})
    },
    submitTruckForm: function () {
      this.$refs.truckForm.validate((isValid, unvailidField) => {
        if (isValid) {
          let send = {
            id: this.truckForm.capacityId,
            semitrailer: this.truckForm.semitrailer,
            car_belong_phone: this.truckForm.car_belong_phone,
            group: this.truckForm.group
          }
          this.$$http('bindTruck', send).then((results) => {
            if(results.data.code === 0) {
              this.$message({
                message: '绑定成功',
                type: 'success'
              });
              // this.bindTruckFormVisible = false;
              // this.searchList();
            } else if (results.data.code === 600) {
              this.forceTruckFormVisible = true;
              this.truckForm.noticeMsg = results.data.msg.split(',')[1];
            }
          }).catch((err) => {
            console.log(err);
          });
        }
      });
    },
    submitStaffForm: function () {
      this.$refs.staffForm.validate((isValid, unvailidField) => {
        if (isValid) {
          let send = {
            id: this.staffForm.capacityId,
            master_driver: this.staffForm.master_driver,
            vice_driver: this.staffForm.vice_driver,
            escort_staff: this.staffForm.escort_staff
          }
          this.$$http('bindStaff', send).then((results) => {
            if(results.data.code === 0) {
              this.$message({
                message: '绑定成功',
                type: 'success'
              });
            } else if (results.data.code === 600) {
              this.forceTruckFormVisible = true;
              this.staffForm.noticeMsg = results.data.msg;
            }
          }).catch((err) => {
            console.log(err);
          });
        }
      });
    },
    forceSubmitTruckForm: function () {
      let send = {
        id: this.truckForm.capacityId,
        semitrailer: this.truckForm.semitrailer,
        car_belong_phone: this.truckForm.car_belong_phone,
        group: this.truckForm.group
      }
      this.$$http('forceBindTruck', send).then((results) => {
        if(results.data.code === 0) {
          this.$message({
            message: '绑定成功',
            type: 'success'
          });
          this.forceTruckFormVisible = false;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    forceSubmitStaffForm: function () {
      let send = {
        id: this.staffForm.capacityId,
        master_driver: this.staffForm.master_driver,
        vice_driver: this.staffForm.vice_driver,
        escort_staff: this.staffForm.escort_staff
      }
      this.$$http('forceBindStaff', send).then((results) => {
        if(results.data.code === 0) {
          this.$message({
            message: '绑定成功',
            type: 'success'
          });
          this.forceStaffFormVisible = false;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    goDetail: function() {
      if (this.activeStep === 0) {
        this.$refs.truckForm.resetFields();
      } else {
        this.$refs.staffForm.resetFields();
      }
      if (this.capacityId) {
        this.$router.push({ path: "/transportPowerManage/capacityManage/capacityDetail?capacityId=" + this.capacityId });
      }
    }
  }
}

</script>
