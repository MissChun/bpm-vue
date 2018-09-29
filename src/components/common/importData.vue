<style scoped lang="less">
/deep/ .total-data {
  line-height: 40px;
}

.go-return {
  width: 32px;
  height: 32px;
  margin-top: 30px;
}

.el-header p {
  height: 60px;
  margin: 16px 0;

  font-size: 26px;
  line-height: 60px;

  text-align: center;
}

.upload-btn {
  display: inline-block;
  margin: 0 5px;
}

</style>
<template>
  <div>
    <el-header>
      <el-row>
        <el-col :span="3">
          <router-link :to="{path: backLink}">
            <div class="go-return icon-back"></div>
          </router-link>
        </el-col>
        <el-col :span="18">
          <p>{{importTitle}}</p>
        </el-col>
      </el-row>
    </el-header>
    <div class="operation-btn">
      <el-row>
        <el-col :span="10" class="total-data">
          共计{{tableData.length?tableData[0].sum:0}}条，无误{{tableData.length?tableData[0].success:0}}条，有误{{tableData.length?tableData[0].failed:0}}条
        </el-col>
        <el-col :span="14" class="text-right">
          <el-button type="primary" :disabled="downTempBtn.isDisabled" :loading="downTempBtn.isLoading" @click="exportsTemplate">{{downTempBtn.text}}</el-button>
          <el-upload class="upload-btn" :action="uploadFileData.uploadFileUrl" :onError="uploadError" :onSuccess="uploadSuccess" :beforeUpload="beforeAvatarUpload" :on-progress="uploadProgress" :show-file-list="false" :headers="headers">
            <el-button type="primary" plain :disabled="uploadBtn.isDisabled" :loading="uploadBtn.isLoading" @click="">{{uploadBtn.text}}</el-button>
          </el-upload>
          <el-button type="success" :disabled="importBtn.isDisabled" :loading="importBtn.isLoading" @click="importsData">{{importBtn.text}}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-list mt-25">
      <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" @selection-change="handleSelectionChange" @select-all="isAllSelectData" @select="singleSelectData" ref="table" :class="{'tabal-height-500':!tableData.length}">
        <el-table-column type="selection" width="55" :selectable="checkboxInit">
        </el-table-column>
        <el-table-column v-for="(item,key) in tableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:(tableList.length>6?140:'')">
          <template slot-scope="scope">
            <div v-if="item.dateType==='date'">{{scope.row[item.param]|dateFilter}}</div>
            <div :class="item.isEllipsis?'td-hover':''" v-else>{{scope.row[item.param]}}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <div class="text-green" v-if="scope.row.status.key==='SUCCESS'">{{scope.row.status.verbose}}</div>
            <div class="text-red" v-else>{{scope.row.status.verbose}}</div>
          </template>
        </el-table-column>
        <el-table-column label="说明" align="center" width="240" fixed="right">
          <template slot-scope="scope">
            <div class="text-red">{{scope.row.remark}}</div>
          </template>
        </el-table-column>
      </el-table>
      <no-data v-if="!pageLoading && !tableData.length"></no-data>
    </div>
    <div class="page-list text-center">
      <el-pagination background layout="prev, pager, next ,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getDomainUrl } from '@/api/index';
export default {
  name: 'importData',
  props: {
    importTitle: String,
    backLink: String,
    tableList: Array,
    apiNameData: Object,
    postData: Object,
    // tableData: Array,
    // logLoading: Boolean
  },
  computed: {
    headers() {
      return {
        'Authorization': 'jwt ' + (this.pbFunc.getLocalData('token', true) ? this.pbFunc.getLocalData('token', true) : '')
      }
    },

  },
  data() {
    return {
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      downTempBtn: {
        text: '下载导入模板',
        isLoading: false,
        isDisabled: false,
      },
      importBtn: {
        text: '导入系统',
        isLoading: false,
        isDisabled: false,
      },
      uploadBtn: {
        text: '上传导入数据',
        isLoading: false,
        isDisabled: false,
      },
      tableData: [],
      pageLoading: false,
      multipleSelection: '', //全选
      uploadList: [],
      uploadFileData: {
        uploadFileUrl: '', //接口请求的链接
        uploadData: {
          file: ''
        }, //上传接口参数
      },
      selectIds: [], //选择的ID
      singleSelectIds: [], //单选ID数据
      isAllSelect: false,
      token: '',
    }
  },
  created() {
    this.uploadApiUrl();
    this.getList();
    // this.deleteData();
    // this.importSuccess();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    uploadApiUrl() {
      let domainUrl = getDomainUrl('http://');
      this.uploadFileData.uploadFileUrl = domainUrl + this.apiNameData.uploadApi + '?jwt=' + (this.pbFunc.getLocalData('token', true) ? this.pbFunc.getLocalData('token', true) : '');
    },
    // 下载模板
    exportsTemplate() {
      let postData = {
        type: this.postData.exportType
      }
      this.downTempBtn = {
          text: '下载导入模板',
          isLoading: true,
          isDisabled: true,
        },
        this.$$http('exportsTemplate', postData).then((results) => {
          this.downTempBtn = {
            text: '下载导入模板',
            isLoading: false,
            isDisabled: false,
          }
          if (results.data && results.data.code == 0) {
            window.open(results.data.data.filename);
            this.$message({
              message: '下载导入模板成功！',
              type: 'success'
            });
          } else {
            this.$message.error('下载导入模板失败！');
          }
        }).catch((err) => {
          this.$message.error('下载导入模板失败！');
          this.downTempBtn = {
            text: '下载导入模板',
            isLoading: false,
            isDisabled: false,
          }
        })
    },
    checkboxInit(row, index) {
      if (row.status.key === 'SUCCESS') {
        return 1; //可勾选
      } else {
        return 0; //不可勾选
      }
    },
    checked() {
      for (let i in this.tableData) {
        if (this.isAllSelect) {
          if (this.tableData[i].status.key === 'SUCCESS') {
            this.$refs.table.toggleRowSelection(this.tableData[i], true);
          }
          for (let j in this.selectIds) {
            if (this.tableData[i].id === this.selectIds[j]) {
              this.$refs.table.toggleRowSelection(this.tableData[i], false);
            }
          }
        } else {
          for (let j in this.singleSelectIds) {
            if (this.tableData[i].id === this.singleSelectIds[j]) {
              this.$refs.table.toggleRowSelection(this.tableData[i], true);
            }
          }
        }
      }
    },
    // 单行选择
    singleSelectData(selection, row) {
      if (this.isAllSelect) {
        for (let i in this.tableData) {
          if (this.tableData[i].id === row.id) {
            if (this.tableData[i].isSelect) {
              this.tableData[i].isSelect = false;
              this.selectIds.push(row.id);
            } else {
              this.tableData[i].isSelect = true;
              this.selectIds.splice(this.selectIds.findIndex(item => item === row.id), 1);
            }
          }
        }
      } else {
        for (let i in this.tableData) {
          if (this.tableData[i].id === row.id) {
            if (this.tableData[i].isSelect) {
              this.tableData[i].isSelect = false;
              this.singleSelectIds.splice(this.singleSelectIds.findIndex(item => item === row.id), 1);
            } else {
              this.tableData[i].isSelect = true;
              this.singleSelectIds.push(row.id);
            }
          }
        }
      }

      // if (this.selectIds.length) {
      //   this.isAllSelect = false;
      // } else {
      //   this.isAllSelect = true;
      // }
    },
    // 是否全选
    isAllSelectData(selection) {
      if (this.selectIds.length || this.singleSelectIds.length) {
        this.isAllSelect = true;
        this.selectIds = [];
        this.singleSelectIds = [];
      } else {
        this.isAllSelect = !this.isAllSelect;
      }
      for (let i in this.tableData) {
        // for (let j in selection) {
        //   if (this.tableData[i].id === selection[j].id) {
        this.tableData[i].isSelect = this.isAllSelect;
        //   }
        // }
      }
      // if (selection.length) {
      //   this.isAllSelect = true;
      // } else {
      //   this.isAllSelect = false;
      // }
    },
    // 匹配运单
    matchingData(data) {
      let postData = {
        data: data,
        type: this.postData.matchingType
      }
      this.$$http('matchingWaybill', postData).then((results) => {
        if (results.data && results.data.code == 0) {

        }
      }).catch((err) => {

      })
    },
    // 清除临时表
    deleteData() {
      return new Promise((resolve, reject) => {
        this.$$http(this.apiNameData.deleteDataApi, {}).then((results) => {
          if (results.data && results.data.code == 0) {
            resolve(results);
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })
      })
    },
    // 导入系统
    importsData() {
      let postData = {};
      if (this.isAllSelect) postData.import = 'all';
      if (this.selectIds.length) postData.ids = this.selectIds;
      if (this.singleSelectIds.length) postData.ids = this.singleSelectIds;
      if (this.isAllSelect || this.singleSelectIds.length) {
        this.importBtn = {
          text: '导入系统中',
          isLoading: true,
          isDisabled: true,
        };
        this.$$http(this.apiNameData.importApi, postData).then((results) => {
          this.importBtn = {
            text: '导入系统',
            isLoading: false,
            isDisabled: false,
          };
          if (results.data && results.data.code == 0) {
            this.selectIds = [];
            this.singleSelectIds = [];
            this.isAllSelect = false;
            this.pageData.currentPage = 1;
            this.getList();
            this.importSuccess(results.data.data.success_export_nums);
            // if (results.data.data.length && this.postData.matchingType) {
            //   this.matchingData(results.data.data);
            // }

          } else {
            if (results.data.msg) {
              this.$message({
                message: results.data.msg,
                type: 'error'
              });
            } else {
              this.$message({
                message: '导入失败',
                type: 'error'
              });
            }
          }
        }).catch((err) => {
          this.$message({
            message: '导入失败',
            type: 'error'
          });
          this.importBtn = {
            text: '导入系统',
            isLoading: false,
            isDisabled: false,
          };
        })
      } else {
        this.$message({
          message: '请勾选数据！',
          type: 'warning'
        });
      }
    },
    // 导出成功弹窗
    importSuccess(nums) {
      // this.$alert('成功导入xx条数据', '提示', {
      //   confirmButtonText: '确定',
      //   center: true,
      //   // callback: action => {
      //   //   this.$message({
      //   //     type: 'success',
      //   //     message: `action: ${ action }`
      //   //   });
      //   // }
      // });
      nums = nums ? nums : 0;
      this.$confirm('成功导入' + nums + '条数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {

        // done();
      }).catch(error => {});
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      let fileArr = file.name.split('.');
      let fileLen = fileArr.length - 1;
      let formatType = false;
      if (fileArr[fileLen] === 'xls' || fileArr[fileLen] === 'xlsx') {
        formatType = true;
      }
      const fileSize = file.size / 1024 / 1024 < 10
      if (!formatType) {
        this.$message({
          message: '只能上传xls、xlsx 格式!',
          type: 'warning'
        });
      }
      if (!fileSize) {
        this.$message({
          message: '上传数据大小不能超过 10MB!',
          type: 'warning'
        });
      }
      this.uploadFileData.uploadData.file = file.name;
      if (formatType && fileSize && this.tableData.length) {
        return new Promise((resolve, reject) => {
          this.$$http(this.apiNameData.deleteDataApi, {}).then((results) => {
            if (results.data && results.data.code == 0) {
              resolve(results);
            } else {
              reject(results);
            }
          }).catch((err) => {
            reject(err);
          })
        })
      } else {
        return formatType && fileSize;
      }
    },
    // 上传时
    uploadProgress(response, file, fileList) {
      this.uploadBtn = {
        text: '上传数据中',
        isLoading: true,
        isDisabled: true
      };
    },
    // 上传成功
    uploadSuccess(response, file, fileList) {
      this.uploadBtn = {
        text: '上传导入数据',
        isLoading: false,
        isDisabled: false,
      };
      if (response.code == 0) {
        this.$message({
          message: '上传成功！',
          type: 'success'
        });
        this.pageData.currentPage = 1;
        this.getList();
      } else {
        this.$message({
          message: '上传失败！',
          type: 'error'
        });
      }

    },
    // 上传失败
    uploadError(response, file, fileList) {
      this.uploadBtn = {
        text: '上传导入数据',
        isLoading: false,
        isDisabled: false,
      };
      this.$message({
        message: '上传失败！',
        type: 'error'
      });
    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize
      };
      this.pageLoading = true;

      this.$$http(this.apiNameData.listApi, postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.data;
          for (let i in this.tableData) {
            if (this.isAllSelect && this.tableData[i].status.key === 'SUCCESS') {
              this.tableData[i].isSelect = true;
            } else {
              this.tableData[i].isSelect = false;
            }
            for (let j in this.selectIds) {
              if (this.tableData[i].id === this.selectIds[j]) {
                this.tableData[i].isSelect = false;
              }
            }
          }
          this.$nextTick(function() {
            this.checked();
          })
          this.pageData.totalCount = results.data.data.count;

        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    pageChange: function() {
      this.token = this.pbFunc.getLocalData('token', true);
      setTimeout(() => {
        this.getList();
      });
    }
  },

  activated() {},

}

</script>
