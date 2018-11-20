<style scoped lang="less">


</style>
<template>
  <div class="detail-main">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3">
            <router-link :to="{path: '/page/dashboard'+searchForm.backUrl}">
              <div class="go-return icon-back"></div>
            </router-link>
          </el-col>
          <el-col :span="18">
            <p>{{typeArr[searchForm.type].title}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="margin-top:30px;" v-loading="searchLoading">
        <dashboardSearch :sendObj="searchForm" @changeSearch="searchList"></dashboardSearch>
         <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button> -->
           <el-button type="primary"  @click="exportList" v-loading="exportLoading">导出</el-button>
        </div>
        <dashboardList :sendObj="searchForm" :searchListData="searchListData" style="margin-top:20px;" ></dashboardList>
        <div class="page-list text-center">
        <el-pagination background layout="prev, pager, next,jumper" :page-count="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if=" pageData.totalPage>1">
      </el-pagination>
    </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios';
import  dashboardList from '@/components/dashboard/dashboardList';
import  dashboardSearch from '@/components/dashboard/dashboardSearch';
import { getDomainUrl } from '@/api/index';
export default {
  name: 'dashboradDetalis',
  data() {
    return {
      searchForm:{},
      searchListData:[],
      searchLoading:false,
      typeArr:{
        'associated_not_unload':{
          title:"库存详情页",
          searchUrl:"getAssociatedNotUnload",
          exportUrl:"associated-notunload/",
        }
      },
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      saveSearchParam:{},
      exportLoading:false
    };
  },

  components: {
    dashboardList: dashboardList,
    dashboardSearch: dashboardSearch
  },
  computed: {

  },
  methods: {
    exportList:function(){
      let sendparam=this.pbFunc.deepcopy(this.saveSearchParam);
      sendparam.export='yes';
      this.exportLoading=true;
      let url = 'http://bpm.hhtdlng.com';
      let domainUrl = getDomainUrl('http://');
      axios.get(domainUrl+"/api/v1/"+this.typeArr[this.searchForm.type].exportUrl, {
        method: 'get',
        responseType: 'blob',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          "Accept": "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          'Authorization': 'jwt ' + this.pbFunc.getLocalData('token', true)
        },
        params: sendparam,
      }).then((res) => {
        // let fileName = res.headers['content-disposition'].match(/fushun(\S*)xls/)[0];
        // fileDownload(res.data, fileName);
        //如果用方法一 ，这里需要安装 npm install js-file-download --save ,然后引用 var fileDownload = require('js-file-download')，使用详情见github;
        this.exportLoading = false;
        if (res.data && res.status == 200) {
          // let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          let objectUrl = URL.createObjectURL(res.data);
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = objectUrl;
          link.setAttribute('download', '导出表.xlsx');
          document.body.appendChild(link);
          link.click()
        }
      }).catch((res)=> {
        this.exportLoading = false;
        console.log(res);
      });
      // this.$$http(this.typeArr[this.searchForm.type].searchUrl,sendparam).then(results=>{
      //   this.exportLoading=false;
      //   if(results.data&&results.data.code==0){
      //     if(Array.isArray(results.data.data)){
      //       this.searchListData=results.data.data;
      //       this.pageData.totalPage = Math.ceil(results.data.count / this.pageData.pageSize);
      //     }else{
      //       this.searchListData=results.data.data.data;
      //       this.pageData.totalPage = Math.ceil(results.data.data.count / this.pageData.pageSize);
      //     }
      //   }
      // })
    },
    searchList:function(searchParam){
      this.saveSearchParam=searchParam||{};
      let sendparam=this.pbFunc.deepcopy(searchParam);
      sendparam.pageSize=this.pageData.pageSize;
      sendparam.page=this.pageData.currentPage;
      this.searchLoading=true;
      this.$$http(this.typeArr[this.searchForm.type].searchUrl,sendparam).then(results=>{
        this.searchLoading=false;
        if(results.data&&results.data.code==0){
          if(Array.isArray(results.data.data)){
            this.searchListData=results.data.data;
            this.pageData.totalPage = Math.ceil(results.data.count / this.pageData.pageSize);
          }else{
            this.searchListData=results.data.data.data;
            this.pageData.totalPage = Math.ceil(results.data.data.count / this.pageData.pageSize);
          }
        }
      })
    },
    pageChange:function(){
      this.searchList(this.saveSearchParam);
    }
  },
  created() {
    this.searchForm=JSON.parse(this.$route.query.sendObj);
  }
};

</script>
