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
</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="外销单详情" name="first">
          
        </el-tab-pane>
        <el-tab-pane label="外销单进程" name="second" style="width:80%; padding:25px 20px;">
          <div class="detail-main border-top-clear">
            <el-container v-show="!pageLoading" style="min-height:200px;">
              <el-header>
                <el-row>
                  <el-col :span="3">
                    <router-link :to="{path: '/purchaseCenter/outsidePick/outsidePickList'}">
                      <div class="go-return icon-back"></div>
                    </router-link>
                  </el-col>
                  <el-col :span="18">
                    <p>外销单进程</p>
                  </el-col>
                </el-row>
              </el-header>
              <el-main class="mt-30">
                <el-collapse  v-if="outsidePickDetalisData.length>=1"  v-model="activeNames">
                     <el-collapse-item :title="statusType[item.type].title" :name="key" v-for="(item,key) in outsidePickDetalisData" :key="key" v-if="statusType[item.type]">
                        <el-row v-for="n in Math.ceil(statusType[item.type].valueArr.length/4)" :gutter="40">
                          <el-col v-for="(Kitem,index) in statusType[item.type].valueArr" v-if="index<((n+1)*4)" :span="8">
                            <div class="label-list">
                               <label style="margin-left:10px;">{{Kitem.key}} :</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item[Kitem.valueKey])"></div>
                            </div>
                          </el-col>
                        </el-row>
                     </el-collapse-item>
                </el-collapse>
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
  name: 'outsidePickPoress',
  computed: {
    outsidePickId: function() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      activeName: 'second',
      pageLoading:false,
      outsidePickDetalisData:[],
      activeNames: [],
      statusType:{
        'new_order':{title:"外销单生成",valueArr:[
          {key:'外销单号',valueKey:'order_number'},{key:'外销单生成时间',valueKey:'operated_at'},{key:'操作人',valueKey:'operator'}
        ]},
        'create_manager_check':{title:"新增经理审核",valueArr:[
          {key:'经理审核时间',valueKey:'operated_at'},{key:'经理审核结果',valueKey:'operation'},{key:'操作人',valueKey:'operator'}
        ]},
        'create_department_check':{title:"新增部门审核",valueArr:[
          {key:'部门审核时间',valueKey:'operated_at'},{key:'部门审核结果',valueKey:'operation'},{key:'操作人',valueKey:'operator'}
        ]},
        'waiting_pickup':{title:"装车完成",valueArr:[
          {key:'填写装车信息时间',valueKey:'operated_at'},{key:'操作人',valueKey:'operator'}
        ]},
         'cancel':{title:"申请取消",valueArr:[
          {key:'申请取消时间',valueKey:'operated_at'},{key:'操作人',valueKey:'operator'}
        ]},
         'cancel_check':{title:"申请取消通过",valueArr:[
          {key:'通过时间',valueKey:'operated_at'},{key:'操作人',valueKey:'operator'}
        ]},
      }
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/purchaseCenter/outsidePick/outsidePickDetalisTab/outsidePickDetalis/${this.outsidePickId}` });
      }
    },
    outsidePickProcess:function(){
      this.pageLoading=true;
      this.$$http("outsidePickProcess",{id:this.outsidePickId}).then((result)=>{
        this.pageLoading=false;
        if(result.data.code==0){
          this.outsidePickDetalisData=result.data.data;
          if(this.outsidePickDetalisData.length>1){
            this.activeNames.push(parseInt(this.outsidePickDetalisData.length-1));
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
     this.outsidePickProcess();
  }
}

</script>
