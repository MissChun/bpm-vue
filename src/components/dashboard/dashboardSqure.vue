<style scoped lang="less">
.squreModule{
  height:140px;
  width:160px;
  background-color:#4a9bf8;
  color:white;
  cursor:pointer;
}
.squreModule:hover{
  background-color:rgba(74,155,248,.8);
}
.boldB{
  font-size:36px;
}
</style>
<template>
  <div class="squreModule">
    <el-row style="height:90px">
      <el-col class="text-center" style="line-height:100px"><span class="boldB">{{dashboradSqureData.num}}</span><span>单</span></el-col>
    </el-row>
    <el-row style="height:50px">
      <el-col class="text-center" style="line-height:10px;"><span>{{dashboradSqureData.value}}</span></el-col>
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

  },
  created() {

  },
  props:['dashboradSqureData']
};

</script>
