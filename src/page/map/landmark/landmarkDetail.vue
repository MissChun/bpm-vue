<template>
  <div class="detail-main">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3">
            <router-link :to="{path: '/mapManage/landmark/landmarkList'}">
              <div class="go-return icon-back"></div>
            </router-link>
          </el-col>
          <el-col :span="18">
            <p>地标详情</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
          </el-col>
        </el-row>
      </el-header>
      <el-main v-loading="pageLoading">
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                审核操作
              </el-col>
              <el-col :span="6" class="text-right" v-if="detailData.source_type && detailData.source_type.key !== 'DRIVER_UPLOAD'">
                <el-button type="primary" @click="editLandmark()" size="mini">编辑</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>上传时间:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.create_time)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>上传来源:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.source_type && detailData.source_type.verbose)"></div>
              </div>
            </el-col>
            <el-col :span="8" v-if="!isSucess">
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
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.confirm_status && detailData.confirm_status.verbose)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>审核人:</label>
                <div class="detail-form-item" v-if="detailData.source_type && detailData.source_type.key !=='PLATFORM'" v-html="pbFunc.dealNullData( detailData.confirm_info && detailData.confirm_info.operator && detailData.confirm_info.operator.username)"></div>
                <div class="detail-form-item" v-if="detailData.source_type && detailData.source_type.key ==='PLATFORM'" v-html="pbFunc.dealNullData( detailData.upload_user && detailData.upload_user.nick_name)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>审核时间:</label>
                <div class="detail-form-item" v-if="detailData.source_type && detailData.source_type.key !=='PLATFORM'" v-html="pbFunc.dealNullData(detailData.confirm_info && detailData.confirm_info.operate_datetime)"></div>
                <div class="detail-form-item" v-if="detailData.source_type && detailData.source_type.key ==='PLATFORM'" v-html="pbFunc.dealNullData(detailData.create_time)"></div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="detail-list detail-form">
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
                <label>匹配运单:</label>
                <!--这里有问题，需要咨询后端-->
                <div class="detail-form-item">无</div>
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
                地标信息
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>地标名称:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.position_name)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>地标类型:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.position_type && detailData.position_type.verbose)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>联系人:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.contacts)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8" v-if="detailData.position_type && detailData.position_type.key ==='LNG_FACTORY'">
              <div class="label-list">
                <label>气种:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.gas_type && detailData.gas_type.verbose)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>联系电话:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.tel)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>备注:</label>
                <!--这里后端没有返回字段-->
                <div class="detail-form-item">无</div>
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
            <div class="float-left" v-for="(item,key) in detailData.position_pics" :key="key" v-on:click="toShowPreview(key)"><img :src="item" /></div>
            <div v-if="detailData.position_pics && !detailData.position_pics.length">无图片</div>
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
      return (this.detailData.confirm_status && this.detailData.confirm_status.key !== 'SUCCESS') ? false : true;
    },
    isFailure: function() {
      return (this.detailData.confirm_status && this.detailData.confirm_status.key !== 'FAILURE') ? false : true;
    },
  },
  data() {
    return {
      activeName: 'first',
      pageLoading: 'pageLoading',
      dialogTableVisible: false,
      detailData: {

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
            for (let i in this.detailData.position_pics) {
              this.imgObject.imgList.push(this.detailData.position_pics[i]);
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
      postData.confirm_status = isSucess ? 'SUCCESS' : 'FAILURE';
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
    },
    editLandmark: function() {
      this.$router.push({
        path: '/mapManage/landMark/editLandmark',
        query: {
          id: this.id
        }
      });
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

      if (this.detailData.location && this.detailData.location.latitude && this.detailData.location.longitude) {
        /*创建点标记*/
        positionMark = new AMap.Marker({
          map: landmarkMap,
        });
        let lnglat = [this.detailData.location.longitude, this.detailData.location.latitude];

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
