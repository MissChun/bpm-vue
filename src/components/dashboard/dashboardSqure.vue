<style scoped lang="less">
.squreModule{
  height:100px;
  width:160px;
  background-color:white;
  border:1px solid lightgray;
  color:white;
  cursor:pointer;
  padding:30px 0;
  color:#717171;
  font-weight: normal;
  font-size:14px;
}
.squreModule:hover{
  background-color:rgba(74,155,248,.8);
  color:white;
  .boldB{
     color:white;
  }
}
.boldB{
  font-size:36px;
  color:#4a9bf8;
  font-weight: bold;
}
.activeSqure{
  background-color:#f2f5fe;
}
</style>
<template>
  <div class="squreModule" @click="gotoPage" v-bind:class="{activeSqure:activeData&&activeData.key==dashboradSqureData.key}">
    <el-row style="height:60px">
      <el-col class="text-center" style="line-height:60px;height:60px"><span class="boldB">{{dashboradSqureData.num}}</span><span>{{dashboradSqureData.dimension}}</span></el-col>
    </el-row>
    <el-row style="height:40px">
      <el-col class="text-center" style="line-height:20px;height:40px"><span>{{dashboradSqureData.value}}</span></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'dashboradSqure',
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    gotoPage:function(){
      if(this.dashboradSqureData.goUrl){
         this.$router.push({ path:this.dashboradSqureData.goUrl});
      }else{
        this.$emit('clickExtendTable',this.dashboradSqureData);
      }
     
    }
  },
  created() {

  },
  props:['dashboradSqureData','activeData'],
};

</script>
