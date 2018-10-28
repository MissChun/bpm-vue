<style scoped lang="less">
.table-list{
  border-bottom: 0;
  //border: 0;
}

.detail-form{
  margin:30px 0;
}
.end-mileage-unit{
  line-height: 32px;
}
</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container v-loading="pageLoading">
      <el-header>
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="returnToPage"></div>
            <!-- <span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回列表页</span></span> -->
          </el-col>
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading" class="mt-30">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">数据信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addFormSetpOne" :rules="rules" :model="editMsgForm" status-icon>
              <el-row>
                <el-col :span="20" :offset="2">
                  <div class="trans-fee">
                    <div class="table-list">
                      <el-table :data="recordsData" stripe style="width: 100%" size="medium">
                        <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
                          <template slot-scope="scope">
                            <div v-if="scope.row.isEdit">
                              <div v-if="item.param==='start_mileage'">
                                {{scope.row.start_mileage}}=={{scope.row.record_count}}<span v-if="scope.row.record_count>1">（含）</span>
                              </div>
                              <div v-if="item.param==='end_mileage'">
                                <el-row>
                                  <el-col :span="18">
                                    <el-input placeholder="请输入" size="small" type="text" v-model.trim="scope.row.end_mileage"></el-input>
                                    <!-- <span>{{}}</span> -->
                                  </el-col>
                                  <el-col :span="6"><span class="end-mileage-unit">(不含)</span></el-col>
                                </el-row>
                              </div>
                              <div v-if="item.param==='initial_price'">
                                <!-- <el-form-item label="" :prop="records[item].initial_price"> -->
                                <el-input placeholder="请输入" type="text" size="small" v-model.trim="scope.row.initial_price"></el-input>
                                <!-- </el-form-item> -->
                              </div>
                              <div v-if="item.param==='change_rate'">
                                <el-input placeholder="请输入" type="text" size="small" v-model.trim="scope.row.change_rate"></el-input>
                              </div>
                              <div v-if="item.param==='change_number'">
                                <el-input placeholder="请输入" type="text" size="small" v-model.trim="scope.row.change_number"></el-input>

                              </div>
                            </div>
                            <div v-else>
                              {{scope.row[item.param]}}
                              <span v-if="item.param==='start_mileage'&&scope.row.record_count>1">（含）{{scope.row.index}}</span>
                              <span v-if="item.param==='end_mileage'">（不含）</span>
                            </div>
                            <!-- <div class="fee-list" v-if="item.param==='start_mileage'||">
                              {{scope.row[item.param]}}<span v-if="item.param==='start_mileage'">（不含）</span><span v-if="item.param==='end_mileage'"></span>
                            </div> -->
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="140" fixed="right">
                          <template slot-scope="scope">
                              <el-button type="danger" plain size="mini" v-if="scope.row.record_count>1&&!scope.row.isEdit" @click="deleteRecords(scope.row)">删除</el-button>
                              <el-button type="primary" plain size="mini" @click="saveBtn(scope.row)" v-if="scope.row.isEdit">保存</el-button>
                              <el-button type="primary" size="mini" @click="editRecords(scope.row)" v-if="!scope.row.isEdit">编辑</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </el-col>
                <el-col :span="2"></el-col>
              </el-row>
              <el-row class="mt-10 text-center">
                <el-col :span="2" :offset="22">
                  <el-button type="success" plain size="mini" @click="addRecords">添加一条</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="40" class="mt-30">
                <el-col :span="10" :offset="2">
                  <el-form-item label="生效承运商:" prop="carrier">
                    <el-select v-model="editMsgForm.carrier" :loading="shipperLoading" filterable clearable placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.shipperSelect" :key="item.id" :label="item.carrier_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="生效液厂:" prop="actual_fluids">
                    <el-select v-model="editMsgForm.actual_fluids" :loading="fluidLoading" filterable clearable multiple placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.liquidSelect" :key="item.id" :label="item.actual_fluid_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="生效时间:" prop="effective_time">
                    <el-date-picker v-model="editMsgForm.effective_time" type="datetime" @change="dateSelect('satrt')" placeholder="请选择" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="失效时间:" prop="dead_time">
                    <el-date-picker v-model="editMsgForm.dead_time" type="datetime" @change="dateSelect('end')" placeholder="请选择" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
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
      </el-main>
    </el-container>

  </div>
</template>
<script>
export default {
  name: 'editThreePartyCapacity',
  computed: {
    id() {
      return this.$route.query.id;
    },
    titleType() {
      return this.$route.query.id ? '编辑运费约定' : '新增运费约定'
    }
  },
  data() {
    return {
      pageLoading: false,
      shipperLoading:false,
      fluidLoading:false,
      activeStep:0,
      records:{
        record_count:'',
        start_mileage:'',
        end_mileage:'',
        initial_price:'',
        change_rate:'',
        change_number:''
      },
      recordsData:[{
        record_count:1,
        start_mileage:0,
        end_mileage:'',
        initial_price:'',
        change_rate:'',
        change_number:'',
        isEdit:true,
        index:0
      }],
      editMsgForm: {
        carrier:'',
        actual_fluids:'',
        effective_time:'',
        dead_time:''
      },
      thTableList: [{
        title: '起点里程（公里）',
        param: 'start_mileage',
        width: '140'
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
      rules: {
        carrier:[
          { required: true, message: '请选择托运方', trigger: 'blur' },
        ],
        actual_fluids:[
          { required: true, message: '请选择液厂', trigger: 'blur' },
        ],
        effective_time:[
          { required: true, message: '请选择生效时间', trigger: 'blur' },
        ],
        dead_time:[
          { required: true, message: '请选择失效时间', trigger: 'blur' },
        ]
      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      },
      selectData:{
        liquidSelect:[],
        shipperSelect:[]
      },
      editRecordsList:{},
    }
  },
  methods: {
    dateSelect(type) {
      // let dates = this.editMsgForm.dead_time.split('-');
      // // let days = (new Date(dates[0], dates[1], 0)).getDate();
      // if (type === 'end') {
      //   this.endTime = this.endTime + '-' + days + ' 23:59:59';
      // }
      let isSize = this.pbFunc.compareDate(this.editMsgForm.effective_time, this.editMsgForm.dead_time);
      if (!isSize) {
      //   this.startSearch();
      // } else {
        this.$message.error('失效时间小于生效时间');
        if(type==='end'){
          this.editMsgForm.dead_time = '';
        }else{
          this.editMsgForm.effective_time = '';
        }

      }

    },
    addRecords(){
      let len = (this.recordsData.length)-1;
      this.recordsData.push({
        record_count:this.recordsData[len].record_count+1,
        start_mileage:this.recordsData[len].end_mileage,
        end_mileage:'',
        initial_price:'',
        change_rate:'',
        change_number:'',
        isEdit:true,
        index:this.recordsData.length
      });
    },
    deleteRecords(row){
      let len = this.recordsData.length;
      if(row.index!=len-1){
        this.recordsData[parseInt(row.index)+1].start_mileage = this.recordsData[parseInt(row.index)-1].end_mileage;
      }
      for(let i in this.recordsData){
        if(this.recordsData[i].id === row.id){
          this.recordsData.splice(i, 1);
        }
      }
      for(let i in this.recordsData){
        this.recordsData[i].index = i;
      }
    },
    editRecords(row){
      if(this.editRecordsList.isEdit){
        this.saveBtn(this.editRecordsList,row,true);
      }else{
        console.log('news')
        for(let i in this.recordsData){
          if(this.recordsData[i].id === row.id){
            // this.recordsData[i].isEdit = true;
            this.$set(this.recordsData,i,{
              record_count:this.recordsData[i].record_count,
              start_mileage:this.recordsData[i].start_mileage,
              end_mileage:this.recordsData[i].end_mileage,
              initial_price:this.recordsData[i].initial_price,
              change_rate:this.recordsData[i].change_rate,
              change_number:this.recordsData[i].change_number,
              isEdit:true,
              index:i
            });
            this.editRecordsList = this.recordsData[i];
          }
        }
      }
      // row.isEdit = true;


    },
    saveBtn(row,newRow,isSave){

      let record = row;
      let len = this.recordsData.length;

      // if(row.record_count === 1){
        if(!record.end_mileage){
          this.$message({
            message: '请输入终点里程',
            type: 'error',
            duration:'5000'
          });
        }else if(record.end_mileage&&!((record.end_mileage).match(this.$store.state.common.regular.price.match))){
          this.$message({
            message: '终点里程仅支持正数且最多两位小数的数值',
            type: 'error',
            duration:'5000'
          });
        }else if(parseFloat(record.end_mileage)<=parseFloat(record.start_mileage)){
          this.$message({
            message: '终点里程不能小于等于起点里程',
            type: 'error',
            duration:'5000'
          });
        }else if(len>1&&record.index!=len-1&&(parseInt(record.index)+1)<=len&&record.end_mileage>=this.recordsData[parseInt(record.index)+1].end_mileage){//
          this.$message({
            message: '该条终点里程不得大于下一条的起始里程',
            type: 'error',
            duration:'5000'
          });

        }else if(record.initial_price&&!(record.initial_price).match(this.$store.state.common.regular.price.match)){
          this.$message({
            message: '起步价仅支持正数且最多两位小数的数值',
            type: 'error',
            duration:'5000'
          });
        }else if(record.change_rate&&!(record.change_rate).match(this.$store.state.common.regular.variableRate.match)){
          this.$message({
            message: '变动费率仅支持正数且最多三位小数的数值',
            type: 'error',
            duration:'5000'
          });
        }else if(record.change_number&&!(record.change_number).match(this.$store.state.common.regular.variableRate.match)){
          this.$message({
            message: '变动值仅支持正数且最多三位小数的数值',
            type: 'error',
            duration:'5000'
          });
        }else if(!record.initial_price&&!record.change_rate){
          this.$message({
            message: '起步价和变动费率至少要填一个',
            type: 'error',
            duration:'5000'
          });
        }else{
          record.isEdit = false;
          this.editRecordsList = {};
          if(isSave){
            console.log(99999)
            this.editRecords(newRow);
          }
          if(len>1&&record.index!=len-1&&(parseInt(record.index)+1)<=len){
            this.recordsData[parseInt(record.index)+1].start_mileage = record.end_mileage;
          }
        }
      // }
      // console.log('data',this.recordsData)
    },
    editBasics(btn, btnType) {
      let formName = 'addFormSetpOne';
      let btnObject = btn;
      let postData = {
        records:this.recordsData
      }
      postData = Object.assign(postData,this.editMsgForm);
      console.log('postData',postData);
      // let keyArray = ['name', 'contact_name', 'contact_phone', 'detail_address', 'deficiency_standard', 'code', 'codeMsg'];
      // let postData = this.pbFunc.fifterbyArr(this.customerMsgForm, keyArray);
      // if (btnType === 'next') {
      //   this.editAjax(postData, formName, btnObject, 2);
      // } else if (btnType === 'out') {
      if(this.recordsData.length&&!this.recordsData[0].isEdit){
        this.editAjax(postData, formName, btnObject, null, true);
      }else{
        this.$message({
          message: '至少添加一条以上运费约定',
          type: 'error',
          duration:'5000'
        });
      }
      // }
    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      let apiName = 'addFreight';
      btnObject.isDisabled = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* 如果id存在则为编辑 */
          if (this.id) {
            postData.id = this.id;
            apiName = 'updateFreight';
          }
          btnObject.btnText = '正在提交';
          btnObject.isLoading = true;
          postData = this.pbFunc.fifterObjIsNull(postData);
          this.$$http(apiName, postData).then((results) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;
            if (results.data && results.data.code == 0 && results.data.data) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              if (isReview) {
                if (this.$route.query.id) {
                  this.$router.push({ path: `/basicDataManage/standardDataSet/freight/freightDetail/${results.data.data.id }` });
                } else {
                  this.$router.push({ path: "/basicDataManage/standardDataSet/freight/freightList" });
                }
              }
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
    getDetail() {
      const postData = {
        id: this.id,
      }
      this.pageLoading = true;
      this.$$http('getFreightDetail', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;

          this.editMsgForm.actual_fluids = [];

          if(this.detailData.agreements&&this.detailData.agreements.length){
            this.editMsgForm.effective_time = this.detailData.agreements[0].effective_time;
            this.editMsgForm.dead_time = this.detailData.agreements[0].dead_time;
            this.editMsgForm.carrier = this.detailData.agreements[0].carrier;
            for(let i in this.detailData.agreements){
              this.editMsgForm.actual_fluids.push(this.detailData.agreements[i].fluid);
            }
          }
          this.recordsData = this.detailData.records;
          for(let i in this.recordsData){
            this.recordsData[i].isEdit = false;
            this.recordsData[i].index = i;
          }
          console.log('详情',this.editMsgForm,this.recordsData)
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    getShipperList: function() {
      let postData = {
        need_all: true
      };
      this.shipperLoading = true;
      this.$$http('getCarrierList', postData).then((results) => {
        this.shipperLoading = false;
        if (results.data && results.data.code == 0) {
          this.selectData.shipperSelect = this.selectData.shipperSelect.concat(results.data.data);
        }
      }).catch((err) => {
        this.shipperLoading = false;
      })

    },
    getFluidList: function() {
      let postData = {
        need_all: true
      }
      this.fluidLoading = true;
      this.$$http('getFluidList', postData).then((results) => {
        this.fluidLoading = false;
        if (results.data && results.data.code == 0) {
          this.selectData.liquidSelect = this.selectData.liquidSelect.concat(results.data.data);
        }
      }).catch((err) => {
        this.fluidLoading = false;
      })
    },
    returnToPage() {
      if (this.id) {
        this.$router.push({ path: `/basicDataManage/standardDataSet/freight/freightDetail/${this.id}` });
      } else {
        this.$router.push({ path: "/basicDataManage/standardDataSet/freight/freightList" });
      }
    }
  },
  watch: {

  },
  created() {
    if(this.id){
      this.getDetail();
    }
    this.getFluidList();
    this.getShipperList();
  },
}

</script>

