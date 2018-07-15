<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="采购价管理" name="purchasePrice">
        </el-tab-pane>
        <el-tab-pane label="目的地设置" name="destination">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
                    <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
                  </el-input>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right" v-if="false">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button> -->
            <el-button type="primary">导出</el-button>
            <!-- <el-button type="success" @click="addPerson">新增</el-button> -->
          </div>
          <div class="table-list mt-25">
            <el-form :model="priceForm" :rules="rules" ref="priceForm" label-width="0">
              <el-table :data="tableData" stripe style="width: 100%" size="mini" border v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:''">
                  <template slot-scope="scope">
                    <div v-if="item.param === 'fluid_name'">{{scope.row[item.param]}}</div>
                    <div v-if="item.param === 'areas'">
                      <span v-for="(area,index) in scope.row.areas">{{area.area}}<span v-if="index<scope.row.areas.length-1"> ，</span> </span>
                    </div>
                    <div v-if="item.param === 'effect_time'&&scope.row.areas.length">{{scope.row.areas[0].effect_time}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="240" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="primary" plain size="mini" @click="checkLink(scope.row.id,0)">编辑目的地</el-button>
                    <el-button type="primary" size="mini" @click="checkLink(scope.row.id,1)">编辑生效时间</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <no-data v-if="!pageLoading && !tableData.length"></no-data>
            </el-form>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'destinationSettingList',
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      priceForm: {
        price: ''
      },
      rules: {
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '支持数值输入，最多支持小数点后2位', trigger: 'blur' }
        ],
      },
      dateTime: [], //日期
      thTableList: [{
        title: '液厂名称',
        param: 'fluid_name',
        width: '240'
      }, {
        title: '目的地',
        param: 'areas',
        width: ''
      }, {
        title: '价格生效时间',
        param: 'effect_time',
        width: '200'
      }],
      tableData: [],
      activeName: 'destination',
      searachPostData: {}, //搜索参数
      searchFilters: {
        keyword: '',
        field: 'fluid_name',
      },
      selectData: {
        fieldSelect: [
          { id: 'fluid_name', value: '液厂名称' },
          { id: 'supplier_name', value: '供应商' },
        ]
      },
    };
  },
  computed: {

  },
  created() {
    this.getList();
  },
  methods: {
    checkLink(id, number) {
      this.$router.push({ path: "/purchaseCenter/purchasePriceManage/destinationSetting/editDestination", query: { id: id, activeStep: number } });
    },
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.searachPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList();
    },
    pageChange() {
      setTimeout(() => {
        this.getList();
      });
    },
    getList() {
      this.pageLoading = true;
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize
      }
      postData[this.searachPostData.field] = this.searachPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.$$http('getDestinationList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.data;
          // for (let i in this.tableData) {
          //   for (let j in this.tableData[i].business_areas) {
          //     for (let z in this.tableData[i].business_areas[j].quotes) {
          //       this.tableData[i].business_areas[j].quotes[z].isShow = false;
          //     }
          //   }
          // }
          this.pageData.totalCount = results.data.data.count;

        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    handleClick(tab, event) {
      if (tab.name === 'purchasePrice') {
        this.$router.push({ path: "/purchaseCenter/purchasePriceManage/purchasePrice/purchasePriceList" });
      }
    },
    activated() {
      this.activeName = 'destination'
    },
  },
  watch: {
    tableData: {
      handler(val, oldVal) {　　
        // for (let i = 0; i < val.length; i++) {　　　　　　　　
        //   if (oldVal[i] != val[i]) {　　　　　　　　　　
        //   }　　　　　　
        // }
      },
      　　　　deep: true
    }
  }

};

</script>
