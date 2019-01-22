<template>
  <div>
    <el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileList" :http-request="uploadFile" :before-upload="beforeAvatarUpload" multiple accept="image/gif,image/jpeg,image/png,image/jpg">
      <i class="el-icon-plus" v-if="!uploadTitle"></i>
      <span v-if="uploadTitle">{{uploadTitle}}</span>
    </el-upload>
    <img-review :imgObject.sync="imgObject"></img-review>
  </div>
</template>
<script>
import * as qiniu from 'qiniu-js';
import axios from 'axios';
import imgReview from '@/components/common/imgReview';
export default {
  name: 'qiniuUpload',
  props: {
    fileList: Array,
    uploadTitle: String,
    limit: Number,
  },
  components: {
    imgReview,
  },
  data: function() {
    return {
      imgObject: {
        imgList: [], //图片url列表,必需。
        showPreview: false, //是否展示预览，默认false,必需
        previewIndex: 0, //默认展示图片的index,可选
      }
    }
  },
  computed: {


  },
  methods: {
    handleRemove(file, fileList) {

      for (let i in this.fileList) {
        if (this.fileList[i].uid === file.uid) {
          this.fileList.splice(i, 1);
        }
      }

    },
    handlePictureCardPreview(file) {
      let previewIndex = 0;
      let imgList = [];

      for (let i in this.fileList) {
        if (this.fileList[i].name === file.name) {
          previewIndex = i;
        }
        imgList.push(this.fileList[i].url)
      }

      this.imgObject = {
        imgList: imgList,
        showPreview: true,
        previewIndex: previewIndex,
      }

    },
    beforeAvatarUpload(file) {

      const isLimte2M = file.size / 1024 / 1024 < 2;

      const isLimteNum = this.limit && this.fileList.length < this.limit;

      if (!isLimte2M) {
        this.$message({
          message: '上传头像图片大小不能超过 2MB',
          type: 'error'
        });
      }

      if (!isLimteNum) {
        this.$message({
          message: `只限上传${this.limit}张`,
          type: 'error'
        });
      }

      return isLimte2M && isLimteNum;
    },
    uploadFile(e) {
      let files = e.file;

      let config = {
        useCdnDomain: true,
        disableStatisticsReport: false,
        retryCount: 6,
        region: qiniu.region.z2
      };

      let putExtra = {
        fname: "",
        params: {},
        mimeType: null
      };

      let type = files.type.split('/')[1];

      this.$$http('getQiniuKey', {
        suffix: type,
      }).then(results => {
        if (results.data && results.data.code == 0) {
          let resultsData = results.data.data;
          let key = resultsData.key;
          let token = resultsData.token;

          this.uploadWithSDK(token, putExtra, config, key, files);
        }

      })

    },
    uploadWithSDK(token, putExtra, config, key, file) {
      // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
      let error = err => {
        this.$message({
          message: '上传失败',
          type: 'error'
        });
      };
      let currentUrl = document.location.href.toString();
      let complete = res => {
        if (currentUrl.match(`bpm.91lng.cn`) && !currentUrl.match(`pbpm.91lng.cn`) && !currentUrl.match(`testbpm.91lng.cn`)) {
          this.fileList.push({ name: file.name, url: `http://images.91lng.cn/${key}` })
        } else {
          this.fileList.push({ name: file.name, url: `http://dev-image.hhtdlng.com/${key}` })
        }
      };

      let next = response => {
        file.percentage = response.total.percent;
      };

      let subObject = {
        next: next,
        error: error,
        complete: complete
      };

      let observable = qiniu.upload(file, key, token, putExtra, config);

      let subscription = observable.subscribe(subObject);

    },
  },
  created() {

  }
}

</script>
<style scoped lang="less">
/deep/.el-upload--picture-card {
  width: 120px;
  height: 120px;
  line-height: 120px;
}

/deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 120px;
  height: 120px;
}

</style>
