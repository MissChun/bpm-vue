<style scoped lang="less">


</style>
<template>
  <div>
    <el-form class="search-filters-form" label-width="80px" status-icon ref="dashboardSearchForm" v-if="fifterData.bindModel">
      <el-row v-for="(itemArr,index) in fifterData.bindModel" type="flex"  justify="space-between">
        <el-col v-for="(item, key, index) in itemArr" :span="item.colWidth">
          <el-form-item  :label="item.title+':'" >
              <el-date-picker v-if="item.type=='datetimerange'" @change="changeList"  :picker-options="pickerOptions" v-model="item.value" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
              <el-select  v-if="item.type=='select'" v-model="item.value" placeholder="请选择"   @change="changeList">
                <el-option
                  v-for="selectOp in selectObj[item.selectId]"
                  :label="selectOp[item.selectKV.value]"
                  :value="selectOp[item.selectKV.key]">
                </el-option>
              </el-select>
              <el-input placeholder="请输入" type="text" v-model="item.value" v-if="item.type=='input'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'dashboardSearch',
  props:['sendObj'],
  data() {
    return {
      fifterData:{},
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '今天',
          onClick(picker) {
            const end = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + " 23:59:59";
            const start = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + " 00:00:00";
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      searchInitData:{
        'associated_not_unload':{
          bindModel:[{
                fluid_id:{type:"select",value:"",selectNeedQuery:'getFulid',selectSeaech:{need_all:true},selectId:"fluid_select",title:"实际液厂",colWidth:6,selectKV:{key:"id",value:"fluid_name"}},
                work_end_time:{type:"datetimerange",value:[],title:"时间搜索",colWidth:10},
                consignment_type:{type:"select",value:"",selectId:"consignment_select",title:"承运类型",selectKV:{key:"type",value:"text"},colWidth:6}
              }
            ]
          ,
          backModel:{
            work_end_time_start:{'key':'work_end_time','index':0},
            work_end_time_end:{'key':'work_end_time','index':1},
            consignment_type:"modelAssignment",
            fluid_id:'modelAssignment',
          }
        }
      },
      backForm:{},
      selectObj:{
        consignment_select:[{type:"all",text:"全部"},{type:"own",text:"自有承运"},{type:"external",text:"外部承运"}],
        fluid_select:[]
      }
    };
  },
  computed: {

  },
  methods: {
    changeList:function(){
      var backObj=this.pbFunc.deepcopy(this.fifterData.backModel);
      let fifterDataObj={};
        this.fifterData.bindModel.forEach(item=>{
        fifterDataObj=Object.assign(item);
      });
      for(let item in backObj)
        if(backObj[item]=='modelAssignment'){
          if(fifterDataObj[item].value=='all'){
            delete backObj[item];
          }else{
            backObj[item]=fifterDataObj[item].value;
          }
          
        }else{
          
          let thisValue=fifterDataObj[backObj[item].key].value;
          if(Array.isArray(thisValue)){
            backObj[item]=thisValue[backObj[item].index];
          }
        }
        this.$emit("changeSearch",backObj);
    },
    getSelectData:function(item){
      this.$$http(item.selectNeedQuery,item.selectSeaech).then(result=>{
        if(result.data&&result.data.code==0){
           if(Array.isArray(result.data.data)){
            this.selectObj[item.selectId]=result.data.data;
           }else{
            this.selectObj[item.selectId]=result.data.data.data;
           }
        }
      });
    },

    fiferFun:function(){
      var vm=this;
      let initData=this.searchInitData[this.sendObj.type];
      initData.bindModel.forEach(itemArr=>{
        for(let item in itemArr){
          if(itemArr[item].type=='select'&&itemArr[item].selectNeedQuery){
            this.getSelectData(itemArr[item]);
          }
          for(let acceptKey in vm.sendObj.searchParam){
            if(acceptKey==item){
              itemArr[item].value=vm.sendObj.searchParam[acceptKey];
            }
          }
        }
      });
      this.fifterData=initData;
    }
  },
  created() {
    this.fiferFun();
    this.changeList();
  }
};

</script>
