<style scoped lang="less">

</style>
<template>
  <div>
    <div class="nav-tab-setting" v-loading="pageLoading">
      <el-tabs v-model="activeName" @tab-click="clicktabs"  v-if="show">

        <el-tab-pane :label="tabItsm.countLable" :name="tabItsm.key" v-for="(tabItsm,index) in firstMenuData">
          <div v-if="activeName==tabItsm.key">
            <keep-alive>
              <outsidePickSecondMenu :status="activeName" @changeTab="changeTabs" @childchangeTabs="childchangeTabs" :countParam="tabItsm.secondCount" @reshCount="reshCount" :secondActiveName="secondActiveName"></outsidePickSecondMenu>
            </keep-alive>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'outsidePickList',
  pageLoading:false,
  components: {
    outsidePickSecondMenu: () =>
      import ("../../../components/order/outsidePick/outsidePickSecondMenu.vue")
  },
  data() {
    return {
      pageStatus: false,
      pageLoading: false,
      fifterParam: {
        keyword: "",
        field: "truck_no",
      },
      firstMenuData:[
        {key:'all_new',label:"新增",countLable:"新增",secondCount:[]},
        {key:'all_pickup',label:"装车",countLable:"装车",secondCount:[]},
        {key:'all_change',label:"变更中",countLable:"变更中",secondCount:[]},
        {key:'all_finish',label:"历史",countLable:"历史",secondCount:[]},
        {key:'all_count',label:"全部",countLable:"全部",secondCount:[]}
      ],
      show:true,
      defaultSecond:{
        all_new:'all',
        all_pickup:'all',
        all_change:'all',
        all_finish:'all',
        all_count:'all',
      },
      timeParam: [],
      listFifterData: [],
      rules: {},
      activeName:'all_new',
      secondActiveName:"",
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      selectData: {
        fieldSelect: [
          { id: 'truck_no', value: '车号' },
          { id: 'fluid_name', value: '液厂名' },
        ]
      },
    };

  },
  computed: {

  },
  created() {
    this.activeName=this.$route.query.goTo||"all_new";
    this.secondActiveName=this.$route.query.secondActiveName||"all"
    this.reshCount();
  },
  methods: {
    clicktabs: function(targetName) {
      var defaultTabls=this.defaultSecond[targetName.name];
      this.$router.push({ path: "/purchaseCenter/outsidePick/outsidePickList?goTo="+targetName.name+"&secondActiveName="+defaultTabls });
      this.reshCount();
    },
    reshCount:function(){
      this.$$http("getOutsidePickCount",{}).then((results)=>{
        if(results.data.code==0){
          let countData=results.data.data;
          this.firstMenuData.forEach((item,index)=>{
            countData.forEach((Citem)=>{
              if(item.key==Citem.label_key){
                if(Citem.num>99){
                  this.$set(item,"countLable",item.label+'(99+)');
                }else{
                  this.$set(item,"countLable",item.label+'('+Citem.num+')');
                  this.$set(item,"secondCount",Citem.tabs);
                  //item.countLable=item.label+'('+Citem.num+')';
                }
              }
            });
          });
        }
      }).catch((err)=>{

      });
    },
    changeTabs: function(fifterName) {
      //this.activeName = fifterName;
      this.$router.push({ path: "/purchaseCenter/outsidePick/outsidePickList?goTo="+fifterName+"&secondActiveName=all" });
      this.reshCount();
    },
     childchangeTabs:function(tabsObj){
      //this.activeName = tabsObj.first;
      this.$router.push({ path: "/purchaseCenter/outsidePick/outsidePickList?goTo="+tabsObj.first+"&secondActiveName="+tabsObj.second });
      this.reshCount();
    },
  },
   watch: {
    '$route' (to, from) {
      //刷新参数放到这里里面去触发就可以刷新相同界面了
      this.activeName=this.$route.query.goTo||"all_new";
      this.secondActiveName=this.$route.query.secondActiveName||"all" 
    }
  }

};

</script>
