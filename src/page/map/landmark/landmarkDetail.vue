<template>
  <div class="detail-main">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>地标详情</p>
      </el-header>
      <el-main v-loading="pageLoading">
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                审核操作
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>上传时间:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.created_at)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>上传来源:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.mark_source && detailData.mark_source.verbose)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>审核操作:</label>
                <div class="detail-form-item check-button">
                  <el-button type="primary" :disabled="isSucess" @click="checkConfirm(true)" size="mini">通过</el-button>
                  <el-button type="danger" :disabled="isFailure" @click="checkConfirm(false)" size="mini">拒绝</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>审核状态:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.check_status && detailData.check_status.verbose)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>审核人:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.audit)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>审核时间:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.audit_datetime)"></div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="detail-list detail-form" v-if="false">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                地标信息同步
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>地标类型:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.mark_type && detailData.mark_type.verbose)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>地标同步:</label>
                <div class="detail-form-item" v-if="detailData.is_syncd">已同步</div>
                <div class="detail-form-item" v-if="!detailData.is_syncd">未同步</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                地标图片
              </el-col>
            </el-row>
          </div>
          <div class="img-box clearfix">
            <div class="float-left" v-for="(item,key) in detailData.images" :key="key" v-on:click="toShowPreview(key)"><img :src="item" /></div>
            <div v-if="detailData.images && !detailData.images.length">无图片</div>
          </div>
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                地标位置
              </el-col>
            </el-row>
          </div>
          <div class="landmark-address">地标位置：{{detailData.address}}</div>
          <div id="map-container">
          </div>
        </div>
      </el-main>
    </el-container>
    <img-review :imgObject.sync='imgObject'></img-review>
  </div>
</template>
<script>
import imgReview from '@/components/common/imgReview';
let landmarkMap;
let positionMark;
export default {
  name: 'landMarkDetail',
  components: {
    imgReview: imgReview,
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    },
    isSucess: function() {
      return (this.detailData.check_status && this.detailData.check_status.key) !== 'pass' ? false : true;
    },
    isFailure: function() {
      return (this.detailData.check_status.key) !== 'refuse' ? false : true;
    },
  },
  data() {
    return {
      activeName: 'first',
      pageLoading: 'pageLoading',
      dialogTableVisible: false,
      detailData: {
        mark_source: {},
        check_status: {},
        check_status: {},
        mark_type: {},
      },
      imgObject: {
        imgList: [],
        showPreview: false,
        previewIndex: 0,
      }

    }
  },
  methods: {
    toShowPreview: function(index) {
      this.imgObject.showPreview = true;
      this.imgObject.previewIndex = index;
    },
    getDetail: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          id: this.id,
        };
        this.pageLoading = true;
        this.$$http('getLandMarkDetail', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.detailData = results.data.data;
            this.imgObject.imgList = [];
            for (let i in this.detailData.images) {
              this.imgObject.imgList.push(this.detailData.images[i]);
            }
            resolve(results);
          } else {
            reject(results);
          }
        }).catch((err) => {
          this.pageLoading = false;
          reject(results);
        })
      })

    },
    passCheckAjax: function(isSucess) {
      let postData = {
        id: this.id,
      }
      postData.check_status = isSucess ? 'pass' : 'refuse';
      this.$$http('patchLandMarkDetail', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.getDetail();
        }
      }).catch((err) => {

      })
    },
    checkConfirm: function(isSucess) {
      let message = isSucess ? '是否审核通过?' : '是否审核拒绝?';
      this.$confirm(message, '请确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.passCheckAjax(isSucess);
      }).catch(() => {});
    }
  },
  created: function() {

  },
  mounted: function() {
    /*生成地图*/
    landmarkMap = new AMap.Map('map-container', {
      zoom: 15,
    });



    this.getDetail().then((results) => {

      if (this.detailData.coordinate && this.detailData.coordinate.latitude && this.detailData.coordinate.longitude) {
        /*创建点标记*/
        positionMark = new AMap.Marker({
          map: landmarkMap,
        });
        let lnglat = [this.detailData.coordinate.longitude, this.detailData.coordinate.latitude];

        landmarkMap.setCenter(lnglat);
        positionMark.setPosition(lnglat);
      }

    });

  }
}

</script>
<style scoped lang="less">
.img-box {

  img {
    height: 100px;
    width: 100px;
  }
}

#map-container {
  height: 400px;
  width: 100%;
}

.landmark-address {
  margin-bottom: 20px;
}

.check-button {
  position: relative;
  top: -8px;
}

</style>
