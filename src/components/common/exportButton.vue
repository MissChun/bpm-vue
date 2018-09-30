<style scoped lang="less">


</style>
<template>
  <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportTableData(exportType)">{{exportBtn.text}}</el-button>
</template>
<script>
export default {
  name: 'exportButton',
  props: {
    exportType: Object,
    exportPostData: Object,
    exportApiName: String
  },
  data() {
    return {
      exportBtn: {
        text: '导出',
        isLoading: false,
        isDisabled: false,
      },
      tableIds: [] //导出头部列表ID
    };
  },
  computed: {

  },
  methods: {
    // 导出列表头部
    exportTableTitle(exportType) {
      return new Promise((resolve, reject) => {
        this.exportBtn = {
          text: '导出中',
          isLoading: true,
          isDisabled: true,
        }
        let postData = {
          page_arg: exportType.type,
          need_all: true
        }
        this.$$http('getExportTableTitle', postData).then((results) => {
          this.exportBtn = {
            text: '导出',
            isLoading: false,
            isDisabled: false,
          }
          if (results.data && results.data.code == 0) {
            let ids = [];
            for (let i in results.data.data) {
              ids.push(results.data.data[i].id);

            }
            this.tableIds = ids.join(',');
            resolve(results);
          } else {
            this.$message.error('导出失败');
            reject(results);
          }
        }).catch((err) => {
          this.$message.error('导出失败');
          reject(err);
          this.exportBtn = {
            text: '导出',
            isLoading: false,
            isDisabled: false,
          }
        })
      })
    },
    // 过滤掉分页
    postDataFilter(postData) {
      for (let i in postData) {
        if (i === 'page' || i === 'page_size') {
          delete postData[i];
        }
      }
      return postData;
    },
    // 导出列表
    exportData(exportType, ids) {
      let postData = {
        filename: exportType.filename,
        page_arg: exportType.type,
        ids: ids
      };
      if (!exportType.isPage) {
        this.exportPostData = this.postDataFilter(this.exportPostData);
      } else {
        postData.page_size = exportType.pageSize;
      }
      let newPostData = Object.assign(this.exportPostData, postData);
      this.exportBtn = {
        text: '导出中',
        isLoading: true,
        isDisabled: true,
      }
      this.$$http(this.exportApiName, newPostData).then((results) => {
        this.exportBtn = {
          text: '导出',
          isLoading: false,
          isDisabled: false,
        }
        if (results.data && results.data.code == 0) {
          window.open(results.data.data.filename);
          this.$message({
            message: '导出成功',
            type: 'success'
          });
        } else {
          this.$message.error('导出失败');
        }
      }).catch((err) => {
        this.$message.error('导出失败');
        this.exportBtn = {
          text: '导出',
          isLoading: false,
          isDisabled: false,
        }
      })
    },
    //导出数据
    exportTableData(exportType) {
      this.exportTableTitle(exportType).then((results) => {
        if (results.data && results.data.code == 0) {
          this.exportData(exportType, this.tableIds)
        }
      });
    },
  },
  created() {

  }
};

</script>
