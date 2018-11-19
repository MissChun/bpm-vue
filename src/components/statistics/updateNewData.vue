<template>
  <div>
      <update-new-data-show-dialog :is-show="isShow" v-on:closeDialogBtn="closeBtn" v-on:updateBtn="updateBtn"></update-new-data-show-dialog>
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
    filterParam:Array
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
      for(let i in this.filterParam){
        for(let j in this.updateData){
          if(this.filterParam[i].id === j){
            this.showData.push({
              title:this.filterParam[i].value,
              value:this.updateData[j]
            })
          }
        }
      }
      console.log('展示的参数',this.showData)
    },
    updateBtn(){

    }

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
.tms-dialog-form {
  width: 460px;
}

</style>
