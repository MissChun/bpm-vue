<template>
  <div>
      <update-new-data-show-dialog :is-show="isShow" v-on:closeDialogBtn="closeDialog" v-on:updateBtn="updateBtn()" :type-str="typeStr" :new-data="showData" :post-data="updateData" :api-name="apiName"></update-new-data-show-dialog>
  </div>
</template>
<script>
// import updateNewDataShowDialog from '@/components/statistics/updateNewDataShowDialog';
export default {
  name: 'updateNewData',
  components: {
    // updateNewDataShowDialog:updateNewDataShowDialog
  },
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    typeStr: String,
    closeDialog: Function,
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
    // closeBtn: function() {
    //   this.$emit('closeDialog', false);
    // },



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
