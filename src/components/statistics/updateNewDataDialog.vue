<template>
  <div>
    <el-dialog title="提示" :visible="isShow" width="35%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <div class="tms-dialog-content">
          <el-row :gutter="10">
            <el-col :span="24" class="text-center">可对<span class="text-blue fs-20"> {{idsLen}} </span>单获取最新数据。</el-col>
            <el-col :span="24" class="mt-30" v-for="(item,key) in showData" :key="key">
              <div class="label-list">
                <label>{{item.title}}:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.value)"></div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="text-red text-center fs-13 mt-20">注意：将更新以上所有条件的{{typeStr}}，更新后数据不可恢复</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取消</el-button>
        <el-button type="primary" @click="updateBtn" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'updateNewDataDialog',
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    typeStr:String,
    apiName: String,
    closeDialogBtn: Function,
    // newData:Array,
    apiName: String,
    updateData:Object,
    filterParam:Object,
    ids:Array
  },

  data: function() {
    return {
      submitBtn: {
        btnText: '确认更新',
        isDisabled: false,
        isLoading: false
      },
      showData:[],
      idsLen:0
    }
  },
  computed: {

  },
  methods: {
    closeBtn: function() {
      // this.closeDialogBtn()
      this.$emit('closeDialogBtn', false);
    },
    handleData(){
      this.showData = [];
      for(let i in this.filterParam){
        // console.log('i',i)
        for(let j in this.updateData){
          if(i === 'fieldSelect'){
            for(let y in this.filterParam[i]){
              if(this.filterParam[i][y].id === j){
                this.showData.push({
                  title:this.filterParam[i][y].value,
                  value:this.updateData[j]
                })
              }
            }
          }else if(i === 'times'){
            for(let m in this.filterParam[i]){
              if(this.filterParam[i][m].id === j){
                this.showData.push({
                  title:this.filterParam[i][m].value,
                  value:this.updateData[j]+' 至 '+this.updateData[this.filterParam[i][m].timeEnd]
                })
              }
            }
          }else{
            for(let z in this.filterParam[i].data){
              if(this.updateData[j] === this.filterParam[i].data[z].id){
                this.showData.push({
                  title:this.filterParam[i].value,
                  value:this.filterParam[i].data[z].value
                })
              }
            }
          }
        }
      }
      // console.log('展示的参数',this.showData)
    },
    updateBtn(){
      this.submitBtn = {
        btnText: '更新中',
        isDisabled: true,
        isLoading: true
      }
      let postData = {
        ids:this.ids.join(',')
      }
      this.$$http(this.apiName, postData).then((results) => {
        this.submitBtn = {
          btnText: '确认更新',
          isDisabled: false,
          isLoading: false
        }
        if (results.data && results.data.code == 0) {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          this.$emit('closeDialogBtn', true);
        }

      }).catch((err) => {
        this.submitBtn = {
          btnText: '确认更新',
          isDisabled: false,
          isLoading: false
        }
        this.$message.error('更新失败');
      })
    }

  },
  watch: {
    isShow(curVal, oldVal) {　
      if(curVal){
        this.handleData();
        this.idsLen = this.ids.length;
      }
    },
  },
}

</script>
<style scoped lang="less">


</style>
