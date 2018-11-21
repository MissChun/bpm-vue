<template>
  <div>
      <update-new-data-show-dialog :is-show="isShow" v-on:closeDialogBtn="closeBtn" v-on:updateBtn="updateBtn()" :type-str="typeStr" :new-data="showData" :post-data="updateData"></update-new-data-show-dialog>
  </div>
</template>
<script>
import updateNewDataShowDialog from '@/components/statistics/updateNewDataShowDialog';
export default {
  name: 'updateNewData',
  components: {
    updateNewDataShowDialog:updateNewDataShowDialog
  },
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    typeStr: String,
    closeDialogBtn: Function,
    apiName: String,
    updateData:Object,
    filterParam:Object
  },

  data: function() {
    return {
      showData:[]
    }
  },
  computed: {

  },
  methods: {
    closeBtn: function() {
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
      console.log('展示的参数',this.showData)
    },


  },
  watch: {
    isShow(curVal, oldVal) {　
      if(curVal){
        this.handleData();
      }
    },
  },
}

</script>
<style scoped lang="less">

</style>
