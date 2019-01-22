<!-- purchaseUploadPoundListDialog.vue -->

<style scoped lang="less">
.label-list{
	margin-bottom: 10px;
	height: 40px;
	label{
		line-height: 40px;
	}
	.detail-form-item{
		display: table-cell;
        height: 40px;

        line-height: 20px;

        vertical-align: middle;
	}
}

</style>
<template>
  <div>
    <el-dialog title="上传磅单" :visible="isShow" width="50%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <div class="tms-dialog-content">
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="label-list">
                <label>客户名称:</label>
                <div class="detail-form-item">{{row.consumer_name}}</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="label-list">
                <label>卸货站点:</label>
                <div class="detail-form-item">{{row.station}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="label-list">
                <label>实收吨位:</label>
                <div class="detail-form-item">{{row.actual_quantity}}</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="label-list">
                <label>实际离站时间:</label>
                <div class="detail-form-item">{{row.leave_time}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
          	<!-- {{poundUpload.fileList}} -->
          	<el-col :span="20" :offset="2">
	          <el-row style="min-height: 131px;" v-if="loadImgArr.length">
	            <el-col :span="5" :offset="1" v-if="!poundUpload.fileList.length">
	              <div v-for="item in loadImgArr" :key="item.id">
	                <router-link target="_blank" :to="imgReviewSrcUrl">
	                  <img :src="item.url" style='width:100%;height:118px'></img>
	                </router-link>
	                
	              </div>
	            </el-col>
	            <el-col :span="17":offset="1">
	            	<qiniuImgUpload :fileList.sync="poundUpload.fileList" :uploadTitle="poundUpload.uploadTitle" :limit="poundUpload.limit"></qiniuImgUpload>
	            </el-col>
	          </el-row>
	         </el-col>
          </el-row>
      <!--     <el-row :gutter="10">
	        <el-col :span="20" :offset="2">
	          
	        </el-col>
	      </el-row> -->
          <el-row :gutter="10">
          	<el-col :span="12">
              <div class="label-list mt-20">
                <label>运单是否有误:</label>
                <div class="detail-form-item">
                	<el-radio-group v-model="weight_status">
					    <el-radio :label="'right'">无误</el-radio>
					    <el-radio :label="'wrong'">有误</el-radio>
					</el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取消</el-button>
        <el-button type="primary" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled" @click="updateBtn">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import qiniuImgUpload from '@/components/qiniuImgUpload'; //引入骑牛图片上传组件
export default {
  name: 'purchaseUploadPoundListDialog',
  props: {
    isShow:Boolean,
    closeDialogBtn: Function,
    row:Object
  },

  data: function() {
    return {
      imgLoading:false,
      submitBtn: {
        btnText: '确认修改',
        isDisabled: false,
        isLoading: false
      },
      loadingInfo:[],//装车磅单
      loadImgArr:[],//装车榜单图片
      imgReviewSrcUrl:'',
      weight_status:'',
      poundUpload: {
        fileList: [],
        uploadTitle: '重新上传',
        limit: 1,
      },
      billDetail:{},
    }
  },
  components: {
    qiniuImgUpload:qiniuImgUpload,
  },
  computed: {

  },
  created(){

  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', false);
    },
    imgReviewSrc: function() {
      let imgListArray = [];
      for (let i in this.loadImgArr) {
        imgListArray.push(this.loadImgArr[i].url);
      }
      return `/imgReview?imgList=${imgListArray.join(',')}`;
    },
    // 磅单图片
    billImg(id){
    	let postData = {
    		id:id
    	}
    	this.loadImgArr = [];
    	this.$$http("getPundList", postData).then(results => {
	      if (results.data.code == 0) {
	      	this.billDetail =results.data.data.data[0];
	        this.loadImgArr = [{
	        	id:this.billDetail.id,
	        	url:this.billDetail.image_url
	        }];
	        this.imgLoading = false;
	        this.imgReviewSrcUrl = this.imgReviewSrc();
	        // console.log('imgReviewSrcUrl',this.imgReviewSrcUrl,this.loadImgArr)
	      }
	    });
    },
    // 详情
    getDateDetail(){
    	let postData = {
    		id: this.row.waybill_id
    	}
    	this.imgLoading = true;
    	this.$$http('getConOrderDetail', postData).then((results) => {
	        if (results.data && results.data.code == 0 && results.data.data) {
	          this.detailData = results.data.data;
	          /* 获取运力 */
	          let unloadArr = [],
	            loadArr = [];

	          for (var i = 0; i < this.detailData.trips.length; i++) {
	            if (this.detailData.trips[i].section_type.key == 'unload'&&this.detailData.trips[i].business_order.id === this.row.business_order_id) {
	              this.loadingInfo = this.detailData.trips[i];
	            }
	          }
	          this.billImg(this.loadingInfo.weight_note_id);
	        } else {
	          this.imgLoading = false;
	          this.$message({
	            message: results.data.msg,
	            type: 'error'
	          });
	        }
	    }).catch((err) => {
	    	this.imgLoading = false;
	    })
	},
	// 修改运单状态
	updateWaybill(){
		let postData = {
			id:this.row.id,
			weight_status:this.weight_status
		}
		this.$$http('updateSalesWaybillStatus', postData).then((results) => {
	        if (results.data && results.data.code == 0 && results.data.data) {
	          this.$emit('closeDialogBtn', true);
	        } else {
	        	if(results.data.msg){
	        		this.$message({
			            message: results.data.msg,
			            type: 'error'
			         });
	        	}else{
	        		this.$message({
			            message: '修改状态失败',
			            type: 'error'
			         });
	        	}
	        }
	    }).catch((err) => {

	    })
	},
	// 修改图片
	updateBillboardImg(type){
    let apiName='';
    let postData = {};
    if(type==='externalMining'){
      apiName = 'updateExternalMiningUnloadingImg';
      postData = {
          id:this.loadingInfo.id,
          weight_note_image_url:this.poundUpload.fileList[0].url
        };
    }else{
      apiName='updatePundList';
      postData = {
        section_trip:this.billDetail.section_trip,
        image_url:this.poundUpload.fileList[0].url
      }
    }
		
		this.$$http(apiName, postData).then((results) => {
	        if (results.data && results.data.code == 0 && results.data.data) {
	          this.updateWaybill();
	        } else {
	        	if(results.data.msg){
	        		this.$message({
			            message: results.data.msg,
			            type: 'error'
			         });
	        	}else{
	        		this.$message({
			            message: '图片上传失败',
			            type: 'error'
			         });
	        	}
	        }
	    }).catch((err) => {

	    })
	},
  // 外采详情
  externalMiningDetail(){
    let postData = {
          id: this.row.waybill_id
        }
    this.$$http('outsideBuyDetalis', postData).then((results) => {
        this.imgLoading = false;
          if (results.data && results.data.code == 0 && results.data.data) {
            this.detailData = results.data.data;
           // console.log('data',results.data.data);
            /* 获取运力 */
            for (var i = 0; i < this.detailData.trips.length; i++) {
              if (this.detailData.trips[i].section_type.key == 'unload'&&this.detailData.trips[i].business_order.id === this.row.business_order_id) {
                this.loadingInfo = this.detailData.trips[i];
              }
            }
            if(this.pbFunc.objSize(this.loadingInfo)){
              this.loadImgArr = [{
                id:this.loadingInfo.id,
                url:this.loadingInfo.weight_note_image_url
              }];
              this.imgReviewSrcUrl = this.imgReviewSrc();
            }
            
          } else {
            this.$message({
              message: results.data.msg,
              type: 'error'
            });
          }
      }).catch((err) => {
        this.imgLoading = false;
      })
  },
	updateBtn(){
    let type = '';
    if(this.row.waybill.indexOf("TE") != -1){
      type = 'externalMining';
    }
		if(this.poundUpload.fileList.length){
			this.updateBillboardImg(type);
		}else{
			this.updateWaybill();
		}
	}
   
  },
  watch: {
    isShow(curVal, oldVal) {　
      if(curVal){
        if(this.row.waybill.indexOf("TE") != -1){
          this.externalMiningDetail();
        }else if(this.row.waybill.indexOf("TSE") != -1) {
          
        }else{
          this.getDateDetail();
        }
      	this.weight_status = this.row.weight_status.key
      }
      this.loadingInfo = {};
      this.poundUpload={
        fileList: [],
        uploadTitle: '重新上传',
        limit: 1,
      },
      this.submitBtn = {
        btnText: '确认修改',
        isDisabled: false,
        isLoading: false
      };
      this.billDetail = {};
      this.imgReviewSrcUrl='';

    },
  },
  created: function() {

  }
}

</script>
