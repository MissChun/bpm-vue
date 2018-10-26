<style scoped lang="less">
.el-form-item {
  margin-bottom: 0;
  margin-top: -6px;
}

.el-table {
  /deep/ td {
    padding: 0;
  }
  /deep/ .cell {
    padding: 0!important;
  }
}

.table-list {
  ul {
    li {
      height: 36px;

      line-height: 36px;

      border-bottom: 1px solid #e4e7ed;
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}

// .table-list{
//   ul{
//     li{
//       height: 36px;
//       border-bottom: 1px solid #e4e7ed;
//     }
//   }
// }

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="采购价管理" name="purchasePrice">
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
              <el-row :gutter="0">
                <el-col :span="6">
                  <el-form-item label="日期筛选:" label-width="105px">
                    <!-- <el-date-picker v-model="dateTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"  value-format="yyyy-MM-dd HH:mm:ss" ></el-date-picker> -->
                    <el-date-picker v-model="dateTime" type="week" format="yyyy 第 WW 周" :picker-options="pickerOptions" @change="startSearch" placeholder="选择周">
                    </el-date-picker>
                    <!-- <el-date-picker v-model="leaveTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker> -->
                  </el-form-item>
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
                <!-- <el-table-column  :prop="'list'" align="center" :label="'<span>55555</<span>'"></el-table-column> -->
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                  <template slot-scope="scope">
                    <div v-if="item.param === 'fluid_name'">
                      <ul>
                        <li>{{scope.row[item.param]}}</li>
                      </ul>
                    </div>
                    <div v-if="item.param === 'area'">
                      <ul>
                        <li v-for="(area,index) in scope.row.business_areas">{{area.area}}</li>
                      </ul>
                    </div>
                    <div v-if="item.param === 'date'">
                      <ul>
                        <li v-for="(area,index) in scope.row.business_areas">
                          <div v-for="(quotes,index) in area.quotes" v-if="quotes.price_date===item.title" v-on:dblclick="isShowPrice(quotes,true,$event)">
                            <div v-show="!quotes.isShow">{{quotes.today_unit_price}}</div>
                            <el-form-item prop="price" v-show="quotes.isShow">
                              <el-input v-model.trim="priceForm.price" @keyup.native.13="editPrice" size="mini" @blur="isShowPrice(quotes,false)" placeholder="请输入内容"></el-input>
                            </el-form-item>
                          </div>
                        </li>
                      </ul>
                    </div>
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
        <el-tab-pane label="目的地设置" name="destination"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'purchasePriceList',
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
      dateTime: '', //日期
      thTableList: [{
        title: '液厂名称',
        param: 'fluid_name',
        width: ''
      }, {
        title: '目的地',
        param: 'area',
        width: ''
      }],
      tableData: [],
      activeName: 'purchasePrice',
      searachPostData: {}, //搜索参数
      searchFilters: {
        quote_date_start:'',
        quote_date_end:'',
        keyword: '',
        field: 'fluid_name',
      },
      selectData: {
        fieldSelect: [
          { id: 'fluid_name', value: '实际液厂' },
          { id: 'supplier_name', value: '供应商' },
        ]
      },
      editPriceInfo: '', //编辑价格信息
      pickerOptions: {
        firstDayOfWeek: 1
      },
      startData: '',
      endData: ''
    };
  },
  computed: {

  },
  created() {
    this.getDateTitle();
    this.getList();
    this.pbFunc.format();
  },
  methods: {
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.searachPostData = this.pbFunc.deepcopy(this.searchFilters);
      if(this.dateTime){
        this.startData = this.pbFunc.formatDate(this.dateTime);
        this.endData = this.weekDate(5);
        this.searachPostData.quote_date_start = this.startData;
        this.searachPostData.quote_date_end = this.endData;
      }
      this.getDateTitle();
      this.getList();
    },
    weekDate(number) {
      let time = new Date(this.dateTime);
      time.setDate(time.getDate() + number);
      let week = time.getFullYear() + "-" +(time.getMonth() + 1<10?'0':'')+ (time.getMonth() + 1) + "-" + time.getDate();
      return week;
    },
    isPrevent(event) {
      event.stopPropagation();
    },
    pageChange() {
      setTimeout(() => {
        this.getList();
      });
    },
    hidePrice(row) {

      this.updateTableData(row, false);
    },
    editPrice() {
      this.hidePrice(this.editPriceInfo);
      // this.isShowPrice(this.editPriceInfo, false);
    },
    updateTableData(row, isShow) {
      for (let i in this.tableData) {
        for (let j in this.tableData[i].business_areas) {
          for (let z in this.tableData[i].business_areas[j].quotes) {
            if (this.tableData[i].business_areas[j].quotes[z].id === row.id) {
              this.$set(this.tableData[i].business_areas[j].quotes, z, {
                id: row.id,
                isShow: isShow,
                price_date: row.price_date,
                today_unit_price: row.today_unit_price
              })
              this.editPriceInfo = row;
            } else {
              this.$set(this.tableData[i].business_areas[j].quotes, z, {
                id: this.tableData[i].business_areas[j].quotes[z].id,
                isShow: false,
                price_date: this.tableData[i].business_areas[j].quotes[z].price_date,
                today_unit_price: this.tableData[i].business_areas[j].quotes[z].today_unit_price
              })
            }
          }
        }
      }
    },
    isShowPrice(row, isShow, event) {
      if (isShow) {
        this.updateTableData(row, isShow);
        this.priceForm.price = row.today_unit_price;
        this.$nextTick(function() {
          event.target.parentNode.lastChild.lastChild.firstChild.childNodes[1].focus();
        })
      } else {
        let postData = {
          id: row.id,
          today_unit_price: this.priceForm.price
        }
        setTimeout(() => {
          this.$refs['priceForm'].validate((valid) => {
            if (valid) {
              this.$$http('updatePurchasePrice', postData).then((results) => {
                if (results.data && results.data.code == 0) {
                  // this.updateTableData(row,isShow);

                  setTimeout(() => {
                    this.priceForm.price = '';
                    this.$refs['priceForm'].clearValidate();　
                  }, 1000)
                  this.getList();
                  this.$message({
                    message: '价格更新成功',
                    type: 'success'
                  });
                } else {
                  if (results.data.msg) {
                    this.$message.error(results.data.msg);
                  } else {
                    this.$message.error('价格更新失败');
                  }

                }
              }).catch((err) => {
                this.$message.error('价格更新失败');
              })
            }
          });
        })

      }
    },
    getDateTitle() {
      let postData = {
        quote_date_start:this.searachPostData.quote_date_start,
        quote_date_end:this.searachPostData.quote_date_end
      }
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.$$http('getPriceDateList', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          // this.tableData = results.data;
          this.thTableList= [{
            title: '液厂名称',
            param: 'fluid_name',
            width: ''
          }, {
            title: '目的地',
            param: 'area',
            width: ''
          }];
          for (let i in results.data.data) {
            this.thTableList.push({
              title: results.data.data[i],
              param: 'date',
              width: ''
            })
          }
        }
      }).catch((err) => {})
    },
    getList() {
      this.pageLoading = true;
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        quote_date_start:this.searachPostData.quote_date_start,
        quote_date_end:this.searachPostData.quote_date_end
      }
      postData[this.searachPostData.field] = this.searachPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);

      this.$$http('getPurchasePriceList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.data;
          for (let i in this.tableData) {
            for (let j in this.tableData[i].business_areas) {
              for (let z in this.tableData[i].business_areas[j].quotes) {
                this.tableData[i].business_areas[j].quotes[z].isShow = false;
              }
            }
          }
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    handleClick(tab, event) {
      if (tab.name === 'destination') {
        this.$router.push({ path: "/basicDataManage/purchasePriceManage/destinationSetting/destinationSettingList" });
      }
    },
    activated() {
      this.activeName = 'purchasePrice'
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
