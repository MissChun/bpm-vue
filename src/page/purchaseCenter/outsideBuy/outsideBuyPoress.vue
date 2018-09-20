<style scoped lang="less">

.label-list {
  margin-bottom: 0px;
}

.el-collapse-item {
  /deep/ .el-collapse-item__header {
    padding-left: 20px;

    background-color: #fafafa;
  }
  /deep/ .el-collapse-item__content {
    padding-top: 25px;
  }
}

.orderPossing {
  border: 1px solid #ebeef5;
  border-top: none;
  overflow-y: auto;
  max-height: 600px;
  overflow-x: hidden;
}

.el-button {
  margin-left: 0;
}

.garyColor {
  color: gary;
}



.label-list {
  padding-left: 130px;
}

.borderB {
  border-bottom: 1px solid #ebeef5;
}

.paddingCancle /deep/ .el-collapse-item__content {
  padding-top: 0;
  padding-bottom: 0;
}

.padds {
  padding: 25px 0 0px 0
}

.label-list label {
  width: 125px;
}
.whiteSpan {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
}
.processAll{
      border: 1px solid #ebeef5;
    border-top: none;
    border-bottom: none;
    overflow-y: auto;
    max-height: 600px;
    overflow-x: hidden;
}
</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="外采单单详情" name="first">
          
        </el-tab-pane>
        <el-tab-pane label="外采单进程" name="second" style="width:80%; padding:25px 20px;">
          <div class="detail-main border-top-clear">
            <el-container v-show="!pageLoading" style="min-height:200px;background-color:white">
              <el-header>
                <el-row>
                  <el-col :span="3">
                    <router-link :to="{path: '/purchaseCenter/outsideBuy/outsideBuyList'}">
                      <div class="go-return icon-back"></div>
                    </router-link>
                  </el-col>
                  <el-col :span="18">
                    <p>外采单进程</p>
                  </el-col>
                </el-row>
              </el-header>
              <el-main class="mt-30">
              <div class="processAll">
                <el-collapse  v-if="outsideBuyDetalisData.length>=1"  v-model="activeNames">
                  <el-collapse-item  :title="statusType[item.type].title" :name="key" v-for="(item,key) in outsideBuyDetalisData" :key="key" v-if="statusType[item.type]">
                    <el-row  :gutter="40">
                      <el-col v-for="(Kitem,index) in statusType[item.type].valueArr"  :span="8">
                        <div class="label-list">
                           <label style="margin-left:10px;">{{Kitem.key}} :</label>
                           <div v-if="Kitem.url" class="detail-form-item">
                              <span>{{item[Kitem.valueKey]}}</span><span style="margin-left:3px;">{{Kitem.unit}}</span>
                               <router-link target="_blank" :to="'/imgReview?imgList='+item[Kitem.imgUrl]">
                                  <span style="color:#409EFF">{{Kitem.urlText}}</span>
                               </router-link>
                           </div>
                          <div class="detail-form-item whiteSpan" v-else>
                            <span v-if="Kitem.changeChinese">{{Kitem.changeChinese[item[Kitem.valueKey]]}}</span>
                            <span v-else >{{item[Kitem.valueKey]}}</span><span style="margin-left:3px;">{{Kitem.unit}}</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                 </el-collapse-item>
                </el-collapse>
              </div>
              </el-main>
            </el-container>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'outsideBuyPoress',
  computed: {
    outsideBuyWaybillId: function() {
      return this.$route.params.waybillId;
    },
    outsideBuyStedpId:function(){
      return this.$route.params.setpId;
    },
  },
  data() {
    return {
      activeName: 'second',
      pageLoading:false,
      outsideBuyDetalisData:[],
      activeNames: [],
      statusType:{
        'new_order':{title:"外采单生成",valueArr:[
          {key:'外采单单号',valueKey:'waybill_number'},{key:'外采单生成时间',valueKey:'operated_at'},{key:'操作人',valueKey:'operator'},
          {key:'实际装车时间',valueKey:'actual_time'},{key:'采购时间',valueKey:'buy_time'},{key:'实际装车吨位',valueKey:'actual_quantity',url:true,urlText:"(磅)",
          imgUrl:"weight_note_image_url",unit:"吨"},
          {key:'供应商',valueKey:'supplier_name'},{key:'液厂',valueKey:'operated_at'}
        ]},
        'create_manager_check':{title:"新增经理审核",valueArr:[
          {key:'经理审核时间',valueKey:'operated_at'},{key:'经理审核结果',valueKey:'operation'},{key:'操作人',valueKey:'operator'},
        ]},
        'create_department_check':{title:"新增部门审核",valueArr:[
          {key:'部门审核时间',valueKey:'operated_at'},{key:'部门审核结果',valueKey:'operation'},{key:'操作人',valueKey:'operator'}
        ]},
        'confirm_match':{title:"待确认卸货单",valueArr:[
          {key:'卸货站点',valueKey:'station'},{key:'收货人',valueKey:'consignee'},{key:'计划卸货吨位',valueKey:'plan_tonnage'},
          {key:'卸货站地址',valueKey:'station_address'},{key:'联系方式',valueKey:'consignee_phone'},{key:'计划到站时间',valueKey:'plan_arrive_time'},
          {key:'状态',valueKey:'status',changeChinese:{'cancel':'待取消','new':'待确认'}},
          {key:'操作时间',valueKey:'operated_at'},{key:'操作人',valueKey:'operator'}
        ]},
        'already_match':{title:"前往卸货地",valueArr:[
          {key:'操作时间',valueKey:'operated_at'},{key:'操作人',valueKey:'operator'}
        ]},
         'to_unloading':{title:"已到卸货地",valueArr:[
          {key:'站点',valueKey:'station'},{key:'站点地址',valueKey:'station_address'},{key:'计划到站时间',valueKey:'plan_arrive_time'},
          {key:'收货人',valueKey:'consignee'},{key:'收货人电话',valueKey:'consignee_phone'},{key:'实际到站时间',valueKey:'arrival_time'},
          {key:'离站时间',valueKey:'leave_time'},
          {key:'卸车磅单审核',valueKey:'',url:true,urlText:"点击查看卸车磅单",imgUrl:"weight_note_image_url"},
          {key:'操作时间',valueKey:'operated_at'},{key:'操作人',valueKey:'operator'}
        ]},
        'in_settlement':{title:"结算中",valueArr:[
          {key:'操作时间',valueKey:'operated_at'},{key:'操作人',valueKey:'operator'}
        ]},
        'finished':{title:"已完成",valueArr:[
          {key:'完成时间',valueKey:'operated_at'},{key:'操作人',valueKey:'operator'}
        ]},
      }
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/purchaseCenter/outsideBuy/outsideBuyDetalisTab/outsideBuyDetalis/${this.outsideBuyWaybillId}/${this.outsideBuyStedpId}` });
      }
    },
    outsideBuyProcess:function(){
      this.pageLoading=true;
      this.$$http("outsideBuyProcess",{id:this.outsideBuyStedpId}).then((result)=>{
        this.pageLoading=false;
        if(result.data.code==0){
          this.outsideBuyDetalisData=result.data.data;
          if(this.outsideBuyDetalisData.length>1){
            this.activeNames.push(parseInt(this.outsideBuyDetalisData.length-1));
          }
        }
      }).catch(()=>{
        this.pageLoading=false;
      });
    },
  },
  activated: function() {
    this.activeName = 'second';
  },
  created: function() {
     this.outsideBuyProcess();
  }
}

</script>
